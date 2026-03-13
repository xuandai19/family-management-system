// ===============================
// MEMBER POST CONTROLLER
// Xem và đề xuất bài viết cho member
// ===============================

import { supabaseAdmin } from "../../config/supabase.js";

const isMissingPostCommentsTable = (error) => {
  const msg = String(error?.message || "");
  return msg.includes("Could not find the table 'public.post_comments'");
};

const COMMENT_DOC_PREFIX = "post_comment:";

const parseCommentPostIdFromTitle = (title) => {
  const raw = String(title || "");
  if (!raw.startsWith(COMMENT_DOC_PREFIX)) return null;
  const parts = raw.split(":");
  const postId = Number(parts[1]);
  return Number.isFinite(postId) ? postId : null;
};

const safeLoadCommentRows = async (postIds) => {
  if (!postIds || postIds.length === 0) return [];

  const { data, error } = await supabaseAdmin
    .from("post_comments")
    .select("post_id")
    .in("post_id", postIds);

  if (error) {
    if (isMissingPostCommentsTable(error)) {
      const { data: docs, error: docsError } = await supabaseAdmin
        .from("documents")
        .select("id, title")
        .eq("document_type", "other")
        .like("title", `${COMMENT_DOC_PREFIX}%`);

      if (docsError) throw docsError;

      const postIdSet = new Set(postIds.map((id) => Number(id)));
      return (docs || [])
        .map((d) => ({ post_id: parseCommentPostIdFromTitle(d.title) }))
        .filter((d) => d.post_id && postIdSet.has(d.post_id));
    }
    throw error;
  }

  return data || [];
};

const enrichPosts = async (posts, userId) => {
  if (!posts || posts.length === 0) return [];

  const postIds = posts.map((p) => p.id);

  const [{ data: likes }, { data: myLikes }, comments] =
    await Promise.all([
      supabaseAdmin.from("post_likes").select("post_id").in("post_id", postIds),
      supabaseAdmin
        .from("post_likes")
        .select("post_id")
        .in("post_id", postIds)
        .eq("user_id", userId),
      safeLoadCommentRows(postIds),
    ]);

  const likeCountByPost = (likes || []).reduce((acc, row) => {
    acc[row.post_id] = (acc[row.post_id] || 0) + 1;
    return acc;
  }, {});

  const commentCountByPost = (comments || []).reduce((acc, row) => {
    acc[row.post_id] = (acc[row.post_id] || 0) + 1;
    return acc;
  }, {});

  const myLikedSet = new Set((myLikes || []).map((l) => l.post_id));

  return posts.map((post) => ({
    ...post,
    thumbnail: post.thumbnail_url || null,
    view_count: post.view_count || 0,
    like_count: likeCountByPost[post.id] || 0,
    comment_count: commentCountByPost[post.id] || 0,
    is_liked: myLikedSet.has(post.id),
  }));
};

// Lấy danh sách bài viết đã xuất bản (public)
export const getPublishedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, search, limit = 20, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey (
          id,
          username,
          family_members (full_name, avatar_url)
        )
      `,
      )
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (category) {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    const enriched = await enrichPosts(data || [], userId);
    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error("Error getting published posts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết bài viết
export const getPostById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey (
          id,
          username,
          family_members (full_name, avatar_url)
        )
      `,
      )
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    // Tăng lượt xem
    await supabaseAdmin
      .from("posts")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("id", id);

    const [enriched] = await enrichPosts(
      [{ ...data, view_count: (data.view_count || 0) + 1 }],
      userId
    );

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đề xuất bài viết mới (member)
export const proposePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, excerpt, content, thumbnail, thumbnail_url, images } = req.body;

    // Validate required fields
    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("posts")
      .insert([
        {
          title,
          category: category || "other",
          excerpt,
          content,
          thumbnail_url: thumbnail_url || thumbnail || null,
          images: Array.isArray(images) ? images : [],
          author_id: userId,
          status: "pending", // pending, published, rejected
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Bài viết đã được gửi và chờ Admin duyệt đăng",
      data,
    });
  } catch (error) {
    console.error("Error proposing post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy danh sách bài viết của member (bao gồm cả pending)
export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = supabaseAdmin
      .from("posts")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;
    const enriched = await enrichPosts(data || [], userId);
    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error("Error getting my posts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật bài viết (chỉ khi còn pending)
export const updateMyPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, category, excerpt, content, thumbnail, thumbnail_url, images } = req.body;

    // Kiểm tra bài viết
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .eq("author_id", userId)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    if (existing.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Chỉ có thể sửa bài viết đang chờ duyệt",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("posts")
      .update({
        title,
        category,
        excerpt,
        content,
        thumbnail_url: thumbnail_url || thumbnail || null,
        images: Array.isArray(images) ? images : existing.images || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: "Đã cập nhật bài viết",
      data,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa bài viết (chỉ khi còn pending)
export const deleteMyPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Kiểm tra bài viết
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .eq("author_id", userId)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    if (existing.status === "published") {
      return res.status(400).json({
        success: false,
        message: "Không thể xóa bài viết đã xuất bản",
      });
    }

    const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Đã xóa bài viết",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like/Unlike bài viết
export const toggleLikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Kiểm tra bài viết tồn tại
    const { data: post, error: postError } = await supabaseAdmin
      .from("posts")
      .select("id, status")
      .eq("id", id)
      .single();

    if (postError || !post || post.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết có thể tương tác",
      });
    }

    // Kiểm tra đã like chưa
    const { data: existingLike } = await supabaseAdmin
      .from("post_likes")
      .select("id")
      .eq("post_id", id)
      .eq("user_id", userId)
      .maybeSingle();

    let isLiked = false;

    if (existingLike) {
      // Unlike
      await supabaseAdmin.from("post_likes").delete().eq("id", existingLike.id);
    } else {
      // Like
      await supabaseAdmin
        .from("post_likes")
        .insert([{ post_id: id, user_id: userId }]);
      isLiked = true;
    }

    const { count } = await supabaseAdmin
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", id);

    res.json({
      success: true,
      message: isLiked ? "Đã thích bài viết" : "Đã bỏ thích",
      data: {
        post_id: Number(id),
        like_count: count || 0,
        isLiked,
      },
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy bình luận của bài viết
export const getPostComments = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error: postError } = await supabaseAdmin
      .from("posts")
      .select("id, status")
      .eq("id", id)
      .single();

    if (postError || !post || post.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("post_comments")
      .select(
        `
        id,
        post_id,
        user_id,
        content,
        parent_id,
        created_at,
        updated_at,
        user:profiles!post_comments_user_id_fkey(
          id,
          username,
          avatar_url,
          family_members(full_name, avatar_url)
        )
      `
      )
      .eq("post_id", id)
      .order("created_at", { ascending: true });

    if (error && isMissingPostCommentsTable(error)) {
      const { data: fallbackData, error: fallbackError } = await supabaseAdmin
        .from("documents")
        .select(
          `
          id,
          title,
          content,
          uploaded_by,
          created_at,
          user:profiles!documents_uploaded_by_fkey(
            id,
            username,
            avatar_url,
            family_members(full_name, avatar_url)
          )
        `,
        )
        .eq("document_type", "other")
        .like("title", `${COMMENT_DOC_PREFIX}${Number(id)}:%`)
        .order("created_at", { ascending: true });

      if (fallbackError) throw fallbackError;

      const normalized = (fallbackData || []).map((item) => ({
        id: item.id,
        post_id: Number(id),
        user_id: item.uploaded_by,
        content: item.content,
        parent_id: null,
        created_at: item.created_at,
        updated_at: item.created_at,
        user: item.user || null,
      }));

      return res.json({ success: true, data: normalized });
    }

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("Error getting post comments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Thêm bình luận cho bài viết
export const addPostComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { content, parent_id = null } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nội dung bình luận không được để trống",
      });
    }

    const { data: post, error: postError } = await supabaseAdmin
      .from("posts")
      .select("id, status")
      .eq("id", id)
      .single();

    if (postError || !post || post.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết có thể bình luận",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("post_comments")
      .insert([
        {
          post_id: Number(id),
          user_id: userId,
          content: content.trim(),
          parent_id,
        },
      ])
      .select(
        `
        id,
        post_id,
        user_id,
        content,
        parent_id,
        created_at,
        updated_at,
        user:profiles!post_comments_user_id_fkey(
          id,
          username,
          avatar_url,
          family_members(full_name, avatar_url)
        )
      `
      )
      .single();

    if (error && isMissingPostCommentsTable(error)) {
      const fallbackTitle = `${COMMENT_DOC_PREFIX}${Number(id)}:${Date.now()}`;

      const { data: fallbackInsert, error: fallbackInsertError } =
        await supabaseAdmin
          .from("documents")
          .insert([
            {
              title: fallbackTitle,
              document_type: "other",
              content: content.trim(),
              uploaded_by: userId,
            },
          ])
          .select(
            `
            id,
            title,
            content,
            uploaded_by,
            created_at,
            user:profiles!documents_uploaded_by_fkey(
              id,
              username,
              avatar_url,
              family_members(full_name, avatar_url)
            )
          `,
          )
          .single();

      if (fallbackInsertError) throw fallbackInsertError;

      const { count: fallbackCount, error: fallbackCountError } =
        await supabaseAdmin
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("document_type", "other")
          .like("title", `${COMMENT_DOC_PREFIX}${Number(id)}:%`);

      if (fallbackCountError) throw fallbackCountError;

      return res.status(201).json({
        success: true,
        message: "Đã thêm bình luận",
        data: {
          id: fallbackInsert.id,
          post_id: Number(id),
          user_id: fallbackInsert.uploaded_by,
          content: fallbackInsert.content,
          parent_id: null,
          created_at: fallbackInsert.created_at,
          updated_at: fallbackInsert.created_at,
          user: fallbackInsert.user || null,
        },
        meta: {
          comment_count: fallbackCount || 0,
        },
      });
    }

    if (error) throw error;

    const { count, error: countError } = await supabaseAdmin
      .from("post_comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", id);

    if (countError && !isMissingPostCommentsTable(countError)) {
      throw countError;
    }

    res.status(201).json({
      success: true,
      message: "Đã thêm bình luận",
      data,
      meta: {
        comment_count: count || 0,
      },
    });
  } catch (error) {
    console.error("Error adding post comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

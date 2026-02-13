// ===============================
// MEMBER POST CONTROLLER
// Xem và đề xuất bài viết cho member
// ===============================

import { supabase } from "../../config/supabase.js";

// Lấy danh sách bài viết đã xuất bản (public)
export const getPublishedPosts = async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;

    let query = supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey (
          id,
          username,
          family_members (full_name, avatar_url)
        )
      `
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
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting published posts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết bài viết
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey (
          id,
          username,
          family_members (full_name, avatar_url)
        )
      `
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
    await supabase
      .from("posts")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", id);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đề xuất bài viết mới (member)
export const proposePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, excerpt, content, thumbnail } = req.body;

    // Validate required fields
    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          category: category || "other",
          excerpt,
          content,
          thumbnail: thumbnail || null,
          author_id: userId,
          status: "pending", // pending, published, rejected
          views: 0,
          likes: 0,
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

    let query = supabase
      .from("posts")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
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
    const { title, category, excerpt, content, thumbnail } = req.body;

    // Kiểm tra bài viết
    const { data: existing, error: checkError } = await supabase
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

    const { data, error } = await supabase
      .from("posts")
      .update({
        title,
        category,
        excerpt,
        content,
        thumbnail,
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
    const { data: existing, error: checkError } = await supabase
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

    const { error } = await supabase.from("posts").delete().eq("id", id);

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

    // Kiểm tra đã like chưa
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", id)
      .eq("user_id", userId)
      .single();

    if (existingLike) {
      // Unlike
      await supabase.from("post_likes").delete().eq("id", existingLike.id);

      // Giảm số like
      await supabase.rpc("decrement_post_likes", { post_id: id });

      res.json({ success: true, liked: false, message: "Đã bỏ thích" });
    } else {
      // Like
      await supabase
        .from("post_likes")
        .insert([{ post_id: id, user_id: userId }]);

      // Tăng số like
      await supabase.rpc("increment_post_likes", { post_id: id });

      res.json({ success: true, liked: true, message: "Đã thích bài viết" });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import { supabase } from "../../config/supabase.js";

// Lấy tất cả bài viết (admin)
export const getAllPosts = async (req, res) => {
  try {
    const { status, category } = req.query;

    let query = supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!author_id(id, username, avatar_url),
        approver:profiles!approved_by(id, username)
      `
      )
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy bài viết đã xuất bản (public)
export const getPublishedPosts = async (req, res) => {
  try {
    const { category, limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!author_id(id, username, avatar_url)
      `
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
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
        author:profiles!author_id(id, username, avatar_url)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    // Tăng lượt xem
    await supabase
      .from("posts")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("id", id);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tạo bài viết mới
export const createPost = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      thumbnail_url,
      images,
      category,
      is_featured,
    } = req.body;

    const author_id = req.user?.id;

    // Tạo slug từ title
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .concat("-", Date.now());

    // Check role from profiles table because req.user from Supabase Auth does not include role_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role_id")
      .eq("id", author_id)
      .single();

    if (profileError) throw profileError;

    const isAdmin = profile?.role_id === 1;

    const postData = {
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      images: images || [],
      category: category || "other",
      is_featured: is_featured || false,
      author_id,
      status: isAdmin ? "published" : "pending", // Admin đăng trực tiếp, member chờ duyệt
      published_at: isAdmin ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([postData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: isAdmin
        ? "Bài viết đã được đăng"
        : "Bài viết đã gửi, chờ admin duyệt",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      content,
      thumbnail_url,
      images,
      category,
      is_featured,
    } = req.body;

    const updateData = {
      title,
      excerpt,
      content,
      thumbnail_url,
      images,
      category,
      is_featured,
      updated_at: new Date().toISOString(),
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const { data, error } = await supabase
      .from("posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) throw error;

    res.json({ success: true, message: "Đã xóa bài viết" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Duyệt bài viết (Admin)
export const approvePost = async (req, res) => {
  try {
    const { id } = req.params;
    const admin_id = req.user?.id;

    const { data, error } = await supabase
      .from("posts")
      .update({
        status: "published",
        approved_by: admin_id,
        approved_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: "Bài viết đã được duyệt" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Từ chối bài viết (Admin)
export const rejectPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { reject_reason } = req.body;
    const admin_id = req.user?.id;

    const { data, error } = await supabase
      .from("posts")
      .update({
        status: "rejected",
        approved_by: admin_id,
        reject_reason,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: "Bài viết đã bị từ chối" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy bài viết chờ duyệt
export const getPendingPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!author_id(id, username, avatar_url)
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

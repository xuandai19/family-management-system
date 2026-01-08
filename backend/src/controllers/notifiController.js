import { supabase } from "../config/supabase.js";

// Lấy tất cả thông báo (admin)
export const getAllNotifications = async (req, res) => {
  try {
    const { type, is_read } = req.query;

    let query = supabase
      .from("notifications")
      .select(`
        *,
        user:profiles!user_id(id, username, avatar_url, email)
      `)
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }
    if (is_read !== undefined) {
      query = query.eq("is_read", is_read === "true");
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy thông báo chưa đọc
export const getUnreadNotifications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        user:profiles!user_id(id, username, avatar_url, email)
      `)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tạo thông báo mới (user gửi report)
export const createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const user_id = req.user?.id;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tiêu đề và nội dung",
      });
    }

    const { data, error } = await supabase
      .from("notifications")
      .insert([{
        title,
        message,
        type: type || "request",
        user_id,
        is_read: false,
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: "Gửi thông báo thành công",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đánh dấu đã đọc
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: "Đã đánh dấu đã đọc" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đánh dấu tất cả đã đọc
export const markAllAsRead = async (req, res) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false);

    if (error) throw error;

    res.json({ success: true, message: "Đã đánh dấu tất cả đã đọc" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa thông báo
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("notifications").delete().eq("id", id);

    if (error) throw error;

    res.json({ success: true, message: "Đã xóa thông báo" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đếm số thông báo chưa đọc
export const getUnreadCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    if (error) throw error;

    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

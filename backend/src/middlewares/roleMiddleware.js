import { supabase } from "../config/supabase.js";

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Truy vấn bảng profile để lấy role_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role_id")
      .eq("id", userId)
      .single();
    if (profileError || !profile) {
      return res.status(403).json({
        message: "Không tìm thấy hồ sơ người dùng.",
        error: profileError ? profileError.message : "Profile không tồn tại.",
      });
    }
    if (profile.role_id !== 1) {
      // Giả sử role_id 1 là Admin
      return res.status(403).json({ message: "Yêu cầu quyền Admin." });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server khi kiểm tra vai trò." });
  }
};

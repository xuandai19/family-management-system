import { supabase } from "../config/supabase.js";

export const verifyToken = async (req, res, next) => {
  try {
    // 1. Lấy token từ header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Không tìm thấy mã xác thực!" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Xác thực token với Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res
        .status(401)
        .json({ message: "Mã xác thực không hợp lệ hoặc đã hết hạn!" });
    }

    // Gắn thông tin user vào request để các hàm sau sử dụng
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  // Lấy profile từ database để check role_id
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role_id")
    .eq("id", req.user.id)
    .single();

  if (error || !profile || profile.role_id !== 1) {
    return res
      .status(403)
      .json({ message: "Quyền truy cập bị từ chối. Bạn không phải là Admin!" });
  }

  next();
};

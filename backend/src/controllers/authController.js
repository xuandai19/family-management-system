import { supabase } from "../config/supabase.js";

export const registerWithMemberInfo = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({
        error: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.",
      });
    }

    // 1. Tạo tài khoản trên Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return res.status(400).json({ error: authError.message });
    if (!authData.user)
      return res.status(400).json({ error: "Không thể tạo user." });

    const userId = authData.user.id;

    // 2. Tạo Profile mặc định (Guest = 3)
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        username: username, // Lưu họ tên vào username
        role_id: 3, // Guest
      },
    ]);
    if (profileError) throw profileError;

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Chờ Admin phê duyệt.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res
        .status(401)
        .json({ error: "Email hoặc mật khẩu không chính xác!" });
    }

    // Nên lấy thêm thông tin role và member_id từ bảng profiles để trả về cho Front-end
    const { data: profile } = await supabase
      .from("profiles")
      .select("role_id, member_id, username")
      .eq("id", data.user.id)
      .single();

    return res.status(200).json({
      success: true,
      access_token: data.session.access_token,
      user: {
        ...data.user,
        profile: profile, // Trả về thêm thông tin profile để FE phân quyền UI
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi đăng nhập hệ thống." });
  }
};

import { supabase } from "../config/supabase.js";

export const registerWithMemberInfo = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      full_name,
      gender,
      birth_date,
      parent_id,
      bio,
      address,
    } = req.body;

    // BƯỚC 1: Tạo tài khoản trên Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return res.status(400).json({ error: authError.message });
    const userId = authData.user.id;

    // BƯỚC 2: Tạo Profile mặc định (Role Guest = 3)
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        username: username || email.split("@")[0],
        role_id: 3,
      },
    ]);
    if (profileError) throw profileError;

    // BƯỚC 3: Đẩy thông tin gia phả vào bảng chờ duyệt (update_requests)
    // Dữ liệu gia phả được đóng gói vào JSONB 'new_data'
    // target_member_id = null vì đây là yêu cầu THÊM MỚI thành viên
    const { error: requestError } = await supabase
      .from("update_requests")
      .insert([
        {
          requester_id: userId,
          target_member_id: null, // NULL cho yêu cầu thêm thành viên mới
          request_type: "ADD_MEMBER",
          new_data: {
            full_name,
            gender,
            birth_date,
            parent_id: parent_id || null,
            bio,
            address,
          },
          status: "pending",
        },
      ]);

    if (requestError) throw requestError;

    return res.status(201).json({
      success: true,
      message:
        "Đăng ký thành công! Thông tin gia phả của bạn đang chờ Admin phê duyệt.",
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
    return res.status(200).json({
      success: true,
      access_token: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi đăng nhập hệ thống." });
  }
};

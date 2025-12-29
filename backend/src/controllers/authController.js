import { supabase } from "../config/supabase.js";

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

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      gender,
      birth_date,
      phone,
      father_name,
      mother_name,
      hometown,
      note, // Lưu ý: FE gửi 'note', DB lưu 'registration_note'
    } = req.body;

    // 1. Kiểm tra đầu vào bắt buộc theo DB constraint (NOT NULL)
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Email, mật khẩu và họ tên là bắt buộc." });
    }

    // 2. Tạo tài khoản trong Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    if (!authData.user) {
      return res
        .status(400)
        .json({ error: "Không thể khởi tạo tài khoản Auth." });
    }

    // 3. Chèn thông tin vào bảng profiles
    // Cấu trúc object này phải khớp 100% với các cột trong SQL của bạn
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id, // Khóa ngoại từ auth.users
      username: username, // NOT NULL, UNIQUE
      gender: gender, // Phải là 'Male', 'Female', hoặc 'Other'
      birth_date: birth_date || null,
      phone: phone || null,
      father_name: father_name || null,
      mother_name: mother_name || null,
      hometown: hometown || null,
      registration_note: note || null, // Map note -> registration_note
      role_id: 3, // Guest (mặc định theo DB)
      status: "pending", // Mặc định theo DB
    });

    // Nếu lỗi chèn Profile, bạn có thể muốn báo lỗi cụ thể ở đây
    if (profileError) {
      console.error("Profile Insert Error:", profileError);
      // Lưu ý: Lúc này User đã được tạo bên Auth, cần Admin xóa nếu muốn đăng ký lại email này
      return res.status(400).json({
        error:
          "Tài khoản đã tạo nhưng không thể lưu thông tin cá nhân. Lỗi: " +
          profileError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Đăng ký thành công! Vui lòng chờ Trưởng tộc phê duyệt tài khoản.",
    });
  } catch (error) {
    console.error("SYSTEM ERROR:", error);
    return res.status(500).json({ error: "Lỗi hệ thống khi đăng ký." });
  }
};

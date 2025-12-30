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
      spouse_name,
      hometown,
      note,
      type, // "Member" hoặc "Spouse"
    } = req.body;

    // 1. Kiểm tra đầu vào bắt buộc
    if (!email || !password || !username || !type) {
      return res.status(400).json({
        error: "Email, mật khẩu, họ tên và loại tài khoản là bắt buộc.",
      });
    }
    const normalizeType = (type) => {
      if (!type) return "Member";

      const t = type.toLowerCase();
      if (t === "spouse") return "Spouse";

      return "Member";
    };

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

    // 3. Chuẩn bị dữ liệu profile
    const profileData = {
      id: authData.user.id,
      email,
      username,
      gender,
      birth_date: birth_date || null,
      phone: phone || null,
      hometown: hometown || null,
      registration_note: note || null,
      role_id: 3,
      status: "pending",
      type, // "Member" hoặc "Spouse"
      // Các trường dưới sẽ được thêm tùy theo loại tài khoản
    };

    if (type === "Member") {
      profileData.father_name = father_name || null;
      profileData.mother_name = mother_name || null;
    }
    if (type === "Spouse") {
      profileData.spouse_name = spouse_name || null;
    }

    // 4. Lưu vào bảng profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .insert(profileData);

    if (profileError) {
      console.error("Profile Insert Error:", profileError);
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

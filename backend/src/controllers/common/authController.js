import { supabase, supabaseAdmin } from "../../config/supabase.js";

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
    const lowerType = (type || "member").toLowerCase();
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
      type: lowerType,
    };

    if (lowerType === "member") {
      profileData.father_name = father_name || null;
      profileData.mother_name = mother_name || null;
    }
    if (lowerType === "spouse") {
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Vui lòng nhập email." });
    }

    // Kiểm tra email có tồn tại trong profiles
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (!profile) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy tài khoản với email này." });
    }

    // Gửi OTP qua email bằng Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Reset password error:", error);
      return res
        .status(400)
        .json({ error: "Không thể gửi mã xác nhận. Vui lòng thử lại." });
    }

    return res.status(200).json({
      success: true,
      message: "Mã xác nhận đã được gửi đến email của bạn.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Lỗi hệ thống." });
  }
};

export const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, token, new_password } = req.body;

    if (!email || !token || !new_password) {
      return res.status(400).json({
        error: "Vui lòng cung cấp đầy đủ email, mã xác nhận và mật khẩu mới.",
      });
    }

    if (new_password.length < 6) {
      return res
        .status(400)
        .json({ error: "Mật khẩu phải có ít nhất 6 ký tự." });
    }

    // Xác thực OTP
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "recovery",
    });

    if (verifyError || !data?.user) {
      return res
        .status(400)
        .json({ error: "Mã xác nhận không đúng hoặc đã hết hạn." });
    }

    // Đặt lại mật khẩu bằng admin client
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
        password: new_password,
      });

    if (updateError) {
      console.error("Update password error:", updateError);
      return res
        .status(400)
        .json({ error: "Không thể đặt lại mật khẩu. Vui lòng thử lại." });
    }

    return res.status(200).json({
      success: true,
      message: "Đặt lại mật khẩu thành công!",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ error: "Lỗi hệ thống." });
  }
};

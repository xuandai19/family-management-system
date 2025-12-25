import { supabase } from "../config/supabase.js";

export const registerWithMemberInfo = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      full_name,
      gender, // Nên là 'Male', 'Female', hoặc 'Other'
      birth_date,
      father_id, // Thay vì parent_id
      mother_id, // Thêm mother_id
      spouse_id, // Thêm nếu là vợ/chồng của thành viên cũ
      bio,
      address,
    } = req.body;

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
        username: username || email.split("@")[0],
        role_id: 3, // Guest
      },
    ]);
    if (profileError) throw profileError;

    // 3. Đóng gói dữ liệu để Admin duyệt
    // Chuẩn hóa giới tính để khớp với DB Check Constraint
    const formattedGender = gender
      ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
      : "Other";

    const { error: requestError } = await supabase
      .from("update_requests")
      .insert([
        {
          requester_id: userId,
          target_member_id: null,
          request_type: "ADD_MEMBER",
          new_data: {
            full_name,
            gender: formattedGender,
            birth_date: birth_date || null,
            father_id: father_id || null,
            mother_id: mother_id || null,
            spouse_id: spouse_id || null, // Lưu vào JSONB để lúc duyệt sẽ xử lý bảng marriages
            bio: bio || null,
            address: address || null,
          },
          status: "pending",
        },
      ]);

    if (requestError) throw requestError;

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Chờ Admin phê duyệt thông tin gia phả.",
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

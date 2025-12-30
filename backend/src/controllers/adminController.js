import { supabase } from "../config/supabase.js";

// Admin xem danh sách các tài khoản đang chờ duyệt
export const getPendingMemberRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        email,
        username,
        birth_date,
        gender,
        phone,
        father_name,
        mother_name,
        hometown,
        created_at,
        type,
        status
      `
      )
      .eq("role_id", 3)
      .eq("status", "pending")
      .is("member_id", null)
      .is("spouse_id", null)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xác nhận liên kết tài khoản với thành viên trong gia phả
export const approveMemberRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        error: "Bắt buộc chọn thành viên để liên kết",
      });
    }

    // 1. Lấy profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, member_id, spouse_id, type, status")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    // 2. Check trạng thái & loại
    if (profile.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Tài khoản không ở trạng thái chờ duyệt" });
    }

    if (profile.type !== "Member") {
      return res
        .status(400)
        .json({ error: "Sai loại tài khoản (không phải Member)" });
    }

    if (profile.member_id || profile.spouse_id) {
      return res.status(400).json({ error: "Tài khoản đã được liên kết" });
    }

    // 3. Kiểm tra member
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level")
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy thành viên trong gia phả" });
    }

    // 4. Check member đã bị link chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("member_id", memberId)
      .maybeSingle();

    if (existingProfile) {
      return res.status(400).json({
        error: `Thành viên "${member.full_name}" đã được liên kết với tài khoản khác`,
      });
    }

    // 5. Update
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        member_id: memberId,
        role_id: 2,
        status: "approved",
        updated_at: new Date(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      message: "Duyệt thành công",
      data: {
        profile_id: profileId,
        profile_name: profile.username,
        member_id: member.id,
        member_name: member.full_name,
        generation_level: member.generation_level,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin từ chối yêu cầu đăng ký
export const rejectMemberRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { reason } = req.body;

    const { error } = await supabase
      .from("profiles")
      .update({
        status: "rejected",
        updated_at: new Date(),
      })
      .eq("id", profileId)
      .eq("role_id", 3);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Đã từ chối yêu cầu đăng ký",
      reason: reason || null,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xem danh sách tất cả thành viên trong gia phả
export const getAllMembersShort = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level, gender")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xác nhận liên kết tài khoản với spouse đã có trong bảng spouses
export const approveSpouseRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { spouseId } = req.body; // Admin chọn spouseId để liên kết

    // 1. Lấy thông tin profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, spouse_id, type, status")
      .eq("id", profileId)
      .single();
    if (profile.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Tài khoản không ở trạng thái chờ duyệt" });
    }

    if (profile.type !== "Spouse") {
      return res
        .status(400)
        .json({ error: "Sai loại tài khoản (không phải Spouse)" });
    }

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản!" });
    }

    if (profile.spouse_id) {
      return res.status(400).json({
        error: "Tài khoản này đã được liên kết với spouse!",
      });
    }

    // 2. Kiểm tra spouse có tồn tại không
    const { data: spouse, error: spouseError } = await supabase
      .from("spouses")
      .select("id, full_name")
      .eq("id", spouseId)
      .single();

    if (spouseError || !spouse) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy spouse trong hệ thống!" });
    }

    // 3. Kiểm tra spouse đã được liên kết với profile khác chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("spouse_id", spouseId)
      .single();

    if (existingProfile) {
      return res.status(400).json({
        error: `Spouse "${spouse.full_name}" đã được liên kết với tài khoản "${existingProfile.username}"!`,
      });
    }

    // 4. Cập nhật profile - liên kết với spouse và nâng cấp role
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        spouse_id: spouseId,
        role_id: 2, // Nếu có phân quyền riêng cho spouse, có thể để 2 hoặc role khác
        status: "approved",
        updated_at: new Date(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      message: "Duyệt thành công! Tài khoản đã được liên kết với spouse.",
      data: {
        profile_id: profileId,
        profile_name: profile.username,
        spouse_id: spouse.id,
        spouse_name: spouse.full_name,
      },
    });
  } catch (error) {
    console.error("Approve Spouse Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả spouse (vợ/chồng) cho dropdown duyệt
export const getAllSpousesShort = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("spouses")
      .select("id, full_name")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

    if (!memberId)
      return res
        .status(400)
        .json({ error: "Bắt buộc chọn thành viên để liên kết" });

    // Lấy profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, member_id, spouse_id, type, status")
      .eq("id", profileId)
      .single();

    if (profileError || !profile)
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });

    if (profile.status !== "pending")
      return res
        .status(400)
        .json({ error: "Tài khoản không ở trạng thái chờ duyệt" });
    if (profile.type.toLowerCase() !== "member")
      return res.status(400).json({ error: "Không phải tài khoản Member" });
    if (profile.member_id || profile.spouse_id)
      return res.status(400).json({ error: "Tài khoản đã được liên kết" });

    // Kiểm tra member tồn tại
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("id, full_name")
      .eq("id", memberId)
      .single();

    if (memberError || !member)
      return res
        .status(404)
        .json({ error: "Không tìm thấy thành viên trong gia phả" });

    // Check member đã được link chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("member_id", memberId)
      .maybeSingle();

    if (existingProfile)
      return res
        .status(400)
        .json({ error: `Thành viên "${member.full_name}" đã được liên kết` });

    // Update profile
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

    return res
      .status(200)
      .json({ success: true, message: "Duyệt Member thành công" });
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
    const { spouseId } = req.body;

    if (!spouseId) return res.status(400).json({ error: "Thiếu spouseId" });

    // Lấy profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, spouse_id, type, status")
      .eq("id", profileId)
      .single();

    if (profileError || !profile)
      return res.status(404).json({ error: "Không tìm thấy profile" });
    if (profile.status !== "pending")
      return res
        .status(400)
        .json({ error: "Profile không ở trạng thái chờ duyệt" });
    if (profile.type.toLowerCase() !== "spouse")
      return res.status(400).json({ error: "Profile không phải Spouse" });
    if (profile.spouse_id)
      return res.status(400).json({ error: "Profile đã liên kết spouse" });

    // Kiểm tra spouse tồn tại
    const { data: spouse, error: spouseError } = await supabase
      .from("spouses")
      .select("id, full_name")
      .eq("id", spouseId)
      .single();

    if (spouseError || !spouse)
      return res.status(404).json({ error: "Không tìm thấy spouse" });

    // Check spouse đã liên kết chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("spouse_id", spouseId)
      .maybeSingle();

    if (existingProfile)
      return res
        .status(400)
        .json({ error: `Spouse "${spouse.full_name}" đã được liên kết` });

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        spouse_id: spouseId,
        role_id: 2,
        status: "approved",
        updated_at: new Date(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res
      .status(200)
      .json({ success: true, message: "Duyệt Spouse thành công" });
  } catch (error) {
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

import { supabase, supabaseAdmin } from "../../config/supabase.js";

const normalizeGenderForFamilyMember = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const raw = String(value).trim().toLowerCase();
  if (["male", "nam", "m"].includes(raw)) return "Male";
  if (["female", "nu", "nữ", "f"].includes(raw)) return "Female";
  if (["other", "khac", "khác", "o"].includes(raw)) return "Other";

  if (["Male", "Female", "Other"].includes(String(value))) {
    return String(value);
  }

  return null;
};

// ===============================
// QUẢN LÝ YÊU CẦU ĐĂNG KÝ
// ===============================

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
        spouse_name,
        hometown,
        registration_note,
        created_at,
        type,
        status
      `,
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
      return res
        .status(400)
        .json({ error: "Bắt buộc chọn thành viên để liên kết" });
    }

    // Lấy profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, member_id, spouse_id, type, status")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    if (profile.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Tài khoản không ở trạng thái chờ duyệt" });
    }
    if (profile.type.toLowerCase() !== "member") {
      return res.status(400).json({ error: "Không phải tài khoản Member" });
    }
    if (profile.member_id || profile.spouse_id) {
      return res.status(400).json({ error: "Tài khoản đã được liên kết" });
    }

    // Kiểm tra member tồn tại
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("id, full_name")
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy thành viên trong gia phả" });
    }

    // Check member đã được link chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("member_id", memberId)
      .maybeSingle();

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: `Thành viên "${member.full_name}" đã được liên kết` });
    }

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        member_id: memberId,
        role_id: 2,
        status: "approved",
        updated_at: new Date().toISOString(),
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

    // Kiểm tra profile tồn tại
    const { data: profile, error: findError } = await supabase
      .from("profiles")
      .select("id, status")
      .eq("id", profileId)
      .single();

    if (findError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    // Update status
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      message: "Đã từ chối yêu cầu đăng ký",
      reason: reason || null,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xác nhận liên kết tài khoản với spouse
export const approveSpouseRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { spouseId } = req.body;

    if (!spouseId) {
      return res.status(400).json({ error: "Thiếu spouseId" });
    }

    // Lấy profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, spouse_id, type, status")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy profile" });
    }
    if (profile.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Profile không ở trạng thái chờ duyệt" });
    }
    if (profile.type.toLowerCase() !== "spouse") {
      return res.status(400).json({ error: "Profile không phải Spouse" });
    }
    if (profile.spouse_id) {
      return res.status(400).json({ error: "Profile đã liên kết spouse" });
    }

    // Kiểm tra spouse tồn tại
    const { data: spouse, error: spouseError } = await supabase
      .from("spouses")
      .select("id, full_name")
      .eq("id", spouseId)
      .single();

    if (spouseError || !spouse) {
      return res.status(404).json({ error: "Không tìm thấy spouse" });
    }

    // Check spouse đã liên kết chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("spouse_id", spouseId)
      .maybeSingle();

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: `Spouse "${spouse.full_name}" đã được liên kết` });
    }

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        spouse_id: spouseId,
        role_id: 2,
        status: "approved",
        updated_at: new Date().toISOString(),
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

// ===============================
// DUYỆT YÊU CẦU THÊM THÀNH VIÊN (ADD_MEMBER)
// ===============================

// Admin xem danh sách yêu cầu thêm thành viên
export const getAddMemberRequests = async (req, res) => {
  try {
    const { status = "pending" } = req.query;

    let query = supabaseAdmin
      .from("update_requests")
      .select(
        `
        id,
        requester_id,
        target_member_id,
        request_type,
        new_data,
        status,
        admin_note,
        created_at,
        updated_at,
        requester:profiles!update_requests_requester_id_fkey(id, username, email, gender),
        target_member:family_members!update_requests_target_member_id_fkey(id, full_name, generation_level)
      `,
      )
      .eq("request_type", "ADD_MEMBER")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return res.status(200).json({ success: true, data: data || [] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin duyệt yêu cầu thêm thành viên
export const approveAddMemberRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminNote } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ error: "Phiên đăng nhập không hợp lệ" });
    }

    const { data: request, error: requestError } = await supabaseAdmin
      .from("update_requests")
      .select(
        `
        id,
        requester_id,
        target_member_id,
        request_type,
        new_data,
        status,
        requester:profiles!update_requests_requester_id_fkey(id, gender)
      `,
      )
      .eq("id", requestId)
      .eq("request_type", "ADD_MEMBER")
      .eq("status", "pending")
      .single();

    if (requestError || !request) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu chờ duyệt" });
    }

    const payload = request.new_data || {};
    if (!payload.full_name) {
      return res.status(400).json({ error: "Thiếu họ tên thành viên cần thêm" });
    }

    let fatherId = payload.father_id || null;
    let motherId = payload.mother_id || null;

    if (!fatherId && !motherId && request.target_member_id) {
      const requesterGender = String(request.requester?.gender || "").toLowerCase();
      if (requesterGender === "female" || requesterGender === "nữ") {
        motherId = request.target_member_id;
      } else {
        fatherId = request.target_member_id;
      }
    }

    let generationLevel = payload.generation_level || null;
    const parentId = fatherId || motherId;
    if (!generationLevel && parentId) {
      const { data: parent, error: parentError } = await supabaseAdmin
        .from("family_members")
        .select("generation_level")
        .eq("id", parentId)
        .single();

      if (!parentError && parent?.generation_level) {
        generationLevel = parent.generation_level + 1;
      }
    }

    const normalizedGender = normalizeGenderForFamilyMember(payload.gender);

    if (payload.gender !== undefined && payload.gender !== null && !normalizedGender) {
      return res.status(400).json({
        error:
          "Giới tính không hợp lệ. Chỉ chấp nhận: Male/Female/Other (hoặc Nam/Nữ/Khác).",
      });
    }

    const memberInsert = {
      full_name: payload.full_name,
      gender: normalizedGender,
      birth_date: payload.birth_date || payload.date_of_birth || null,
      phone: payload.phone || null,
      email: payload.email || null,
      address: payload.address || null,
      occupation: payload.occupation || null,
      bio: payload.notes || null,
      father_id: fatherId,
      mother_id: motherId,
      generation_level: generationLevel,
      is_alive: true,
      is_public: true,
    };

    const { data: createdMember, error: createError } = await supabaseAdmin
      .from("family_members")
      .insert([memberInsert])
      .select("id, full_name, father_id, mother_id, generation_level")
      .single();

    if (createError) throw createError;

    const { error: updateError } = await supabaseAdmin
      .from("update_requests")
      .update({
        status: "approved",
        admin_id: req.user.id,
        admin_note: adminNote || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .eq("status", "pending");

    if (updateError) {
      await supabaseAdmin
        .from("family_members")
        .delete()
        .eq("id", createdMember.id);
      throw updateError;
    }

    return res.status(200).json({
      success: true,
      message: "Đã duyệt yêu cầu và thêm thành viên vào cây gia phả",
      data: createdMember,
    });
  } catch (error) {
    console.error("approveAddMemberRequest error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Admin từ chối yêu cầu thêm thành viên
export const rejectAddMemberRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminNote } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ error: "Phiên đăng nhập không hợp lệ" });
    }

    const { data: request, error: findError } = await supabaseAdmin
      .from("update_requests")
      .select("id")
      .eq("id", requestId)
      .eq("request_type", "ADD_MEMBER")
      .eq("status", "pending")
      .single();

    if (findError || !request) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu chờ duyệt" });
    }

    const { error: updateError } = await supabaseAdmin
      .from("update_requests")
      .update({
        status: "rejected",
        admin_id: req.user.id,
        admin_note: adminNote || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .eq("status", "pending");

    if (updateError) throw updateError;

    return res
      .status(200)
      .json({ success: true, message: "Đã từ chối yêu cầu thêm thành viên" });
  } catch (error) {
    console.error("rejectAddMemberRequest error:", error);
    return res.status(500).json({ error: error.message });
  }
};

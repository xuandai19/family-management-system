import { supabase } from "../config/supabase.js";

// Admin xem danh sách các tài khoản đang chờ duyệt
export const getPendingMemberRequests = async (req, res) => {
  try {
    // Lấy các profile chưa được gắn với thành viên nào (member_id = null) và role_id = 3 (Guest)
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, created_at")
      .is("member_id", null)
      .eq("role_id", 3)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xác nhận yêu cầu - Tìm và hiển thị các thành viên khớp tên
export const checkMemberMatch = async (req, res) => {
  try {
    const { profileId } = req.params;

    // 1. Lấy thông tin profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, member_id")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản!" });
    }

    if (profile.member_id) {
      return res.status(400).json({
        error: "Tài khoản này đã được liên kết với thành viên trong gia phả!",
      });
    }

    if (!profile.username) {
      return res.status(400).json({ error: "Tài khoản chưa có họ tên!" });
    }

    // 2. Tìm các thành viên có tên khớp (không phân biệt hoa thường)
    const { data: matchingMembers, error: searchError } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level, gender, birth_date")
      .ilike("full_name", profile.username);

    if (searchError) throw searchError;

    return res.status(200).json({
      success: true,
      profile: {
        id: profile.id,
        username: profile.username,
      },
      matchingMembers: matchingMembers || [],
      message:
        matchingMembers && matchingMembers.length > 0
          ? `Tìm thấy ${matchingMembers.length} thành viên khớp tên`
          : "Không tìm thấy thành viên nào khớp tên trong gia phả",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin xác nhận liên kết tài khoản với thành viên trong gia phả
export const approveMemberRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { memberId } = req.body; // Admin chọn memberId để liên kết

    // 1. Lấy thông tin profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, member_id")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản!" });
    }

    if (profile.member_id) {
      return res.status(400).json({
        error: "Tài khoản này đã được liên kết với thành viên trong gia phả!",
      });
    }

    // 2. Nếu admin không chọn memberId, tự động tìm theo tên
    let selectedMemberId = memberId;

    if (!selectedMemberId) {
      const { data: matchingMembers, error: searchError } = await supabase
        .from("family_members")
        .select("id, full_name")
        .ilike("full_name", profile.username);

      if (searchError) throw searchError;

      if (!matchingMembers || matchingMembers.length === 0) {
        return res.status(404).json({
          error: `Không tìm thấy thành viên nào có tên "${profile.username}" trong gia phả!`,
          suggestion:
            "Vui lòng thêm thành viên vào gia phả trước hoặc chọn thủ công.",
        });
      }

      if (matchingMembers.length > 1) {
        return res.status(400).json({
          error: "Có nhiều thành viên trùng tên! Vui lòng chọn thủ công.",
          members: matchingMembers,
        });
      }

      selectedMemberId = matchingMembers[0].id;
    }

    // 3. Kiểm tra member có tồn tại không
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level")
      .eq("id", selectedMemberId)
      .single();

    if (memberError || !member) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy thành viên trong gia phả!" });
    }

    // 4. Kiểm tra member đã được liên kết với tài khoản khác chưa
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("member_id", selectedMemberId)
      .single();

    if (existingProfile) {
      return res.status(400).json({
        error: `Thành viên "${member.full_name}" đã được liên kết với tài khoản "${existingProfile.username}"!`,
      });
    }

    // 5. Cập nhật profile - liên kết với member và nâng cấp role
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        member_id: selectedMemberId,
        role_id: 2, // Nâng từ Guest (3) lên Member (2)
        updated_at: new Date(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      message:
        "Duyệt thành công! Tài khoản đã được liên kết với thành viên trong gia phả.",
      data: {
        profile_id: profileId,
        profile_name: profile.username,
        member_id: member.id,
        member_name: member.full_name,
        generation_level: member.generation_level,
      },
    });
  } catch (error) {
    console.error("Approve Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Admin từ chối yêu cầu đăng ký
export const rejectMemberRegistration = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { reason } = req.body;

    // Xóa profile (hoặc có thể đánh dấu status = rejected)
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", profileId)
      .eq("role_id", 3) // Chỉ xóa Guest
      .is("member_id", null); // Chỉ xóa những tài khoản chưa liên kết

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Đã từ chối yêu cầu đăng ký.",
      reason: reason || "Không có lý do cụ thể",
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

// API để admin liên kết thủ công (giữ lại cho trường hợp cần)
export const linkProfileToMember = async (req, res) => {
  try {
    const { profileId, memberId } = req.body;

    if (!profileId || !memberId) {
      return res.status(400).json({ error: "Thiếu profileId hoặc memberId!" });
    }

    // Kiểm tra member có tồn tại không
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level")
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy thành viên trong gia phả!" });
    }

    // Kiểm tra member đã được liên kết chưa
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("member_id", memberId)
      .single();

    if (existingProfile) {
      return res.status(400).json({
        error: `Thành viên này đã được liên kết với tài khoản "${existingProfile.username}"!`,
      });
    }

    // Gắn profile với member
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        member_id: memberId,
        role_id: 2,
        updated_at: new Date(),
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      message: "Liên kết tài khoản với thành viên thành công!",
      data: {
        profile_id: profileId,
        member_id: member.id,
        member_name: member.full_name,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

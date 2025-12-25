import { supabase } from "../config/supabase.js";

export const approveMemberRegistration = async (req, res) => {
  try {
    const { requestId } = req.params;

    // 1. Lấy yêu cầu
    const { data: request, error: reqError } = await supabase
      .from("update_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (reqError || !request) {
      return res.status(404).json({ error: "Yêu cầu không tồn tại!" });
    }

    const info = request.new_data;
    let generationLevel = 1;

    // 2. TÍNH THẾ HỆ (Generation Level)
    if (info.spouse_id) {
      // TRƯỜNG HỢP LÀ VỢ/CHỒNG: Lấy cùng đời với người phối ngẫu
      const { data: spouse } = await supabase
        .from("family_members")
        .select("generation_level")
        .eq("id", info.spouse_id)
        .single();

      if (spouse) {
        generationLevel = spouse.generation_level;
      }
    } else if (info.father_id || info.mother_id) {
      // TRƯỜNG HỢP LÀ CON CÁI: Đời cha/mẹ + 1
      const parentId = info.father_id || info.mother_id;
      const { data: parent } = await supabase
        .from("family_members")
        .select("generation_level")
        .eq("id", parentId)
        .single();

      if (parent) {
        generationLevel = parent.generation_level + 1;
      }
    }

    // 3. Tạo thành viên mới
    const { data: newMember, error: memberError } = await supabase
      .from("family_members")
      .insert([
        {
          full_name: info.full_name,
          gender: info.gender,
          father_id: info.father_id || null,
          mother_id: info.mother_id || null,
          generation_level: generationLevel,
          birth_date: info.birth_date || null,
          is_alive: info.is_alive ?? true,
          address: info.address || null,
          bio: info.bio || null,
        },
      ])
      .select()
      .single();

    if (memberError) throw memberError;

    // 4. XỬ LÝ QUAN HỆ VỢ CHỒNG TRONG BẢNG MARRIAGES
    if (info.spouse_id) {
      const isMale = newMember.gender === "Male";
      await supabase.from("marriages").insert([
        {
          husband_id: isMale ? newMember.id : info.spouse_id,
          wife_id: isMale ? info.spouse_id : newMember.id,
          status: "married",
        },
      ]);
    }

    // 5. CẬP NHẬT PROFILE & REQUEST
    await supabase
      .from("profiles")
      .update({
        member_id: newMember.id,
        role_id: 2,
        updated_at: new Date(),
      })
      .eq("id", request.requester_id);

    await supabase
      .from("update_requests")
      .update({
        status: "approved",
        admin_id: req.user.id,
      })
      .eq("id", requestId);

    return res.status(200).json({
      success: true,
      message: "Duyệt thành viên thành công!",
      data: {
        member_id: newMember.id,
        generation_level: generationLevel,
      },
    });
  } catch (error) {
    console.error("Approve Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
// Admin cần xem danh sách tất cả thành viên (id và full_name)
export const getAllMembersShort = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("family_members")
      .select("id, full_name")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//Admin cần xem có những ai đang xin vào gia phả để còn bấm nút "Duyệt".
export const getPendingMemberRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("update_requests")
      .select(
        `
                id,
                request_type,
                new_data,
                created_at,
                profiles (
                username
                )
            `
      )
      .eq("request_type", "ADD_MEMBER")
      .eq("status", "pending");
    if (error) throw error;
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

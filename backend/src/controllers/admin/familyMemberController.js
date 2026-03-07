import { supabase } from "../../config/supabase.js";

// ===============================
// QUẢN LÝ THÀNH VIÊN GIA PHẢ (FAMILY_MEMBERS)
// ===============================

// Lấy tất cả thành viên gia phả (ngắn gọn cho dropdown)
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

// Lấy thành viên chưa liên kết tài khoản (cho dropdown duyệt đăng ký)
export const getUnlinkedMembers = async (req, res) => {
  try {
    // Lấy tất cả member_id đã liên kết trong profiles
    const { data: linkedProfiles, error: profileError } = await supabase
      .from("profiles")
      .select("member_id")
      .not("member_id", "is", null);

    if (profileError) throw profileError;

    const linkedMemberIds = linkedProfiles.map((p) => p.member_id);

    // Lấy tất cả members kèm thông tin cha mẹ
    let query = supabase
      .from("family_members")
      .select(
        "id, full_name, generation_level, gender, birth_date, father_id, mother_id",
      )
      .order("full_name", { ascending: true });

    // Lọc bỏ những member đã liên kết
    if (linkedMemberIds.length > 0) {
      query = query.not("id", "in", `(${linkedMemberIds.join(",")})`);
    }

    const { data: members, error: membersError } = await query;
    if (membersError) throw membersError;

    // Lấy tên cha mẹ cho từng member
    const parentIds = [
      ...new Set(
        members.flatMap((m) => [m.father_id, m.mother_id]).filter(Boolean),
      ),
    ];

    let parentMap = {};
    if (parentIds.length > 0) {
      const { data: parents } = await supabase
        .from("family_members")
        .select("id, full_name")
        .in("id", parentIds);
      if (parents) {
        parents.forEach((p) => {
          parentMap[p.id] = p.full_name;
        });
      }
    }

    const enrichedMembers = members.map((m) => ({
      ...m,
      father_name: parentMap[m.father_id] || null,
      mother_name: parentMap[m.mother_id] || null,
    }));

    return res.status(200).json({ success: true, data: enrichedMembers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả thành viên kèm thông tin vợ/chồng (qua marriages)
export const getAllMembersWithSpouse = async (req, res) => {
  try {
    // Lấy tất cả members
    const { data: members, error: membersError } = await supabase
      .from("family_members")
      .select("id, full_name, generation_level, gender")
      .order("full_name", { ascending: true });

    if (membersError) throw membersError;

    // Lấy tất cả marriages với thông tin spouse
    const { data: marriages, error: marriagesError } = await supabase.from(
      "marriages",
    ).select(`
        member_id,
        spouse_id,
        marriage_date,
        spouses (
          id,
          full_name,
          gender
        )
      `);

    if (marriagesError) throw marriagesError;

    // Map spouse info vào members (trả về flat data để frontend dễ sử dụng)
    const membersWithSpouse = members.map((member) => {
      const marriage = marriages?.find((m) => m.member_id === member.id);
      return {
        ...member,
        spouse_id: marriage?.spouse_id || null,
        spouse_name: marriage?.spouses?.full_name || null,
        spouse_gender: marriage?.spouses?.gender || null,
        marriage_date: marriage?.marriage_date || null,
      };
    });

    return res.status(200).json({ success: true, data: membersWithSpouse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả thành viên gia phả (family_members) - đầy đủ
export const getAllFamilyMembers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("family_members")
      .select(
        `
        id,
        full_name,
        gender,
        birth_date,
        death_date,
        is_alive,
        father_id,
        mother_id,
        generation_level,
        phone,
        email,
        occupation,
        birth_place,
        hometown,
        address,
        burial_place,
        avatar_url,
        bio,
        is_public,
        created_at
      `,
      )
      .order("generation_level", { ascending: true })
      .order("full_name", { ascending: true });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Thêm thành viên mới vào gia phả
export const createFamilyMember = async (req, res) => {
  try {
    const {
      full_name,
      gender,
      birth_date,
      death_date,
      is_alive,
      father_id,
      mother_id,
      generation_level,
      phone,
      email,
      occupation,
      birth_place,
      hometown,
      address,
      burial_place,
      avatar_url,
      bio,
      is_public,
    } = req.body;

    // Validate required fields
    if (!full_name) {
      return res.status(400).json({ error: "Họ tên là bắt buộc" });
    }

    // Tự động tính generation_level từ cha hoặc mẹ
    let calculatedGenLevel = generation_level || null;

    if (!calculatedGenLevel) {
      // Ưu tiên lấy từ cha
      if (father_id) {
        const { data: father } = await supabase
          .from("family_members")
          .select("generation_level")
          .eq("id", father_id)
          .single();

        if (father?.generation_level) {
          calculatedGenLevel = father.generation_level + 1;
        }
      }

      // Nếu không có cha, lấy từ mẹ
      if (!calculatedGenLevel && mother_id) {
        const { data: mother } = await supabase
          .from("family_members")
          .select("generation_level")
          .eq("id", mother_id)
          .single();

        if (mother?.generation_level) {
          calculatedGenLevel = mother.generation_level + 1;
        }
      }
    }

    const memberData = {
      full_name,
      gender: gender || null,
      birth_date: birth_date || null,
      death_date: death_date || null,
      is_alive: is_alive !== undefined ? is_alive : true,
      father_id: father_id || null,
      mother_id: mother_id || null,
      generation_level: calculatedGenLevel,
      phone: phone || null,
      email: email || null,
      occupation: occupation || null,
      birth_place: birth_place || null,
      hometown: hometown || null,
      address: address || null,
      burial_place: burial_place || null,
      avatar_url: avatar_url || null,
      bio: bio || null,
      is_public: is_public !== undefined ? is_public : true,
    };

    const { data, error } = await supabase
      .from("family_members")
      .insert([memberData])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: "Thêm thành viên thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin thành viên gia phả
export const updateFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const {
      full_name,
      gender,
      birth_date,
      death_date,
      is_alive,
      father_id,
      mother_id,
      generation_level,
      phone,
      email,
      occupation,
      birth_place,
      hometown,
      address,
      burial_place,
      avatar_url,
      bio,
      is_public,
    } = req.body;

    // Check member exists
    const { data: existingMember, error: findError } = await supabase
      .from("family_members")
      .select("id")
      .eq("id", memberId)
      .single();

    if (findError || !existingMember) {
      return res.status(404).json({ error: "Không tìm thấy thành viên" });
    }

    const updateData = {};
    if (full_name !== undefined) updateData.full_name = full_name;
    if (gender !== undefined) updateData.gender = gender;
    if (birth_date !== undefined) updateData.birth_date = birth_date || null;
    if (death_date !== undefined) updateData.death_date = death_date || null;
    if (is_alive !== undefined) updateData.is_alive = is_alive;
    if (father_id !== undefined) updateData.father_id = father_id || null;
    if (mother_id !== undefined) updateData.mother_id = mother_id || null;
    if (generation_level !== undefined)
      updateData.generation_level = generation_level;
    if (phone !== undefined) updateData.phone = phone || null;
    if (email !== undefined) updateData.email = email || null;
    if (occupation !== undefined) updateData.occupation = occupation || null;
    if (birth_place !== undefined) updateData.birth_place = birth_place || null;
    if (hometown !== undefined) updateData.hometown = hometown || null;
    if (address !== undefined) updateData.address = address || null;
    if (burial_place !== undefined)
      updateData.burial_place = burial_place || null;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url || null;
    if (bio !== undefined) updateData.bio = bio || null;
    if (is_public !== undefined) updateData.is_public = is_public;

    const { data, error } = await supabase
      .from("family_members")
      .update(updateData)
      .eq("id", memberId)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành viên thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa thành viên gia phả
export const deleteFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    // Check if member exists
    const { data: existingMember, error: findError } = await supabase
      .from("family_members")
      .select("id, full_name")
      .eq("id", memberId)
      .single();

    if (findError || !existingMember) {
      return res.status(404).json({ error: "Không tìm thấy thành viên" });
    }

    // Check if member has children (is father or mother of someone)
    const { data: children } = await supabase
      .from("family_members")
      .select("id")
      .or(`father_id.eq.${memberId},mother_id.eq.${memberId}`)
      .limit(1);

    if (children && children.length > 0) {
      return res.status(400).json({
        error:
          "Không thể xóa vì thành viên này có con trong gia phả. Hãy xóa hoặc cập nhật con trước.",
      });
    }

    // Check if member is linked to a profile
    const { data: linkedProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("member_id", memberId)
      .maybeSingle();

    if (linkedProfile) {
      // Unlink profile first
      await supabase
        .from("profiles")
        .update({ member_id: null, status: "pending", role_id: 3 })
        .eq("member_id", memberId);
    }

    // Delete marriages related to this member
    await supabase.from("marriages").delete().eq("member_id", memberId);

    // Delete the member
    const { error } = await supabase
      .from("family_members")
      .delete()
      .eq("id", memberId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: `Đã xóa thành viên "${existingMember.full_name}"`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

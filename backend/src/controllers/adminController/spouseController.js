import { supabase } from "../../config/supabase.js";

// ===============================
// QUẢN LÝ VỢ/CHỒNG (SPOUSES)
// ===============================

// Lấy danh sách spouse ngắn gọn (cho dropdown)
export const getAllSpousesShort = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("spouses")
      .select("id, full_name, gender")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả spouse - đầy đủ
export const getAllSpousesFull = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("spouses")
      .select(
        `
        id,
        full_name,
        gender,
        birth_date,
        death_date,
        is_alive,
        phone,
        email,
        occupation,
        birth_place,
        hometown,
        address,
        avatar_url,
        bio,
        created_at
      `
      )
      .order("full_name", { ascending: true });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Thêm vợ/chồng mới
export const createSpouse = async (req, res) => {
  try {
    const {
      full_name,
      gender,
      birth_date,
      death_date,
      is_alive,
      phone,
      email,
      occupation,
      birth_place,
      hometown,
      address,
      avatar_url,
      bio,
      // Thông tin hôn nhân (optional)
      member_id,
      marriage_date,
      wedding_location,
    } = req.body;

    if (!full_name) {
      return res.status(400).json({ error: "Họ tên là bắt buộc" });
    }

    const spouseData = {
      full_name,
      gender: gender || null,
      birth_date: birth_date || null,
      death_date: death_date || null,
      is_alive: is_alive !== undefined ? is_alive : true,
      phone: phone || null,
      email: email || null,
      occupation: occupation || null,
      birth_place: birth_place || null,
      hometown: hometown || null,
      address: address || null,
      avatar_url: avatar_url || null,
      bio: bio || null,
    };

    const { data: newSpouse, error: spouseError } = await supabase
      .from("spouses")
      .insert([spouseData])
      .select()
      .single();

    if (spouseError) throw spouseError;

    // Nếu có member_id, tạo marriage record
    if (member_id) {
      const { error: marriageError } = await supabase.from("marriages").insert([
        {
          member_id: member_id,
          spouse_id: newSpouse.id,
          marriage_date: marriage_date || null,
          wedding_location: wedding_location || null,
          status: "married",
        },
      ]);

      if (marriageError) {
        console.error("Error creating marriage:", marriageError);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Thêm vợ/chồng thành công",
      data: newSpouse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin vợ/chồng
export const updateSpouse = async (req, res) => {
  try {
    const { spouseId } = req.params;
    const {
      full_name,
      gender,
      birth_date,
      death_date,
      is_alive,
      phone,
      email,
      occupation,
      birth_place,
      hometown,
      address,
      avatar_url,
      bio,
    } = req.body;

    // Check spouse exists
    const { data: existingSpouse, error: findError } = await supabase
      .from("spouses")
      .select("id")
      .eq("id", spouseId)
      .single();

    if (findError || !existingSpouse) {
      return res.status(404).json({ error: "Không tìm thấy vợ/chồng" });
    }

    const updateData = {};
    if (full_name !== undefined) updateData.full_name = full_name;
    if (gender !== undefined) updateData.gender = gender;
    if (birth_date !== undefined) updateData.birth_date = birth_date || null;
    if (death_date !== undefined) updateData.death_date = death_date || null;
    if (is_alive !== undefined) updateData.is_alive = is_alive;
    if (phone !== undefined) updateData.phone = phone || null;
    if (email !== undefined) updateData.email = email || null;
    if (occupation !== undefined) updateData.occupation = occupation || null;
    if (birth_place !== undefined) updateData.birth_place = birth_place || null;
    if (hometown !== undefined) updateData.hometown = hometown || null;
    if (address !== undefined) updateData.address = address || null;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url || null;
    if (bio !== undefined) updateData.bio = bio || null;

    const { data, error } = await supabase
      .from("spouses")
      .update(updateData)
      .eq("id", spouseId)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Cập nhật vợ/chồng thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa vợ/chồng
export const deleteSpouse = async (req, res) => {
  try {
    const { spouseId } = req.params;

    // Check if spouse exists
    const { data: existingSpouse, error: findError } = await supabase
      .from("spouses")
      .select("id, full_name")
      .eq("id", spouseId)
      .single();

    if (findError || !existingSpouse) {
      return res.status(404).json({ error: "Không tìm thấy vợ/chồng" });
    }

    // Check if spouse is linked to a profile
    const { data: linkedProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("spouse_id", spouseId)
      .maybeSingle();

    if (linkedProfile) {
      // Unlink profile first
      await supabase
        .from("profiles")
        .update({ spouse_id: null, status: "pending", role_id: 3 })
        .eq("spouse_id", spouseId);
    }

    // Delete marriages related to this spouse
    await supabase.from("marriages").delete().eq("spouse_id", spouseId);

    // Delete the spouse
    const { error } = await supabase
      .from("spouses")
      .delete()
      .eq("id", spouseId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: `Đã xóa vợ/chồng "${existingSpouse.full_name}"`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

import { supabase } from "../../config/supabase.js";

// ===============================
// QUẢN LÝ NGƯỜI DÙNG (PROFILES)
// ===============================

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
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
        created_at,
        updated_at,
        type,
        status,
        role_id,
        member_id,
        spouse_id,
        registration_note
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) throw error;

    return res
      .status(200)
      .json({ success: true, message: "Xóa người dùng thành công" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật role người dùng
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({ error: "Thiếu roleId" });
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role_id: roleId, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) throw error;

    return res
      .status(200)
      .json({ success: true, message: "Cập nhật role thành công" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

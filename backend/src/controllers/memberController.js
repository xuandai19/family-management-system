import { supabase } from "../config/supabase.js";
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy từ verifyToken middleware

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id, username, status,
        roles (role_name),
        family_members (id, full_name, avatar_url, generation_level, bio)
      `
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

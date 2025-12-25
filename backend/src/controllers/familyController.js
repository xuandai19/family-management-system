// src/controllers/familyController.js
import { supabase } from "../config/supabase.js";

/**
 * 1. Lấy toàn bộ cây gia phả từ một ID gốc
 * Sử dụng hàm RPC get_family_tree_recursive đã tạo trong Postgres
 */
export const getFamilyTree = async (req, res) => {
  try {
    const { rootId } = req.params;

    if (!rootId) {
      return res.status(400).json({ error: "Thiếu ID gốc của thành viên!" });
    }

    // Gọi hàm RPC từ database
    const { data, error } = await supabase.rpc("get_family_tree_recursive", {
      root_id: parseInt(rootId),
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi hệ thống khi lấy cây gia phả" });
  }
};
export const getAdmins = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, roles(role_name), status")
      .eq("role_id", 1); // ID 1 là Admin theo seed data của bạn

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 

/**
 * 2. Thêm một thành viên mới vào gia phả
 * Chỉ Admin mới được thực hiện (đã qua Middleware check)
 */
export const addMember = async (req, res) => {
  try {
    const { full_name, gender, parent_id, generation_level, birth_date, bio } =
      req.body;

    // Kiểm tra các trường bắt buộc
    if (!full_name || !gender) {
      return res
        .status(400)
        .json({ error: "Họ tên và giới tính là bắt buộc!" });
    }

    // Chèn dữ liệu vào bảng family_members
    const { data, error } = await supabase
      .from("family_members")
      .insert([
        {
          full_name,
          gender,
          parent_id,
          generation_level,
          birth_date,
          bio,
          is_public: true, // Mặc định cho phép hiển thị
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      success: true,
      message: "Thêm thành viên thành công!",
      data: data[0],
    });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi hệ thống khi thêm thành viên" });
  }
};

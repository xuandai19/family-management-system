// src/controllers/ancestralHouseController.js
import { supabase } from "../config/supabase.js";

// ==========================================
// ANCESTRAL HOUSE (NHÀ THỜ TỔ)
// ==========================================

// Lấy thông tin nhà thờ tổ (chỉ có 1 bản ghi)
export const getAncestralHouse = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ancestral_house")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      throw error;
    }

    res.json({
      success: true,
      data: data || null,
    });
  } catch (error) {
    console.error("Lỗi lấy nhà thờ tổ:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tạo hoặc cập nhật nhà thờ tổ
export const upsertAncestralHouse = async (req, res) => {
  try {
    const { id, name, address, history, established_date, images } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Tên nhà thờ tổ là bắt buộc",
      });
    }

    let result;

    if (id) {
      // Update
      const { data, error } = await supabase
        .from("ancestral_house")
        .update({
          name,
          address,
          history,
          established_date,
          images: images || [],
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert
      const { data, error } = await supabase
        .from("ancestral_house")
        .insert({
          name,
          address,
          history,
          established_date,
          images: images || [],
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    res.json({
      success: true,
      data: result,
      message: id ? "Cập nhật thành công" : "Tạo mới thành công",
    });
  } catch (error) {
    console.error("Lỗi lưu nhà thờ tổ:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ==========================================
// RENOVATION LOGS (LỊCH SỬ TU SỬA)
// ==========================================

// Lấy danh sách lịch sử tu sửa
export const getRenovationLogs = async (req, res) => {
  try {
    const { house_id } = req.query;

    let query = supabase
      .from("renovation_logs")
      .select(
        `
        *,
        creator:created_by(username, email)
      `
      )
      .order("renovation_date", { ascending: false });

    if (house_id) {
      query = query.eq("house_id", house_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Lỗi lấy lịch sử tu sửa:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tạo lịch sử tu sửa mới
export const createRenovationLog = async (req, res) => {
  try {
    const {
      house_id,
      description,
      cost,
      renovation_date,
      completed_date,
      images,
    } = req.body;

    if (!house_id || !description) {
      return res.status(400).json({
        success: false,
        error: "house_id và mô tả là bắt buộc",
      });
    }

    const { data, error } = await supabase
      .from("renovation_logs")
      .insert({
        house_id,
        description,
        cost: cost || 0,
        renovation_date,
        completed_date,
        images: images || [],
        created_by: req.user?.id || null,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: "Thêm lịch sử tu sửa thành công",
    });
  } catch (error) {
    console.error("Lỗi tạo lịch sử tu sửa:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Cập nhật lịch sử tu sửa
export const updateRenovationLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, cost, renovation_date, completed_date, images } =
      req.body;

    const { data, error } = await supabase
      .from("renovation_logs")
      .update({
        description,
        cost,
        renovation_date,
        completed_date,
        images: images || [],
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    console.error("Lỗi cập nhật lịch sử tu sửa:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Xóa lịch sử tu sửa
export const deleteRenovationLog = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("renovation_logs")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Xóa thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa lịch sử tu sửa:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ===============================
// REPORT CONTROLLER
// Quản lý báo cáo người dùng
// ===============================

import { supabase } from "../../config/supabase.js";

// Lấy tất cả báo cáo
export const getAllReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy báo cáo chờ xử lý
export const getPendingReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting pending reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tạo báo cáo mới
export const createReport = async (req, res) => {
  try {
    const { type, content, target_id, target_type } = req.body;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          type,
          content,
          target_id,
          target_type,
          reporter_id: userId,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Giải quyết báo cáo
export const resolveReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution_note } = req.body;

    const { data, error } = await supabase
      .from("reports")
      .update({
        status: "resolved",
        resolution_note,
        resolved_at: new Date().toISOString(),
        resolved_by: req.user.id,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error resolving report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bỏ qua báo cáo
export const dismissReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("reports")
      .update({
        status: "dismissed",
        resolved_at: new Date().toISOString(),
        resolved_by: req.user.id,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error dismissing report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa báo cáo
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("reports").delete().eq("id", id);

    if (error) throw error;
    res.json({ success: true, message: "Xóa báo cáo thành công" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đếm số báo cáo chờ xử lý
export const getReportCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (error) throw error;
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error getting report count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

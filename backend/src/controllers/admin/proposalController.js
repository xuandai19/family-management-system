// ===============================
// ADMIN PROPOSAL CONTROLLER
// Duyệt đề xuất sự kiện & chi phí từ thành viên
// ===============================

import { supabase } from "../../config/supabase.js";

// ========== EVENT PROPOSALS ==========

// Lấy tất cả đề xuất sự kiện
export const getAllEventProposals = async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase
      .from("event_proposals")
      .select("*, profiles:proposed_by(username, email, avatar_url)")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting event proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy đề xuất sự kiện chờ duyệt
export const getPendingEventProposals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("event_proposals")
      .select("*, profiles:proposed_by(username, email, avatar_url)")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting pending event proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Duyệt đề xuất sự kiện
export const approveEventProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { review_notes } = req.body;

    // Cập nhật trạng thái
    const { data: proposal, error: updateError } = await supabase
      .from("event_proposals")
      .update({
        status: "approved",
        reviewed_by: req.user.id,
        review_notes: review_notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Tự động tạo sự kiện từ đề xuất đã duyệt
    if (proposal) {
      const { error: eventError } = await supabase.from("events").insert([
        {
          title: proposal.title,
          description: proposal.description,
          event_date: proposal.proposed_date,
          location: proposal.location,
          created_by: req.user.id,
        },
      ]);

      if (eventError) {
        console.error("Error creating event from proposal:", eventError);
      }
    }

    res.json({
      success: true,
      message: "Đã duyệt đề xuất sự kiện",
      data: proposal,
    });
  } catch (error) {
    console.error("Error approving event proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Từ chối đề xuất sự kiện
export const rejectEventProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { review_notes } = req.body;

    const { data, error } = await supabase
      .from("event_proposals")
      .update({
        status: "rejected",
        reviewed_by: req.user.id,
        review_notes: review_notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: "Đã từ chối đề xuất sự kiện", data });
  } catch (error) {
    console.error("Error rejecting event proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa đề xuất sự kiện
export const deleteEventProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("event_proposals")
      .delete()
      .eq("id", id);
    if (error) throw error;
    res.json({ success: true, message: "Đã xóa đề xuất sự kiện" });
  } catch (error) {
    console.error("Error deleting event proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== EXPENSE PROPOSALS ==========

// Lấy tất cả đề xuất chi phí
export const getAllExpenseProposals = async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase
      .from("expense_proposals")
      .select("*, profiles:proposed_by(username, email, avatar_url)")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting expense proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy đề xuất chi phí chờ duyệt
export const getPendingExpenseProposals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("expense_proposals")
      .select("*, profiles:proposed_by(username, email, avatar_url)")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting pending expense proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Duyệt đề xuất chi phí
export const approveExpenseProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { review_notes } = req.body;

    const { data, error } = await supabase
      .from("expense_proposals")
      .update({
        status: "approved",
        reviewed_by: req.user.id,
        review_notes: review_notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: "Đã duyệt đề xuất chi phí", data });
  } catch (error) {
    console.error("Error approving expense proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Từ chối đề xuất chi phí
export const rejectExpenseProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { review_notes } = req.body;

    const { data, error } = await supabase
      .from("expense_proposals")
      .update({
        status: "rejected",
        reviewed_by: req.user.id,
        review_notes: review_notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: "Đã từ chối đề xuất chi phí", data });
  } catch (error) {
    console.error("Error rejecting expense proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa đề xuất chi phí
export const deleteExpenseProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("expense_proposals")
      .delete()
      .eq("id", id);
    if (error) throw error;
    res.json({ success: true, message: "Đã xóa đề xuất chi phí" });
  } catch (error) {
    console.error("Error deleting expense proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== THỐNG KÊ ==========

// Đếm tổng số đề xuất chờ duyệt
export const getPendingProposalCount = async (req, res) => {
  try {
    const [eventRes, expenseRes] = await Promise.all([
      supabase
        .from("event_proposals")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("expense_proposals")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
    ]);

    const eventCount = eventRes.count || 0;
    const expenseCount = expenseRes.count || 0;

    res.json({
      success: true,
      count: eventCount + expenseCount,
      eventCount,
      expenseCount,
    });
  } catch (error) {
    console.error("Error getting proposal count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

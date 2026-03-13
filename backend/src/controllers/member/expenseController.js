// ===============================
// MEMBER EXPENSE PROPOSAL CONTROLLER
// Đề xuất khoản chi cho member
// ===============================

import { supabase } from "../../config/supabase.js";

// Đề xuất khoản chi mới
export const proposeExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      amount,
      category,
      description,
      purpose,
      urgency,
      attachments,
    } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
    }

    // Parse amount from number or formatted string
    const parsedAmount =
      typeof amount === "number"
        ? amount
        : Number(String(amount || "").replace(/,/g, ""));

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Số tiền không hợp lệ",
      });
    }

    const { data, error } = await supabase
      .from("expense_proposals")
      .insert([
        {
          title,
          amount: parsedAmount,
          category: category || "other",
          description,
          purpose: purpose || null,
          urgency: urgency || "normal",
          attachments: Array.isArray(attachments) ? attachments : [],
          proposed_by: userId,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Đề xuất khoản chi đã được gửi và chờ Admin phê duyệt",
      data,
    });
  } catch (error) {
    console.error("Error proposing expense:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy danh sách đề xuất khoản chi của member
export const getMyExpenseProposals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = supabase
      .from("expense_proposals")
      .select("*")
      .eq("proposed_by", userId)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting my expense proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết đề xuất khoản chi
export const getExpenseProposalById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("expense_proposals")
      .select("*")
      .eq("id", id)
      .eq("proposed_by", userId) // Chỉ xem được đề xuất của mình
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đề xuất",
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting expense proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hủy đề xuất khoản chi (chỉ khi còn pending)
export const cancelExpenseProposal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Kiểm tra đề xuất có tồn tại và thuộc về user không
    const { data: existing, error: checkError } = await supabase
      .from("expense_proposals")
      .select("*")
      .eq("id", id)
      .eq("proposed_by", userId)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đề xuất",
      });
    }

    if (existing.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Chỉ có thể hủy đề xuất đang chờ duyệt",
      });
    }

    const { error } = await supabase
      .from("expense_proposals")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Đã hủy đề xuất khoản chi",
    });
  } catch (error) {
    console.error("Error canceling expense proposal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

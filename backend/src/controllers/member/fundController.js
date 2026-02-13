// ===============================
// MEMBER FUND CONTROLLER
// Xem thông tin quỹ cho member
// ===============================

import { supabase } from "../../config/supabase.js";

// Lấy báo cáo thu chi quỹ (public cho member)
export const getFundReport = async (req, res) => {
  try {
    const { year, month, fund_id } = req.query;

    // Lấy danh sách quỹ
    const { data: funds, error: fundsError } = await supabase
      .from("funds")
      .select("*")
      .order("fund_name");

    if (fundsError) throw fundsError;

    // Lấy giao dịch
    let transQuery = supabase
      .from("transactions")
      .select(
        `
        *,
        fund:funds (id, fund_name)
      `,
      )
      .order("transaction_date", { ascending: false });

    if (fund_id) {
      transQuery = transQuery.eq("fund_id", fund_id);
    }

    if (year) {
      transQuery = transQuery
        .gte("transaction_date", `${year}-01-01`)
        .lte("transaction_date", `${year}-12-31`);
    }

    if (month && year) {
      const startDate = `${year}-${month.padStart(2, "0")}-01`;
      const endDate = new Date(year, month, 0).toISOString().split("T")[0];
      transQuery = transQuery
        .gte("transaction_date", startDate)
        .lte("transaction_date", endDate);
    }

    const { data: transactions, error: transError } = await transQuery;

    if (transError) throw transError;

    // Tính tổng thu chi
    const totalIncome = (transactions || [])
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    const totalExpense = (transactions || [])
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    res.json({
      success: true,
      data: {
        funds: funds || [],
        transactions: transactions || [],
        summary: {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        },
      },
    });
  } catch (error) {
    console.error("Error getting fund report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy thông báo đóng quỹ (collection rounds)
export const getCollectionNotifications = async (req, res) => {
  try {
    const { status } = req.query; // active, closed, all

    let query = supabase
      .from("collection_rounds")
      .select("*")
      .order("created_at", { ascending: false });

    if (status === "active") {
      query = query.eq("status", "active");
    } else if (status === "closed") {
      query = query.eq("status", "closed");
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting collection notifications:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy lịch sử đóng quỹ của member
export const getMyPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Lấy member_id từ profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("member_id")
      .eq("id", userId)
      .single();

    const memberId = profile?.member_id;

    if (!memberId) {
      return res.json({ success: true, data: [] });
    }

    // Lấy các giao dịch income mà member đã đóng góp
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        *,
        fund:funds (id, fund_name)
      `,
      )
      .eq("contributor_id", memberId)
      .eq("type", "income")
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("Error getting payment history:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết đợt thu
export const getCollectionRoundDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Lấy thông tin đợt thu
    const { data: round, error: roundError } = await supabase
      .from("collection_rounds")
      .select("*")
      .eq("id", id)
      .single();

    if (roundError) throw roundError;

    // Lấy member_id của user
    const { data: profile } = await supabase
      .from("profiles")
      .select("member_id")
      .eq("id", userId)
      .single();

    const memberId = profile?.member_id;

    // Kiểm tra user đã đóng chưa (trong transactions với round_id nếu có)
    let myPayment = null;
    if (memberId) {
      const { data: payment } = await supabase
        .from("transactions")
        .select("*")
        .eq("contributor_id", memberId)
        .eq("type", "income")
        .ilike("description", `%${round?.title || ""}%`)
        .maybeSingle();
      myPayment = payment;
    }

    // Thống kê từ transactions liên quan đến đợt thu này
    const { data: totalData } = await supabase
      .from("transactions")
      .select("amount")
      .eq("type", "income")
      .ilike("description", `%${round?.title || ""}%`);

    const totalCollected = (totalData || []).reduce(
      (sum, c) => sum + (parseFloat(c.amount) || 0),
      0,
    );

    res.json({
      success: true,
      data: {
        round,
        myPayment,
        stats: {
          total_collected: totalCollected,
          paid_count: totalData?.length || 0,
        },
      },
    });
  } catch (error) {
    console.error("Error getting collection round detail:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

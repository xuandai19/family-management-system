// ===============================
// MEMBER DASHBOARD CONTROLLER
// API cho dashboard của member
// ===============================

import { supabase } from "../../config/supabase.js";

// Lấy thống kê dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    // Lấy profile để biết member_id
    let memberId = null;
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("member_id")
        .eq("id", userId)
        .single();
      memberId = profile?.member_id;
    }

    // 1. Đếm số thành viên trong dòng họ
    const { count: familyMembers } = await supabase
      .from("family_members")
      .select("*", { count: "exact", head: true });

    // 2. Đếm số thông báo đóng quỹ đang active
    const { count: pendingNotifications } = await supabase
      .from("collection_rounds")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // 3. Tính tổng đã đóng góp của member từ bảng transactions
    let totalContributed = 0;
    if (memberId) {
      const { data: contributions } = await supabase
        .from("transactions")
        .select("amount")
        .eq("contributor_id", memberId)
        .eq("type", "income");

      if (contributions) {
        totalContributed = contributions.reduce(
          (sum, c) => sum + (parseFloat(c.amount) || 0),
          0,
        );
      }
    }

    res.json({
      success: true,
      data: {
        familyMembers: familyMembers || 0,
        pendingNotifications: pendingNotifications || 0,
        totalContributed: totalContributed || 0,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy sự kiện sắp tới
export const getUpcomingEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const today = new Date().toISOString().split("T")[0];

    const { data: events, error } = await supabase
      .from("events")
      .select("id, title, event_date, event_type, location, description")
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(limit);

    if (error) throw error;

    res.json({
      success: true,
      data: events || [],
    });
  } catch (error) {
    console.error("Error getting upcoming events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import { supabaseAdmin } from "../config/supabase.js";

// Lấy thống kê tổng quan cho dashboard
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Tổng số thành viên gia phả
    const { count: totalMembers } = await supabaseAdmin
      .from("family_members")
      .select("*", { count: "exact", head: true });

    // 2. Số yêu cầu chờ duyệt
    const { count: pendingCount } = await supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    // 3. Số đời trong gia phả (max generation)
    const { data: generations } = await supabaseAdmin
      .from("family_members")
      .select("generation")
      .order("generation", { ascending: false })
      .limit(1);
    const maxGeneration = generations?.[0]?.generation || 0;

    // 4. Số sự kiện sắp tới (trong 30 ngày)
    const today = new Date().toISOString().split("T")[0];
    const next30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const { count: upcomingEventsCount } = await supabaseAdmin
      .from("events")
      .select("*", { count: "exact", head: true })
      .gte("event_date", today)
      .lte("event_date", next30Days);

    // 5. Thống kê quỹ
    const { data: funds } = await supabaseAdmin
      .from("funds")
      .select("current_balance");
    const totalFund =
      funds?.reduce((sum, f) => sum + (f.current_balance || 0), 0) || 0;

    // 6. Tổng thu/chi tháng này
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).toISOString();
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).toISOString();

    const { data: monthTransactions } = await supabaseAdmin
      .from("transactions")
      .select("type, amount")
      .gte("transaction_date", startOfMonth)
      .lte("transaction_date", endOfMonth);

    const monthIncome =
      monthTransactions
        ?.filter((t) => t.type === "income")
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
    const monthExpense =
      monthTransactions
        ?.filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

    res.json({
      success: true,
      data: {
        totalMembers: totalMembers || 0,
        pendingCount: pendingCount || 0,
        maxGeneration: maxGeneration || 0,
        upcomingEventsCount: upcomingEventsCount || 0,
        totalFund,
        monthIncome,
        monthExpense,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy danh sách yêu cầu chờ duyệt gần đây
export const getRecentPendingRequests = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, username, avatar_url, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    // Map username to full_name for frontend compatibility
    const mappedData =
      data?.map((p) => ({
        ...p,
        full_name: p.username,
      })) || [];

    res.json({ success: true, data: mappedData });
  } catch (error) {
    console.error("Recent pending error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy sự kiện sắp tới
export const getUpcomingEventsForDashboard = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("id, title, event_date, event_type, location")
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(5);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error("Upcoming events error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy hoạt động gần đây (dựa trên notifications hoặc logs)
export const getRecentActivities = async (req, res) => {
  try {
    // Lấy thông báo gần đây làm hoạt động
    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select(
        `
        id,
        title,
        message,
        type,
        created_at,
        user:profiles!notifications_user_id_fkey(username)
      `
      )
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    // Format thành activities
    const activities =
      data?.map((n) => ({
        id: n.id,
        action: n.title,
        description: n.message,
        type: n.type,
        user: n.user?.username || "Hệ thống",
        time: n.created_at,
      })) || [];

    res.json({ success: true, data: activities });
  } catch (error) {
    console.error("Recent activities error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

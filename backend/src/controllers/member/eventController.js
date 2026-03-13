// ===============================
// MEMBER EVENT CONTROLLER
// Xem và đề xuất sự kiện cho member
// ===============================

import { supabaseAdmin } from "../../config/supabase.js";

// Lấy danh sách sự kiện (public cho member)
export const getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { event_type, status, year, month } = req.query;

    let query = supabaseAdmin
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    // Filter by event type
    if (event_type) {
      query = query.eq("event_type", event_type);
    }

    // Filter by status (upcoming, past)
    if (status === "upcoming") {
      query = query.gte("event_date", new Date().toISOString().split("T")[0]);
    } else if (status === "past") {
      query = query.lt("event_date", new Date().toISOString().split("T")[0]);
    }

    // Filter by year
    if (year) {
      query = query
        .gte("event_date", `${year}-01-01`)
        .lte("event_date", `${year}-12-31`);
    }

    // Filter by month
    if (month && year) {
      const startDate = `${year}-${month.padStart(2, "0")}-01`;
      const endDate = new Date(year, month, 0).toISOString().split("T")[0];
      query = query.gte("event_date", startDate).lte("event_date", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const events = data || [];
    if (events.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const eventIds = events.map((e) => e.id);

    const [{ data: registrations }, { data: myRegistrations }] = await Promise.all([
      supabaseAdmin
        .from("event_registrations")
        .select("event_id")
        .in("event_id", eventIds),
      supabaseAdmin
        .from("event_registrations")
        .select("event_id")
        .in("event_id", eventIds)
        .eq("user_id", userId),
    ]);

    const participantCountByEvent = (registrations || []).reduce((acc, row) => {
      acc[row.event_id] = (acc[row.event_id] || 0) + 1;
      return acc;
    }, {});

    const myRegisteredSet = new Set((myRegistrations || []).map((r) => r.event_id));

    const enrichedEvents = events.map((event) => ({
      ...event,
      current_participants: participantCountByEvent[event.id] || 0,
      is_registered: myRegisteredSet.has(event.id),
    }));

    res.json({ success: true, data: enrichedEvents });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy sự kiện sắp diễn ra
export const getUpcomingEvents = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("*")
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(parseInt(limit));

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting upcoming events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy chi tiết sự kiện
export const getEventById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const [{ count }, { data: myReg }] = await Promise.all([
      supabaseAdmin
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id),
      supabaseAdmin
        .from("event_registrations")
        .select("id")
        .eq("event_id", id)
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

    res.json({
      success: true,
      data: {
        ...data,
        current_participants: count || 0,
        is_registered: !!myReg,
      },
    });
  } catch (error) {
    console.error("Error getting event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đề xuất sự kiện mới (member)
export const proposeEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      event_date,
      event_time,
      location,
      event_type,
      max_participants,
      notes,
    } = req.body;

    // Validate required fields
    if (!title || !event_date || !location) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
    }

    // Insert vào bảng event_proposals (chờ admin duyệt)
    const { data, error } = await supabaseAdmin
      .from("event_proposals")
      .insert([
        {
          title,
          description,
          event_date,
          event_time,
          location,
          event_type: event_type || "other",
          max_participants: max_participants || null,
          notes,
          proposed_by: userId,
          status: "pending", // pending, approved, rejected
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Đề xuất sự kiện đã được gửi và chờ Admin phê duyệt",
      data,
    });
  } catch (error) {
    console.error("Error proposing event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy danh sách đề xuất sự kiện của member
export const getMyEventProposals = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("event_proposals")
      .select("*")
      .eq("proposed_by", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getting my event proposals:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đăng ký tham gia sự kiện
export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Kiểm tra sự kiện có tồn tại không
    const { data: event, error: eventError } = await supabaseAdmin
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (eventError || !event) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sự kiện",
      });
    }

    // Kiểm tra đã đăng ký chưa
    const { data: existing } = await supabaseAdmin
      .from("event_registrations")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bạn đã đăng ký tham gia sự kiện này rồi",
      });
    }

    // Kiểm tra số lượng tham gia
    if (event.max_participants) {
      const { count } = await supabaseAdmin
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", eventId);

      if (count >= event.max_participants) {
        return res.status(400).json({
          success: false,
          message: "Sự kiện đã đủ số lượng tham gia",
        });
      }
    }

    // Đăng ký
    const { data, error } = await supabaseAdmin
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          user_id: userId,
          registered_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    const { count } = await supabaseAdmin
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", eventId);

    res.status(201).json({
      success: true,
      message: "Đăng ký tham gia sự kiện thành công",
      data: {
        ...data,
        is_registered: true,
        current_participants: count || 0,
      },
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hủy đăng ký tham gia sự kiện
export const cancelEventRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const { error } = await supabaseAdmin
      .from("event_registrations")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", userId);

    if (error) throw error;

    const { count } = await supabaseAdmin
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", eventId);

    res.json({
      success: true,
      message: "Đã hủy đăng ký tham gia sự kiện",
      data: {
        is_registered: false,
        current_participants: count || 0,
      },
    });
  } catch (error) {
    console.error("Error canceling registration:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

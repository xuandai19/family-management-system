import { supabase } from "../config/supabase.js";

// ==================== CONTROLLERS ====================

// Lấy danh sách sự kiện (Member+ xem được)
const getEvents = async (req, res) => {
  try {
    const { event_type, year, month } = req.query;

    let query = supabase
      .from("events")
      .select(`
        *,
        related_member:family_members(id, full_name),
        creator:profiles(id, username)
      `)
      .order("event_date", { ascending: false });

    // Filter by event_type
    if (event_type) {
      query = query.eq("event_type", event_type);
    }

    // Filter by year
    if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      query = query.gte("event_date", startDate).lte("event_date", endDate);
    }

    // Filter by month (requires year)
    if (month && year) {
      const paddedMonth = month.toString().padStart(2, "0");
      const startDate = `${year}-${paddedMonth}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const endDate = `${year}-${paddedMonth}-${lastDay}`;
      query = query.gte("event_date", startDate).lte("event_date", endDate);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Lỗi khi lấy danh sách sự kiện" });
    }

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy sự kiện" });
  }
};

// Lấy chi tiết 1 sự kiện
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: event, error } = await supabase
      .from("events")
      .select(`
        *,
        related_member:family_members(id, full_name),
        creator:profiles(id, username)
      `)
      .eq("id", id)
      .single();

    if (error || !event) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết sự kiện" });
  }
};

// Lấy sự kiện sắp tới
const getUpcomingEvents = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const now = new Date().toISOString();

    const { data: events, error } = await supabase
      .from("events")
      .select(`
        *,
        related_member:family_members(id, full_name)
      `)
      .gte("event_date", now)
      .order("event_date", { ascending: true })
      .limit(parseInt(limit));

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Lỗi khi lấy sự kiện sắp tới" });
    }

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tạo sự kiện mới (Admin only)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      event_type,
      event_date,
      end_date,
      location,
      related_member_id,
      is_recurring,
      reminder_days,
    } = req.body;

    if (!title || !event_date) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tiêu đề và ngày sự kiện" });
    }

    const { data: event, error } = await supabase
      .from("events")
      .insert({
        title,
        description: description || null,
        event_type: event_type || "other",
        event_date,
        end_date: end_date || null,
        location: location || null,
        related_member_id: related_member_id || null,
        is_recurring: is_recurring || false,
        reminder_days: reminder_days || 7,
        created_by: req.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Lỗi khi tạo sự kiện" });
    }

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tạo sự kiện" });
  }
};

// Cập nhật sự kiện (Admin only)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      event_type,
      event_date,
      end_date,
      location,
      related_member_id,
      is_recurring,
      reminder_days,
    } = req.body;

    // Kiểm tra sự kiện tồn tại
    const { data: existing, error: checkError } = await supabase
      .from("events")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }

    // Cập nhật
    const { data: event, error } = await supabase
      .from("events")
      .update({
        title,
        description,
        event_type,
        event_date,
        end_date,
        location,
        related_member_id,
        is_recurring,
        reminder_days,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Lỗi khi cập nhật sự kiện" });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi cập nhật sự kiện" });
  }
};

// Xóa sự kiện (Admin only)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra sự kiện tồn tại
    const { data: existing, error: checkError } = await supabase
      .from("events")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Lỗi khi xóa sự kiện" });
    }

    res.json({ message: "Xóa sự kiện thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi xóa sự kiện" });
  }
};

// Export tất cả (ESM)
export { getEvents, getEventById, getUpcomingEvents, createEvent, updateEvent, deleteEvent };
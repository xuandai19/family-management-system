// src/api/eventApi.js
import api from "../axios";

// Event types mapping
export const EVENT_TYPES = {
  wedding: { label: "Đám cưới", color: "pink", icon: "💒" },
  funeral: { label: "Tang lễ", color: "gray", icon: "🕯️" },
  anniversary: { label: "Giỗ/Kỵ", color: "purple", icon: "🙏" },
  reunion: { label: "Họp mặt", color: "blue", icon: "👨‍👩‍👧‍👦" },
  worship: { label: "Cúng lễ", color: "amber", icon: "🏮" },
  birthday: { label: "Sinh nhật", color: "green", icon: "🎂" },
  other: { label: "Khác", color: "slate", icon: "📅" },
};

// Get all events with optional filters
export const getEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.event_type) params.append("event_type", filters.event_type);
    if (filters.year) params.append("year", filters.year);
    if (filters.month) params.append("month", filters.month);

    const queryString = params.toString();
    const url = queryString ? `/events?${queryString}` : "/events";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

// Get single event by ID
export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sự kiện:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

// Get upcoming events
export const getUpcomingEvents = async (limit = 5) => {
  try {
    const response = await api.get(`/events/upcoming?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện sắp tới:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

// Create new event
export const createEvent = async (data) => {
  try {
    const response = await api.post("/events", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sự kiện:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

// Update event
export const updateEvent = async (id, data) => {
  try {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sự kiện:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

// Delete event
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa sự kiện:", error);
    throw error.response?.data?.message || "Lỗi server";
  }
};

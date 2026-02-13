// ================================
// MEMBER EVENT API SERVICE
// ================================

import api from "../axios";

// Lấy danh sách sự kiện (member)
export const getMemberEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.event_type) params.append("event_type", filters.event_type);
    if (filters.status) params.append("status", filters.status);
    if (filters.year) params.append("year", filters.year);
    if (filters.month) params.append("month", filters.month);

    const queryString = params.toString();
    const url = queryString
      ? `/member/events?${queryString}`
      : "/member/events";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện:", error);
    throw error;
  }
};

// Lấy sự kiện sắp tới
export const getUpcomingEvents = async (limit = 5) => {
  try {
    const response = await api.get(
      `/member/dashboard/upcoming-events?limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện sắp tới:", error);
    throw error;
  }
};

// Lấy chi tiết sự kiện
export const getMemberEventById = async (id) => {
  try {
    const response = await api.get(`/member/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sự kiện:", error);
    throw error;
  }
};

// Đề xuất sự kiện mới
export const proposeEvent = async (eventData) => {
  try {
    const response = await api.post("/member/events/propose", eventData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đề xuất sự kiện:", error);
    throw error;
  }
};

// Lấy đề xuất sự kiện của tôi
export const getMyEventProposals = async () => {
  try {
    const response = await api.get("/member/events/my-proposals");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đề xuất sự kiện:", error);
    throw error;
  }
};

// Đăng ký tham gia sự kiện
export const registerForEvent = async (eventId) => {
  try {
    const response = await api.post(`/member/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký sự kiện:", error);
    throw error;
  }
};

// Hủy đăng ký tham gia
export const cancelEventRegistration = async (eventId) => {
  try {
    const response = await api.delete(`/member/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy đăng ký:", error);
    throw error;
  }
};

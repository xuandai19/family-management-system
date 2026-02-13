import api from "./axios";

// Lấy thống kê tổng quan dashboard
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

// Lấy yêu cầu chờ duyệt gần đây
export const getRecentPending = async () => {
  const response = await api.get("/dashboard/pending");
  return response.data;
};

// Lấy sự kiện sắp tới
export const getUpcomingEvents = async () => {
  const response = await api.get("/dashboard/events");
  return response.data;
};

// Lấy hoạt động gần đây
export const getRecentActivities = async () => {
  const response = await api.get("/dashboard/activities");
  return response.data;
};

import api from "../axios";

// Lấy tất cả thông báo (admin)
export const getAllNotifications = async (params = {}) => {
  const response = await api.get("/notifications", { params });
  return response.data;
};

// Lấy thông báo chưa đọc
export const getUnreadNotifications = async () => {
  const response = await api.get("/notifications/unread");
  return response.data;
};

// Đếm số thông báo chưa đọc
export const getUnreadCount = async () => {
  const response = await api.get("/notifications/count");
  return response.data;
};

// Tạo thông báo mới (user)
export const createNotification = async (data) => {
  const response = await api.post("/notifications", data);
  return response.data;
};

// Đánh dấu đã đọc
export const markAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

// Đánh dấu tất cả đã đọc
export const markAllAsRead = async () => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

// Xóa thông báo
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

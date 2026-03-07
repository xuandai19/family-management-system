import api from "../axios";

// Lấy tất cả báo cáo (admin)
export const getAllReports = async (params = {}) => {
  const response = await api.get("/admin/reports", { params });
  return response.data;
};

// Lấy báo cáo chờ xử lý
export const getPendingReports = async () => {
  const response = await api.get("/admin/reports/pending");
  return response.data;
};

// Đếm số báo cáo chờ xử lý
export const getReportCount = async () => {
  const response = await api.get("/admin/reports/count");
  return response.data;
};

// Giải quyết báo cáo
export const resolveReport = async (id, data) => {
  const response = await api.patch(`/admin/reports/${id}/resolve`, data);
  return response.data;
};

// Bỏ qua báo cáo
export const dismissReport = async (id) => {
  const response = await api.patch(`/admin/reports/${id}/dismiss`);
  return response.data;
};

// Xóa báo cáo
export const deleteReport = async (id) => {
  const response = await api.delete(`/admin/reports/${id}`);
  return response.data;
};

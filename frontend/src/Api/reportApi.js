import axios from "./axios";

// Lấy tất cả báo cáo (admin)
export const getAllReports = async (params = {}) => {
  const response = await axios.get("/reports", { params });
  return response.data;
};

// Lấy báo cáo chờ xử lý
export const getPendingReports = async () => {
  const response = await axios.get("/reports/pending");
  return response.data;
};

// Đếm số báo cáo chờ xử lý
export const getReportCount = async () => {
  const response = await axios.get("/reports/count");
  return response.data;
};

// Tạo báo cáo mới (user)
export const createReport = async (reportData) => {
  const response = await axios.post("/reports", reportData);
  return response.data;
};

// Xử lý báo cáo
export const resolveReport = async (id, admin_note) => {
  const response = await axios.patch(`/reports/${id}/resolve`, { admin_note });
  return response.data;
};

// Bỏ qua báo cáo
export const dismissReport = async (id, admin_note) => {
  const response = await axios.patch(`/reports/${id}/dismiss`, { admin_note });
  return response.data;
};

// Xóa báo cáo
export const deleteReport = async (id) => {
  const response = await axios.delete(`/reports/${id}`);
  return response.data;
};

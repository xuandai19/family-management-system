// src/Api/ancestralHouseApi.js
import api from "./axios";

// ==========================================
// ANCESTRAL HOUSE API
// ==========================================

// Lấy thông tin nhà thờ tổ
export const getAncestralHouse = async () => {
  const response = await api.get("/ancestral-house");
  return response.data;
};

// Tạo hoặc cập nhật nhà thờ tổ
export const upsertAncestralHouse = async (data) => {
  const response = await api.post("/ancestral-house", data);
  return response.data;
};

// ==========================================
// RENOVATION LOGS API
// ==========================================

// Lấy danh sách lịch sử tu sửa
export const getRenovationLogs = async (houseId) => {
  const params = houseId ? { house_id: houseId } : {};
  const response = await api.get("/ancestral-house/renovations", { params });
  return response.data;
};

// Tạo lịch sử tu sửa mới
export const createRenovationLog = async (data) => {
  const response = await api.post("/ancestral-house/renovations", data);
  return response.data;
};

// Cập nhật lịch sử tu sửa
export const updateRenovationLog = async (id, data) => {
  const response = await api.put(`/ancestral-house/renovations/${id}`, data);
  return response.data;
};

// Xóa lịch sử tu sửa
export const deleteRenovationLog = async (id) => {
  const response = await api.delete(`/ancestral-house/renovations/${id}`);
  return response.data;
};

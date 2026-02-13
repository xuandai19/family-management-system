import api from "./axios";

// ===============================
// QUẢN LÝ ĐỢT THU TIỀN
// ===============================

// Lấy tất cả đợt thu
export const getAllCollectionRounds = async () => {
  const response = await api.get("/collections/rounds");
  return response.data;
};

// Lấy đợt thu đang active
export const getActiveCollectionRounds = async () => {
  const response = await api.get("/collections/rounds/active");
  return response.data;
};

// Tạo đợt thu mới
export const createCollectionRound = async (data) => {
  const response = await api.post("/collections/rounds", data);
  return response.data;
};

// Cập nhật đợt thu
export const updateCollectionRound = async (id, data) => {
  const response = await api.put(`/collections/rounds/${id}`, data);
  return response.data;
};

// Xóa đợt thu
export const deleteCollectionRound = async (id) => {
  const response = await api.delete(`/collections/rounds/${id}`);
  return response.data;
};

// Thống kê đợt thu
export const getCollectionStats = async (roundId) => {
  const response = await api.get(`/collections/rounds/${roundId}/stats`);
  return response.data;
};

// ===============================
// QUẢN LÝ XÁC NHẬN ĐÃ THU
// ===============================

// Lấy danh sách đã đóng của 1 đợt
export const getPaymentsByRound = async (roundId) => {
  const response = await api.get(`/collections/payments/${roundId}`);
  return response.data;
};

// Admin xác nhận đã thu tiền
export const confirmPayment = async (data) => {
  const response = await api.post("/collections/payments", data);
  return response.data;
};

// Xóa payment
export const deletePayment = async (id) => {
  const response = await api.delete(`/collections/payments/${id}`);
  return response.data;
};

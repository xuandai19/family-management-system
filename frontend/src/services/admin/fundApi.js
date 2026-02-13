import api from "../axios";

// ===============================
// QUẢN LÝ QUỸ
// ===============================

// Lấy tất cả quỹ
export const getAllFunds = async () => {
  const response = await api.get("/funds");
  return response.data;
};

// Tạo quỹ mới
export const createFund = async (fundData) => {
  const response = await api.post("/funds", fundData);
  return response.data;
};

// Cập nhật quỹ
export const updateFund = async (fundId, fundData) => {
  const response = await api.put(`/funds/${fundId}`, fundData);
  return response.data;
};

// Xóa quỹ
export const deleteFund = async (fundId) => {
  const response = await api.delete(`/funds/${fundId}`);
  return response.data;
};

// ===============================
// QUẢN LÝ GIAO DỊCH
// ===============================

// Tạo giao dịch (thu/chi)
export const createTransaction = async (transactionData) => {
  const response = await api.post("/funds/transaction", transactionData);
  return response.data;
};

// Lấy lịch sử giao dịch của một quỹ
export const getTransactionHistory = async (fundId) => {
  const response = await api.get(`/funds/history/${fundId}`);
  return response.data;
};

// Xóa giao dịch
export const deleteTransaction = async (transactionId) => {
  const response = await api.delete(`/funds/transaction/${transactionId}`);
  return response.data;
};

// Lấy tất cả giao dịch
export const getAllTransactions = async () => {
  const response = await api.get("/funds/transactions");
  return response.data;
};

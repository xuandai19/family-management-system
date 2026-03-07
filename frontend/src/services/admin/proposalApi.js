import api from "../axios";

// ========== EVENT PROPOSALS ==========

// Lấy tất cả đề xuất sự kiện
export const getAllEventProposals = async (params = {}) => {
  const response = await api.get("/admin/proposals/events", { params });
  return response.data;
};

// Lấy đề xuất sự kiện chờ duyệt
export const getPendingEventProposals = async () => {
  const response = await api.get("/admin/proposals/events/pending");
  return response.data;
};

// Duyệt đề xuất sự kiện
export const approveEventProposal = async (id, data = {}) => {
  const response = await api.patch(
    `/admin/proposals/events/${id}/approve`,
    data,
  );
  return response.data;
};

// Từ chối đề xuất sự kiện
export const rejectEventProposal = async (id, data = {}) => {
  const response = await api.patch(
    `/admin/proposals/events/${id}/reject`,
    data,
  );
  return response.data;
};

// Xóa đề xuất sự kiện
export const deleteEventProposal = async (id) => {
  const response = await api.delete(`/admin/proposals/events/${id}`);
  return response.data;
};

// ========== EXPENSE PROPOSALS ==========

// Lấy tất cả đề xuất chi phí
export const getAllExpenseProposals = async (params = {}) => {
  const response = await api.get("/admin/proposals/expenses", { params });
  return response.data;
};

// Lấy đề xuất chi phí chờ duyệt
export const getPendingExpenseProposals = async () => {
  const response = await api.get("/admin/proposals/expenses/pending");
  return response.data;
};

// Duyệt đề xuất chi phí
export const approveExpenseProposal = async (id, data = {}) => {
  const response = await api.patch(
    `/admin/proposals/expenses/${id}/approve`,
    data,
  );
  return response.data;
};

// Từ chối đề xuất chi phí
export const rejectExpenseProposal = async (id, data = {}) => {
  const response = await api.patch(
    `/admin/proposals/expenses/${id}/reject`,
    data,
  );
  return response.data;
};

// Xóa đề xuất chi phí
export const deleteExpenseProposal = async (id) => {
  const response = await api.delete(`/admin/proposals/expenses/${id}`);
  return response.data;
};

// ========== THỐNG KÊ ==========

// Đếm số đề xuất chờ duyệt
export const getPendingProposalCount = async () => {
  const response = await api.get("/admin/proposals/count");
  return response.data;
};

// ================================
// MEMBER EXPENSE API SERVICE
// ================================

import api from "../axios";

// Đề xuất chi phí
export const proposeExpense = async (expenseData) => {
  try {
    const response = await api.post("/member/expenses/propose", expenseData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đề xuất chi phí:", error);
    throw error;
  }
};

// Lấy đề xuất chi phí của tôi
export const getMyExpenseProposals = async () => {
  try {
    const response = await api.get("/member/expenses/my-proposals");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đề xuất chi phí:", error);
    throw error;
  }
};

// Hủy đề xuất chi phí
export const cancelExpenseProposal = async (id) => {
  try {
    const response = await api.delete(`/member/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy đề xuất:", error);
    throw error;
  }
};

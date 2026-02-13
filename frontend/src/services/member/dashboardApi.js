// ================================
// MEMBER DASHBOARD API SERVICE
// ================================

import api from "../axios";

// Lấy thống kê dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/member/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    throw error;
  }
};

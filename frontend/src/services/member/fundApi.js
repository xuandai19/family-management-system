// ================================
// MEMBER FUND API SERVICE
// ================================

import api from "../axios";

// Lấy báo cáo thu chi
export const getFundReport = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.year) params.append("year", filters.year);
    if (filters.month) params.append("month", filters.month);
    if (filters.fund_id) params.append("fund_id", filters.fund_id);

    const queryString = params.toString();
    const url = queryString
      ? `/member/funds/report?${queryString}`
      : "/member/funds/report";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy báo cáo thu chi:", error);
    throw error;
  }
};

// Lấy thông báo đóng quỹ
export const getCollectionNotifications = async (status = "active") => {
  try {
    const response = await api.get(
      `/member/funds/collections?status=${status}`,
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông báo đóng quỹ:", error);
    throw error;
  }
};

// Lấy lịch sử đóng quỹ của tôi
export const getMyPaymentHistory = async () => {
  try {
    const response = await api.get("/member/funds/my-payments");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử đóng quỹ:", error);
    throw error;
  }
};

// Lấy chi tiết đợt thu
export const getCollectionRoundDetail = async (id) => {
  try {
    const response = await api.get(`/member/funds/collections/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đợt thu:", error);
    throw error;
  }
};

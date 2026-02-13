// ================================
// MEMBER FAMILY API SERVICE
// (Child requests)
// ================================

import api from "../axios";

// Gửi yêu cầu thêm con
export const submitChildRequest = async (childData) => {
  try {
    const response = await api.post("/member/family/child-request", childData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu thêm con:", error);
    throw error;
  }
};

// Lấy danh sách yêu cầu thêm con của tôi
export const getMyChildRequests = async () => {
  try {
    const response = await api.get("/member/family/child-requests");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy yêu cầu thêm con:", error);
    throw error;
  }
};

// Hủy yêu cầu thêm con
export const cancelChildRequest = async (requestId) => {
  try {
    const response = await api.delete(
      `/member/family/child-request/${requestId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy yêu cầu:", error);
    throw error;
  }
};

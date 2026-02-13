// ================================
// MEMBER PROFILE API SERVICE
// ================================

import api from "../axios";

// Lấy thông tin profile
export const getMyProfile = async () => {
  try {
    const response = await api.get("/member/profile");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy profile:", error);
    throw error;
  }
};

// Cập nhật profile
export const updateMyProfile = async (profileData) => {
  try {
    const response = await api.put("/member/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật profile:", error);
    throw error;
  }
};

// Đổi mật khẩu
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put("/member/profile/password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    throw error;
  }
};

// Lấy thông tin gia phả của tôi
export const getMyFamilyInfo = async () => {
  try {
    const response = await api.get("/member/profile/family");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin gia phả:", error);
    throw error;
  }
};

// Lấy hoạt động gần đây
export const getMyActivities = async (limit = 10) => {
  try {
    const response = await api.get(`/member/profile/activities?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy hoạt động:", error);
    throw error;
  }
};

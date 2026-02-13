// ================================
// MEMBER API SERVICE
// API calls dành riêng cho member
// ================================

import api from "./axios";

// ============ EVENTS ============

// Lấy danh sách sự kiện (member)
export const getMemberEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.event_type) params.append("event_type", filters.event_type);
    if (filters.status) params.append("status", filters.status);
    if (filters.year) params.append("year", filters.year);
    if (filters.month) params.append("month", filters.month);

    const queryString = params.toString();
    const url = queryString ? `/member/events?${queryString}` : "/member/events";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện:", error);
    throw error;
  }
};

// Lấy sự kiện sắp tới
export const getUpcomingEvents = async (limit = 5) => {
  try {
    const response = await api.get(`/member/dashboard/upcoming-events?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sự kiện sắp tới:", error);
    throw error;
  }
};

// Lấy chi tiết sự kiện
export const getMemberEventById = async (id) => {
  try {
    const response = await api.get(`/member/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sự kiện:", error);
    throw error;
  }
};

// Đề xuất sự kiện mới
export const proposeEvent = async (eventData) => {
  try {
    const response = await api.post("/member/events/propose", eventData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đề xuất sự kiện:", error);
    throw error;
  }
};

// Lấy đề xuất sự kiện của tôi
export const getMyEventProposals = async () => {
  try {
    const response = await api.get("/member/events/my-proposals");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đề xuất sự kiện:", error);
    throw error;
  }
};

// Đăng ký tham gia sự kiện
export const registerForEvent = async (eventId) => {
  try {
    const response = await api.post(`/member/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký sự kiện:", error);
    throw error;
  }
};

// Hủy đăng ký tham gia
export const cancelEventRegistration = async (eventId) => {
  try {
    const response = await api.delete(`/member/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy đăng ký:", error);
    throw error;
  }
};

// ============ EXPENSES ============

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

// ============ POSTS ============

// Lấy bài viết đã xuất bản (member)
export const getMemberPosts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);

    const queryString = params.toString();
    const url = queryString ? `/member/posts?${queryString}` : "/member/posts";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    throw error;
  }
};

// Lấy chi tiết bài viết
export const getMemberPostById = async (id) => {
  try {
    const response = await api.get(`/member/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết bài viết:", error);
    throw error;
  }
};

// Đề xuất bài viết
export const proposePost = async (postData) => {
  try {
    const response = await api.post("/member/posts/propose", postData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đề xuất bài viết:", error);
    throw error;
  }
};

// Lấy bài viết của tôi
export const getMyPosts = async () => {
  try {
    const response = await api.get("/member/posts/my-posts");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy bài viết của tôi:", error);
    throw error;
  }
};

// Like/Unlike bài viết
export const toggleLikePost = async (postId) => {
  try {
    const response = await api.post(`/member/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi like bài viết:", error);
    throw error;
  }
};

// ============ FUNDS ============

// Lấy báo cáo thu chi
export const getFundReport = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.year) params.append("year", filters.year);
    if (filters.month) params.append("month", filters.month);
    if (filters.fund_id) params.append("fund_id", filters.fund_id);

    const queryString = params.toString();
    const url = queryString ? `/member/funds/report?${queryString}` : "/member/funds/report";

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
    const response = await api.get(`/member/funds/collections?status=${status}`);
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

// ============ DASHBOARD ============

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

// ============ PROFILE ============

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

// ============ CHILD REQUESTS ============

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
    const response = await api.delete(`/member/family/child-request/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy yêu cầu:", error);
    throw error;
  }
};

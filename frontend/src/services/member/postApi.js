// ================================
// MEMBER POST API SERVICE
// ================================

import api from "../axios";

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

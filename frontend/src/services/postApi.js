import axios from "./axios";

// Lấy tất cả bài viết (admin)
export const getAllPosts = async (params = {}) => {
  const response = await axios.get("/posts", { params });
  return response.data;
};

// Lấy bài viết đã xuất bản (public)
export const getPublishedPosts = async (params = {}) => {
  const response = await axios.get("/posts/published", { params });
  return response.data;
};

// Lấy bài viết chờ duyệt
export const getPendingPosts = async () => {
  const response = await axios.get("/posts/admin/pending");
  return response.data;
};

// Lấy chi tiết bài viết
export const getPostById = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

// Tạo bài viết mới
export const createPost = async (postData) => {
  const response = await axios.post("/posts", postData);
  return response.data;
};

// Cập nhật bài viết
export const updatePost = async (id, postData) => {
  const response = await axios.put(`/posts/${id}`, postData);
  return response.data;
};

// Xóa bài viết
export const deletePost = async (id) => {
  const response = await axios.delete(`/posts/${id}`);
  return response.data;
};

// Duyệt bài viết
export const approvePost = async (id) => {
  const response = await axios.patch(`/posts/${id}/approve`);
  return response.data;
};

// Từ chối bài viết
export const rejectPost = async (id, reject_reason) => {
  const response = await axios.patch(`/posts/${id}/reject`, { reject_reason });
  return response.data;
};

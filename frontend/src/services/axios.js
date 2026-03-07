import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Khớp với PORT 5000 trong server.js của bạn
});

// Gắn token vào mỗi lần gửi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Chỉ set Content-Type json nếu không phải FormData
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// Xử lý response lỗi 401 - token hết hạn hoặc không hợp lệ
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xóa thông tin auth cũ
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      // Redirect về trang login (tránh redirect vòng lặp)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

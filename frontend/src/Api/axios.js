import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Khớp với PORT 5000 trong server.js của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token vào mỗi lần gửi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log("Token being sent:", token ? token.substring(0, 50) + "..." : "NO TOKEN"); // Debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

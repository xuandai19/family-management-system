import express from "express";
import {
  registerWithMemberInfo,
  login,
} from "../controllers/authController.js";

const router = express.Router();
// Đăng ký: Gửi thông tin auth + thông tin gia phả để chờ duyệt
router.post("/register", registerWithMemberInfo);
// Đăng nhập: Lấy token để sử dụng hệ thống
router.post("/login", login);
export default router;

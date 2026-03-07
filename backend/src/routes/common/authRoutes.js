import express from "express";
import {
  register,
  login,
  forgotPassword,
  verifyOtpAndResetPassword,
} from "../../controllers/common/authController.js";

const router = express.Router();
// Đăng ký: Gửi thông tin auth + thông tin gia phả để chờ duyệt
router.post("/register", register);
// Đăng nhập: Lấy token để sử dụng hệ thống
router.post("/login", login);
// Quên mật khẩu: Gửi OTP qua email
router.post("/forgot-password", forgotPassword);
// Xác thực OTP và đặt lại mật khẩu
router.post("/reset-password", verifyOtpAndResetPassword);

export default router;

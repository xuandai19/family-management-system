// ===============================
// MEMBER PROFILE ROUTES
// Routes cho thông tin cá nhân member
// ===============================

import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  getMyFamilyInfo,
  uploadAvatar,
  getMyActivities,
} from "../../controllers/member/profileController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu authentication
router.use(verifyToken);

// Lấy thông tin profile
router.get("/", getMyProfile);

// Lấy thông tin gia phả
router.get("/family", getMyFamilyInfo);

// Lấy hoạt động gần đây
router.get("/activities", getMyActivities);

// Cập nhật thông tin profile
router.put("/", updateMyProfile);

// Đổi mật khẩu
router.put("/password", changePassword);

// Upload avatar
router.put("/avatar", uploadAvatar);

export default router;

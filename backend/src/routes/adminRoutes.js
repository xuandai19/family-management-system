import express from "express";
import {
  approveMemberRegistration,
  rejectMemberRegistration,
  getPendingMemberRequests,
  checkMemberMatch,
  linkProfileToMember,
  getAllMembersShort,
} from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy danh sách tài khoản chờ duyệt
router.get("/pending-members", verifyToken, isAdmin, getPendingMemberRequests);

// Kiểm tra tên có khớp với ai trong gia phả không
router.get("/check-match/:profileId", verifyToken, isAdmin, checkMemberMatch);

// Lấy danh sách tất cả thành viên trong gia phả (cho dropdown chọn)
router.get("/members", verifyToken, isAdmin, getAllMembersShort);

// Duyệt tài khoản - liên kết với thành viên trong gia phả
router.patch(
  "/approve/:profileId",
  verifyToken,
  isAdmin,
  approveMemberRegistration
);

// Từ chối yêu cầu đăng ký
router.delete(
  "/reject/:profileId",
  verifyToken,
  isAdmin,
  rejectMemberRegistration
);

// Liên kết thủ công profile với member
router.post("/link-profile", verifyToken, isAdmin, linkProfileToMember);

export default router;

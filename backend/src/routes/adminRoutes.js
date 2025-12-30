import express from "express";
import {
  approveMemberRegistration,
  rejectMemberRegistration,
  getPendingMemberRequests,
  getAllMembersShort,
  approveSpouseRegistration,
  getAllSpousesShort,
} from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * ===============================
 * DANH SÁCH CHỜ DUYỆT
 * ===============================
 */

// Lấy danh sách tài khoản member/spouse đang chờ duyệt
router.get("/pending-members", verifyToken, isAdmin, getPendingMemberRequests);

/**
 * ===============================
 * MEMBER
 * ===============================
 */

// Lấy danh sách member trong gia phả (dropdown chọn)
router.get("/members", verifyToken, isAdmin, getAllMembersShort);

// Duyệt tài khoản MEMBER (admin chọn member_id)
router.patch(
  "/approve-member/:profileId",
  verifyToken,
  isAdmin,
  approveMemberRegistration
);

// Từ chối đăng ký (member hoặc spouse)
router.patch(
  "/reject/:profileId",
  verifyToken,
  isAdmin,
  rejectMemberRegistration
);

/**
 * ===============================
 * SPOUSE
 * ===============================
 */

// Lấy danh sách spouse (dropdown chọn)
router.get("/spouses", verifyToken, isAdmin, getAllSpousesShort);

// Duyệt tài khoản SPOUSE (admin chọn spouse_id)
router.patch(
  "/approve-spouse/:profileId",
  verifyToken,
  isAdmin,
  approveSpouseRegistration
);

export default router;

import express from "express";
import {
  // Registration
  approveMemberRegistration,
  rejectMemberRegistration,
  getPendingMemberRequests,
  approveSpouseRegistration,
  // User/Profile
  getAllUsers,
  deleteUser,
  updateUserRole,
  // Family Members
  getAllMembersShort,
  getAllMembersWithSpouse,
  getAllFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  // Spouses
  getAllSpousesShort,
  getAllSpousesFull,
  createSpouse,
  updateSpouse,
  deleteSpouse,
} from "../controllers/adminController/index.js";
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

// Lấy danh sách member kèm thông tin vợ/chồng
router.get(
  "/members-with-spouse",
  verifyToken,
  isAdmin,
  getAllMembersWithSpouse
);

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

/**
 * ===============================
 * QUẢN LÝ NGƯỜI DÙNG
 * ===============================
 */

// Lấy tất cả người dùng
router.get("/users", verifyToken, isAdmin, getAllUsers);

// Xóa người dùng
router.delete("/users/:userId", verifyToken, isAdmin, deleteUser);

// Cập nhật quyền người dùng
router.patch("/users/:userId/role", verifyToken, isAdmin, updateUserRole);

/**
 * ===============================
 * QUẢN LÝ THÀNH VIÊN GIA PHẢ
 * ===============================
 */

// Lấy tất cả thành viên gia phả (đầy đủ)
router.get("/family-members", verifyToken, isAdmin, getAllFamilyMembers);

// Thêm thành viên gia phả mới
router.post("/family-members", verifyToken, isAdmin, createFamilyMember);

// Cập nhật thành viên gia phả
router.put(
  "/family-members/:memberId",
  verifyToken,
  isAdmin,
  updateFamilyMember
);

// Xóa thành viên gia phả
router.delete(
  "/family-members/:memberId",
  verifyToken,
  isAdmin,
  deleteFamilyMember
);

// Lấy tất cả spouse (đầy đủ)
router.get("/spouses-full", verifyToken, isAdmin, getAllSpousesFull);

// Thêm spouse mới
router.post("/spouses", verifyToken, isAdmin, createSpouse);

// Cập nhật spouse
router.put("/spouses/:spouseId", verifyToken, isAdmin, updateSpouse);

// Xóa spouse
router.delete("/spouses/:spouseId", verifyToken, isAdmin, deleteSpouse);

export default router;

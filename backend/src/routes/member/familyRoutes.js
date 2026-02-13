import express from "express";
import {
  getFamilyTree,
  searchMembers,
  searchAll,
  getMemberDetail,
  getAdmins,
  submitChildRequest,
  getMyChildRequests,
  cancelChildRequest,
} from "../../controllers/member/familyController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

// 1. Công khai: Ai cũng có thể xem cây gia phả
router.get("/tree/:rootId", getFamilyTree);

// 2. Công khai: Cho phép tìm kiếm không cần login (hoặc giữ verifyToken nếu muốn bảo mật)
router.get("/search", searchMembers);
router.get("/search-all", searchAll); // Tìm cả members và spouses
router.get("/member/:id", getMemberDetail); // Chi tiết thành viên

// 3. Bảo mật: Chỉ Admin mới xem được danh sách admin
router.get("/admins", verifyToken, isAdmin, getAdmins);

// 4. Child requests - Yêu cầu thêm con (cần đăng nhập)
router.post("/child-request", verifyToken, submitChildRequest);
router.get("/child-requests", verifyToken, getMyChildRequests);
router.delete("/child-request/:id", verifyToken, cancelChildRequest);

export default router;

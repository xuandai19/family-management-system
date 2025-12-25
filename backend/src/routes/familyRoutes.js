import express from "express";
import {
  getFamilyTree,
  addMember,
  getAdmins,
} from "../controllers/familyController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 1. Công khai: Ai cũng có thể xem cây gia phả (nếu is_public = true)
router.get("/tree/:rootId", getFamilyTree);

// 2. Bảo mật: Chỉ Admin mới được thêm thành viên mới
// Luồng chạy: verifyToken (check login) -> isAdmin (check quyền) -> addMember (thực hiện)
router.post("/member", verifyToken, isAdmin, addMember);
router.get("/admins", getAdmins);
export default router;

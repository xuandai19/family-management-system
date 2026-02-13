// src/routes/ancestralHouseRoutes.js
import express from "express";
import {
  getAncestralHouse,
  upsertAncestralHouse,
  getRenovationLogs,
  createRenovationLog,
  updateRenovationLog,
  deleteRenovationLog,
} from "../../controllers/admin/ancestralHouseController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// ==========================================
// ANCESTRAL HOUSE ROUTES
// ==========================================

// Lấy thông tin nhà thờ tổ
router.get("/", getAncestralHouse);

// Tạo/Cập nhật nhà thờ tổ (cần đăng nhập)
router.post("/", verifyToken, upsertAncestralHouse);

// ==========================================
// RENOVATION LOGS ROUTES
// ==========================================

// Lấy danh sách lịch sử tu sửa
router.get("/renovations", getRenovationLogs);

// Tạo lịch sử tu sửa mới
router.post("/renovations", verifyToken, createRenovationLog);

// Cập nhật lịch sử tu sửa
router.put("/renovations/:id", verifyToken, updateRenovationLog);

// Xóa lịch sử tu sửa
router.delete("/renovations/:id", verifyToken, deleteRenovationLog);

export default router;

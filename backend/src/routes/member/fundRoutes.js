// ===============================
// MEMBER FUND ROUTES
// Routes cho quỹ dành cho member
// ===============================

import express from "express";
import {
  getFundReport,
  getCollectionNotifications,
  getMyPaymentHistory,
  getCollectionRoundDetail,
} from "../../controllers/member/fundController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu authentication
router.use(verifyToken);

// Xem báo cáo thu chi quỹ
router.get("/report", getFundReport);

// Xem thông báo đóng quỹ
router.get("/collections", getCollectionNotifications);

// Xem lịch sử đóng quỹ của tôi
router.get("/my-payments", getMyPaymentHistory);

// Xem chi tiết đợt thu
router.get("/collections/:id", getCollectionRoundDetail);

export default router;

import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/roleMiddleware.js";
import {
  getDashboardStats,
  getRecentPendingRequests,
  getUpcomingEventsForDashboard,
  getRecentActivities,
} from "../../controllers/admin/dashboardController.js";

const router = express.Router();

// Tất cả routes cần xác thực và quyền admin
router.use(verifyToken);
router.use(isAdmin);

// GET /api/dashboard/stats - Thống kê tổng quan
router.get("/stats", getDashboardStats);

// GET /api/dashboard/pending - Yêu cầu chờ duyệt gần đây
router.get("/pending", getRecentPendingRequests);

// GET /api/dashboard/events - Sự kiện sắp tới
router.get("/events", getUpcomingEventsForDashboard);

// GET /api/dashboard/activities - Hoạt động gần đây
router.get("/activities", getRecentActivities);

export default router;

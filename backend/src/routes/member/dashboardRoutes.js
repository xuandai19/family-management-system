// ===============================
// MEMBER DASHBOARD ROUTES
// Routes cho dashboard của member
// ===============================

import express from "express";
import * as dashboardController from "../../controllers/member/dashboardController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/member/dashboard/stats - Lấy thống kê dashboard
router.get("/stats", verifyToken, dashboardController.getDashboardStats);

// GET /api/member/dashboard/upcoming-events - Lấy sự kiện sắp tới
router.get(
  "/upcoming-events",
  verifyToken,
  dashboardController.getUpcomingEvents,
);

export default router;

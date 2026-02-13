// ===============================
// MEMBER ROUTES - INDEX
// Tổng hợp tất cả routes cho member
// ===============================

import express from "express";
import dashboardRoutes from "./dashboardRoutes.js";
import familyRoutes from "./familyRoutes.js";
import eventRoutes from "./eventRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
// import renovationRoutes from "./renovationRoutes.js"; // Tạm bỏ
import postRoutes from "./postRoutes.js";
import fundRoutes from "./fundRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = express.Router();

// Dashboard
router.use("/dashboard", dashboardRoutes);

// Family tree & member info
router.use("/family", familyRoutes);

// Sự kiện
router.use("/events", eventRoutes);

// Đề xuất chi phí
router.use("/expenses", expenseRoutes);

// Đề xuất tu bổ từ đường - Tạm bỏ
// router.use("/renovations", renovationRoutes);

// Bài viết
router.use("/posts", postRoutes);

// Quỹ và thu chi
router.use("/funds", fundRoutes);

// Thông tin cá nhân
router.use("/profile", profileRoutes);

export default router;

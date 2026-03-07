// ===============================
// ADMIN ROUTES - INDEX
// Tổng hợp tất cả routes cho admin
// ===============================

import express from "express";
import adminRoutes from "./adminRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import eventRoutes from "./eventRoutes.js";
import fundRoutes from "./fundRoutes.js";
import collectionRoutes from "./collectionRoutes.js";
import notifiRoutes from "./notifiRoutes.js";
import postRoutes from "./postRoutes.js";
import ancestralHouseRoutes from "./ancestralHouseRoutes.js";
import reportRoutes from "./reportRoutes.js";
import proposalRoutes from "./proposalRoutes.js";

const router = express.Router();

// Admin management (users, registrations, members, spouses)
router.use("/", adminRoutes);

// Dashboard statistics
router.use("/dashboard", dashboardRoutes);

// Event management
router.use("/events", eventRoutes);

// Fund management
router.use("/funds", fundRoutes);

// Collection management
router.use("/collections", collectionRoutes);

// Notification management
router.use("/notifications", notifiRoutes);

// Post management
router.use("/posts", postRoutes);

// Ancestral house management
router.use("/ancestral-house", ancestralHouseRoutes);

// Report
router.use("/reports", reportRoutes);

// Proposals (đề xuất từ thành viên)
router.use("/proposals", proposalRoutes);

export default router;

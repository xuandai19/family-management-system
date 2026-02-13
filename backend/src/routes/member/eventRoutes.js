// ===============================
// MEMBER EVENT ROUTES
// Routes cho sự kiện dành cho member
// ===============================

import express from "express";
import {
  getEvents,
  getUpcomingEvents,
  getEventById,
  proposeEvent,
  getMyEventProposals,
  registerForEvent,
  cancelEventRegistration,
} from "../../controllers/member/eventController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu authentication
router.use(verifyToken);

// Xem danh sách sự kiện
router.get("/", getEvents);

// Sự kiện sắp tới
router.get("/upcoming", getUpcomingEvents);

// Đề xuất sự kiện của tôi
router.get("/my-proposals", getMyEventProposals);

// Xem chi tiết sự kiện
router.get("/:id", getEventById);

// Đề xuất sự kiện mới
router.post("/propose", proposeEvent);

// Đăng ký tham gia sự kiện
router.post("/:eventId/register", registerForEvent);

// Hủy đăng ký tham gia
router.delete("/:eventId/register", cancelEventRegistration);

export default router;

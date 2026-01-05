import express from "express";
import {
  getEvents,
  getEventById,
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public cho Member+ xem danh sách
router.get("/", verifyToken, getEvents);
router.get("/upcoming", verifyToken, getUpcomingEvents);
router.get("/:id", verifyToken, getEventById);

// Chỉ Admin mới tạo/sửa/xóa
router.post("/", verifyToken, isAdmin, createEvent);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

export default router; 
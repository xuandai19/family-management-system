import express from "express";
import {
  getAllNotifications,
  getUnreadNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../../controllers/admin/notifiController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

// User routes
router.post("/", verifyToken, createNotification);

// Admin routes
router.get("/", verifyToken, isAdmin, getAllNotifications);
router.get("/unread", verifyToken, isAdmin, getUnreadNotifications);
router.get("/count", verifyToken, isAdmin, getUnreadCount);
router.patch("/:id/read", verifyToken, isAdmin, markAsRead);
router.patch("/read-all", verifyToken, isAdmin, markAllAsRead);
router.delete("/:id", verifyToken, isAdmin, deleteNotification);

export default router;

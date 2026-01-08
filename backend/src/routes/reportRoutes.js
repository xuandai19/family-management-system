import express from "express";
import {
  getAllReports,
  getPendingReports,
  createReport,
  resolveReport,
  dismissReport,
  deleteReport,
  getReportCount,
} from "../controllers/reportController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// User routes
router.post("/", verifyToken, createReport);

// Admin routes
router.get("/", verifyToken, isAdmin, getAllReports);
router.get("/pending", verifyToken, isAdmin, getPendingReports);
router.get("/count", verifyToken, isAdmin, getReportCount);
router.patch("/:id/resolve", verifyToken, isAdmin, resolveReport);
router.patch("/:id/dismiss", verifyToken, isAdmin, dismissReport);
router.delete("/:id", verifyToken, isAdmin, deleteReport);

export default router;

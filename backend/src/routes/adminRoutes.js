import express from "express";
import {
  approveMemberRegistration,
  getPendingMemberRequests,
} from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy danh sách chờ
router.get("/pending-members", verifyToken, isAdmin, getPendingMemberRequests);

// Duyệt yêu cầu
router.patch(
  "/approve/:requestId",
  verifyToken,
  isAdmin,
  approveMemberRegistration
);

export default router;

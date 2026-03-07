// ===============================
// ADMIN PROPOSAL ROUTES
// Routes duyệt đề xuất từ thành viên
// ===============================

import express from "express";
import {
  getAllEventProposals,
  getPendingEventProposals,
  approveEventProposal,
  rejectEventProposal,
  deleteEventProposal,
  getAllExpenseProposals,
  getPendingExpenseProposals,
  approveExpenseProposal,
  rejectExpenseProposal,
  deleteExpenseProposal,
  getPendingProposalCount,
} from "../../controllers/admin/proposalController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu auth + admin
router.use(verifyToken, isAdmin);

// Thống kê
router.get("/count", getPendingProposalCount);

// Event proposals
router.get("/events", getAllEventProposals);
router.get("/events/pending", getPendingEventProposals);
router.patch("/events/:id/approve", approveEventProposal);
router.patch("/events/:id/reject", rejectEventProposal);
router.delete("/events/:id", deleteEventProposal);

// Expense proposals
router.get("/expenses", getAllExpenseProposals);
router.get("/expenses/pending", getPendingExpenseProposals);
router.patch("/expenses/:id/approve", approveExpenseProposal);
router.patch("/expenses/:id/reject", rejectExpenseProposal);
router.delete("/expenses/:id", deleteExpenseProposal);

export default router;

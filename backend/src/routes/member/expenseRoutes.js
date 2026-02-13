// ===============================
// MEMBER EXPENSE ROUTES
// Routes cho đề xuất chi phí dành cho member
// ===============================

import express from "express";
import {
  proposeExpense,
  getMyExpenseProposals,
  getExpenseProposalById,
  cancelExpenseProposal,
} from "../../controllers/member/expenseController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu authentication
router.use(verifyToken);

// Lấy danh sách đề xuất chi phí của tôi
router.get("/my-proposals", getMyExpenseProposals);

// Lấy chi tiết đề xuất
router.get("/:id", getExpenseProposalById);

// Tạo đề xuất chi phí mới
router.post("/propose", proposeExpense);

// Hủy đề xuất chi phí
router.delete("/:id", cancelExpenseProposal);

export default router;

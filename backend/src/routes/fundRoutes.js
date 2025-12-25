// src/routes/fundRoutes.js
import express from "express";
const router = express.Router();
import {
  getAllFunds,
  createTransaction,
  deleteTransaction,
  getTransactionHistory,
} from "../controllers/fundController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

router.get("/", verifyToken, getAllFunds);
router.get("/history/:fundId", verifyToken, getTransactionHistory);

// Chỉ Admin mới có quyền thay đổi dòng tiền
router.post("/transaction", verifyToken, isAdmin, createTransaction);
router.delete("/transaction/:id", verifyToken, isAdmin, deleteTransaction);

export default router;

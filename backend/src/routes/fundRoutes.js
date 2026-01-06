// src/routes/fundRoutes.js
import express from "express";
const router = express.Router();
import {
  getAllFunds,
  createFund,
  updateFund,
  deleteFund,
  createTransaction,
  deleteTransaction,
  getTransactionHistory,
  getAllTransactions,
} from "../controllers/fundController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

// Quỹ
router.get("/", verifyToken, getAllFunds);
router.post("/", verifyToken, isAdmin, createFund);
router.put("/:id", verifyToken, isAdmin, updateFund);
router.delete("/:id", verifyToken, isAdmin, deleteFund);

// Giao dịch
router.get("/transactions", verifyToken, getAllTransactions);
router.get("/history/:fundId", verifyToken, getTransactionHistory);
router.post("/transaction", verifyToken, isAdmin, createTransaction);
router.delete("/transaction/:id", verifyToken, isAdmin, deleteTransaction);

export default router;

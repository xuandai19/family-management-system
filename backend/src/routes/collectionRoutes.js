// src/routes/collectionRoutes.js
import express from "express";
const router = express.Router();
import {
  getAllCollectionRounds,
  getActiveCollectionRounds,
  createCollectionRound,
  updateCollectionRound,
  deleteCollectionRound,
  getPaymentsByRound,
  confirmPayment,
  deletePayment,
  getCollectionStats,
} from "../controllers/collectionController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

// Đợt thu - Ai cũng xem được active rounds
router.get("/rounds", verifyToken, getAllCollectionRounds);
router.get("/rounds/active", verifyToken, getActiveCollectionRounds);
router.get("/rounds/:roundId/stats", verifyToken, getCollectionStats);

// Admin CRUD đợt thu
router.post("/rounds", verifyToken, isAdmin, createCollectionRound);
router.put("/rounds/:id", verifyToken, isAdmin, updateCollectionRound);
router.delete("/rounds/:id", verifyToken, isAdmin, deleteCollectionRound);

// Payments - Admin xác nhận đã thu
router.get("/payments/:roundId", verifyToken, getPaymentsByRound);
router.post("/payments", verifyToken, isAdmin, confirmPayment);
router.delete("/payments/:id", verifyToken, isAdmin, deletePayment);

export default router;

// ===============================
// COMMON ROUTES - INDEX
// Tổng hợp routes dùng chung (auth, upload)
// ===============================

import express from "express";
import authRoutes from "./authRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = express.Router();

// Authentication
router.use("/auth", authRoutes);

// Upload files
router.use("/upload", uploadRoutes);

export default router;

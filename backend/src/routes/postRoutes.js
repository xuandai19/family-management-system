import express from "express";
import {
  getAllPosts,
  getPublishedPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
  getPendingPosts,
} from "../controllers/postController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/published", getPublishedPosts);

// Protected routes (cần đăng nhập)
router.post("/", verifyToken, createPost);

// Admin routes
router.get("/", verifyToken, isAdmin, getAllPosts);
router.get("/admin/pending", verifyToken, isAdmin, getPendingPosts);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, isAdmin, updatePost);
router.delete("/:id", verifyToken, isAdmin, deletePost);
router.patch("/:id/approve", verifyToken, isAdmin, approvePost);
router.patch("/:id/reject", verifyToken, isAdmin, rejectPost);

export default router;

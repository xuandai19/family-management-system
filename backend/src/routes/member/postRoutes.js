// ===============================
// MEMBER POST ROUTES
// Routes cho bài viết dành cho member
// ===============================

import express from "express";
import {
  getPublishedPosts,
  getPostById,
  proposePost,
  getMyPosts,
  updateMyPost,
  deleteMyPost,
  toggleLikePost,
} from "../../controllers/member/postController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Tất cả routes yêu cầu authentication
router.use(verifyToken);

// Xem danh sách bài viết đã xuất bản
router.get("/", getPublishedPosts);

// Lấy bài viết của tôi
router.get("/my-posts", getMyPosts);

// Xem chi tiết bài viết
router.get("/:id", getPostById);

// Đề xuất bài viết mới
router.post("/propose", proposePost);

// Cập nhật bài viết của tôi
router.put("/:id", updateMyPost);

// Xóa bài viết của tôi
router.delete("/:id", deleteMyPost);

// Like/Unlike bài viết
router.post("/:id/like", toggleLikePost);

export default router;

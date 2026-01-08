import express from "express";
import multer from "multer";
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} from "../controllers/uploadController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Cấu hình multer - lưu vào memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
  fileFilter: (req, file, cb) => {
    console.log("Multer fileFilter - file:", file);
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ cho phép upload ảnh"), false);
    }
  },
});

// Error handler cho multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("Multer error:", err);
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    console.log("Other error:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// Upload 1 ảnh
router.post(
  "/single",
  verifyToken,
  upload.single("image"),
  handleMulterError,
  uploadImage
);

// Upload nhiều ảnh (tối đa 10)
router.post(
  "/multiple",
  verifyToken,
  upload.array("images", 10),
  handleMulterError,
  uploadMultipleImages
);

// Xóa ảnh
router.delete("/", verifyToken, deleteImage);

export default router;

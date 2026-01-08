// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import fundRoutes from "./routes/fundRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import ancestralHouseRoutes from "./routes/ancestralHouseRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notifiRoutes from "./routes/notifiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- KẾT NỐI ROUTES Ở ĐÂY ---
app.use("/api/family", familyRoutes); // Lấy cây (Tree), Tìm kiếm, Chi tiết thành viên
// Giờ đây các route sẽ có dạng: http://localhost:5000/api/family/tree/1

app.get("/", (req, res) => {
  res.send("Family Tree API is Online 🚀");
});

app.use("/api/auth", authRoutes); //Login, Register, Me

app.use("/api/admin", adminRoutes); // Duyệt yêu cầu, Quản lý User

app.use("/api/funds", fundRoutes); // Quản lý quỹ

app.use("/api/events", eventRoutes); // Quản lý sự kiện

app.use("/api/collections", collectionRoutes); // Quản lý đợt thu tiền

app.use("/api/ancestral-house", ancestralHouseRoutes); // Quản lý nhà thờ tổ

app.use("/api/posts", postRoutes); // Quản lý bài viết

app.use("/api/upload", uploadRoutes); // Upload ảnh

app.use("/api/notifications", notifiRoutes); // Thông báo

app.use("/api/dashboard", dashboardRoutes); // Dashboard thống kê

app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

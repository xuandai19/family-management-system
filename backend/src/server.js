// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import familyRoutes from "./routes/familyRoutes.js"; // Import router của bạn
import adminRoutes from "./routes/adminRoutes.js";
import fundRoutes from "./routes/fundRoutes.js";

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

app.use("/api/fund", fundRoutes); // Quản lý quỹ

app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import familyRoutes from "./routes/familyRoutes.js"; // Import router của bạn
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- KẾT NỐI ROUTES Ở ĐÂY ---
app.use("/api/family", familyRoutes);
// Giờ đây các route sẽ có dạng: http://localhost:5000/api/family/tree/1

app.get("/", (req, res) => {
  res.send("Family Tree API is Online 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

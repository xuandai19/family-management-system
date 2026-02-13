// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import route indexes
import adminRoutes from "./routes/admin/index.js";
import memberRoutes from "./routes/member/index.js";
import commonRoutes from "./routes/common/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROOT ROUTE ---
app.get("/", (req, res) => {
  res.send("Family Tree API is Online 🚀");
});

// --- COMMON ROUTES (Auth, Upload) ---
app.use("/api", commonRoutes);

// --- ADMIN ROUTES ---
app.use("/api/admin", adminRoutes);

// --- MEMBER ROUTES ---
app.use("/api/member", memberRoutes);

// Backward compatibility - keep old routes working
app.use(
  "/api/family",
  (await import("./routes/member/familyRoutes.js")).default,
);
app.use("/api/funds", (await import("./routes/admin/fundRoutes.js")).default);
app.use("/api/events", (await import("./routes/admin/eventRoutes.js")).default);
app.use(
  "/api/collections",
  (await import("./routes/admin/collectionRoutes.js")).default,
);
app.use(
  "/api/ancestral-house",
  (await import("./routes/admin/ancestralHouseRoutes.js")).default,
);
app.use("/api/posts", (await import("./routes/admin/postRoutes.js")).default);
app.use(
  "/api/notifications",
  (await import("./routes/admin/notifiRoutes.js")).default,
);
app.use(
  "/api/dashboard",
  (await import("./routes/admin/dashboardRoutes.js")).default,
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`
📁 API Structure:
├── /api/auth          - Authentication (login, register)
├── /api/upload        - File uploads
├── /api/admin/        - Admin routes
│   ├── /dashboard     - Dashboard statistics
│   ├── /events        - Event management
│   ├── /funds         - Fund management
│   ├── /collections   - Collection management
│   ├── /notifications - Notification management
│   ├── /posts         - Post management
│   └── /ancestral-house - Ancestral house management
└── /api/member/       - Member routes
    ├── /family        - Family tree & search
    ├── /events        - View events & propose
    ├── /expenses      - Expense proposals
    ├── /renovations   - Renovation proposals
    ├── /posts         - View posts & propose
    ├── /funds         - Fund reports & payments
    └── /profile       - Personal profile
  `);
});

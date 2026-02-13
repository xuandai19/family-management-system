import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";

// Routes (refactored)
import adminRoutes from "./routes/adminRoutes";
import memberRoutes from "./routes/memberRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 1. MẶC ĐỊNH: Chuyển hướng về trang Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. AUTHENTICATION: Các trang đăng ký, đăng nhập */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* 3. ADMIN */}
        {adminRoutes}

        {/* 4. MEMBER - Sử dụng MemberRoutes (refactored) */}
        {memberRoutes}

        {/* 5. KHÔNG TÌM THẤY TRANG */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

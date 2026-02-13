import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";

// Routes
import adminRoutes from "./adminRoutes";
import memberRoutes from "./memberRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. DEFAULT: Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 2. AUTHENTICATION */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* 3. ADMIN ROUTES */}
      {adminRoutes}

      {/* 4. MEMBER ROUTES (refactored) */}
      {memberRoutes}

      {/* 5. 404 NOT FOUND */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;

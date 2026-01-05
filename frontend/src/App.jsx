import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboardPage";
import FamilyTree from "./pages/admin/familyTreePage";
import PendingMembers from "./pages/admin/pendingMemberPage";
import Event from "./pages/admin/eventPage";
import UserManagement from "./pages/admin/userManagent";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 1. MẶC ĐỊNH: Chuyển hướng về trang Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. AUTHENTICATION: Các trang đăng ký, đăng nhập */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* 3. ADMIN - Sử dụng AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="family-tree" element={<FamilyTree />} />
          <Route path="pending-members" element={<PendingMembers />} />
          <Route path="events" element={<Event />} />
          <Route path="members" element={<UserManagement />} />
          {/* Thêm các route admin khác tại đây */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

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
import FunPage from "./pages/admin/funPage";
import UserDashboard from "./pages/user/UserDashboard";
import AncestralHousePage from "./pages/admin/ancestralHousePage";
import SettingPage from "./pages/admin/settingPage";
import PostsPage from "./pages/admin/postsPage";
import NotificationPage from "./pages/admin/notificationPage";

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
          <Route path="funds" element={<FunPage />} />
          <Route path="ancestral-house" element={<AncestralHousePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="settings" element={<SettingPage />} />

          {/* Thêm các route admin khác tại đây */}
        </Route>
        {/* 4. USER DASHBOARD */}
        <Route path="/UserDashboard" element={<UserDashboard />} />
        {/* 5. KHÔNG TÌM THẤY TRANG */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

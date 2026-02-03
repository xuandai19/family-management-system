import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";
import AdminLayout from "./components/Layout/AdminLayout";
import UserLayout from "./components/Layout/UserLayout";
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

// User Pages
import UserFamilyTreePage from "./pages/user/UserFamilyTreePage";
import UserFundNotificationsPage from "./pages/user/UserFundNotificationsPage";
import UserPaymentHistoryPage from "./pages/user/UserPaymentHistoryPage";
import UserFundReportPage from "./pages/user/UserFundReportPage";
import UserAncestralHousePage from "./pages/user/UserAncestralHousePage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserAddChildRequestPage from "./pages/user/UserAddChildRequestPage";

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

        {/* 4. USER - Sử dụng UserLayout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="family-tree" element={<UserFamilyTreePage />} />
          <Route
            path="fund-notifications"
            element={<UserFundNotificationsPage />}
          />
          <Route path="payment-history" element={<UserPaymentHistoryPage />} />
          <Route path="fund-report" element={<UserFundReportPage />} />
          <Route path="ancestral-house" element={<UserAncestralHousePage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route
            path="add-child-request"
            element={<UserAddChildRequestPage />}
          />
        </Route>

        {/* 5. KHÔNG TÌM THẤY TRANG */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

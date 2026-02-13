import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";

// Layouts
import AdminLayout from "../components/admin/layout/AdminLayout";
import MemberLayout from "../components/member/layout/MemberLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/dashboardPage";
import FamilyTree from "../pages/admin/familyTreePage";
import PendingMembers from "../pages/admin/pendingMemberPage";
import Event from "../pages/admin/eventPage";
import UserManagement from "../pages/admin/userManagent";
import FunPage from "../pages/admin/funPage";
import AncestralHousePage from "../pages/admin/ancestralHousePage";
import SettingPage from "../pages/admin/settingPage";
import PostsPage from "../pages/admin/postsPage";
import NotificationPage from "../pages/admin/notificationPage";

// Member Pages
import MemberDashboard from "../pages/member/UserDashboard";
import MemberFamilyTreePage from "../pages/member/UserFamilyTreePage";
import MemberFundNotificationsPage from "../pages/member/UserFundNotificationsPage";
import MemberPaymentHistoryPage from "../pages/member/UserPaymentHistoryPage";
import MemberFundReportPage from "../pages/member/UserFundReportPage";
import MemberAncestralHousePage from "../pages/member/UserAncestralHousePage";
import MemberProfilePage from "../pages/member/UserProfilePage";
import MemberAddChildRequestPage from "../pages/member/UserAddChildRequestPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. DEFAULT: Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 2. AUTHENTICATION */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* 3. ADMIN ROUTES */}
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
      </Route>

      {/* 4. MEMBER ROUTES */}
      <Route path="/member" element={<MemberLayout />}>
        <Route index element={<Navigate to="/member/dashboard" />} />
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="family-tree" element={<MemberFamilyTreePage />} />
        <Route
          path="fund-notifications"
          element={<MemberFundNotificationsPage />}
        />
        <Route path="payment-history" element={<MemberPaymentHistoryPage />} />
        <Route path="fund-report" element={<MemberFundReportPage />} />
        <Route path="ancestral-house" element={<MemberAncestralHousePage />} />
        <Route path="profile" element={<MemberProfilePage />} />
        <Route
          path="add-child-request"
          element={<MemberAddChildRequestPage />}
        />
      </Route>

      {/* 5. 404 NOT FOUND */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;

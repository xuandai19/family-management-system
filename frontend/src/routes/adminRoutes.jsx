import React from "react";
import { Route, Navigate } from "react-router-dom";

// Admin Layout
import AdminLayout from "../layouts/admin/AdminLayout";

// Admin Pages
import DashboardPage from "../pages/admin/dashboardPage";
import FamilyTreePage from "../pages/admin/familyTreePage";
import PendingMemberPage from "../pages/admin/pendingMemberPage";
import EventPage from "../pages/admin/eventPage";
import UserManagementPage from "../pages/admin/userManagent";
import FundPage from "../pages/admin/funPage";
import AncestralHousePage from "../pages/admin/ancestralHousePage";
import SettingsPage from "../pages/admin/settingPage";
import PostsPage from "../pages/admin/postsPage";
import NotificationPage from "../pages/admin/notificationPage";

/**
 * Admin Routes Configuration
 * Sử dụng trong App.jsx bên trong <Routes>
 */
const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="/admin/dashboard" />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="family-tree" element={<FamilyTreePage />} />
    <Route path="pending-members" element={<PendingMemberPage />} />
    <Route path="events" element={<EventPage />} />
    <Route path="members" element={<UserManagementPage />} />
    <Route path="funds" element={<FundPage />} />
    <Route path="ancestral-house" element={<AncestralHousePage />} />
    <Route path="posts" element={<PostsPage />} />
    <Route path="notifications" element={<NotificationPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
);

export default adminRoutes;

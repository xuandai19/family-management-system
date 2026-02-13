import React from "react";
import { Route, Navigate } from "react-router-dom";

// Layout
import { MemberLayout } from "../layouts/member";

// Pages
import UserDashboard from "../pages/member/UserDashboard";
import UserFamilyTreePage from "../pages/member/UserFamilyTreePage";
import UserFundNotificationsPage from "../pages/member/UserFundNotificationsPage";
import UserPaymentHistoryPage from "../pages/member/UserPaymentHistoryPage";
import UserFundReportPage from "../pages/member/UserFundReportPage";
import UserAncestralHousePage from "../pages/member/UserAncestralHousePage";
import UserProfilePage from "../pages/member/UserProfilePage";
import UserAddChildRequestPage from "../pages/member/UserAddChildRequestPage";
import UserEventsPage from "../pages/member/UserEventsPage";
import UserProposeEventPage from "../pages/member/UserProposeEventPage";
import UserPostsPage from "../pages/member/UserPostsPage";
import UserProposePostPage from "../pages/member/UserProposePostPage";
import UserProposeExpensePage from "../pages/member/UserProposeExpensePage";
import Profile from "../pages/member/Profile";
import ChangePassword from "../pages/member/ChangePassword";

/**
 * Cấu hình routes cho phần Member
 * Sử dụng trong AppRoutes.jsx
 */
const memberRoutes = (
  <Route path="/member" element={<MemberLayout />}>
    <Route index element={<Navigate to="/member/dashboard" />} />
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="family-tree" element={<UserFamilyTreePage />} />
    <Route path="fund-notifications" element={<UserFundNotificationsPage />} />
    <Route path="payment-history" element={<UserPaymentHistoryPage />} />
    <Route path="fund-report" element={<UserFundReportPage />} />
    <Route path="ancestral-house" element={<UserAncestralHousePage />} />
    <Route path="profile" element={<UserProfilePage />} />
    <Route path="profile/view" element={<Profile />} />
    <Route path="add-child-request" element={<UserAddChildRequestPage />} />
    <Route path="events" element={<UserEventsPage />} />
    <Route path="propose-event" element={<UserProposeEventPage />} />
    <Route path="posts" element={<UserPostsPage />} />
    <Route path="propose-post" element={<UserProposePostPage />} />
    <Route path="propose-expense" element={<UserProposeExpensePage />} />
    <Route path="change-password" element={<ChangePassword />} />
  </Route>
);

export default memberRoutes;

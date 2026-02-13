import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";

// Layouts
import AdminLayout from "./components/admin/layout/AdminLayout";
import MemberLayout from "./components/member/layout/MemberLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/dashboardPage";
import FamilyTree from "./pages/admin/familyTreePage";
import PendingMembers from "./pages/admin/pendingMemberPage";
import Event from "./pages/admin/eventPage";
import UserManagement from "./pages/admin/userManagent";
import FunPage from "./pages/admin/funPage";
import AncestralHousePage from "./pages/admin/ancestralHousePage";
import SettingPage from "./pages/admin/settingPage";
import PostsPage from "./pages/admin/postsPage";
import NotificationPage from "./pages/admin/notificationPage";

// Member Pages
import MemberDashboard from "./pages/member/UserDashboard";
import MemberFamilyTreePage from "./pages/member/UserFamilyTreePage";
import MemberFundNotificationsPage from "./pages/member/UserFundNotificationsPage";
import MemberPaymentHistoryPage from "./pages/member/UserPaymentHistoryPage";
import MemberFundReportPage from "./pages/member/UserFundReportPage";
import MemberAncestralHousePage from "./pages/member/UserAncestralHousePage";
import MemberProfilePage from "./pages/member/UserProfilePage";
import MemberAddChildRequestPage from "./pages/member/UserAddChildRequestPage";

// New Member Pages - Events
import MemberEventsPage from "./pages/member/UserEventsPage";
import MemberProposeEventPage from "./pages/member/UserProposeEventPage";

// New Member Pages - Finance
import MemberProposeExpensePage from "./pages/member/UserProposeExpensePage";

// New Member Pages - Posts
import MemberPostsPage from "./pages/member/UserPostsPage";
import MemberProposePostPage from "./pages/member/UserProposePostPage";

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

        {/* 4. MEMBER - Sử dụng MemberLayout */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<Navigate to="/member/dashboard" />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="family-tree" element={<MemberFamilyTreePage />} />

          {/* Events */}
          <Route path="events" element={<MemberEventsPage />} />
          <Route path="propose-event" element={<MemberProposeEventPage />} />

          {/* Fund & Finance */}
          <Route
            path="fund-notifications"
            element={<MemberFundNotificationsPage />}
          />
          <Route
            path="payment-history"
            element={<MemberPaymentHistoryPage />}
          />
          <Route path="fund-report" element={<MemberFundReportPage />} />
          <Route
            path="propose-expense"
            element={<MemberProposeExpensePage />}
          />

          {/* Ancestral House */}
          <Route
            path="ancestral-house"
            element={<MemberAncestralHousePage />}
          />

          {/* Posts */}
          <Route path="posts" element={<MemberPostsPage />} />
          <Route path="propose-post" element={<MemberProposePostPage />} />

          {/* Profile & Others */}
          <Route path="profile" element={<MemberProfilePage />} />
          <Route
            path="add-child-request"
            element={<MemberAddChildRequestPage />}
          />
        </Route>

        {/* 5. KHÔNG TÌM THẤY TRANG */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

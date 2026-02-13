import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";

const MemberLayout = () => {
  // Kiểm tra đăng nhập
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Debug - xem console để kiểm tra
  console.log("MemberLayout - Token:", token);
  console.log("MemberLayout - User:", user);

  // Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra nếu là admin thì redirect về trang admin
  const roleId = user?.profile?.role_id;
  if (roleId == 1) {
    console.log("Là Admin, redirect về admin dashboard");
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar cố định */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <MemberSidebar />
      </div>

      {/* Main Content - margin-left để không bị sidebar đè */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default MemberLayout;

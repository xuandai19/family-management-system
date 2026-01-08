import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../adminComponents/AdminSidebar";

const AdminLayout = () => {
  // Kiểm tra đăng nhập và quyền admin
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Debug - xem console để kiểm tra
  console.log("Token:", token);
  console.log("User:", user);
  console.log("Role ID:", user?.profile?.role_id);
  // Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Không phải admin - dùng == để so sánh cả string và number
  const roleId = user?.profile?.role_id;
  if (roleId != 1) {
    console.log("Không phải Admin, redirect về login");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar cố định */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <AdminSidebar />
      </div>

      {/* Main Content - margin-left để không bị sidebar đè */}
      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

const AdminLayout = () => {
  // Kiểm tra đăng nhập và quyền admin
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Không phải admin (role_id = 1)
  if (user?.profile?.role_id !== 1) {
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

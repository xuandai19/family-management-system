import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/AdminSidebar.jsx";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* 1. Gọi Sidebar ra */}
      <Sidebar />

      {/* 2. Phần nội dung chính của trang */}
      {/* ml-64 để đẩy nội dung sang phải, tránh bị Sidebar che mất (vì Sidebar dùng fixed w-64) */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* <Outlet /> là nơi các trang con (Dashboard, Members, v.v.) sẽ hiển thị */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

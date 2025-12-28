import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  TreePine,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Calendar,
  Wallet,
  FileText,
} from "lucide-react";
import LoginBg from "../assets/imgs/Login.jpg";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Tổng quan",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      id: "pending",
      label: "Yêu cầu chờ duyệt",
      icon: UserCheck,
      path: "/admin/pending-members",
      badge: true,
    },
    {
      id: "members",
      label: "Quản lý thành viên",
      icon: Users,
      path: "/admin/members",
    },
    {
      id: "family-tree",
      label: "Cây gia phả",
      icon: TreePine,
      path: "/admin/family-tree",
    },
    {
      id: "events",
      label: "Sự kiện",
      icon: Calendar,
      path: "/admin/events",
    },
    {
      id: "funds",
      label: "Quỹ gia đình",
      icon: Wallet,
      path: "/admin/funds",
    },
    {
      id: "posts",
      label: "Bài viết",
      icon: FileText,
      path: "/admin/posts",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: Bell,
      path: "/admin/notifications",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen text-white transition-all duration-300 flex flex-col shadow-2xl relative overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B6914]/95 via-[#8B6914]/90 to-[#6B5210]/95" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#ffe2a1]/20 shrink-0">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-10 h-10 bg-[#ffe2a1] rounded-xl flex items-center justify-center shrink-0">
                <TreePine size={24} className="text-[#8B6914]" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-black tracking-tight">GIA PHẢ</h1>
                  <p className="text-[#ffe2a1] text-xs">Quản trị hệ thống</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Menu Items - không cuộn */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${
                    active
                      ? "bg-[#ffe2a1] text-[#8B6914] shadow-lg"
                      : "hover:bg-white/10 text-white/90 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon
                  size={20}
                  className={active ? "text-[#8B6914]" : "text-[#ffe2a1]"}
                />
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        3
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip khi collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        3
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-[#ffe2a1]/20 shrink-0">
          {/* User Info */}
          <div
            className={`flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl mb-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-[#ffe2a1] rounded-full flex items-center justify-center shrink-0">
              <span className="text-[#8B6914] font-bold text-sm">AD</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">Admin</p>
                <p className="text-[#ffe2a1] text-xs truncate">Trưởng tộc</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} />
            {!isCollapsed && (
              <span className="font-medium text-sm">Đăng xuất</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

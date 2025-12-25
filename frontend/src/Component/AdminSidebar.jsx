import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GitGraph,
  CalendarDays,
  History,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Bảng điều khiển",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/members",
      name: "Quản lý thành viên",
      icon: <Users size={20} />,
    },
    {
      path: "/admin/family-tree",
      name: "Cây gia phả",
      icon: <GitGraph size={20} />,
    },
    {
      path: "/admin/events",
      name: "Sự kiện & Giỗ chạp",
      icon: <CalendarDays size={20} />,
    },
    {
      path: "/admin/history",
      name: "Lịch sử dòng họ",
      icon: <History size={20} />,
    },
    { path: "/admin/funds", name: "Quản lý quỹ", icon: <Wallet size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-center">
        <h2 className="text-xl font-bold text-amber-500 tracking-wider uppercase">
          Gia Tộc Admin
        </h2>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Chính
        </p>

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
              ${
                isActive
                  ? "bg-amber-500 text-slate-900 font-semibold shadow-lg shadow-amber-500/20"
                  : "hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>
            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </NavLink>
        ))}

        <div className="my-6 border-t border-slate-800 mx-2"></div>

        <p className="px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Hệ thống
        </p>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-all
            ${
              isActive
                ? "bg-amber-500 text-slate-900 font-semibold"
                : "hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <Settings size={20} />
          <span className="text-sm">Cấu hình</span>
        </NavLink>
      </nav>

      {/* User / Logout Section */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group">
          <LogOut
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

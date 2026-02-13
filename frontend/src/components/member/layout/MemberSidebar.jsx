import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TreePine,
  Bell,
  Wallet,
  House,
  UserPlus,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  History,
  Calendar,
  FileText,
  Hammer,
  DollarSign,
} from "lucide-react";
import LoginBg from "../../../assets/imgs/Login.jpg";

const MemberSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Trang chủ",
      icon: LayoutDashboard,
      path: "/member/dashboard",
    },
    {
      id: "family-tree",
      label: "Cây gia phả",
      icon: TreePine,
      path: "/member/family-tree",
    },
    {
      id: "events",
      label: "Sự kiện",
      icon: Calendar,
      path: "/member/events",
    },
    {
      id: "fund-notifications",
      label: "Thông báo đóng quỹ",
      icon: Bell,
      path: "/member/fund-notifications",
    },
    {
      id: "fund-report",
      label: "Thu chi quỹ",
      icon: Wallet,
      path: "/member/fund-report",
    },
    {
      id: "ancestral-house",
      label: "Từ đường",
      icon: House,
      path: "/member/ancestral-house",
    },
    {
      id: "posts",
      label: "Bài viết",
      icon: FileText,
      path: "/member/posts",
    },
    {
      id: "add-child",
      label: "Đề xuất thành viên",
      icon: UserPlus,
      path: "/member/add-child-request",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/member/profile");
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
      {/* Overlay - Giống Admin */}
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
                  <p className="text-[#ffe2a1] text-xs">Thành viên</p>
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

        {/* User Profile Section - Click để xem thông tin */}
        <div
          className="p-4 border-b border-[#ffe2a1]/20 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={handleProfileClick}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-12 h-12 bg-[#ffe2a1] rounded-full flex items-center justify-center shrink-0 ring-2 ring-white/30">
              {user?.profile?.avatar_url ? (
                <img
                  src={user.profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={24} className="text-[#8B6914]" />
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user?.profile?.full_name || "Thành viên"}
                </p>
                <p className="text-xs text-[#ffe2a1] truncate">
                  Xem thông tin cá nhân
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
                    {item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip khi collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                    {item.badge > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-[#ffe2a1]/20 shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-white/80 hover:text-white transition-colors
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} className="text-red-300" />
            {!isCollapsed && (
              <span className="font-medium text-sm">Đăng xuất</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSidebar;

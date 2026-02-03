import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TreePine,
  Bell,
  Wallet,
  House,
  UserPlus,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    familyMembers: 0,
    pendingNotifications: 0,
    totalContributed: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    // Mock stats - thay bằng API thực tế
    setStats({
      familyMembers: 156,
      pendingNotifications: 2,
      totalContributed: 5500000,
    });
  }, []);

  const quickLinks = [
    {
      icon: TreePine,
      label: "Xem cây gia phả",
      path: "/user/family-tree",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      description: "Khám phá nguồn gốc dòng họ",
    },
    {
      icon: Bell,
      label: "Thông báo đóng quỹ",
      path: "/user/fund-notifications",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
      description: "Xem các thông báo mới",
      badge: stats.pendingNotifications,
    },
    {
      icon: Wallet,
      label: "Thu chi quỹ",
      path: "/user/fund-report",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      description: "Báo cáo tài chính dòng họ",
    },
    {
      icon: House,
      label: "Từ đường",
      path: "/user/ancestral-house",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      description: "Thông tin nhà thờ tổ",
    },
    {
      icon: UserPlus,
      label: "Đề xuất thêm con",
      path: "/user/add-child-request",
      color: "bg-rose-50 text-rose-600 hover:bg-rose-100",
      description: "Thêm thành viên mới",
    },
    {
      icon: Clock,
      label: "Lịch sử đóng quỹ",
      path: "/user/payment-history",
      color: "bg-teal-50 text-teal-600 hover:bg-teal-100",
      description: "Xem lịch sử đóng góp",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Lễ Giỗ Tổ",
      date: "2026-02-15",
      type: "ceremony",
      color: "border-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: 2,
      title: "Họp mặt đầu năm",
      date: "2026-02-20",
      type: "meeting",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Thanh minh",
      date: "2026-04-05",
      type: "ceremony",
      color: "border-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B6914] via-[#9A7B1A] to-[#8B6914] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Xin chào, {user?.profile?.full_name || "Thành viên"}! 👋
          </h1>
          <p className="text-[#ffe2a1]">
            Chào mừng trở lại với Hệ thống Quản lý Gia Phả Dòng Họ
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Thành viên dòng họ</p>
                <p className="text-2xl font-bold text-slate-800">
                  {stats.familyMembers}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <TreePine size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Thông báo chờ xử lý</p>
                <p className="text-2xl font-bold text-slate-800">
                  {stats.pendingNotifications}
                </p>
              </div>
              <div className="bg-amber-100 rounded-full p-3">
                <Bell size={24} className="text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Tổng đã đóng góp</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(stats.totalContributed)}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Truy cập nhanh
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`${link.color} p-5 rounded-xl transition-all duration-200 text-left group relative`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Icon size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          {link.label}
                        </span>
                        {link.badge > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm opacity-75 mt-1">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <section>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-[#8B6914]" />
                Sự kiện sắp tới
              </h2>

              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${event.bgColor} p-4 rounded-lg border-l-4 ${event.color}`}
                    >
                      <p className="font-medium text-slate-800">
                        {event.title}
                      </p>
                      <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                        <Calendar size={14} />
                        {formatDate(event.date)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">Không có sự kiện nào sắp tới</p>
                </div>
              )}
            </div>
          </section>

          {/* Quick Info */}
          <section>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <House size={24} className="text-[#8B6914]" />
                Thông tin dòng họ
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Thế hệ của bạn</p>
                  <p className="text-lg font-semibold text-slate-800">
                    Đời thứ {user?.profile?.generation || "?"}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Vai trò</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {user?.profile?.role_id === 1
                      ? "Quản trị viên"
                      : "Thành viên"}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/user/profile")}
                  className="w-full py-3 bg-[#8B6914] hover:bg-[#6B5210] text-white font-medium rounded-lg transition"
                >
                  Xem thông tin cá nhân
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

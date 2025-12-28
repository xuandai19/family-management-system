import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  TreePine,
  Calendar,
  Wallet,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu thống kê
  const stats = [
    {
      label: "Tổng thành viên",
      value: 156,
      icon: Users,
      color: "bg-blue-500",
      change: "+12",
      changeType: "increase",
    },
    {
      label: "Chờ duyệt",
      value: 5,
      icon: UserCheck,
      color: "bg-orange-500",
      change: "Mới",
      changeType: "new",
    },
    {
      label: "Đời trong gia phả",
      value: 6,
      icon: TreePine,
      color: "bg-green-500",
    },
    {
      label: "Sự kiện sắp tới",
      value: 3,
      icon: Calendar,
      color: "bg-purple-500",
      change: "Tuần này",
      changeType: "info",
    },
  ];

  // Dữ liệu mẫu yêu cầu chờ duyệt
  const pendingRequests = [
    { id: 1, name: "Nguyễn Văn Hoàng", date: "26/12/2024" },
    { id: 2, name: "Trần Thị Mai", date: "25/12/2024" },
    { id: 3, name: "Lê Văn Đức", date: "24/12/2024" },
  ];

  // Dữ liệu mẫu sự kiện sắp tới
  const upcomingEvents = [
    { id: 1, title: "Giỗ tổ họ Nguyễn", date: "01/01/2025", type: "ceremony" },
    { id: 2, title: "Họp mặt đầu năm", date: "05/01/2025", type: "meeting" },
    { id: 3, title: "Sinh nhật cụ Nguyễn Văn A", date: "10/01/2025", type: "birthday" },
  ];

  // Dữ liệu mẫu hoạt động gần đây
  const recentActivities = [
    { id: 1, action: "Thêm thành viên mới", user: "Admin", time: "5 phút trước" },
    { id: 2, action: "Duyệt yêu cầu đăng ký", user: "Admin", time: "1 giờ trước" },
    { id: 3, action: "Cập nhật thông tin gia phả", user: "Admin", time: "2 giờ trước" },
    { id: 4, action: "Tạo sự kiện mới", user: "Admin", time: "Hôm qua" },
  ];

  const getEventTypeStyle = (type) => {
    switch (type) {
      case "ceremony":
        return "bg-red-100 text-red-500";
      case "meeting":
        return "bg-blue-100 text-blue-500";
      case "birthday":
        return "bg-purple-100 text-purple-500";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
        <p className="text-slate-500">Chào mừng trở lại, Trưởng tộc!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <span
                      className={`text-xs font-medium mt-2 inline-block px-2 py-1 rounded-full
                        ${stat.changeType === "increase" ? "bg-green-100 text-green-600" : ""}
                        ${stat.changeType === "new" ? "bg-orange-100 text-orange-600" : ""}
                        ${stat.changeType === "info" ? "bg-blue-100 text-blue-600" : ""}
                      `}
                    >
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yêu cầu chờ duyệt */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Yêu cầu chờ duyệt</h2>
            <button
              onClick={() => navigate("/admin/pending-members")}
              className="text-[#d4a843] hover:text-[#8B6914] text-sm font-medium flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-6">
            {pendingRequests.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Không có yêu cầu nào</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#ffe2a1] rounded-full flex items-center justify-center">
                        <span className="text-[#8B6914] font-bold">
                          {req.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{req.name}</p>
                        <p className="text-sm text-slate-500">{req.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#d4a843] text-white rounded-lg hover:bg-[#8B6914] transition-colors text-sm font-medium">
                        Duyệt
                      </button>
                      <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium">
                        Xem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sự kiện sắp tới */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Sự kiện sắp tới</h2>
            <button className="text-[#d4a843] hover:text-[#8B6914] text-sm font-medium flex items-center gap-1">
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getEventTypeStyle(event.type)}`}>
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{event.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Hoạt động gần đây */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Hoạt động gần đây</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#d4a843] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thống kê quỹ */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Quỹ gia đình</h2>
            <Wallet className="text-[#d4a843]" size={24} />
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-slate-500 text-sm">Tổng quỹ hiện tại</p>
              <p className="text-3xl font-bold text-[#8B6914] mt-2">
                125.500.000 ₫
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">Thu</span>
                </div>
                <p className="text-lg font-bold text-green-700">+15.000.000 ₫</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <TrendingDown size={16} />
                  <span className="text-sm font-medium">Chi</span>
                </div>
                <p className="text-lg font-bold text-red-700">-8.500.000 ₫</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
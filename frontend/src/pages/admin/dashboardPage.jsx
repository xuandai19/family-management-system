import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentPending,
  getUpcomingEvents,
  getRecentActivities,
} from "../../services/admin/dashboardApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingCount: 0,
    maxGeneration: 0,
    upcomingEventsCount: 0,
    totalFund: 0,
    monthIncome: 0,
    monthExpense: 0,
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, pendingRes, eventsRes, activitiesRes] =
        await Promise.all([
          getDashboardStats(),
          getRecentPending(),
          getUpcomingEvents(),
          getRecentActivities(),
        ]);

      if (statsRes.success) setStats(statsRes.data);
      if (pendingRes.success) setPendingRequests(pendingRes.data || []);
      if (eventsRes.success) setUpcomingEvents(eventsRes.data || []);
      if (activitiesRes.success) setRecentActivities(activitiesRes.data || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày trước`;
  };

  const getEventTypeStyle = (type) => {
    switch (type) {
      case "anniversary":
        return "bg-red-100 text-red-500";
      case "reunion":
        return "bg-blue-100 text-blue-500";
      case "birthday":
        return "bg-purple-100 text-purple-500";
      case "worship":
        return "bg-amber-100 text-amber-500";
      case "wedding":
        return "bg-pink-100 text-pink-500";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const statsCards = [
    {
      label: "Tổng thành viên",
      value: stats.totalMembers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Chờ duyệt",
      value: stats.pendingCount,
      icon: UserCheck,
      color: "bg-orange-500",
      change: stats.pendingCount > 0 ? "Mới" : null,
      changeType: "new",
    },
    {
      label: "Đời trong gia phả",
      value: stats.maxGeneration,
      icon: TreePine,
      color: "bg-green-500",
    },
    {
      label: "Sự kiện sắp tới",
      value: stats.upcomingEventsCount,
      icon: Calendar,
      color: "bg-purple-500",
      change: stats.upcomingEventsCount > 0 ? "30 ngày" : null,
      changeType: "info",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-[#d4a843] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
        <p className="text-slate-500">Chào mừng trở lại, Trưởng tộc!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
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
                        ${
                          stat.changeType === "increase"
                            ? "bg-green-100 text-green-600"
                            : ""
                        }
                        ${
                          stat.changeType === "new"
                            ? "bg-orange-100 text-orange-600"
                            : ""
                        }
                        ${
                          stat.changeType === "info"
                            ? "bg-blue-100 text-blue-600"
                            : ""
                        }
                      `}
                    >
                      {stat.change}
                    </span>
                  )}
                </div>
                <div
                  className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}
                >
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
            <h2 className="text-lg font-bold text-slate-800">
              Yêu cầu chờ duyệt
            </h2>
            <button
              onClick={() => navigate("/admin/pending-members")}
              className="text-[#d4a843] hover:text-[#8B6914] text-sm font-medium flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-6">
            {pendingRequests.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                Không có yêu cầu nào
              </p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {req.avatar_url ? (
                        <img
                          src={req.avatar_url}
                          alt={req.full_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[#ffe2a1] rounded-full flex items-center justify-center">
                          <span className="text-[#8B6914] font-bold">
                            {req.full_name?.charAt(0) || "?"}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-800">
                          {req.full_name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatDate(req.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/admin/pending-members")}
                        className="px-4 py-2 bg-[#d4a843] text-white rounded-lg hover:bg-[#8B6914] transition-colors text-sm font-medium"
                      >
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
            <h2 className="text-lg font-bold text-slate-800">
              Sự kiện sắp tới
            </h2>
            <button
              onClick={() => navigate("/admin/events")}
              className="text-[#d4a843] hover:text-[#8B6914] text-sm font-medium flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                Không có sự kiện
              </p>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getEventTypeStyle(
                      event.event_type
                    )}`}
                  >
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatDate(event.event_date)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Hoạt động gần đây */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">
              Hoạt động gần đây
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                Chưa có hoạt động
              </p>
            ) : (
              recentActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#d4a843] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">
                      {activity.user} • {formatTimeAgo(activity.time)}
                    </p>
                  </div>
                </div>
              ))
            )}
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
                {formatCurrency(stats.totalFund)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">Thu tháng này</span>
                </div>
                <p className="text-lg font-bold text-green-700">
                  +{formatCurrency(stats.monthIncome)}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <TrendingDown size={16} />
                  <span className="text-sm font-medium">Chi tháng này</span>
                </div>
                <p className="text-lg font-bold text-red-700">
                  -{formatCurrency(stats.monthExpense)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

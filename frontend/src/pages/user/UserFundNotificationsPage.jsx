import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  History,
  Wallet,
  CreditCard,
} from "lucide-react";
import PageHeader from "./components/PageHeader";
import QuickNavigation from "./components/QuickNavigation";

const UserFundNotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Các link liên quan
  const relatedLinks = [
    {
      icon: History,
      label: "Lịch sử đóng quỹ",
      description: "Xem lịch sử đóng góp",
      path: "/user/payment-history",
    },
    {
      icon: Wallet,
      label: "Thu chi quỹ",
      description: "Báo cáo tài chính",
      path: "/user/fund-report",
    },
  ];

  useEffect(() => {
    // TODO: Fetch từ API thực tế
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Mock data - thay bằng API call thực tế
        const mockData = [
          {
            id: 1,
            title: "Thông báo đóng quỹ tháng 1/2026",
            content:
              "Kính mời các thành viên đóng quỹ tháng 1 năm 2026. Hạn đóng: 31/01/2026",
            amount: 500000,
            deadline: "2026-01-31",
            status: "pending",
            createdAt: "2026-01-05",
          },
          {
            id: 2,
            title: "Thông báo đóng quỹ Tết Nguyên Đán",
            content:
              "Để chuẩn bị cho lễ cúng Tết tại từ đường, xin mời đóng góp quỹ Tết",
            amount: 1000000,
            deadline: "2026-01-20",
            status: "completed",
            createdAt: "2026-01-02",
          },
          {
            id: 3,
            title: "Thông báo đóng quỹ sửa chữa từ đường",
            content: "Để tu sửa từ đường, xin mời các thành viên đóng góp",
            amount: 2000000,
            deadline: "2025-12-15",
            status: "overdue",
            createdAt: "2025-11-20",
          },
        ];
        setNotifications(mockData);
      } catch (error) {
        console.error("Lỗi fetch notifications:", error);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Clock size={12} />
            Chờ đóng
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Đã đóng
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle size={12} />
            Quá hạn
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6914]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
      {/* Header với Breadcrumb */}
      <PageHeader
        icon={Bell}
        title="Thông Báo Đóng Quỹ"
        description="Các thông báo đóng quỹ dòng họ"
        breadcrumbs={[{ label: "Thông báo đóng quỹ" }]}
      />

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-md border p-6 transition hover:shadow-lg ${
                notification.status === "overdue"
                  ? "border-red-200"
                  : notification.status === "pending"
                  ? "border-yellow-200"
                  : "border-green-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {notification.title}
                    </h3>
                    {getStatusBadge(notification.status)}
                  </div>
                  <p className="text-slate-600 mb-4">{notification.content}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#8B6914]">
                      <DollarSign size={16} />
                      <span className="font-medium">
                        {formatCurrency(notification.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={16} />
                      <span>Hạn: {formatDate(notification.deadline)}</span>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  {notification.status === "pending" && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => navigate("/user/payment-history")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B6914] text-white rounded-lg hover:bg-[#6B5210] transition-colors text-sm font-medium"
                      >
                        <CreditCard size={16} />
                        Xem lịch sử đóng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Bell size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Không có thông báo đóng quỹ nào</p>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <QuickNavigation
        title="Liên kết nhanh"
        items={relatedLinks}
        className="mt-8"
      />
    </div>
  );
};

export default UserFundNotificationsPage;

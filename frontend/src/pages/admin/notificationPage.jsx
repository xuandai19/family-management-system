import React, { useState, useEffect, useMemo } from "react";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import {
  NotifiStats,
  NotifiFilters,
  NotifiList,
  NotifiDetailModal,
} from "../../components/admin/Notifi";
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../../services/admin/notifiApi";
import { useToast } from "../../hooks/admin";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("unread");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { toast, showToast } = useToast();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, unreadRes, countRes] = await Promise.all([
        getAllNotifications(),
        getUnreadNotifications(),
        getUnreadCount(),
      ]);
      setNotifications(allRes.data || []);
      setUnreadNotifications(unreadRes.data || []);
      setUnreadCount(countRes.count || 0);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast("Lỗi khi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      showToast("Đã đánh dấu đã đọc");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadNotifications.length === 0) return;
    try {
      await markAllAsRead();
      showToast("Đã đánh dấu tất cả đã đọc");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa thông báo này?")) return;
    try {
      await deleteNotification(id);
      showToast("Đã xóa thông báo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleViewDetail = (notification) => {
    setSelectedNotification(notification);
    setShowDetailModal(true);
  };

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: notifications.length,
      unread: unreadCount,
      read: notifications.filter((n) => n.is_read).length,
      requests: notifications.filter((n) => n.type === "request").length,
    };
  }, [notifications, unreadCount]);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    const source = activeTab === "unread" ? unreadNotifications : notifications;
    return source.filter((notification) => {
      const matchSearch =
        notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = !filterType || notification.type === filterType;
      return matchSearch && matchType;
    });
  }, [notifications, unreadNotifications, activeTab, searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-800 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Thông báo</h1>
          </div>
          <p className="text-gray-500">
            Quản lý và xem các thông báo từ hệ thống và người dùng
          </p>
        </div>

        {/* Stats */}
        <NotifiStats stats={stats} />

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Filters */}
          <NotifiFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            unreadCount={stats.unread}
            onMarkAllRead={handleMarkAllRead}
          />

          {/* Notifications List */}
          <NotifiList
            notifications={filteredNotifications}
            loading={loading}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <NotifiDetailModal
          notification={selectedNotification}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedNotification(null);
          }}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl z-50 ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {toast.type === "error" ? (
            <XCircle size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;

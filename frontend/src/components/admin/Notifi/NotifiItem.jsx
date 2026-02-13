import React from "react";
import {
  Bell,
  Clock,
  AlertTriangle,
  Check,
  Trash2,
  User,
  Calendar,
  Eye,
} from "lucide-react";

const NOTIFI_TYPES = {
  event: { label: "Sự kiện", icon: Bell, color: "text-blue-600 bg-blue-50" },
  request: {
    label: "Yêu cầu",
    icon: AlertTriangle,
    color: "text-amber-600 bg-amber-50",
  },
  system: {
    label: "Hệ thống",
    icon: Bell,
    color: "text-purple-600 bg-purple-50",
  },
  reminder: {
    label: "Nhắc nhở",
    icon: Clock,
    color: "text-green-600 bg-green-50",
  },
};

const NotifiItem = ({ notification, onMarkRead, onDelete, onViewDetail }) => {
  const TypeIcon = NOTIFI_TYPES[notification.type]?.icon || Bell;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`p-4 hover:bg-gray-50 transition ${
        !notification.is_read ? "bg-blue-50/30" : ""
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`p-3 rounded-lg ${
            NOTIFI_TYPES[notification.type]?.color || "bg-gray-50 text-gray-600"
          }`}
        >
          <TypeIcon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {notification.title}
                </h3>
                {!notification.is_read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {notification.message}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {notification.user?.username || "Hệ thống"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(notification.created_at)}
                </span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    NOTIFI_TYPES[notification.type]?.color || "bg-gray-100"
                  }`}
                >
                  {NOTIFI_TYPES[notification.type]?.label || "Khác"}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    notification.is_read
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {notification.is_read ? "Đã đọc" : "Chưa đọc"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {!notification.is_read && (
                  <button
                    onClick={() => onMarkRead(notification.id)}
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                    title="Đánh dấu đã đọc"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => onViewDetail(notification)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Xem chi tiết"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onDelete(notification.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Xóa"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifiItem;

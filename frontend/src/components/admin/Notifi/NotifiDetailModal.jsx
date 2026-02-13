import React from "react";
import {
  X,
  Bell,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Check,
  Trash2,
  FileText,
} from "lucide-react";

const NOTIFI_TYPES = {
  event: { label: "Sự kiện", icon: Bell, color: "text-blue-600 bg-blue-100" },
  request: {
    label: "Yêu cầu",
    icon: AlertTriangle,
    color: "text-amber-600 bg-amber-100",
  },
  system: {
    label: "Hệ thống",
    icon: Bell,
    color: "text-purple-600 bg-purple-100",
  },
  reminder: {
    label: "Nhắc nhở",
    icon: Clock,
    color: "text-green-600 bg-green-100",
  },
};

const NotifiDetailModal = ({ notification, onClose, onMarkRead, onDelete }) => {
  if (!notification) return null;

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

  const handleMarkRead = () => {
    onMarkRead(notification.id);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
      onDelete(notification.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                NOTIFI_TYPES[notification.type]?.color || "bg-gray-100"
              }`}
            >
              <TypeIcon size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                Chi tiết thông báo
              </h2>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  NOTIFI_TYPES[notification.type]?.color || "bg-gray-100"
                }`}
              >
                {NOTIFI_TYPES[notification.type]?.label || "Khác"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">Tiêu đề</label>
            <p className="text-gray-900 font-medium">{notification.title}</p>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">Nội dung</label>
            <div className="bg-gray-50 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">
              {notification.message || "-"}
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">Người gửi</label>
                <p className="text-sm text-gray-700">
                  {notification.user?.username || "Hệ thống"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">Thời gian</label>
                <p className="text-sm text-gray-700">
                  {formatDate(notification.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Related info */}
          {notification.related_id && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <FileText size={16} className="text-blue-600" />
              <div>
                <label className="text-xs text-blue-600">Liên kết</label>
                <p className="text-sm text-blue-700">
                  {notification.related_type} #{notification.related_id}
                </p>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                notification.is_read
                  ? "bg-gray-100 text-gray-600"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {notification.is_read ? "✓ Đã đọc" : "○ Chưa đọc"}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
          >
            <Trash2 size={16} />
            Xóa
          </button>
          {!notification.is_read && (
            <button
              onClick={handleMarkRead}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Check size={16} />
              Đánh dấu đã đọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotifiDetailModal;

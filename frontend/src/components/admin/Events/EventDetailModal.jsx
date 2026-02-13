import React from "react";
import {
  X,
  Calendar,
  MapPin,
  Clock,
  User,
  Bell,
  Repeat,
  Edit,
  Trash2,
  Share2,
  ExternalLink,
} from "lucide-react";
import { EVENT_TYPES } from "../../../services/admin/eventApi";

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return "Chưa xác định";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "Chưa xác định";
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get days until event
const getDaysUntil = (eventDate) => {
  if (!eventDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  const diffTime = event - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const EventDetailModal = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onDelete,
  isAdmin = true,
}) => {
  if (!isOpen || !event) return null;

  const eventType = EVENT_TYPES[event.event_type] || EVENT_TYPES.other;
  const daysUntil = getDaysUntil(event.event_date);

  // Color classes
  const colorClasses = {
    pink: { bg: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600" },
    gray: { bg: "bg-gray-500", light: "bg-gray-50", text: "text-gray-600" },
    purple: {
      bg: "bg-purple-500",
      light: "bg-purple-50",
      text: "text-purple-600",
    },
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
    amber: { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" },
    green: { bg: "bg-green-500", light: "bg-green-50", text: "text-green-600" },
    slate: { bg: "bg-slate-500", light: "bg-slate-50", text: "text-slate-600" },
  };
  const colors = colorClasses[eventType.color] || colorClasses.slate;

  // Status text
  const getStatusText = () => {
    if (daysUntil === null) return null;
    if (daysUntil < 0)
      return {
        text: `Đã diễn ra ${Math.abs(daysUntil)} ngày trước`,
        color: "text-gray-500",
      };
    if (daysUntil === 0)
      return { text: "Hôm nay!", color: "text-red-500 font-bold" };
    if (daysUntil === 1)
      return { text: "Ngày mai!", color: "text-orange-500 font-bold" };
    if (daysUntil <= 7)
      return {
        text: `Còn ${daysUntil} ngày`,
        color: "text-amber-500 font-semibold",
      };
    return { text: `Còn ${daysUntil} ngày`, color: "text-emerald-500" };
  };

  const status = getStatusText();

  // Share event
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${formatDate(event.event_date)}${
          event.location ? ` tại ${event.location}` : ""
        }`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      const text = `${event.title}\n📅 ${formatDate(event.event_date)}${
        event.location ? `\n📍 ${event.location}` : ""
      }`;
      navigator.clipboard.writeText(text);
      alert("Đã sao chép thông tin sự kiện!");
    }
  };

  // Add to calendar
  const handleAddToCalendar = () => {
    const startDate = new Date(event.event_date);
    const endDate = event.end_date
      ? new Date(event.end_date)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatGoogleDate = (date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title,
    )}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(
      endDate,
    )}&details=${encodeURIComponent(
      event.description || "",
    )}&location=${encodeURIComponent(event.location || "")}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
        {/* Header with gradient */}
        <div
          className={`${colors.bg} px-6 py-8 text-white relative overflow-hidden`}
        >
          {/* Pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{eventType.icon}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {eventType.label}
              </span>
              {event.is_recurring && (
                <span className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                  <Repeat size={14} />
                  Hàng năm
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

            {status && (
              <p
                className={`text-lg ${status.color} bg-white/90 inline-block px-3 py-1 rounded-lg`}
              >
                {status.text}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Date & Time */}
          <div
            className={`flex items-start gap-4 p-4 rounded-xl ${colors.light}`}
          >
            <div className={`p-2 rounded-lg ${colors.bg} text-white`}>
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {formatDate(event.event_date)}
              </p>
              {formatTime(event.event_date) && (
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Clock size={14} />
                  {formatTime(event.event_date)}
                  {event.end_date && ` - ${formatTime(event.end_date)}`}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
              <div className="p-2 rounded-lg bg-gray-200 text-gray-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Địa điểm</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
          )}

          {/* Related Member */}
          {event.related_member && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
              <div className="p-2 rounded-lg bg-gray-200 text-gray-600">
                <User size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Người liên quan</p>
                <p className="text-gray-600">
                  {event.related_member.full_name}
                </p>
              </div>
            </div>
          )}

          {/* Reminder */}
          {event.reminder_days && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50">
              <div className="p-2 rounded-lg bg-amber-200 text-amber-600">
                <Bell size={20} />
              </div>
              <p className="text-amber-800">
                Nhắc nhở trước{" "}
                <span className="font-bold">{event.reminder_days} ngày</span>
              </p>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="font-semibold text-gray-800 mb-2">Mô tả</p>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* Creator info */}
          {event.creator && (
            <p className="text-sm text-gray-400 text-center">
              Tạo bởi: {event.creator.username} •{" "}
              {new Date(event.created_at).toLocaleDateString("vi-VN")}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Share2 size={18} />
              Chia sẻ
            </button>
            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <ExternalLink size={18} />
              Thêm vào lịch
            </button>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onEdit?.(event);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <Edit size={18} />
                Sửa
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Bạn có chắc muốn xóa sự kiện này?")) {
                    onDelete?.(event);
                    onClose();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                <Trash2 size={18} />
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;

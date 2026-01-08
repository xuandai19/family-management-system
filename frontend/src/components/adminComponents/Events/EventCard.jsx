import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Edit,
  Trash2,
  Eye,
  Bell,
  Repeat,
} from "lucide-react";
import { EVENT_TYPES } from "../../../Api/eventApi";

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

// Check if event is upcoming (within reminder_days)
const isUpcoming = (eventDate, reminderDays = 7) => {
  if (!eventDate) return false;
  const now = new Date();
  const event = new Date(eventDate);
  const diffTime = event - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= reminderDays;
};

// Check if event is past
const isPast = (eventDate) => {
  if (!eventDate) return false;
  return new Date(eventDate) < new Date();
};

// Get days until event
const getDaysUntil = (eventDate) => {
  if (!eventDate) return null;
  const now = new Date();
  const event = new Date(eventDate);
  const diffTime = event - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const EventCard = ({ event, onEdit, onDelete, onView, isAdmin = true }) => {
  const eventType = EVENT_TYPES[event.event_type] || EVENT_TYPES.other;
  const daysUntil = getDaysUntil(event.event_date);
  const past = isPast(event.event_date);
  const upcoming = isUpcoming(event.event_date, event.reminder_days);

  // Color classes based on event type
  const colorClasses = {
    pink: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      badge: "bg-pink-100 text-pink-700",
      icon: "text-pink-500",
    },
    gray: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      badge: "bg-gray-100 text-gray-700",
      icon: "text-gray-500",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      badge: "bg-purple-100 text-purple-700",
      icon: "text-purple-500",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-700",
      icon: "text-blue-500",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      icon: "text-amber-500",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      badge: "bg-green-100 text-green-700",
      icon: "text-green-500",
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      badge: "bg-slate-100 text-slate-700",
      icon: "text-slate-500",
    },
  };

  const colors = colorClasses[eventType.color] || colorClasses.slate;

  return (
    <div
      className={`relative rounded-2xl border-2 ${colors.border} ${
        colors.bg
      } p-5 
        hover:shadow-lg transition-all duration-300 group ${
          past ? "opacity-60" : ""
        }`}
    >
      {/* Upcoming badge */}
      {upcoming && !past && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
          <Bell size={12} />
          {daysUntil} ngày nữa
        </div>
      )}

      {/* Past badge */}
      {past && (
        <div className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full">
          Đã qua
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{eventType.icon}</span>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
            >
              {eventType.label}
            </span>
            {event.is_recurring && (
              <span className="ml-2 inline-flex items-center text-xs text-gray-500">
                <Repeat size={12} className="mr-1" />
                Hàng năm
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Meta info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className={colors.icon} />
          <span className="font-medium">{formatDate(event.event_date)}</span>
        </div>

        {formatTime(event.event_date) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className={colors.icon} />
            <span>
              {formatTime(event.event_date)}
              {event.end_date && ` - ${formatTime(event.end_date)}`}
            </span>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className={colors.icon} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        {event.related_member && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} className={colors.icon} />
            <span>Liên quan: {event.related_member.full_name}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={() => onView?.(event)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <Eye size={16} />
          Xem chi tiết
        </button>

        {isAdmin && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit?.(event)}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="Chỉnh sửa"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete?.(event)}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              title="Xóa"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

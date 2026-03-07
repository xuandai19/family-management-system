import React from "react";
import {
  Bug,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  User,
  Calendar,
} from "lucide-react";

const REPORT_TYPES = {
  bug: { label: "Lỗi hệ thống", icon: Bug, color: "text-red-600 bg-red-50" },
  suggestion: {
    label: "Góp ý",
    icon: Lightbulb,
    color: "text-blue-600 bg-blue-50",
  },
  complaint: {
    label: "Khiếu nại",
    icon: AlertTriangle,
    color: "text-amber-600 bg-amber-50",
  },
  other: { label: "Khác", icon: HelpCircle, color: "text-gray-600 bg-gray-50" },
};

const STATUS_MAP = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Đã giải quyết", color: "bg-green-100 text-green-700" },
  dismissed: { label: "Đã bỏ qua", color: "bg-gray-100 text-gray-600" },
};

const ReportItem = ({
  report,
  onResolve,
  onDismiss,
  onDelete,
  onViewDetail,
}) => {
  const TypeIcon = REPORT_TYPES[report.type]?.icon || HelpCircle;

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
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`p-3 rounded-lg ${
            REPORT_TYPES[report.type]?.color || "bg-gray-50 text-gray-600"
          }`}
        >
          <TypeIcon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 line-clamp-1">
                  {report.content}
                </h3>
              </div>
              {report.resolution_note && (
                <p className="text-sm text-green-600 mt-1">
                  Ghi chú: {report.resolution_note}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {report.reporter_id
                    ? `User ${report.reporter_id.slice(0, 8)}...`
                    : "Ẩn danh"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(report.created_at)}
                </span>
                {report.target_type && (
                  <span className="text-gray-400">
                    Liên kết: {report.target_type} #{report.target_id}
                  </span>
                )}
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    REPORT_TYPES[report.type]?.color || "bg-gray-100"
                  }`}
                >
                  {REPORT_TYPES[report.type]?.label || "Khác"}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    STATUS_MAP[report.status]?.color || "bg-gray-100"
                  }`}
                >
                  {STATUS_MAP[report.status]?.label || report.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onViewDetail(report)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Xem chi tiết"
                >
                  <Eye size={16} />
                </button>
                {report.status === "pending" && (
                  <>
                    <button
                      onClick={() => onResolve(report)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Giải quyết"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => onDismiss(report.id)}
                      className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                      title="Bỏ qua"
                    >
                      <XCircle size={16} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDelete(report.id)}
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

export default ReportItem;

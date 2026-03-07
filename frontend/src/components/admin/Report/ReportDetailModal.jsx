import React, { useState } from "react";
import {
  X,
  Bug,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  FileText,
} from "lucide-react";

const REPORT_TYPES = {
  bug: { label: "Lỗi hệ thống", icon: Bug, color: "text-red-600 bg-red-100" },
  suggestion: {
    label: "Góp ý",
    icon: Lightbulb,
    color: "text-blue-600 bg-blue-100",
  },
  complaint: {
    label: "Khiếu nại",
    icon: AlertTriangle,
    color: "text-amber-600 bg-amber-100",
  },
  other: {
    label: "Khác",
    icon: HelpCircle,
    color: "text-gray-600 bg-gray-100",
  },
};

const STATUS_MAP = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
  resolved: { label: "Đã giải quyết", color: "bg-green-100 text-green-700" },
  dismissed: { label: "Đã bỏ qua", color: "bg-gray-100 text-gray-600" },
};

const ReportDetailModal = ({
  report,
  onClose,
  onResolve,
  onDismiss,
  onDelete,
}) => {
  const [resolutionNote, setResolutionNote] = useState("");
  const [showResolveForm, setShowResolveForm] = useState(false);

  if (!report) return null;

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

  const handleResolve = () => {
    onResolve(report.id, resolutionNote);
    onClose();
  };

  const handleDismiss = () => {
    if (window.confirm("Bạn có chắc chắn muốn bỏ qua báo cáo này?")) {
      onDismiss(report.id);
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa báo cáo này?")) {
      onDelete(report.id);
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
              className={`p-2 rounded-lg ${REPORT_TYPES[report.type]?.color || "bg-gray-100"}`}
            >
              <TypeIcon size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Chi tiết báo cáo</h2>
              <span
                className={`text-xs px-2 py-0.5 rounded ${REPORT_TYPES[report.type]?.color || "bg-gray-100"}`}
              >
                {REPORT_TYPES[report.type]?.label || "Khác"}
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
          {/* Content */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Nội dung báo cáo
            </label>
            <div className="bg-gray-50 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">
              {report.content || "-"}
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">Người gửi</label>
                <p className="text-sm text-gray-700">
                  {report.reporter_id
                    ? `${report.reporter_id.slice(0, 8)}...`
                    : "Ẩn danh"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">Thời gian</label>
                <p className="text-sm text-gray-700">
                  {formatDate(report.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Target info */}
          {report.target_id && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <FileText size={16} className="text-blue-600" />
              <div>
                <label className="text-xs text-blue-600">Liên kết</label>
                <p className="text-sm text-blue-700">
                  {report.target_type} #{report.target_id}
                </p>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_MAP[report.status]?.color || "bg-gray-100"}`}
            >
              {STATUS_MAP[report.status]?.label || report.status}
            </div>
          </div>

          {/* Resolution note */}
          {report.resolution_note && (
            <div className="p-3 bg-green-50 rounded-lg">
              <label className="text-xs text-green-600 block mb-1">
                Ghi chú giải quyết
              </label>
              <p className="text-sm text-green-700">{report.resolution_note}</p>
              {report.resolved_at && (
                <p className="text-xs text-green-500 mt-1">
                  Ngày xử lý: {formatDate(report.resolved_at)}
                </p>
              )}
            </div>
          )}

          {/* Resolve form */}
          {showResolveForm && report.status === "pending" && (
            <div className="space-y-2">
              <label className="text-sm text-gray-500 block">
                Ghi chú giải quyết
              </label>
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Nhập ghi chú giải quyết..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleResolve}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                >
                  Xác nhận giải quyết
                </button>
                <button
                  onClick={() => setShowResolveForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
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
          {report.status === "pending" && !showResolveForm && (
            <>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
              >
                <XCircle size={16} />
                Bỏ qua
              </button>
              <button
                onClick={() => setShowResolveForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Giải quyết
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;

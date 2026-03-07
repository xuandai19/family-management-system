import React, { useState } from "react";
import {
  X,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  FileText,
  AlertTriangle,
} from "lucide-react";

const STATUS_MAP = {
  pending: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Đã duyệt", color: "bg-green-100 text-green-700" },
  rejected: { label: "Đã từ chối", color: "bg-red-100 text-red-700" },
};

const URGENCY_MAP = {
  low: { label: "Thấp", color: "bg-gray-100 text-gray-600" },
  normal: { label: "Bình thường", color: "bg-blue-100 text-blue-600" },
  high: { label: "Cao", color: "bg-orange-100 text-orange-600" },
  urgent: { label: "Khẩn cấp", color: "bg-red-100 text-red-700" },
};

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

const formatMoney = (amount) => {
  if (!amount) return "-";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ProposalDetailModal = ({
  proposal,
  type,
  onClose,
  onApprove,
  onReject,
  onDelete,
}) => {
  const [reviewNotes, setReviewNotes] = useState("");
  const [action, setAction] = useState(null); // 'approve' | 'reject'

  if (!proposal) return null;

  const isEvent = type === "events";

  const handleSubmit = () => {
    if (action === "approve") {
      onApprove(proposal.id, reviewNotes);
    } else if (action === "reject") {
      onReject(proposal.id, reviewNotes);
    }
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đề xuất này?")) {
      onDelete(proposal.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${isEvent ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
            >
              {isEvent ? <Calendar size={20} /> : <DollarSign size={20} />}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                {isEvent
                  ? "Chi tiết đề xuất sự kiện"
                  : "Chi tiết đề xuất chi phí"}
              </h2>
              <span
                className={`text-xs px-2 py-0.5 rounded ${STATUS_MAP[proposal.status]?.color || "bg-gray-100"}`}
              >
                {STATUS_MAP[proposal.status]?.label || proposal.status}
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
            <p className="text-gray-900 font-medium">{proposal.title}</p>
          </div>

          {/* Description */}
          {proposal.description && (
            <div>
              <label className="text-sm text-gray-500 block mb-1">Mô tả</label>
              <div className="bg-gray-50 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">
                {proposal.description}
              </div>
            </div>
          )}

          {/* Event-specific fields */}
          {isEvent && (
            <div className="grid grid-cols-2 gap-4">
              {proposal.proposed_date && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Ngày đề xuất
                    </label>
                    <p className="text-sm text-gray-700">
                      {formatDate(proposal.proposed_date)}
                    </p>
                  </div>
                </div>
              )}
              {proposal.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Địa điểm
                    </label>
                    <p className="text-sm text-gray-700">{proposal.location}</p>
                  </div>
                </div>
              )}
              {proposal.estimated_budget && (
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Ngân sách dự kiến
                    </label>
                    <p className="text-sm text-gray-700">
                      {formatMoney(proposal.estimated_budget)}
                    </p>
                  </div>
                </div>
              )}
              {proposal.expected_attendees && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Số người dự kiến
                    </label>
                    <p className="text-sm text-gray-700">
                      {proposal.expected_attendees}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Expense-specific fields */}
          {!isEvent && (
            <div className="grid grid-cols-2 gap-4">
              {proposal.amount && (
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Số tiền
                    </label>
                    <p className="text-sm text-gray-700 font-medium">
                      {formatMoney(proposal.amount)}
                    </p>
                  </div>
                </div>
              )}
              {proposal.category && (
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Danh mục
                    </label>
                    <p className="text-sm text-gray-700">{proposal.category}</p>
                  </div>
                </div>
              )}
              {proposal.urgency && (
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-gray-400" />
                  <div>
                    <label className="text-xs text-gray-400 block">
                      Mức độ
                    </label>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${URGENCY_MAP[proposal.urgency]?.color || ""}`}
                    >
                      {URGENCY_MAP[proposal.urgency]?.label || proposal.urgency}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Purpose */}
          {proposal.purpose && (
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Mục đích
              </label>
              <div className="bg-gray-50 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">
                {proposal.purpose}
              </div>
            </div>
          )}

          {/* Notes */}
          {proposal.notes && (
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Ghi chú
              </label>
              <p className="text-sm text-gray-700">{proposal.notes}</p>
            </div>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">
                  Người đề xuất
                </label>
                <p className="text-sm text-gray-700">
                  {proposal.profiles?.username || "Không rõ"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <div>
                <label className="text-xs text-gray-400 block">Ngày gửi</label>
                <p className="text-sm text-gray-700">
                  {formatDate(proposal.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Review notes (if already reviewed) */}
          {proposal.review_notes && (
            <div
              className={`p-3 rounded-lg ${proposal.status === "approved" ? "bg-green-50" : "bg-red-50"}`}
            >
              <label
                className={`text-xs block mb-1 ${proposal.status === "approved" ? "text-green-600" : "text-red-600"}`}
              >
                Ghi chú phê duyệt
              </label>
              <p
                className={`text-sm ${proposal.status === "approved" ? "text-green-700" : "text-red-700"}`}
              >
                {proposal.review_notes}
              </p>
              {proposal.reviewed_at && (
                <p
                  className={`text-xs mt-1 ${proposal.status === "approved" ? "text-green-500" : "text-red-500"}`}
                >
                  Ngày xử lý: {formatDate(proposal.reviewed_at)}
                </p>
              )}
            </div>
          )}

          {/* Action form */}
          {proposal.status === "pending" && action && (
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
              <label className="text-sm text-gray-500 block">
                {action === "approve" ? "Ghi chú duyệt" : "Lý do từ chối"}
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder={
                  action === "approve"
                    ? "Nhập ghi chú (tùy chọn)..."
                    : "Nhập lý do từ chối..."
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className={`px-4 py-2 text-white rounded-lg transition text-sm ${
                    action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {action === "approve" ? "Xác nhận duyệt" : "Xác nhận từ chối"}
                </button>
                <button
                  onClick={() => {
                    setAction(null);
                    setReviewNotes("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50 rounded-b-xl sticky bottom-0">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
          >
            <Trash2 size={16} />
            Xóa
          </button>
          {proposal.status === "pending" && !action && (
            <>
              <button
                onClick={() => setAction("reject")}
                className="px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
              >
                <XCircle size={16} />
                Từ chối
              </button>
              <button
                onClick={() => setAction("approve")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <CheckCircle size={16} />
                Duyệt
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailModal;

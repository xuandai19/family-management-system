import React from "react";
import {
  Calendar,
  DollarSign,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
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
  });
};

const formatMoney = (amount) => {
  if (!amount) return "-";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ProposalItem = ({
  proposal,
  type,
  onApprove,
  onReject,
  onDelete,
  onViewDetail,
}) => {
  const isEvent = type === "events";

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`p-3 rounded-lg ${isEvent ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}
        >
          {isEvent ? <Calendar size={20} /> : <DollarSign size={20} />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{proposal.title}</h3>
              {proposal.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {proposal.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400 mt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {proposal.profiles?.username || "Không rõ"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {formatDate(proposal.created_at)}
                </span>

                {isEvent && proposal.proposed_date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Ngày đề xuất: {formatDate(proposal.proposed_date)}
                  </span>
                )}
                {isEvent && proposal.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {proposal.location}
                  </span>
                )}
                {!isEvent && proposal.amount && (
                  <span className="flex items-center gap-1 font-medium text-gray-600">
                    <DollarSign size={12} />
                    {formatMoney(proposal.amount)}
                  </span>
                )}
                {!isEvent && proposal.urgency && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-medium ${URGENCY_MAP[proposal.urgency]?.color || ""}`}
                  >
                    {URGENCY_MAP[proposal.urgency]?.label || proposal.urgency}
                  </span>
                )}
              </div>

              {proposal.review_notes && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  Ghi chú: {proposal.review_notes}
                </p>
              )}
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${STATUS_MAP[proposal.status]?.color || "bg-gray-100"}`}
              >
                {STATUS_MAP[proposal.status]?.label || proposal.status}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onViewDetail(proposal)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Xem chi tiết"
                >
                  <Eye size={16} />
                </button>
                {proposal.status === "pending" && (
                  <>
                    <button
                      onClick={() => onApprove(proposal)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Duyệt"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => onReject(proposal)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Từ chối"
                    >
                      <XCircle size={16} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDelete(proposal.id)}
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

export default ProposalItem;

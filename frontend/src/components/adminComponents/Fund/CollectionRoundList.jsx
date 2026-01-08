import React from "react";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  Banknote,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const statusConfig = {
  active: {
    label: "Đang thu",
    color: "bg-emerald-100 text-emerald-700",
    icon: Clock,
  },
  completed: {
    label: "Hoàn thành",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Đã hủy",
    color: "bg-slate-100 text-slate-500",
    icon: XCircle,
  },
};

const CollectionRoundList = ({
  rounds,
  formatCurrency,
  formatDate,
  onOpenModal,
  onDelete,
  onViewPayments,
  getStats,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Banknote size={20} className="text-amber-600" />
          Danh sách đợt thu tiền
        </h3>
        <button
          onClick={() => onOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition text-sm font-medium"
        >
          <Plus size={16} />
          Tạo đợt thu mới
        </button>
      </div>

      {rounds.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {rounds.map((round) => {
            const stats = getStats(round.id);
            const StatusIcon = statusConfig[round.status]?.icon || Clock;

            return (
              <div key={round.id} className="p-5 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-slate-800 text-lg">
                        {round.title}
                      </h4>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${
                          statusConfig[round.status]?.color
                        }`}
                      >
                        <StatusIcon size={12} />
                        {statusConfig[round.status]?.label}
                      </span>
                    </div>

                    {round.description && (
                      <p className="text-sm text-slate-500 mb-3">
                        {round.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Banknote size={14} className="text-emerald-500" />
                        <span className="font-medium">
                          {formatCurrency(round.amount_per_person)}
                        </span>
                        <span className="text-slate-400">
                          / {round.unit_type === "household" ? "hộ" : "người"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar size={14} className="text-blue-500" />
                        {round.start_date && (
                          <span>{formatDate(round.start_date)}</span>
                        )}
                        {round.end_date && (
                          <span>→ {formatDate(round.end_date)}</span>
                        )}
                      </div>

                      {round.funds && (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">
                            Quỹ: {round.funds.fund_name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 ml-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">
                        {stats.totalPayers}
                      </p>
                      <p className="text-xs text-slate-400">Đã đóng</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-700">
                        {formatCurrency(stats.totalCollected)}
                      </p>
                      <p className="text-xs text-slate-400">Tổng thu</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewPayments(round)}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition"
                        title="Xem & xác nhận đóng tiền"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onOpenModal(round)}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(round.id)}
                        className="p-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-10 text-center">
          <Banknote size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 mb-2">Chưa có đợt thu nào</p>
          <p className="text-sm text-slate-400">
            Tạo đợt thu để thông báo cho thành viên đóng quỹ
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionRoundList;

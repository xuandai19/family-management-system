// src/components/adminComponents/AncestralHouse/RenovationTimeline.jsx
import React from "react";
import {
  Wrench,
  Plus,
  Calendar,
  Banknote,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  ImageIcon,
} from "lucide-react";

const RenovationTimeline = ({
  renovations = [],
  loading,
  onAdd,
  onEdit,
  onDelete,
  formatCurrency,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getYear = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wrench size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Lịch sử tu sửa</h3>
            <p className="text-slate-300 text-sm">
              {renovations.length} lần tu sửa
            </p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors font-medium"
        >
          <Plus size={18} />
          Thêm mới
        </button>
      </div>

      {/* Timeline Content */}
      <div className="p-6">
        {renovations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench size={32} className="text-slate-400" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 mb-1">
              Chưa có lịch sử tu sửa
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Ghi lại các đợt tu sửa, trùng tu nhà thờ tổ
            </p>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
            >
              Thêm lần tu sửa đầu tiên
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

            {/* Timeline items */}
            <div className="space-y-6">
              {renovations.map((item, idx) => {
                const isCompleted = !!item.completed_date;

                return (
                  <div key={item.id} className="relative pl-14 group">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 w-5 h-5 rounded-full border-3 ${
                        isCompleted
                          ? "bg-green-500 border-green-200"
                          : "bg-amber-500 border-amber-200"
                      }`}
                    />

                    {/* Year badge */}
                    <div className="absolute left-0 -top-1 text-xs font-bold text-slate-400">
                      {getYear(item.renovation_date)}
                    </div>

                    {/* Content card */}
                    <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Status badge */}
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle size={12} />
                              ) : (
                                <Clock size={12} />
                              )}
                              {isCompleted ? "Hoàn thành" : "Đang thực hiện"}
                            </span>
                          </div>

                          {/* Description */}
                          <h4 className="font-semibold text-slate-800 mb-2">
                            {item.description}
                          </h4>

                          {/* Meta info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(item.renovation_date)}
                              {item.completed_date &&
                                ` → ${formatDate(item.completed_date)}`}
                            </span>

                            {item.cost > 0 && (
                              <span className="flex items-center gap-1 text-green-600 font-semibold">
                                <Banknote size={14} />
                                {formatCurrency(item.cost)}
                              </span>
                            )}

                            {item.images && item.images.length > 0 && (
                              <span className="flex items-center gap-1">
                                <ImageIcon size={14} />
                                {item.images.length} ảnh
                              </span>
                            )}
                          </div>

                          {/* Images preview */}
                          {item.images && item.images.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {item.images.slice(0, 4).map((img, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200"
                                >
                                  <img
                                    src={img}
                                    alt={`Tu sửa ${imgIdx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {item.images.length > 4 && (
                                <div className="w-14 h-14 rounded-lg bg-slate-300 flex items-center justify-center text-slate-600 text-sm font-medium">
                                  +{item.images.length - 4}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(item)}
                            className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenovationTimeline;

import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle size={20} />
            {title || "Xác nhận xóa"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <div>
              <p className="text-slate-700 mb-2">
                {message || "Bạn có chắc chắn muốn xóa?"}
              </p>
              {itemName && (
                <p className="text-lg font-semibold text-slate-900 bg-slate-100 px-3 py-2 rounded-lg">
                  "{itemName}"
                </p>
              )}
              <p className="text-sm text-slate-500 mt-3">
                ⚠️ Hành động này không thể hoàn tác.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Trash2 size={16} />
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

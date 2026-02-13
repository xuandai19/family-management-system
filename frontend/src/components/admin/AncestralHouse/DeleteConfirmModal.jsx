// src/components/adminComponents/AncestralHouse/DeleteConfirmModal.jsx
import React from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-500 px-6 py-4 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <AlertTriangle size={24} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {title || "Xác nhận xóa"}
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600">
            {message ||
              "Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

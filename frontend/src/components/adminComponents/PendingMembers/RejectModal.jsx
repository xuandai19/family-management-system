import React from "react";
import { X, UserX, XCircle, Loader2, AlertCircle } from "lucide-react";

const RejectModal = ({ account, reason, onReasonChange, onClose, onReject, loading }) => {
  if (!account) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-red-500 to-rose-500 rounded-t-2xl relative">
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full">
            <X size={20} className="text-white" />
          </button>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserX size={20} /> Từ chối yêu cầu
          </h3>
        </div>

        <div className="p-6">
          <div className="bg-red-50 rounded-xl p-4 mb-5 border border-red-100">
            <p className="text-sm text-red-600 mb-1">Tài khoản:</p>
            <p className="font-bold text-red-800 text-lg">{account.username}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Lý do từ chối (không bắt buộc):
            </label>
            <textarea
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Nhập lý do từ chối..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-400 outline-none resize-none"
            />
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-700 flex items-start gap-2">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span><strong>Lưu ý:</strong> Hành động này không thể hoàn tác!</span>
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg font-medium">
            Hủy
          </button>
          <button
            onClick={onReject}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 font-medium"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <XCircle size={18} />}
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
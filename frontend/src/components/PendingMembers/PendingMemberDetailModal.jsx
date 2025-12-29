import React from "react";
import {
  X,
  User,
  Mail,
  Calendar,
  Phone,
  Users,
  MapPin,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PendingMemberDetailModal = ({
  open,
  onClose,
  account,
  onApprove,
  onReject,
  loading,
}) => {
  if (!open || !account) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto relative">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-amber-500 to-yellow-400 rounded-t-2xl flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye size={20} />
            Thông tin đăng ký
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow">
              {account.username?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">
                {account.username}
              </p>
              <p className="text-xs text-slate-400">
                ID: {String(account.id).slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail size={16} className="text-slate-400" />
              <span>{account.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <User size={16} className="text-slate-400" />
              <span>
                Giới tính:{" "}
                {account.gender === "male"
                  ? "Nam"
                  : account.gender === "female"
                  ? "Nữ"
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar size={16} className="text-slate-400" />
              <span>Ngày sinh: {formatDate(account.birth_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone size={16} className="text-slate-400" />
              <span>SĐT: {account.phone || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={16} className="text-slate-400" />
              <span>Cha: {account.father_name || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={16} className="text-slate-400" />
              <span>Mẹ: {account.mother_name || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin size={16} className="text-slate-400" />
              <span>Quê quán: {account.hometown || "-"}</span>
            </div>
            {account.registration_note && (
              <div className="flex items-start gap-2 text-slate-700">
                <FileText size={16} className="text-slate-400 mt-0.5" />
                <span className="italic">{account.registration_note}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
          >
            Đóng
          </button>
          <button
            onClick={onReject}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <XCircle size={18} />
            Từ chối
          </button>
          <button
            onClick={onApprove}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <CheckCircle size={18} />
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingMemberDetailModal;

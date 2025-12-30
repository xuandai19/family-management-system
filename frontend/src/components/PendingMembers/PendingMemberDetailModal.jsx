import React, { useState } from "react";
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
import {
  approveProfile,
  rejectProfile,
  approveSpouseProfile,
} from "../../Api/adminApi";
const PendingMemberDetailModal = ({
  open,
  onClose,
  account,
  allMembers,
  allSpouses,
  accountType = "member",
  onApproved,
  onRejected,
}) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  if (!open || !account) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleApprove = async () => {
    if (!selectedId) {
      setToast({ message: "Vui lòng chọn đối tượng liên kết!", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res =
        accountType === "spouse"
          ? await approveSpouseProfile(account.id, selectedId)
          : await approveProfile(account.id, selectedId);

      if (res.success) {
        setToast({ message: "Duyệt thành công!", type: "success" });
        onApproved(account.id);
      } else {
        setToast({ message: "Duyệt thất bại!", type: "error" });
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Lỗi duyệt tài khoản!",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await rejectProfile(account.id, "");
      if (res.success) {
        setToast({ message: "Đã từ chối yêu cầu!", type: "success" });
        onRejected(account.id);
      } else {
        setToast({ message: "Lỗi từ chối!", type: "error" });
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Lỗi từ chối!",
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
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
                {account.gender === "Male"
                  ? "Nam"
                  : account.gender === "Female"
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
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {accountType === "spouse"
              ? "Chọn người phối ngẫu để liên kết"
              : "Chọn thành viên gia phả để liên kết"}
          </label>

          <select
            value={selectedId || ""}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Vui lòng chọn --</option>

            {(accountType === "spouse" ? allSpouses : allMembers).map(
              (item) => (
                <option key={item.id} value={item.id}>
                  {item.full_name}
                  {item.generation_level
                    ? ` (Đời ${item.generation_level})`
                    : ""}
                </option>
              )
            )}
          </select>
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
            onClick={handleReject}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            Từ chối
          </button>
          <button
            onClick={handleApprove}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingMemberDetailModal;

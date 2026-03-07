import React, { useState, useMemo } from "react";
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
  Search,
  Heart,
  LinkIcon,
} from "lucide-react";
import {
  approveProfile,
  rejectProfile,
  approveSpouseProfile,
} from "../../../services/admin/memberApi";
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
  const [searchTerm, setSearchTerm] = useState("");

  if (!open || !account) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const isSpouse = accountType === "spouse";
  const sourceList = isSpouse ? allSpouses : allMembers;

  // Lọc danh sách theo search term
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return sourceList;
    const term = searchTerm.toLowerCase().trim();
    return sourceList.filter((item) => {
      const name = (item.full_name || "").toLowerCase();
      const gen = item.generation_level ? `đời ${item.generation_level}` : "";
      return name.includes(term) || gen.includes(term);
    });
  }, [sourceList, searchTerm]);

  const selectedItem = sourceList.find(
    (item) => String(item.id) === String(selectedId),
  );

  const handleApprove = async () => {
    if (!selectedId) {
      setToast({ message: "Vui lòng chọn đối tượng liên kết!", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = isSpouse
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto relative">
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
        <div className="p-6 space-y-4">
          {/* User info header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow">
              {account.username?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">
                {account.username}
              </p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  isSpouse
                    ? "bg-pink-100 text-pink-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isSpouse ? "Vợ/Chồng" : "Huyết thống"}
              </span>
            </div>
          </div>

          {/* Registration info */}
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
              <MapPin size={16} className="text-slate-400" />
              <span>Quê quán: {account.hometown || "-"}</span>
            </div>
          </div>

          {/* Verification info - different for Member vs Spouse */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1">
            <p className="text-sm font-semibold text-amber-800 mb-1">
              Thông tin xác minh:
            </p>
            {isSpouse ? (
              <div className="flex items-center gap-2 text-amber-900">
                <Heart size={16} className="text-pink-500" />
                <span>
                  Vợ/Chồng của: <strong>{account.spouse_name || "-"}</strong>
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-900">
                  <Users size={16} className="text-blue-500" />
                  <span>
                    Cha: <strong>{account.father_name || "-"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-amber-900">
                  <Users size={16} className="text-pink-500" />
                  <span>
                    Mẹ: <strong>{account.mother_name || "-"}</strong>
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Registration note */}
          {account.registration_note && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-500 mb-1">
                Ghi chú đăng ký:
              </p>
              <p className="text-sm text-slate-700 italic">
                {account.registration_note}
              </p>
            </div>
          )}

          {/* Member/Spouse selector with search */}
          <div className="border-t pt-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <LinkIcon size={16} />
              {isSpouse
                ? "Chọn người phối ngẫu để liên kết"
                : "Chọn thành viên gia phả để liên kết"}
            </label>

            {/* Search input */}
            <div className="relative mb-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none"
              />
            </div>

            {/* Selectable list */}
            <div className="border rounded-lg max-h-48 overflow-auto">
              {filteredList.length === 0 ? (
                <div className="p-3 text-center text-slate-400 text-sm">
                  {searchTerm ? "Không tìm thấy kết quả" : "Không có dữ liệu"}
                </div>
              ) : (
                filteredList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(String(item.id))}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between border-b last:border-b-0 transition-colors ${
                      String(selectedId) === String(item.id)
                        ? "bg-amber-50 border-amber-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          String(selectedId) === String(item.id)
                            ? "text-amber-700"
                            : "text-slate-800"
                        }`}
                      >
                        {item.full_name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.gender === "Male"
                          ? "Nam"
                          : item.gender === "Female"
                            ? "Nữ"
                            : ""}
                        {item.generation_level
                          ? ` · Đời ${item.generation_level}`
                          : ""}
                        {item.birth_date
                          ? ` · ${formatDate(item.birth_date)}`
                          : ""}
                        {item.father_name ? ` · Cha: ${item.father_name}` : ""}
                        {item.mother_name ? ` · Mẹ: ${item.mother_name}` : ""}
                      </p>
                    </div>
                    {String(selectedId) === String(item.id) && (
                      <CheckCircle
                        size={16}
                        className="text-amber-500 flex-shrink-0"
                      />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Selected info */}
            {selectedItem && (
              <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-700">
                  Đã chọn: <strong>{selectedItem.full_name}</strong>
                  {selectedItem.generation_level
                    ? ` (Đời ${selectedItem.generation_level})`
                    : ""}
                </span>
              </div>
            )}

            <p className="mt-1 text-xs text-slate-400">
              Hiển thị {filteredList.length}/{sourceList.length} — chỉ những
              người chưa liên kết tài khoản
            </p>
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
            onClick={handleReject}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <XCircle size={16} />
            Từ chối
          </button>
          <button
            onClick={handleApprove}
            disabled={loading || !selectedId}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <CheckCircle size={16} />
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingMemberDetailModal;

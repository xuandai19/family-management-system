import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Loader2,
  CheckCircle,
  XCircle,
  Link,
  AlertCircle,
  RefreshCw,
  User,
  Calendar,
  X,
  Eye,
} from "lucide-react";
import {
  getPendingMembers,
  checkMemberMatch,
  getAllMembers,
  approveProfile,
  rejectProfile,
} from "../../Api/adminApi";
import PendingMemberDetailModal from "../../components/PendingMembers/PendingMemberDetailModal";

const PendingMemberPage = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Modal states
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [matchingMembers, setMatchingMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, membersRes] = await Promise.all([
        getPendingMembers(),
        getAllMembers(),
      ]);

      if (pendingRes.success) {
        setPendingAccounts(pendingRes.data || []);
      }
      if (membersRes.success) {
        setAllMembers(membersRes.data || []);
      }
    } catch (error) {
      showToast("Lỗi tải dữ liệu: " + error.message, "error");
    }
    setLoading(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Mở modal liên kết
  const handleOpenLinkModal = async (account) => {
    setSelectedAccount(account);
    setSelectedMemberId(null);
    setSearchMember("");
    setActionLoading(account.id);

    try {
      const res = await checkMemberMatch(account.id);
      if (res.success) {
        setMatchingMembers(res.matchingMembers || []);
      }
    } catch (error) {
      setMatchingMembers([]);
    }

    setActionLoading(null);
    setShowLinkModal(true);
  };

  // Duyệt tài khoản
  const handleApprove = async () => {
    if (!selectedAccount || !selectedMemberId) {
      showToast("Vui lòng chọn thành viên để liên kết!", "error");
      return;
    }

    setActionLoading("approve");
    try {
      const res = await approveProfile(selectedAccount.id, selectedMemberId);
      if (res.success) {
        showToast("Duyệt thành công! Tài khoản đã được liên kết.", "success");
        setPendingAccounts((prev) =>
          prev.filter((acc) => acc.id !== selectedAccount.id)
        );
        setShowLinkModal(false);
      }
    } catch (error) {
      showToast(error.response?.data?.error || "Lỗi duyệt tài khoản!", "error");
    }
    setActionLoading(null);
  };

  // Mở modal từ chối
  const handleOpenRejectModal = (account) => {
    setSelectedAccount(account);
    setRejectReason("");
    setShowRejectModal(true);
  };

  // Từ chối tài khoản
  const handleReject = async () => {
    if (!selectedAccount) return;

    setActionLoading("reject");
    try {
      const res = await rejectProfile(selectedAccount.id, rejectReason);
      if (res.success) {
        showToast("Đã từ chối yêu cầu!", "success");
        setPendingAccounts((prev) =>
          prev.filter((acc) => acc.id !== selectedAccount.id)
        );
        setShowRejectModal(false);
      }
    } catch (error) {
      showToast(error.response?.data?.error || "Lỗi từ chối!", "error");
    }
    setActionLoading(null);
  };

  // Filter members cho dropdown
  const filteredMembers = allMembers.filter((m) =>
    m.full_name?.toLowerCase().includes(searchMember.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="p-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <XCircle size={18} />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserCheck className="text-orange-500" />
            Duyệt thành viên
          </h1>
          <p className="text-slate-500 mt-1">
            Xét duyệt các yêu cầu đăng ký tài khoản mới
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Làm mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Chờ duyệt</p>
              <p className="text-3xl font-bold mt-1">
                {pendingAccounts.length}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <UserCheck size={28} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Thành viên gia phả</p>
              <p className="text-3xl font-bold mt-1">{allMembers.length}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Users size={28} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Có thể liên kết</p>
              <p className="text-3xl font-bold mt-1">
                {allMembers.filter((m) => !m.profile_id).length}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Link size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Accounts Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <AlertCircle size={18} className="text-orange-500" />
            Danh sách chờ duyệt
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-16">
            <Loader2 className="animate-spin text-blue-500 mb-3" size={40} />
            <p className="text-slate-500">Đang tải dữ liệu...</p>
          </div>
        ) : pendingAccounts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              Không có yêu cầu nào
            </h3>
            <p className="text-slate-500">Tất cả các yêu cầu đã được xử lý</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Người đăng ký
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Ngày đăng ký
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Xem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
                          {account.username?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {account.username}
                          </p>
                          <p className="text-sm text-slate-400">
                            ID: {String(account.id).slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDate(account.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        Chờ duyệt
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedAccount(account);
                          setShowDetailModal(true);
                        }}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================== MODAL DUYỆT ==================== */}
      {showLinkModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl relative">
              <button
                onClick={() => setShowLinkModal(false)}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Link size={20} />
                Liên kết với thành viên
              </h3>
              <p className="text-green-100 text-sm mt-1">
                Chọn thành viên trong gia phả để liên kết
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Account Info */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-5 border border-blue-100">
                <p className="text-sm text-blue-600 mb-2">Thông tin đăng ký:</p>
                <div className="space-y-1">
                  <p className="font-bold text-blue-800 text-lg">
                    {selectedAccount.username}
                  </p>
                  <p className="text-sm text-slate-600">
                    Giới tính:{" "}
                    {selectedAccount.gender === "male" ? "Nam" : "Nữ"}
                  </p>
                  <p className="text-sm text-slate-600">
                    Ngày sinh: {formatDate(selectedAccount.birth_date)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Cha:{" "}
                    <strong>{selectedAccount.father_name || "Không có"}</strong>
                  </p>
                  <p className="text-sm text-slate-600">
                    Mẹ:{" "}
                    <strong>{selectedAccount.mother_name || "Không có"}</strong>
                  </p>
                  {selectedAccount.hometown && (
                    <p className="text-sm text-slate-600">
                      Quê: {selectedAccount.hometown}
                    </p>
                  )}
                  {selectedAccount.registration_note && (
                    <p className="text-sm text-slate-500 italic mt-2">
                      "{selectedAccount.registration_note}"
                    </p>
                  )}
                </div>
              </div>

              {/* Matching Members */}
              {matchingMembers.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Gợi ý - Thành viên trùng tên ({matchingMembers.length})
                  </p>
                  <div className="space-y-2">
                    {matchingMembers.map((member) => (
                      <label
                        key={member.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedMemberId === member.id
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-slate-200 hover:border-green-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="member"
                          value={member.id}
                          checked={selectedMemberId === member.id}
                          onChange={() => setSelectedMemberId(member.id)}
                          className="w-5 h-5 text-green-500 focus:ring-green-400"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">
                            {member.full_name}
                          </p>
                          <p className="text-sm text-slate-500">
                            Đời thứ {member.generation_level} •{" "}
                            {member.gender === "male" ? "Nam" : "Nữ"}
                            {member.birth_date &&
                              ` • ${formatDate(member.birth_date)}`}
                          </p>
                        </div>
                        {selectedMemberId === member.id && (
                          <CheckCircle size={20} className="text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="text-sm text-slate-400 bg-white px-2">
                  hoặc tìm kiếm
                </span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              {/* Manual Search */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Tìm thành viên khác:
                </p>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Nhập tên thành viên..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition-all"
                  />
                </div>

                {searchMember && (
                  <div className="mt-2 max-h-48 overflow-auto border-2 border-slate-200 rounded-xl">
                    {filteredMembers.length === 0 ? (
                      <p className="p-4 text-sm text-slate-500 text-center">
                        Không tìm thấy thành viên nào
                      </p>
                    ) : (
                      filteredMembers.slice(0, 10).map((member) => (
                        <button
                          key={member.id}
                          onClick={() => {
                            setSelectedMemberId(member.id);
                            setSearchMember("");
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 border-b last:border-b-0 transition-colors ${
                            selectedMemberId === member.id ? "bg-green-50" : ""
                          }`}
                        >
                          <User size={16} className="text-slate-400" />
                          <span className="flex-1 font-medium">
                            {member.full_name}
                          </span>
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            Đời {member.generation_level}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {/* Selected Member Display */}
                {selectedMemberId && !searchMember && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <div>
                      <p className="text-sm text-green-600">Đã chọn:</p>
                      <p className="font-bold text-green-800">
                        {
                          allMembers.find((m) => m.id === selectedMemberId)
                            ?.full_name
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl flex gap-3 justify-end">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleApprove}
                disabled={!selectedMemberId || actionLoading === "approve"}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
              >
                {actionLoading === "approve" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <CheckCircle size={18} />
                )}
                Xác nhận duyệt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL TỪ CHỐI ==================== */}
      {showRejectModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-red-500 to-rose-500 rounded-t-2xl relative">
              <button
                onClick={() => setShowRejectModal(false)}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserX size={20} />
                Từ chối yêu cầu
              </h3>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="bg-red-50 rounded-xl p-4 mb-5 border border-red-100">
                <p className="text-sm text-red-600 mb-1">Tài khoản:</p>
                <p className="font-bold text-red-800 text-lg">
                  {selectedAccount.username}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Lý do từ chối (không bắt buộc):
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do từ chối..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none resize-none transition-all"
                />
              </div>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700 flex items-start gap-2">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Lưu ý:</strong> Hành động này sẽ xóa tài khoản và
                    không thể hoàn tác!
                  </span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl flex gap-3 justify-end">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading === "reject"}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-medium shadow-sm"
              >
                {actionLoading === "reject" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <XCircle size={18} />
                )}
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL CHI TIẾT ==================== */}
      {showDetailModal && selectedAccount && (
        <PendingMemberDetailModal
          open={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          account={selectedAccount}
          allMembers={allMembers}
          onApproved={(id) => {
            setPendingAccounts((prev) => prev.filter((acc) => acc.id !== id));
            setShowDetailModal(false);
            showToast("Duyệt thành công!", "success");
          }}
          onRejected={(id) => {
            setPendingAccounts((prev) => prev.filter((acc) => acc.id !== id));
            setShowDetailModal(false);
            showToast("Đã từ chối yêu cầu!", "success");
          }}
        />
      )}
    </div>
  );
};

export default PendingMemberPage;

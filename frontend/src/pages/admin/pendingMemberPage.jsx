import React, { useState, useEffect } from "react";
import {
  UserCheck,
  RefreshCw,
  CheckCircle,
  XCircle,
  Search,
  AlertCircle,
  Users,
} from "lucide-react";
import {
  getPendingMembers,
  getUnlinkedMembers,
  getUnlinkedSpouses,
  getAllUsers,
  updateUserRole,
  getAddMemberRequests,
  approveAddMemberRequest,
  rejectAddMemberRequest,
} from "../../services/admin/memberApi";
import {
  PendingStatsCards,
  PendingTable,
  AllUsersTable,
  RejectModal,
  PendingMemberDetailModal,
} from "../../components/admin/PendingMembers";
import { useToast } from "../../hooks/admin";

const PendingMemberPage = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [allSpouses, setAllSpouses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [addMemberRequests, setAddMemberRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);

  // Modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Toast
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, membersRes, spousesRes, usersRes, addReqRes] =
        await Promise.all([
          getPendingMembers(),
          getUnlinkedMembers(),
          getUnlinkedSpouses(),
          getAllUsers(),
          getAddMemberRequests("pending"),
        ]);
      if (pendingRes.success) setPendingAccounts(pendingRes.data || []);
      if (membersRes.success) setAllMembers(membersRes.data || []);
      if (spousesRes.success) setAllSpouses(spousesRes.data || []);
      if (usersRes.success) setAllUsers(usersRes.data || []);
      if (addReqRes.success) setAddMemberRequests(addReqRes.data || []);
    } catch (error) {
      showToast("Lỗi tải dữ liệu: " + error.message, "error");
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setShowDetailModal(true);
  };

  const handleApproved = (id) => {
    setPendingAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "approved", role_id: 2 } : u,
      ),
    );
    setShowDetailModal(false);
    showToast("Duyệt thành công!");
  };

  const handleRejected = (id) => {
    setPendingAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "rejected" } : u)),
    );
    setShowDetailModal(false);
    showToast("Đã từ chối yêu cầu!");
  };

  const handleApproveAddRequest = async (requestId) => {
    const adminNote =
      window.prompt("Ghi chú duyệt (không bắt buộc):", "") || "";
    setActionLoading(true);
    try {
      const res = await approveAddMemberRequest(requestId, adminNote);
      if (res.success) {
        setAddMemberRequests((prev) => prev.filter((r) => r.id !== requestId));
        showToast("Đã duyệt và thêm thành viên vào cây", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.error || "Duyệt yêu cầu thất bại", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectAddRequest = async (requestId) => {
    const adminNote =
      window.prompt("Lý do từ chối (không bắt buộc):", "") || "";
    setActionLoading(true);
    try {
      const res = await rejectAddMemberRequest(requestId, adminNote);
      if (res.success) {
        setAddMemberRequests((prev) => prev.filter((r) => r.id !== requestId));
        showToast("Đã từ chối yêu cầu thêm thành viên", "success");
      }
    } catch (error) {
      showToast(
        error.response?.data?.error || "Từ chối yêu cầu thất bại",
        "error",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateRole = async (userId, roleId) => {
    setRoleUpdatingId(userId);
    try {
      const res = await updateUserRole(userId, roleId);
      if (res.success) {
        setAllUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role_id: roleId } : u)),
        );
        showToast("Cập nhật vai trò thành công", "success");
      }
    } catch (error) {
      showToast(
        error.response?.data?.error || "Cập nhật vai trò thất bại",
        "error",
      );
    } finally {
      setRoleUpdatingId(null);
    }
  };

  // Stats - thêm admins và members
  const stats = {
    pending: pendingAccounts.length,
    total: allUsers.length,
    approved: allUsers.filter((u) => u.status === "approved").length,
    rejected: allUsers.filter((u) => u.status === "rejected").length,
    admins: allUsers.filter((u) => u.role_id === 1).length,
    members: allUsers.filter((u) => u.role_id === 2).length,
  };

  return (
    <div className="p-6">
      {/* Toast */}
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
            <UserCheck className="text-orange-500" /> Quản lý tài khoản
          </h1>
          <p className="text-slate-500 mt-1">
            Duyệt yêu cầu đăng ký và quản lý tài khoản người dùng
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-slate-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Làm
          mới
        </button>
      </div>

      {/* Stats - truyền object stats */}
      <PendingStatsCards stats={stats} />

      {/* Pending Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <AlertCircle size={18} className="text-orange-500" />
            Yêu cầu chờ duyệt ({pendingAccounts.length})
          </h2>
        </div>
        <PendingTable
          accounts={pendingAccounts}
          loading={loading}
          onView={handleViewDetail}
          formatDate={formatDate}
        />
      </div>

      {/* All Users Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            Tất cả tài khoản ({allUsers.length})
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:border-blue-400 outline-none w-48"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:border-blue-400 outline-none bg-white"
            >
              <option value="all">Tất cả</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>
        </div>
        <AllUsersTable
          users={allUsers}
          loading={loading}
          onView={handleViewDetail}
          formatDate={formatDate}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onUpdateRole={handleUpdateRole}
          roleUpdatingId={roleUpdatingId}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mt-6">
        <div className="px-6 py-4 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Users size={18} className="text-emerald-500" />
            Yêu cầu thêm thành viên vào cây ({addMemberRequests.length})
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {addMemberRequests.length === 0 ? (
            <div className="text-sm text-slate-500 py-4 text-center">
              Không có yêu cầu thêm thành viên đang chờ duyệt
            </div>
          ) : (
            addMemberRequests.map((req) => (
              <div
                key={req.id}
                className="border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {req.new_data?.full_name || "(Chưa có tên)"}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Người gửi: {req.requester?.username || "-"}
                    {req.target_member?.full_name
                      ? ` • Thuộc nhánh: ${req.target_member.full_name}`
                      : ""}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Ngày gửi: {formatDate(req.created_at)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => handleApproveAddRequest(req.id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm disabled:opacity-50"
                  >
                    Duyệt & thêm vào cây
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handleRejectAddRequest(req.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm disabled:opacity-50"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {showRejectModal && (
        <RejectModal
          account={selectedAccount}
          reason={rejectReason}
          onReasonChange={setRejectReason}
          onClose={() => setShowRejectModal(false)}
          onReject={() => {}}
          loading={actionLoading}
        />
      )}

      {showDetailModal && selectedAccount && (
        <PendingMemberDetailModal
          open={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          account={selectedAccount}
          allMembers={allMembers}
          allSpouses={allSpouses}
          accountType={selectedAccount.type?.toLowerCase()}
          onApproved={handleApproved}
          onRejected={handleRejected}
        />
      )}
    </div>
  );
};

export default PendingMemberPage;

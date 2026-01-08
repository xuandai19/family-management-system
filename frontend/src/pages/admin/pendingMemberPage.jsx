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
  getAllMembers,
  getAllSpouses,
  getAllUsers,
} from "../../Api/adminApi";
import {
  PendingStatsCards,
  PendingTable,
  AllUsersTable,
  RejectModal,
  PendingMemberDetailModal,
} from "../../components/adminComponents/PendingMembers";

const PendingMemberPage = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [allSpouses, setAllSpouses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, membersRes, spousesRes, usersRes] = await Promise.all([
        getPendingMembers(),
        getAllMembers(),
        getAllSpouses(),
        getAllUsers(),
      ]);
      if (pendingRes.success) setPendingAccounts(pendingRes.data || []);
      if (membersRes.success) setAllMembers(membersRes.data || []);
      if (spousesRes.success) setAllSpouses(spousesRes.data || []);
      if (usersRes.success) setAllUsers(usersRes.data || []);
    } catch (error) {
      showToast("Lỗi tải dữ liệu: " + error.message, "error");
    }
    setLoading(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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
        u.id === id ? { ...u, status: "approved", role_id: 2 } : u
      )
    );
    setShowDetailModal(false);
    showToast("Duyệt thành công!");
  };

  const handleRejected = (id) => {
    setPendingAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "rejected" } : u))
    );
    setShowDetailModal(false);
    showToast("Đã từ chối yêu cầu!");
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
        />
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

import React from "react";
import { Loader2, Users, Eye, Calendar, Shield, User, UserX, CheckCircle, Clock, XCircle, Link2 } from "lucide-react";

const getRoleInfo = (roleId) => {
  switch (roleId) {
    case 1: return { label: "Admin", color: "bg-purple-100 text-purple-700", icon: Shield };
    case 2: return { label: "Thành viên", color: "bg-blue-100 text-blue-700", icon: User };
    default: return { label: "Khách", color: "bg-slate-100 text-slate-700", icon: UserX };
  }
};

const getStatusInfo = (status) => {
  switch (status) {
    case "approved": return { label: "Đã duyệt", color: "bg-green-100 text-green-700", icon: CheckCircle };
    case "pending": return { label: "Chờ duyệt", color: "bg-orange-100 text-orange-700", icon: Clock };
    case "rejected": return { label: "Từ chối", color: "bg-red-100 text-red-700", icon: XCircle };
    default: return { label: status, color: "bg-gray-100 text-gray-700", icon: Clock };
  }
};

const AllUsersTable = ({ users, loading, onView, formatDate, searchTerm, filterStatus }) => {
  const filteredUsers = users.filter((user) => {
    const matchSearch = !searchTerm || 
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || user.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
        <p className="text-slate-500">Đang tải...</p>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <Users size={40} className="text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">Không tìm thấy tài khoản nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Tài khoản</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Vai trò</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Liên kết</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Ngày tạo</th>
            <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Xem</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredUsers.map((user) => {
            const roleInfo = getRoleInfo(user.role_id);
            const statusInfo = getStatusInfo(user.status);
            const RoleIcon = roleInfo.icon;
            const StatusIcon = statusInfo.icon;

            return (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.username?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{user.username}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                    <RoleIcon size={12} /> {roleInfo.label}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon size={12} /> {statusInfo.label}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {user.member_id ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <Link2 size={10} /> Member
                    </span>
                  ) : user.spouse_id ? (
                    <span className="inline-flex items-center gap-1 text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                      <Link2 size={10} /> Spouse
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-3 text-xs text-slate-600">{formatDate(user.created_at)}</td>
                <td className="px-6 py-3 text-center">
                  <button onClick={() => onView(user)} className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-500">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersTable;
import React from "react";
import { Loader2, CheckCircle, AlertCircle, Eye, Calendar } from "lucide-react";

const PendingTable = ({ accounts, loading, onView, formatDate }) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <Loader2 className="animate-spin text-blue-500 mb-3" size={40} />
        <p className="text-slate-500">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Không có yêu cầu nào</h3>
        <p className="text-slate-500">Tất cả các yêu cầu đã được xử lý</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Người đăng ký</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Loại</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Ngày đăng ký</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
            <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {accounts.map((account) => (
            <tr key={account.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
                    {account.username?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{account.username}</p>
                    <p className="text-sm text-slate-400">{account.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.type?.toLowerCase() === "spouse" 
                    ? "bg-pink-100 text-pink-700" 
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {account.type === "spouse" ? "Spouse" : "Member"}
                </span>
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
                  onClick={() => onView(account)}
                  className="p-2 rounded-full hover:bg-blue-100 text-blue-500"
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
  );
};

export default PendingTable;
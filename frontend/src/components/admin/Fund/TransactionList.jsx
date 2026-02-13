import React from "react";
import { Filter, Calendar, Trash2, Receipt } from "lucide-react";

const TransactionList = ({
  transactions,
  funds,
  formatCurrency,
  formatDate,
  filterFund,
  setFilterFund,
  filterType,
  setFilterType,
  filterMonth,
  setFilterMonth,
  onDeleteTransaction,
}) => {
  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (filterFund && t.fund_id != filterFund) return false;
    if (filterType && t.type !== filterType) return false;
    if (filterMonth) {
      const transDate = new Date(t.transaction_date);
      const [year, month] = filterMonth.split("-");
      if (transDate.getFullYear() != year || transDate.getMonth() + 1 != month)
        return false;
    }
    return true;
  });

  const clearFilters = () => {
    setFilterFund("");
    setFilterType("");
    setFilterMonth("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Filters */}
      <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <span className="text-sm text-slate-500">Lọc:</span>
        </div>
        <select
          value={filterFund}
          onChange={(e) => setFilterFund(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Tất cả quỹ</option>
          {funds.map((f) => (
            <option key={f.id} value={f.id}>
              {f.fund_name}
            </option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Tất cả loại</option>
          <option value="income">Thu</option>
          <option value="expense">Chi</option>
        </select>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {(filterFund || filterType || filterMonth) && (
          <button
            onClick={clearFilters}
            className="text-sm text-rose-600 hover:underline"
          >
            Xóa lọc
          </button>
        )}
        <span className="ml-auto text-sm text-slate-400">
          Hiển thị {filteredTransactions.length} giao dịch
        </span>
      </div>

      {/* Table */}
      {filteredTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Ngày
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Nội dung
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Quỹ
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Người đóng
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                  Số tiền
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(t.transaction_date)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700 font-medium">
                      {t.description || "Không có mô tả"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Bởi: {t.profiles?.username || "Admin"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {t.funds?.fund_name || "N/A"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {t.family_members?.full_name || "-"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`text-sm font-bold ${
                        t.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => onDeleteTransaction(t.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                      title="Xóa giao dịch"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 text-center">
          <Receipt size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Chưa có giao dịch nào</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;

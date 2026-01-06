import React from "react";
import { X, Save, TrendingUp, TrendingDown } from "lucide-react";

const incomeCategories = [
  "Đóng góp định kỳ",
  "Công đức",
  "Tài trợ",
  "Thu khác",
];

const expenseCategories = [
  "Giỗ, lễ",
  "Tu sửa mộ, từ đường",
  "Hoạt động họp họ",
  "Khuyến học",
  "Thăm hỏi",
  "Chi phí vận hành",
  "Chi khác",
];

const TransactionModal = ({
  isOpen,
  onClose,
  transactionType,
  setTransactionType,
  transactionForm,
  setTransactionForm,
  funds,
  members,
  formatCurrency,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl">
        <div
          className={`p-5 rounded-t-2xl flex justify-between items-center ${
            transactionType === "income" ? "bg-emerald-600" : "bg-rose-600"
          } text-white`}
        >
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {transactionType === "income" ? (
              <>
                <TrendingUp size={20} /> Ghi nhận khoản thu
              </>
            ) : (
              <>
                <TrendingDown size={20} /> Ghi nhận khoản chi
              </>
            )}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Toggle Thu/Chi */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTransactionType("income");
                setTransactionForm({
                  ...transactionForm,
                  type: "income",
                  category: incomeCategories[0],
                });
              }}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm border-2 transition ${
                transactionType === "income"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              Thu
            </button>
            <button
              onClick={() => {
                setTransactionType("expense");
                setTransactionForm({
                  ...transactionForm,
                  type: "expense",
                  category: expenseCategories[0],
                });
              }}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm border-2 transition ${
                transactionType === "expense"
                  ? "bg-rose-50 border-rose-500 text-rose-700"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              Chi
            </button>
          </div>

          {/* Chọn quỹ */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Chọn quỹ <span className="text-rose-500">*</span>
            </label>
            <select
              value={transactionForm.fund_id}
              onChange={(e) =>
                setTransactionForm({
                  ...transactionForm,
                  fund_id: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Chọn quỹ --</option>
              {funds.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.fund_name} ({formatCurrency(f.balance)})
                </option>
              ))}
            </select>
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Danh mục
            </label>
            <select
              value={transactionForm.category}
              onChange={(e) =>
                setTransactionForm({
                  ...transactionForm,
                  category: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {(transactionType === "income"
                ? incomeCategories
                : expenseCategories
              ).map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Số tiền */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Số tiền (VNĐ) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              value={transactionForm.amount}
              onChange={(e) =>
                setTransactionForm({
                  ...transactionForm,
                  amount: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
              placeholder="0"
            />
          </div>

          {/* Người đóng góp (chỉ cho Thu) */}
          {transactionType === "income" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Người đóng góp
              </label>
              <select
                value={transactionForm.contributor_id}
                onChange={(e) =>
                  setTransactionForm({
                    ...transactionForm,
                    contributor_id: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Chọn thành viên (không bắt buộc) --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.full_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nội dung / Mô tả
            </label>
            <textarea
              value={transactionForm.description}
              onChange={(e) =>
                setTransactionForm({
                  ...transactionForm,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={2}
              placeholder={
                transactionType === "income"
                  ? "VD: Đóng góp quỹ tháng 12/2025"
                  : "VD: Chi phí giỗ tổ ngày 15 tháng Chạp"
              }
            />
          </div>

          <p className="text-xs text-slate-400 italic">
            * Giao dịch sẽ được ghi nhận ngay và cập nhật số dư quỹ tự động
          </p>
        </div>
        <div className="p-5 border-t border-slate-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className={`px-5 py-2.5 text-white rounded-xl transition font-medium flex items-center gap-2 ${
              transactionType === "income"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            <Save size={16} />
            {transactionType === "income" ? "Ghi nhận thu" : "Ghi nhận chi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;

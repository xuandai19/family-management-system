import React from "react";
import {
  Plus,
  Edit,
  Trash2,
  Wallet,
  PiggyBank,
  BookOpen,
  GraduationCap,
  Building,
} from "lucide-react";

// Quỹ mặc định gợi ý
const defaultFundSuggestions = [
  {
    name: "Quỹ chung dòng họ",
    icon: Wallet,
    description: "Quỹ tổng hợp chung của dòng họ",
  },
  {
    name: "Quỹ giỗ tổ",
    icon: BookOpen,
    description: "Chi phí tổ chức giỗ tổ hàng năm",
  },
  {
    name: "Quỹ khuyến học",
    icon: GraduationCap,
    description: "Hỗ trợ học tập, trao thưởng",
  },
  {
    name: "Quỹ xây dựng - tu sửa",
    icon: Building,
    description: "Tu sửa mộ, từ đường",
  },
];

const FundList = ({
  funds,
  transactions,
  formatCurrency,
  onOpenFundModal,
  onDeleteFund,
  onQuickCreateFund,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <PiggyBank size={20} className="text-emerald-600" />
          Danh sách quỹ
        </h3>
        <button
          onClick={() => onOpenFundModal()}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-sm font-medium"
        >
          <Plus size={16} />
          Tạo quỹ mới
        </button>
      </div>

      {funds.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {funds.map((fund) => {
            // Tính thu/chi của từng quỹ
            const fundIncome = transactions
              .filter((t) => t.fund_id === fund.id && t.type === "income")
              .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            const fundExpense = transactions
              .filter((t) => t.fund_id === fund.id && t.type === "expense")
              .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

            return (
              <div
                key={fund.id}
                className="p-5 hover:bg-slate-50 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {fund.fund_name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {fund.description || "Không có mô tả"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">Thu</p>
                    <p className="text-sm font-medium text-blue-600">
                      +{formatCurrency(fundIncome)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">Chi</p>
                    <p className="text-sm font-medium text-rose-600">
                      -{formatCurrency(fundExpense)}
                    </p>
                  </div>
                  <div className="text-right min-w-[140px]">
                    <p className="text-xs text-slate-400 mb-1">Số dư</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(fund.balance)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenFundModal(fund)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteFund(fund.id)}
                      className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-10 text-center">
          <PiggyBank size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 mb-4">Chưa có quỹ nào được tạo</p>
          <p className="text-sm text-slate-400 mb-6">
            Tạo nhanh các quỹ phổ biến:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {defaultFundSuggestions.map((suggestion, idx) => {
              const Icon = suggestion.icon;
              const exists = funds.some((f) => f.fund_name === suggestion.name);
              if (exists) return null;
              return (
                <button
                  key={idx}
                  onClick={() => onQuickCreateFund(suggestion)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition text-sm"
                >
                  <Icon size={16} />
                  {suggestion.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FundList;

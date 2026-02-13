import React from "react";
import { Banknote, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const FundStatsCards = ({
  totalBalance,
  totalIncome,
  totalExpense,
  fundsCount,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Banknote size={22} />
          </div>
          <span className="text-emerald-100 text-sm font-medium">
            Tổng số dư
          </span>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <TrendingUp size={22} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Tổng thu</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">
          {formatCurrency(totalIncome)}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
            <TrendingDown size={22} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Tổng chi</span>
        </div>
        <p className="text-2xl font-bold text-rose-600">
          {formatCurrency(totalExpense)}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <PiggyBank size={22} />
          </div>
          <span className="text-slate-500 text-sm font-medium">Số quỹ</span>
        </div>
        <p className="text-2xl font-bold text-amber-600">{fundsCount}</p>
      </div>
    </div>
  );
};

export default FundStatsCards;

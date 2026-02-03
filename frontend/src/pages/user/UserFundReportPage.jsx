import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  PieChart,
  Bell,
  History,
} from "lucide-react";
import PageHeader from "./components/PageHeader";
import QuickNavigation from "./components/QuickNavigation";

const UserFundReportPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  // Các link liên quan
  const relatedLinks = [
    {
      icon: Bell,
      label: "Thông báo đóng quỹ",
      description: "Xem các thông báo mới",
      path: "/user/fund-notifications",
    },
    {
      icon: History,
      label: "Lịch sử đóng quỹ",
      description: "Lịch sử đóng góp cá nhân",
      path: "/user/payment-history",
    },
  ];

  useEffect(() => {
    // TODO: Fetch từ API thực tế
    const fetchFundReport = async () => {
      setLoading(true);
      try {
        // Mock data - thay bằng API call thực tế
        const mockTransactions = [
          {
            id: 1,
            type: "income",
            description: "Thu quỹ tháng 1/2026 - Tổng hợp",
            amount: 25000000,
            date: "2026-01-10",
            category: "Quỹ hàng tháng",
          },
          {
            id: 2,
            type: "expense",
            description: "Chi phí cúng Tết từ đường",
            amount: 5000000,
            date: "2026-01-08",
            category: "Lễ hội",
          },
          {
            id: 3,
            type: "income",
            description: "Đóng góp quỹ sửa từ đường",
            amount: 50000000,
            date: "2025-12-20",
            category: "Xây dựng",
          },
          {
            id: 4,
            type: "expense",
            description: "Sửa chữa mái từ đường",
            amount: 30000000,
            date: "2025-12-25",
            category: "Xây dựng",
          },
          {
            id: 5,
            type: "expense",
            description: "Chi phí tổ chức họp dòng họ",
            amount: 3000000,
            date: "2025-12-15",
            category: "Sự kiện",
          },
          {
            id: 6,
            type: "income",
            description: "Thu quỹ tháng 12/2025",
            amount: 20000000,
            date: "2025-12-10",
            category: "Quỹ hàng tháng",
          },
        ];

        const totalIncome = mockTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = mockTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        setTransactions(mockTransactions);
        setSummary({
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        });
      } catch (error) {
        console.error("Lỗi fetch fund report:", error);
      }
      setLoading(false);
    };

    fetchFundReport();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6914]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
      {/* Header với Breadcrumb */}
      <PageHeader
        icon={Wallet}
        title="Thu Chi Quỹ Dòng Họ"
        description="Báo cáo tổng hợp thu chi quỹ"
        breadcrumbs={[{ label: "Thu chi quỹ" }]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Thu */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Tổng thu</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(summary.totalIncome)}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Chi */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Tổng chi</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(summary.totalExpense)}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Số dư */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#8B6914]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Số dư hiện tại</p>
              <p className="text-2xl font-bold text-[#8B6914]">
                {formatCurrency(summary.balance)}
              </p>
            </div>
            <div className="bg-[#ffe2a1] rounded-full p-3">
              <PieChart size={24} className="text-[#8B6914]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter size={20} className="text-slate-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === "all"
                  ? "bg-[#8B6914] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterType("income")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Thu
            </button>
            <button
              onClick={() => setFilterType("expense")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Chi
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Chi tiết giao dịch
          </h2>
        </div>
        <div className="divide-y divide-slate-200">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="px-6 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight size={20} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={20} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(transaction.date)}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Wallet size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Không có giao dịch nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickNavigation
        title="Liên kết nhanh"
        items={relatedLinks}
        className="mt-8"
      />
    </div>
  );
};

export default UserFundReportPage;

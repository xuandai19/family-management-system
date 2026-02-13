import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Calendar,
  DollarSign,
  CheckCircle,
  Search,
  Filter,
  Bell,
  Wallet,
} from "lucide-react";
import { PageHeader, QuickNavigation } from "../../components/member/common";
import { getMyPaymentHistory } from "../../services/member";

const UserPaymentHistoryPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");

  // Các link liên quan
  const relatedLinks = [
    {
      icon: Bell,
      label: "Thông báo đóng quỹ",
      description: "Xem các thông báo mới",
      path: "/member/fund-notifications",
    },
    {
      icon: Wallet,
      label: "Thu chi quỹ",
      description: "Báo cáo tài chính dòng họ",
      path: "/member/fund-report",
    },
  ];

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMyPaymentHistory();
        if (response.success) {
          setPayments(response.data || []);
        } else {
          setError(response.message || "Không thể tải lịch sử đóng quỹ");
        }
      } catch (error) {
        console.error("Lỗi fetch payments:", error);
        setError("Không thể kết nối đến server");
        setPayments([]);
      }
      setLoading(false);
    };

    fetchPayments();
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

  // Tính tổng đã đóng
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchSearch = payment.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchYear =
      filterYear === "all" || payment.paymentDate.startsWith(filterYear);
    return matchSearch && matchYear;
  });

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
        icon={History}
        title="Lịch Sử Đóng Quỹ"
        description="Theo dõi các khoản đóng góp của bạn"
        breadcrumbs={[{ label: "Lịch sử đóng quỹ" }]}
      />

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-[#8B6914] to-[#9A7B1A] rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#ffe2a1] text-sm">Tổng đã đóng góp</p>
            <p className="text-3xl font-bold">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <DollarSign size={32} />
          </div>
        </div>
        <p className="text-[#ffe2a1] text-sm mt-2">
          {payments.length} khoản đóng góp
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
            >
              <option value="all">Tất cả năm</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Mã phiếu
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Mô tả
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Số tiền
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Ngày đóng
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Hình thức
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {payment.receiptNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8B6914] font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(payment.paymentDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={12} />
                        Đã hoàn thành
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <History
                      size={48}
                      className="mx-auto text-slate-300 mb-4"
                    />
                    <p className="text-slate-500">Không có lịch sử đóng quỹ</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default UserPaymentHistoryPage;

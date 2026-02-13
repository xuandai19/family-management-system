import React, { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Download,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Receipt,
  Megaphone,
} from "lucide-react";
import {
  getAllFunds,
  createFund,
  updateFund,
  deleteFund,
  createTransaction,
  deleteTransaction,
  getAllTransactions,
} from "../../services/admin/fundApi";
import {
  getAllCollectionRounds,
  createCollectionRound,
  updateCollectionRound,
  deleteCollectionRound,
  getPaymentsByRound,
  confirmPayment,
  deletePayment,
} from "../../services/admin/collectionApi";
import { getAllFamilyMembers } from "../../services/admin/memberApi";
import {
  FundStatsCards,
  FundList,
  TransactionList,
  FundModal,
  TransactionModal,
  CollectionRoundList,
  CollectionRoundModal,
  PaymentManagement,
} from "../../components/admin/Fund";

// Danh mục
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

const FunPage = () => {
  // ============ STATE ============
  const [activeTab, setActiveTab] = useState("collections");
  const [funds, setFunds] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);
  const [collectionRounds, setCollectionRounds] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Modal states
  const [showFundModal, setShowFundModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [editingFund, setEditingFund] = useState(null);
  const [editingRound, setEditingRound] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [transactionType, setTransactionType] = useState("income");

  // Form states
  const [fundForm, setFundForm] = useState({
    fund_name: "",
    description: "",
    balance: 0,
  });

  const [transactionForm, setTransactionForm] = useState({
    fund_id: "",
    amount: "",
    type: "income",
    description: "",
    contributor_id: "",
    category: "",
  });

  const [collectionForm, setCollectionForm] = useState({
    title: "",
    description: "",
    fund_id: "",
    amount_per_person: "",
    unit_type: "person",
    start_date: "",
    end_date: "",
    status: "active",
  });

  // Filter states
  const [filterFund, setFilterFund] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  // ============ FETCH DATA ============
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fundsRes, transactionsRes, membersRes, roundsRes] =
        await Promise.all([
          getAllFunds(),
          getAllTransactions(),
          getAllFamilyMembers(),
          getAllCollectionRounds(),
        ]);

      if (fundsRes.success) setFunds(fundsRes.data || []);
      if (transactionsRes.success) setTransactions(transactionsRes.data || []);
      if (membersRes.success) setMembers(membersRes.data || []);
      if (roundsRes.success) setCollectionRounds(roundsRes.data || []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
      showNotification("Không thể tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async (roundId) => {
    try {
      const res = await getPaymentsByRound(roundId);
      if (res.success) setPayments(res.data || []);
    } catch (error) {
      console.error("Lỗi tải payments:", error);
    }
  };

  // ============ HELPERS ============
  const showNotification = (message, type = "success") => {
    setShowToast({ show: true, message, type });
    setTimeout(
      () => setShowToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount || 0) + " VNĐ";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Tính toán thống kê
  const totalBalance = funds.reduce(
    (sum, f) => sum + parseFloat(f.balance || 0),
    0,
  );
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  // Tính thống kê cho từng đợt thu
  const getCollectionStats = (roundId) => {
    const roundPayments = transactions.filter(
      (t) =>
        t.type === "income" &&
        t.description?.includes(
          collectionRounds.find((r) => r.id === roundId)?.title || "",
        ),
    );
    return {
      totalPayers: roundPayments.length,
      totalCollected: roundPayments.reduce(
        (sum, t) => sum + parseFloat(t.amount || 0),
        0,
      ),
    };
  };

  // ============ HANDLERS - QUỸ ============
  const handleOpenFundModal = (fund = null) => {
    if (fund) {
      setEditingFund(fund);
      setFundForm({
        fund_name: fund.fund_name,
        description: fund.description || "",
        balance: fund.balance || 0,
      });
    } else {
      setEditingFund(null);
      setFundForm({ fund_name: "", description: "", balance: 0 });
    }
    setShowFundModal(true);
  };

  const handleSaveFund = async () => {
    if (!fundForm.fund_name.trim()) {
      showNotification("Vui lòng nhập tên quỹ", "error");
      return;
    }

    try {
      if (editingFund) {
        const res = await updateFund(editingFund.id, fundForm);
        if (res.success) {
          showNotification("Cập nhật quỹ thành công");
          fetchData();
        }
      } else {
        const res = await createFund(fundForm);
        if (res.success) {
          showNotification("Tạo quỹ thành công");
          fetchData();
        }
      }
      setShowFundModal(false);
    } catch (error) {
      showNotification("Có lỗi xảy ra: " + error.message, "error");
    }
  };

  const handleDeleteFund = async (fundId) => {
    if (!window.confirm("Bạn có chắc muốn xóa quỹ này?")) return;

    try {
      const res = await deleteFund(fundId);
      if (res.success) {
        showNotification("Xóa quỹ thành công");
        fetchData();
      } else {
        showNotification(res.message || "Không thể xóa quỹ", "error");
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra", "error");
    }
  };

  const handleQuickCreateFund = async (suggestion) => {
    try {
      const res = await createFund({
        fund_name: suggestion.name,
        description: suggestion.description,
        balance: 0,
      });
      if (res.success) {
        showNotification(`Tạo "${suggestion.name}" thành công`);
        fetchData();
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra", "error");
    }
  };

  // ============ HANDLERS - GIAO DỊCH ============
  const handleOpenTransactionModal = (type = "income") => {
    setTransactionType(type);
    setTransactionForm({
      fund_id: funds[0]?.id || "",
      amount: "",
      type: type,
      description: "",
      contributor_id: "",
      category: type === "income" ? incomeCategories[0] : expenseCategories[0],
    });
    setShowTransactionModal(true);
  };

  const handleSaveTransaction = async () => {
    if (!transactionForm.fund_id) {
      showNotification("Vui lòng chọn quỹ", "error");
      return;
    }
    if (!transactionForm.amount || parseFloat(transactionForm.amount) <= 0) {
      showNotification("Vui lòng nhập số tiền hợp lệ", "error");
      return;
    }

    setActionLoading(true);
    try {
      const res = await createTransaction({
        fund_id: transactionForm.fund_id,
        amount: parseFloat(transactionForm.amount),
        type: transactionType,
        description: `[${transactionForm.category}] ${transactionForm.description}`,
        contributor_id: transactionForm.contributor_id || null,
      });

      if (res.success) {
        showNotification(
          transactionType === "income"
            ? "Ghi nhận thu thành công"
            : "Ghi nhận chi thành công",
        );
        fetchData();
        setShowTransactionModal(false);
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra: " + error.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (
      !window.confirm(
        "Bạn có chắc muốn xóa giao dịch này? Số dư quỹ sẽ được hoàn lại.",
      )
    )
      return;

    try {
      const res = await deleteTransaction(transactionId);
      if (res.success) {
        showNotification("Xóa giao dịch thành công");
        fetchData();
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra", "error");
    }
  };

  // ============ HANDLERS - ĐỢT THU ============
  const handleOpenCollectionModal = (round = null) => {
    if (round) {
      setEditingRound(round);
      setCollectionForm({
        title: round.title,
        description: round.description || "",
        fund_id: round.fund_id || "",
        amount_per_person: round.amount_per_person || "",
        unit_type: round.unit_type || "person",
        start_date: round.start_date || "",
        end_date: round.end_date || "",
        status: round.status || "active",
      });
    } else {
      setEditingRound(null);
      setCollectionForm({
        title: "",
        description: "",
        fund_id: funds[0]?.id || "",
        amount_per_person: "",
        unit_type: "person",
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
        status: "active",
      });
    }
    setShowCollectionModal(true);
  };

  const handleSaveCollection = async () => {
    if (!collectionForm.title.trim()) {
      showNotification("Vui lòng nhập tiêu đề đợt thu", "error");
      return;
    }
    if (!collectionForm.fund_id) {
      showNotification("Vui lòng chọn quỹ", "error");
      return;
    }
    if (
      !collectionForm.amount_per_person ||
      parseFloat(collectionForm.amount_per_person) <= 0
    ) {
      showNotification("Vui lòng nhập mức thu hợp lệ", "error");
      return;
    }

    setActionLoading(true);
    try {
      if (editingRound) {
        const res = await updateCollectionRound(
          editingRound.id,
          collectionForm,
        );
        if (res.success) {
          showNotification("Cập nhật đợt thu thành công");
          fetchData();
        }
      } else {
        const res = await createCollectionRound(collectionForm);
        if (res.success) {
          showNotification("Tạo đợt thu thành công");
          fetchData();
        }
      }
      setShowCollectionModal(false);
    } catch (error) {
      showNotification("Có lỗi xảy ra: " + error.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCollection = async (roundId) => {
    if (!window.confirm("Bạn có chắc muốn xóa đợt thu này?")) return;

    try {
      const res = await deleteCollectionRound(roundId);
      if (res.success) {
        showNotification("Xóa đợt thu thành công");
        fetchData();
      } else {
        showNotification(res.message || "Không thể xóa", "error");
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra", "error");
    }
  };

  const handleViewPayments = async (round) => {
    setSelectedRound(round);
    await fetchPayments(round.id);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (paymentData) => {
    setActionLoading(true);
    try {
      const res = await confirmPayment(paymentData);
      if (res.success) {
        showNotification(res.message || "Xác nhận thành công");
        await fetchPayments(selectedRound.id);
        fetchData(); // Refresh transactions
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra: " + error.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    setActionLoading(true);
    try {
      const res = await deletePayment(paymentId);
      if (res.success) {
        showNotification("Đã xóa và hoàn trả số dư");
        await fetchPayments(selectedRound.id);
        fetchData();
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ============ EXPORT ============
  const handleExportReport = () => {
    let reportContent = "BÁO CÁO TÀI CHÍNH QUỸ DÒNG HỌ\n";
    reportContent += "=".repeat(50) + "\n\n";
    reportContent += `Ngày xuất báo cáo: ${new Date().toLocaleDateString(
      "vi-VN",
    )}\n\n`;

    reportContent += "I. TỔNG QUAN\n";
    reportContent += `-  Tổng số dư các quỹ: ${formatCurrency(totalBalance)}\n`;
    reportContent += `-  Tổng thu: ${formatCurrency(totalIncome)}\n`;
    reportContent += `-  Tổng chi: ${formatCurrency(totalExpense)}\n\n`;

    reportContent += "II. CHI TIẾT CÁC QUỸ\n";
    funds.forEach((fund, idx) => {
      reportContent += `${idx + 1}. ${fund.fund_name}: ${formatCurrency(
        fund.balance,
      )}\n`;
      if (fund.description) reportContent += `   Mô tả: ${fund.description}\n`;
    });

    reportContent += "\nIII. LỊCH SỬ GIAO DỊCH GẦN ĐÂY\n";
    transactions.slice(0, 20).forEach((t, idx) => {
      const typeLabel = t.type === "income" ? "THU" : "CHI";
      reportContent += `${idx + 1}. [${typeLabel}] ${formatCurrency(
        t.amount,
      )} - ${t.description || "Không có mô tả"} (${formatDate(
        t.transaction_date,
      )})\n`;
    });

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bao-cao-quy-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification("Xuất báo cáo thành công");
  };

  // ============ RENDER ============
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw className="animate-spin" size={24} />
          <span>Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* TOAST NOTIFICATION */}
      {showToast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-right-5 duration-300 ${
            showToast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {showToast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{showToast.message}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-xl text-white">
                <Wallet size={28} />
              </div>
              Quản lý Quỹ Dòng Họ
            </h1>
            <p className="text-slate-500 mt-2 ml-14">
              Ghi nhận thu - chi, quản lý tài chính minh bạch
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition font-medium"
            >
              <Download size={18} />
              Xuất báo cáo
            </button>
            <button
              onClick={() => handleOpenTransactionModal("expense")}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition font-medium"
            >
              <TrendingDown size={18} />
              Ghi chi
            </button>
            <button
              onClick={() => handleOpenTransactionModal("income")}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium"
            >
              <TrendingUp size={18} />
              Ghi thu
            </button>
          </div>
        </div>
      </div>

      {/* THỐNG KÊ TỔNG QUAN */}
      <FundStatsCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        fundsCount={funds.length}
        formatCurrency={formatCurrency}
      />

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {[
          {
            id: "collections",
            label: "Đợt thu tiền",
            icon: <Megaphone size={16} />,
          },
          {
            id: "overview",
            label: "Tổng quan quỹ",
            icon: <Wallet size={16} />,
          },
          {
            id: "transactions",
            label: "Lịch sử giao dịch",
            icon: <Receipt size={16} />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${
              activeTab === tab.id
                ? tab.id === "collections"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "collections" && (
        <CollectionRoundList
          rounds={collectionRounds}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onOpenModal={handleOpenCollectionModal}
          onDelete={handleDeleteCollection}
          onViewPayments={handleViewPayments}
          getStats={getCollectionStats}
        />
      )}

      {activeTab === "overview" && (
        <FundList
          funds={funds}
          transactions={transactions}
          formatCurrency={formatCurrency}
          onOpenFundModal={handleOpenFundModal}
          onDeleteFund={handleDeleteFund}
          onQuickCreateFund={handleQuickCreateFund}
        />
      )}

      {activeTab === "transactions" && (
        <TransactionList
          transactions={transactions}
          funds={funds}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          filterFund={filterFund}
          setFilterFund={setFilterFund}
          filterType={filterType}
          setFilterType={setFilterType}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          onDeleteTransaction={handleDeleteTransaction}
        />
      )}

      {/* MODALS */}
      <FundModal
        isOpen={showFundModal}
        onClose={() => setShowFundModal(false)}
        editingFund={editingFund}
        fundForm={fundForm}
        setFundForm={setFundForm}
        onSave={handleSaveFund}
      />

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        transactionForm={transactionForm}
        setTransactionForm={setTransactionForm}
        funds={funds}
        members={members}
        formatCurrency={formatCurrency}
        onSave={handleSaveTransaction}
      />

      <CollectionRoundModal
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        editingRound={editingRound}
        form={collectionForm}
        setForm={setCollectionForm}
        funds={funds}
        onSave={handleSaveCollection}
      />

      <PaymentManagement
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedRound(null);
          setPayments([]);
        }}
        round={selectedRound}
        payments={payments}
        members={members}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        onConfirmPayment={handleConfirmPayment}
        onDeletePayment={handleDeletePayment}
        loading={actionLoading}
      />
    </div>
  );
};

export default FunPage;

import React, { useState, useEffect, useMemo } from "react";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";
import {
  ProposalStats,
  ProposalFilters,
  ProposalList,
  ProposalDetailModal,
} from "../../components/admin/Proposal";
import {
  getAllEventProposals,
  getPendingEventProposals,
  approveEventProposal,
  rejectEventProposal,
  deleteEventProposal,
  getAllExpenseProposals,
  getPendingExpenseProposals,
  approveExpenseProposal,
  rejectExpenseProposal,
  deleteExpenseProposal,
  getPendingProposalCount,
} from "../../services/admin/proposalApi";
import { useToast } from "../../hooks/admin";

const ProposalPage = () => {
  const [eventProposals, setEventProposals] = useState([]);
  const [expenseProposals, setExpenseProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("events");
  const [activeStatus, setActiveStatus] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [pendingCounts, setPendingCounts] = useState({
    eventCount: 0,
    expenseCount: 0,
  });
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, expensesRes, countRes] = await Promise.all([
        getAllEventProposals(),
        getAllExpenseProposals(),
        getPendingProposalCount(),
      ]);
      setEventProposals(eventsRes.data || []);
      setExpenseProposals(expensesRes.data || []);
      setPendingCounts({
        eventCount: countRes.eventCount || 0,
        expenseCount: countRes.expenseCount || 0,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      showToast("Lỗi khi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  // Approve/Reject handlers
  const handleApprove = (proposal) => {
    setSelectedProposal(proposal);
    setShowDetailModal(true);
  };

  const handleReject = (proposal) => {
    setSelectedProposal(proposal);
    setShowDetailModal(true);
  };

  const handleModalApprove = async (id, notes) => {
    try {
      if (activeCategory === "events") {
        await approveEventProposal(id, { review_notes: notes });
      } else {
        await approveExpenseProposal(id, { review_notes: notes });
      }
      showToast("Đã duyệt đề xuất");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleModalReject = async (id, notes) => {
    try {
      if (activeCategory === "events") {
        await rejectEventProposal(id, { review_notes: notes });
      } else {
        await rejectExpenseProposal(id, { review_notes: notes });
      }
      showToast("Đã từ chối đề xuất");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa đề xuất này?")) return;
    try {
      if (activeCategory === "events") {
        await deleteEventProposal(id);
      } else {
        await deleteExpenseProposal(id);
      }
      showToast("Đã xóa đề xuất");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleViewDetail = (proposal) => {
    setSelectedProposal(proposal);
    setShowDetailModal(true);
  };

  // Calculate stats
  const stats = useMemo(() => {
    return {
      totalEvents: eventProposals.length,
      pendingEvents: pendingCounts.eventCount,
      approvedEvents: eventProposals.filter((p) => p.status === "approved")
        .length,
      rejectedEvents: eventProposals.filter((p) => p.status === "rejected")
        .length,
      totalExpenses: expenseProposals.length,
      pendingExpenses: pendingCounts.expenseCount,
      approvedExpenses: expenseProposals.filter((p) => p.status === "approved")
        .length,
      rejectedExpenses: expenseProposals.filter((p) => p.status === "rejected")
        .length,
    };
  }, [eventProposals, expenseProposals, pendingCounts]);

  // Filter proposals
  const filteredProposals = useMemo(() => {
    const source =
      activeCategory === "events" ? eventProposals : expenseProposals;

    return source.filter((proposal) => {
      // Status filter
      if (activeStatus !== "all" && proposal.status !== activeStatus)
        return false;

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchTitle = proposal.title?.toLowerCase().includes(search);
        const matchDesc = proposal.description?.toLowerCase().includes(search);
        const matchUser = proposal.profiles?.username
          ?.toLowerCase()
          .includes(search);
        if (!matchTitle && !matchDesc && !matchUser) return false;
      }

      return true;
    });
  }, [
    eventProposals,
    expenseProposals,
    activeCategory,
    activeStatus,
    searchTerm,
  ]);

  const currentPendingCount =
    activeCategory === "events"
      ? pendingCounts.eventCount
      : pendingCounts.expenseCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-800 rounded-lg">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Duyệt đề xuất
            </h1>
          </div>
          <p className="text-gray-500">
            Quản lý các đề xuất sự kiện và chi phí từ thành viên
          </p>
        </div>

        {/* Stats */}
        <ProposalStats stats={stats} />

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Filters */}
          <ProposalFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            pendingCount={currentPendingCount}
          />

          {/* Proposal List */}
          <ProposalList
            proposals={filteredProposals}
            type={activeCategory}
            loading={loading}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <ProposalDetailModal
          proposal={selectedProposal}
          type={activeCategory}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProposal(null);
          }}
          onApprove={handleModalApprove}
          onReject={handleModalReject}
          onDelete={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl z-50 ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {toast.type === "error" ? (
            <XCircle size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProposalPage;

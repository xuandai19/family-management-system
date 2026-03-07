import React, { useState, useEffect, useMemo } from "react";
import { FileWarning, CheckCircle, XCircle } from "lucide-react";
import {
  ReportStats,
  ReportFilters,
  ReportList,
  ReportDetailModal,
} from "../../components/admin/Report";
import {
  getAllReports,
  getPendingReports,
  resolveReport,
  dismissReport,
  deleteReport,
  getReportCount,
} from "../../services/admin/reportApi";
import { useToast } from "../../hooks/admin";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { toast, showToast } = useToast();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, pendingRes, countRes] = await Promise.all([
        getAllReports(),
        getPendingReports(),
        getReportCount(),
      ]);
      setReports(allRes.data || []);
      setPendingReports(pendingRes.data || []);
      setPendingCount(countRes.count || 0);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast("Lỗi khi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (reportOrId, resolutionNote) => {
    const id = typeof reportOrId === "object" ? reportOrId.id : reportOrId;
    const note = typeof reportOrId === "object" ? "" : resolutionNote;

    if (typeof reportOrId === "object") {
      setSelectedReport(reportOrId);
      setShowDetailModal(true);
      return;
    }

    try {
      await resolveReport(id, { resolution_note: note });
      showToast("Đã giải quyết báo cáo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleDismiss = async (id) => {
    if (!window.confirm("Xác nhận bỏ qua báo cáo này?")) return;
    try {
      await dismissReport(id);
      showToast("Đã bỏ qua báo cáo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa báo cáo này?")) return;
    try {
      await deleteReport(id);
      showToast("Đã xóa báo cáo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleViewDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleModalResolve = async (id, note) => {
    try {
      await resolveReport(id, { resolution_note: note });
      showToast("Đã giải quyết báo cáo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleModalDismiss = async (id) => {
    try {
      await dismissReport(id);
      showToast("Đã bỏ qua báo cáo");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: reports.length,
      pending: pendingCount,
      resolved: reports.filter((r) => r.status === "resolved").length,
      dismissed: reports.filter((r) => r.status === "dismissed").length,
    };
  }, [reports, pendingCount]);

  // Filter reports
  const filteredReports = useMemo(() => {
    let source;
    if (activeTab === "pending") {
      source = pendingReports;
    } else if (activeTab === "resolved") {
      source = reports.filter(
        (r) => r.status === "resolved" || r.status === "dismissed",
      );
    } else {
      source = reports;
    }

    return source.filter((report) => {
      const matchSearch = report.content
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchType = !filterType || report.type === filterType;
      return matchSearch && matchType;
    });
  }, [reports, pendingReports, activeTab, searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-800 rounded-lg">
              <FileWarning className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Báo cáo & Phản hồi
            </h1>
          </div>
          <p className="text-gray-500">
            Quản lý các báo cáo, góp ý và khiếu nại từ thành viên
          </p>
        </div>

        {/* Stats */}
        <ReportStats stats={stats} />

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Filters */}
          <ReportFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            pendingCount={stats.pending}
          />

          {/* Report List */}
          <ReportList
            reports={filteredReports}
            loading={loading}
            onResolve={handleResolve}
            onDismiss={handleDismiss}
            onDelete={handleDelete}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedReport(null);
          }}
          onResolve={handleModalResolve}
          onDismiss={handleModalDismiss}
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

export default ReportPage;

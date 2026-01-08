// src/pages/admin/ancestralHousePage.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Landmark,
  RefreshCw,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";
import {
  getAncestralHouse,
  upsertAncestralHouse,
  getRenovationLogs,
  createRenovationLog,
  updateRenovationLog,
  deleteRenovationLog,
} from "../../Api/ancestralHouseApi";
import {
  HeroSection,
  PhotoGallery,
  RenovationTimeline,
  HistoryCard,
  QuickStats,
  HouseFormModal,
  RenovationFormModal,
  DeleteConfirmModal,
} from "../../components/adminComponents/AncestralHouse";

const AncestralHousePage = () => {
  // State cho nhà thờ tổ
  const [house, setHouse] = useState(null);
  const [renovations, setRenovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal states
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [showRenovationModal, setShowRenovationModal] = useState(false);
  const [editingRenovation, setEditingRenovation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [houseRes, renovationsRes] = await Promise.all([
        getAncestralHouse(),
        getRenovationLogs(),
      ]);

      if (houseRes.success) {
        setHouse(houseRes.data);
      }
      if (renovationsRes.success) {
        setRenovations(renovationsRes.data || []);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
      showToast("error", "Không thể tải dữ liệu");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Toast helper
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Calculate total renovation cost
  const totalCost = renovations.reduce(
    (sum, r) => sum + (parseFloat(r.cost) || 0),
    0
  );

  // ==========================================
  // HOUSE HANDLERS
  // ==========================================
  const handleSaveHouse = async (data) => {
    setActionLoading(true);
    try {
      const res = await upsertAncestralHouse(data);
      if (res.success) {
        setHouse(res.data);
        setShowHouseModal(false);
        showToast("success", res.message || "Lưu thành công");
      }
    } catch (error) {
      console.error("Lỗi lưu nhà thờ:", error);
      showToast("error", "Không thể lưu thông tin");
    }
    setActionLoading(false);
  };

  // ==========================================
  // RENOVATION HANDLERS
  // ==========================================
  const handleAddRenovation = () => {
    if (!house) {
      showToast("error", "Vui lòng thêm thông tin nhà thờ tổ trước");
      return;
    }
    setEditingRenovation(null);
    setShowRenovationModal(true);
  };

  const handleEditRenovation = (renovation) => {
    setEditingRenovation(renovation);
    setShowRenovationModal(true);
  };

  const handleSaveRenovation = async (data) => {
    setActionLoading(true);
    try {
      let res;
      if (data.id) {
        res = await updateRenovationLog(data.id, data);
      } else {
        res = await createRenovationLog(data);
      }

      if (res.success) {
        await fetchData();
        setShowRenovationModal(false);
        setEditingRenovation(null);
        showToast("success", res.message || "Lưu thành công");
      }
    } catch (error) {
      console.error("Lỗi lưu lịch sử tu sửa:", error);
      showToast("error", "Không thể lưu lịch sử tu sửa");
    }
    setActionLoading(false);
  };

  const handleDeleteRenovation = (renovation) => {
    setDeletingItem(renovation);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;

    setActionLoading(true);
    try {
      const res = await deleteRenovationLog(deletingItem.id);
      if (res.success) {
        setRenovations((prev) => prev.filter((r) => r.id !== deletingItem.id));
        showToast("success", "Xóa thành công");
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
      showToast("error", "Không thể xóa");
    }
    setActionLoading(false);
    setShowDeleteModal(false);
    setDeletingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header - nhỏ gọn */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
            <Landmark size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Nhà Thờ Tổ</h1>
            <p className="text-slate-500 text-xs">
              Thông tin và lịch sử nhà thờ tổ dòng họ
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 text-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Làm mới
          </button>
          {house && (
            <button
              onClick={() => setShowHouseModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-600 text-sm"
            >
              <Settings size={16} />
              Cài đặt
            </button>
          )}
        </div>
      </div>

      {/* Hero Section - Ảnh chính + thông tin */}
      <div className="mb-6">
        <HeroSection
          house={house}
          onEdit={() => setShowHouseModal(true)}
          onAddHouse={() => setShowHouseModal(true)}
        />
      </div>

      {/* Quick Stats - Thống kê nhanh về tu sửa */}
      {house && (
        <div className="mb-6">
          <QuickStats renovations={renovations} totalCost={totalCost} />
        </div>
      )}

      {/* Main Content Grid */}
      {house && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lịch sử & Gallery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <PhotoGallery images={house?.images || []} />

            {/* History Card */}
            {house?.history && <HistoryCard history={house.history} />}
          </div>

          {/* Right Column - Timeline tu sửa */}
          <div className="lg:col-span-1">
            <RenovationTimeline
              renovations={renovations}
              loading={loading}
              onAdd={handleAddRenovation}
              onEdit={handleEditRenovation}
              onDelete={handleDeleteRenovation}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <HouseFormModal
        isOpen={showHouseModal}
        onClose={() => setShowHouseModal(false)}
        onSave={handleSaveHouse}
        house={house}
        loading={actionLoading}
      />

      <RenovationFormModal
        isOpen={showRenovationModal}
        onClose={() => {
          setShowRenovationModal(false);
          setEditingRenovation(null);
        }}
        onSave={handleSaveRenovation}
        renovation={editingRenovation}
        houseId={house?.id}
        loading={actionLoading}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingItem(null);
        }}
        onConfirm={confirmDelete}
        title="Xóa lịch sử tu sửa"
        message={`Bạn có chắc chắn muốn xóa "${deletingItem?.description}"? Hành động này không thể hoàn tác.`}
        loading={actionLoading}
      />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl z-50 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default AncestralHousePage;

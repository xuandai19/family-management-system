import React, { useState, useEffect } from "react";
import {
  Users,
  Heart,
  RefreshCw,
  CheckCircle,
  XCircle,
  Search,
  UserPlus,
  Plus,
} from "lucide-react";
import {
  getAllFamilyMembers,
  getAllSpousesFull,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  createSpouse,
  updateSpouse,
  deleteSpouse,
  getAllMembersWithSpouse,
} from "../../services/admin/memberApi";
import {
  FamilyStatsCards,
  FamilyMembersTable,
  SpousesTable,
  MemberDetailModal,
} from "../../components/admin/FamilyManagement";
import {
  MemberFormModal,
  DeleteConfirmModal,
} from "../../components/admin/userManagement";
import { useToast } from "../../hooks/admin";

const FamilyManagementPage = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [spouses, setSpouses] = useState([]);
  const [marriages, setMarriages] = useState([]); // Thêm state cho marriages
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("members"); // "members" | "spouses"

  // Detail Modal
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSpouse, setIsSpouse] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form Modal (Add/Edit)
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isFormSpouse, setIsFormSpouse] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingMember, setDeletingMember] = useState(null);
  const [isDeleteSpouse, setIsDeleteSpouse] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Toast
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [membersRes, spousesRes, membersWithSpouseRes] = await Promise.all([
        getAllFamilyMembers(),
        getAllSpousesFull(),
        getAllMembersWithSpouse(),
      ]);
      if (membersRes.success) setFamilyMembers(membersRes.data || []);
      if (spousesRes.success) setSpouses(spousesRes.data || []);

      // Tạo marriages data từ membersWithSpouse
      if (membersWithSpouseRes.success) {
        console.log("membersWithSpouseRes.data:", membersWithSpouseRes.data);
        const marriagesData = membersWithSpouseRes.data
          .filter((m) => m.spouse_id) // Chỉ lấy những member có spouse
          .map((m) => ({
            member_id: m.id,
            spouse_id: m.spouse_id,
            spouse_name: m.spouse_name,
            spouse_gender: m.spouse_gender,
            marriage_date: m.marriage_date,
          }));
        console.log("marriagesData:", marriagesData);
        setMarriages(marriagesData);
      }
    } catch (error) {
      showToast("Lỗi tải dữ liệu: " + error.message, "error");
    }
    setLoading(false);
  };

  const handleView = (member, isSpouseType = false) => {
    setSelectedMember(member);
    setIsSpouse(isSpouseType);
    setShowModal(true);
  };

  // ===============================
  // THÊM MỚI
  // ===============================
  const handleAdd = (isSpouseType = false) => {
    setEditingMember(null);
    setIsFormSpouse(isSpouseType);
    setShowFormModal(true);
  };

  // ===============================
  // SỬA
  // ===============================
  const handleEdit = (member, isSpouseType = false) => {
    setEditingMember(member);
    setIsFormSpouse(isSpouseType);
    setShowFormModal(true);
  };

  // ===============================
  // XÓA
  // ===============================
  const handleDeleteClick = (member, isSpouseType = false) => {
    setDeletingMember(member);
    setIsDeleteSpouse(isSpouseType);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;

    setDeleteLoading(true);
    try {
      if (isDeleteSpouse) {
        await deleteSpouse(deletingMember.id);
      } else {
        await deleteFamilyMember(deletingMember.id);
      }
      showToast(`Đã xóa "${deletingMember.full_name}" thành công`, "success");
      setShowDeleteModal(false);
      setDeletingMember(null);
      fetchData();
    } catch (error) {
      showToast(error.response?.data?.error || error.message, "error");
    }
    setDeleteLoading(false);
  };

  // ===============================
  // SUBMIT FORM (THÊM/SỬA)
  // ===============================
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (isFormSpouse) {
        // Spouse
        if (editingMember) {
          await updateSpouse(editingMember.id, formData);
          showToast("Cập nhật vợ/chồng thành công", "success");
        } else {
          await createSpouse(formData);
          showToast("Thêm vợ/chồng thành công", "success");
        }
      } else {
        // Family Member
        if (editingMember) {
          await updateFamilyMember(editingMember.id, formData);
          showToast("Cập nhật thành viên thành công", "success");
        } else {
          await createFamilyMember(formData);
          showToast("Thêm thành viên thành công", "success");
        }
      }
      setShowFormModal(false);
      setEditingMember(null);
      fetchData();
    } catch (error) {
      showToast(error.response?.data?.error || error.message, "error");
    }
    setFormLoading(false);
  };

  // Stats
  const stats = {
    totalMembers: familyMembers.length,
    totalSpouses: spouses.length,
    alive:
      familyMembers.filter((m) => m.is_alive).length +
      spouses.filter((s) => s.is_alive).length,
    deceased:
      familyMembers.filter((m) => !m.is_alive).length +
      spouses.filter((s) => !s.is_alive).length,
  };

  return (
    <div className="p-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <XCircle size={18} />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-500" /> Quản lý thành viên gia phả
          </h1>
          <p className="text-slate-500 mt-1">
            Danh sách thành viên huyết thống và vợ/chồng trong gia phả
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAdd(activeTab === "spouses")}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Thêm {activeTab === "members" ? "thành viên" : "vợ/chồng"}
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-slate-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />{" "}
            Làm mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <FamilyStatsCards stats={stats} />

      {/* Tabs & Search */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "members"
                  ? "bg-blue-500 text-white shadow"
                  : "bg-white text-slate-600 hover:bg-slate-100 border"
              }`}
            >
              <Users size={18} />
              Thành viên ({familyMembers.length})
            </button>
            <button
              onClick={() => setActiveTab("spouses")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "spouses"
                  ? "bg-pink-500 text-white shadow"
                  : "bg-white text-slate-600 hover:bg-slate-100 border"
              }`}
            >
              <Heart size={18} />
              Vợ/Chồng ({spouses.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:border-blue-400 outline-none w-56"
            />
          </div>
        </div>

        {/* Table Content */}
        {activeTab === "members" ? (
          <FamilyMembersTable
            members={familyMembers}
            loading={loading}
            onView={(m) => handleView(m, false)}
            onEdit={(m) => handleEdit(m, false)}
            onDelete={(m) => handleDeleteClick(m, false)}
            searchTerm={searchTerm}
          />
        ) : (
          <SpousesTable
            spouses={spouses}
            loading={loading}
            onView={(s) => handleView(s, true)}
            onEdit={(s) => handleEdit(s, true)}
            onDelete={(s) => handleDeleteClick(s, true)}
            searchTerm={searchTerm}
          />
        )}
      </div>

      {/* Detail Modal */}
      {showModal && (
        <MemberDetailModal
          member={selectedMember}
          isSpouse={isSpouse}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Form Modal (Add/Edit) */}
      <MemberFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingMember(null);
        }}
        onSubmit={handleFormSubmit}
        member={editingMember}
        isSpouse={isFormSpouse}
        allMembers={familyMembers}
        allSpouses={spouses}
        marriages={marriages}
        loading={formLoading}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingMember(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={isDeleteSpouse ? "Xóa vợ/chồng" : "Xóa thành viên"}
        message={`Bạn có chắc chắn muốn xóa ${
          isDeleteSpouse ? "vợ/chồng" : "thành viên"
        } này?`}
        itemName={deletingMember?.full_name}
        loading={deleteLoading}
      />
    </div>
  );
};

export default FamilyManagementPage;

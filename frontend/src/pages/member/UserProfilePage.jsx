import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Send,
  CheckCircle,
  Clock,
  X,
  Camera,
  TreePine,
  UserPlus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PageHeader, QuickNavigation } from "../../components/member/common";
import { getMyProfile, updateMyProfile } from "../../services/member";
import { uploadSingleImage } from "../../services/common/uploadApi";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Các link liên quan
  const relatedLinks = [
    {
      icon: TreePine,
      label: "Cây gia phả",
      description: "Xem vị trí trong gia phả",
      path: "/member/family-tree",
    },
    {
      icon: UserPlus,
      label: "Đề xuất thêm con",
      description: "Thêm thành viên mới",
      path: "/member/add-child-request",
    },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMyProfile();

      if (response.success && response.data) {
        const fm = response.data.family_member;
        const userProfile = {
          id: response.data.id,
          full_name: fm?.full_name || response.data.username || "",
          email: response.data.email || "",
          phone: fm?.phone || response.data.phone || "",
          address: fm?.address || response.data.address || "",
          date_of_birth: fm?.birth_date || response.data.birth_date || "",
          gender: (fm?.gender || response.data.gender || "").toLowerCase(),
          avatar_url: fm?.avatar_url || response.data.avatar_url || "",
          generation: fm?.generation_level || 0,
          role_id: response.data.role_id || 2,
          bio: fm?.bio || "",
          occupation: fm?.occupation || "",
        };

        setUser(userProfile);
        setEditForm(userProfile);
        setPendingRequests(response.data.pending_requests || []);
      }
    } catch (err) {
      console.error("Lỗi fetch user:", err);
      setError("Không thể tải thông tin. Vui lòng thử lại sau.");

      // Fallback to localStorage if API fails
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.profile) {
        const userProfile = {
          id: userData.id,
          full_name: userData.profile.full_name || "",
          email: userData.email || "",
          phone: userData.profile.phone || "",
          address: userData.profile.address || "",
          date_of_birth: userData.profile.date_of_birth || "",
          gender: userData.profile.gender || "male",
          avatar_url: userData.profile.avatar_url || "",
          generation: userData.profile.generation || 0,
          role_id: userData.profile.role_id || 2,
        };
        setUser(userProfile);
        setEditForm(userProfile);
      }
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      const uploadRes = await uploadSingleImage(file, "avatars");
      const newUrl = uploadRes.data?.url || uploadRes.url;
      if (uploadRes.success && newUrl) {
        await updateMyProfile({ avatar_url: newUrl });
        setUser((prev) => ({ ...prev, avatar_url: newUrl }));
        setEditForm((prev) => ({ ...prev, avatar_url: newUrl }));

        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (localUser?.profile) {
          localUser.profile.avatar_url = newUrl;
          localStorage.setItem("user", JSON.stringify(localUser));
        }
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
      alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  const getGenderText = (gender) => {
    switch ((gender || "").toLowerCase()) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      default:
        return "Khác";
    }
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitRequest = async () => {
    setSubmitLoading(true);
    try {
      // So sánh để tìm các field đã thay đổi
      const changes = {};
      Object.keys(editForm).forEach((key) => {
        if (editForm[key] !== user[key] && key !== "id" && key !== "role_id") {
          changes[key] = editForm[key];
        }
      });

      if (Object.keys(changes).length === 0) {
        alert("Không có thay đổi nào để gửi!");
        setSubmitLoading(false);
        return;
      }

      // Gọi API để cập nhật profile
      const response = await updateMyProfile(changes);

      if (response.success) {
        alert(response.message || "Đã cập nhật thông tin thành công!");
        const mergedUser = { ...user, ...changes };
        setUser(mergedUser);
        setEditForm(mergedUser);

        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (localUser?.profile) {
          localUser.profile.full_name = mergedUser.full_name || localUser.profile.full_name;
          localUser.profile.phone = mergedUser.phone || localUser.profile.phone;
          localUser.profile.address = mergedUser.address || localUser.profile.address;
          localUser.profile.gender = mergedUser.gender || localUser.profile.gender;
          localUser.profile.avatar_url = mergedUser.avatar_url || localUser.profile.avatar_url;
          localStorage.setItem("user", JSON.stringify(localUser));
        }

        setShowEditModal(false);
        // Refresh profile data
        fetchUserProfile();
      } else {
        alert(response.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật!");
    }
    setSubmitLoading(false);
  };

  const getFieldLabel = (field) => {
    const labels = {
      full_name: "Họ tên",
      email: "Email",
      phone: "Số điện thoại",
      address: "Địa chỉ",
      date_of_birth: "Ngày sinh",
      gender: "Giới tính",
    };
    return labels[field] || field;
  };

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
        icon={User}
        title="Thông Tin Cá Nhân"
        description="Xem và chỉnh sửa thông tin của bạn"
        breadcrumbs={[{ label: "Thông tin cá nhân" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Avatar Section */}
            <div className="bg-gradient-to-br from-[#8B6914] to-[#6B5210] p-6 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center overflow-hidden ring-4 ring-white/30">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition">
                  {avatarUploading ? (
                    <Loader2
                      size={16}
                      className="text-[#8B6914] animate-spin"
                    />
                  ) : (
                    <Camera size={16} className="text-[#8B6914]" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={avatarUploading}
                  />
                </label>
              </div>
              <h2 className="text-xl font-bold text-white mt-4">
                {user?.full_name}
              </h2>
              <p className="text-[#ffe2a1]">
                Đời thứ {user?.generation || "?"}
              </p>
            </div>

            {/* Quick Info */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-sm">{user?.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full mt-6 py-3 bg-[#8B6914] hover:bg-[#6B5210] text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
              >
                <Edit3 size={18} />
                Sửa thông tin
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Thông tin chi tiết
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-500">Họ và tên</label>
                <p className="text-slate-800 font-medium">{user?.full_name}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Email</label>
                <p className="text-slate-800 font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Số điện thoại</label>
                <p className="text-slate-800 font-medium">{user?.phone}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Ngày sinh</label>
                <p className="text-slate-800 font-medium">
                  {formatDate(user?.date_of_birth)}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Giới tính</label>
                <p className="text-slate-800 font-medium">
                  {getGenderText(user?.gender)}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Địa chỉ</label>
                <p className="text-slate-800 font-medium">{user?.address}</p>
              </div>
            </div>
          </div>

          {/* Pending Requests - reserved for future use */}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">
                  Sửa thông tin
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Cập nhật thông tin cá nhân của bạn
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={editForm.full_name || ""}
                  onChange={(e) =>
                    handleEditChange("full_name", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={editForm.phone || ""}
                  onChange={(e) => handleEditChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={editForm.date_of_birth || ""}
                  onChange={(e) =>
                    handleEditChange("date_of_birth", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Giới tính
                </label>
                <select
                  value={editForm.gender || ""}
                  onChange={(e) => handleEditChange("gender", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Địa chỉ
                </label>
                <textarea
                  value={editForm.address || ""}
                  onChange={(e) => handleEditChange("address", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={submitLoading}
                className="flex-1 px-4 py-2 bg-[#8B6914] hover:bg-[#6B5210] text-white font-medium rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <QuickNavigation
        title="Liên kết nhanh"
        items={relatedLinks}
        className="mt-8"
      />
    </div>
  );
};

export default UserProfilePage;

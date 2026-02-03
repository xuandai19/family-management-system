import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  X,
  AlertCircle,
  Plus,
  Trash2,
  TreePine,
} from "lucide-react";
import PageHeader from "./components/PageHeader";
import QuickNavigation from "./components/QuickNavigation";

const UserAddChildRequestPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  // Các link liên quan
  const relatedLinks = [
    {
      icon: TreePine,
      label: "Cây gia phả",
      description: "Xem cây gia phả hiện tại",
      path: "/user/family-tree",
    },
    {
      icon: User,
      label: "Thông tin cá nhân",
      description: "Xem và cập nhật profile",
      path: "/user/profile",
    },
  ];

  const initialFormState = {
    full_name: "",
    gender: "male",
    date_of_birth: "",
    phone: "",
    email: "",
    address: "",
    occupation: "",
    note: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    // TODO: Fetch pending requests từ API
    // Mock data
    setPendingRequests([
      // {
      //   id: 1,
      //   child_name: "Nguyễn Văn C",
      //   status: "pending",
      //   created_at: "2026-01-10",
      // },
    ]);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Vui lòng nhập họ tên";
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Vui lòng chọn ngày sinh";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      // TODO: Gọi API để gửi yêu cầu thêm con
      // await submitAddChildRequest(formData);

      console.log("Submitted child request:", formData);
      alert("Đã gửi yêu cầu thêm con đến Admin để xét duyệt!");

      // Mock thêm vào pending requests
      const newRequest = {
        id: Date.now(),
        child_name: formData.full_name,
        status: "pending",
        created_at: new Date().toISOString().split("T")[0],
        ...formData,
      };
      setPendingRequests((prev) => [...prev, newRequest]);

      // Reset form
      setFormData(initialFormState);
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu!");
    }
    setSubmitLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            <Clock size={12} />
            Đang chờ duyệt
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Đã duyệt
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <X size={12} />
            Từ chối
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
      {/* Header với Breadcrumb */}
      <PageHeader
        icon={UserPlus}
        title="Đề Xuất Thêm Con"
        description="Gửi yêu cầu thêm con vào cây gia phả để Admin xét duyệt"
        breadcrumbs={[{ label: "Đề xuất thêm con" }]}
      />

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Lưu ý quan trọng:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Yêu cầu sẽ được Admin xem xét và phê duyệt</li>
              <li>
                Con cái sẽ được thêm vào vị trí dưới bạn trong cây gia phả
              </li>
              <li>Vui lòng cung cấp thông tin chính xác</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Thông tin cha/mẹ
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#ffe2a1] rounded-full flex items-center justify-center">
                <User size={32} className="text-[#8B6914]" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {user?.profile?.full_name || "Thành viên"}
                </p>
                <p className="text-sm text-slate-500">
                  Đời thứ {user?.profile?.generation || "?"}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Con cái được thêm sẽ thuộc đời thứ{" "}
              <strong>{(user?.profile?.generation || 0) + 1}</strong>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-[#8B6914]/50 hover:border-[#8B6914] transition group"
            >
              <div className="flex flex-col items-center gap-3 text-[#8B6914] group-hover:text-[#6B5210]">
                <div className="w-16 h-16 bg-[#ffe2a1] rounded-full flex items-center justify-center group-hover:bg-[#8B6914]/20 transition">
                  <Plus size={32} />
                </div>
                <span className="font-medium">Thêm yêu cầu mới</span>
              </div>
            </button>
          )}

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  Thông tin con
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData(initialFormState);
                    setErrors({});
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Họ tên */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent ${
                      errors.full_name ? "border-red-500" : "border-slate-200"
                    }`}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.full_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) =>
                      handleChange("date_of_birth", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent ${
                      errors.date_of_birth
                        ? "border-red-500"
                        : "border-slate-200"
                    }`}
                  />
                  {errors.date_of_birth && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.date_of_birth}
                    </p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nghề nghiệp
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                    placeholder="Nhập nghề nghiệp"
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                    placeholder="Nhập địa chỉ"
                  />
                </div>

                {/* Ghi chú */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleChange("note", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#8B6914] focus:border-transparent"
                    placeholder="Thêm ghi chú (nếu có)"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData(initialFormState);
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className="flex-1 px-4 py-2 bg-[#8B6914] hover:bg-[#6B5210] text-white font-medium rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Gửi yêu cầu
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Pending Requests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-[#8B6914]" />
              Danh sách yêu cầu
            </h3>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ffe2a1] rounded-full flex items-center justify-center">
                          <User size={20} className="text-[#8B6914]" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {request.child_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Gửi ngày: {formatDate(request.created_at)}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    {request.gender && (
                      <p className="text-sm text-slate-600">
                        Giới tính: {request.gender === "male" ? "Nam" : "Nữ"}
                        {request.date_of_birth &&
                          ` • Ngày sinh: ${formatDate(request.date_of_birth)}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserPlus size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">Chưa có yêu cầu nào</p>
              </div>
            )}
          </div>
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

export default UserAddChildRequestPage;

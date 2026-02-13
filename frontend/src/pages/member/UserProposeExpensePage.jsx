import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  FileText,
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";
import { PageHeader } from "../../components/member/common";
import { proposeExpense } from "../../services/member";

const UserProposeExpensePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "repair",
    description: "",
    purpose: "",
    urgency: "normal",
    attachments: [],
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "repair", label: "Sửa chữa" },
    { value: "maintenance", label: "Bảo trì" },
    { value: "event", label: "Tổ chức sự kiện" },
    { value: "charity", label: "Từ thiện" },
    { value: "education", label: "Học bổng/Giáo dục" },
    { value: "other", label: "Khác" },
  ];

  const priorities = [
    { value: "low", label: "Thấp", color: "bg-gray-100 text-gray-600" },
    {
      value: "normal",
      label: "Bình thường",
      color: "bg-blue-100 text-blue-600",
    },
    { value: "high", label: "Cao", color: "bg-orange-100 text-orange-600" },
    { value: "urgent", label: "Khẩn cấp", color: "bg-red-100 text-red-600" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData((prev) => ({ ...prev, amount: formatted }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
    setApiError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tên khoản chi";
    if (!formData.amount || formData.amount === "0")
      newErrors.amount = "Vui lòng nhập số tiền";
    if (!formData.description.trim())
      newErrors.description = "Vui lòng nhập lý do";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError(null);
    try {
      // Convert amount từ string "1,000,000" sang number
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount.replace(/,/g, "")) || 0,
      };

      const response = await proposeExpense(submitData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/member/fund-report");
        }, 2000);
      } else {
        setApiError(response.message || "Có lỗi xảy ra khi gửi đề xuất");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setApiError("Không thể kết nối đến server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Đề xuất thành công!
          </h2>
          <p className="text-gray-600 mb-4">
            Đề xuất khoản chi của bạn đã được gửi và đang chờ Admin phê duyệt.
          </p>
          <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <PageHeader
        title="Đề xuất khoản chi"
        subtitle="Gửi đề xuất chi tiêu từ quỹ dòng họ"
        icon={Wallet}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/member/fund-report")}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Quay lại báo cáo thu chi</span>
        </button>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khoản chi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="VD: Sửa mái nhà thờ"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all ${
                    errors.title
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền dự kiến <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className={`w-full pl-10 pr-16 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all ${
                    errors.amount
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  VNĐ
                </span>
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <label
                    key={cat.value}
                    className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.category === cat.value
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mức độ ưu tiên
              </label>
              <div className="flex flex-wrap gap-3">
                {priorities.map((p) => (
                  <label
                    key={p.value}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all border ${
                      formData.priority === p.value
                        ? `${p.color} border-current`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={p.value}
                      checked={formData.priority === p.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Tag size={16} />
                    <span className="text-sm font-medium">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expected Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày dự kiến thực hiện
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  name="expected_date"
                  value={formData.expected_date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do / Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả chi tiết về khoản chi này, lý do cần chi và cách sử dụng..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Quy trình phê duyệt:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Đề xuất sẽ được Ban quản lý xem xét</li>
                    <li>Các khoản chi lớn cần được họp bàn và thông qua</li>
                    <li>Bạn sẽ nhận thông báo về kết quả phê duyệt</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/member/fund-report")}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Gửi đề xuất
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProposeExpensePage;

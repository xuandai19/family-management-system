import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle2,
  Tag,
  Image,
  Type,
  AlignLeft,
} from "lucide-react";
import { PageHeader } from "./index";
import { proposePost } from "../../services/memberApi";

const UserProposePostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "news",
    excerpt: "",
    content: "",
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "news", label: "Tin tức", description: "Tin tức mới về dòng họ" },
    {
      value: "history",
      label: "Lịch sử",
      description: "Bài viết về lịch sử dòng họ",
    },
    {
      value: "contribution",
      label: "Công đức",
      description: "Thông tin đóng góp",
    },
    { value: "guide", label: "Hướng dẫn", description: "Hướng dẫn, thủ tục" },
    { value: "event", label: "Sự kiện", description: "Tường thuật sự kiện" },
    { value: "other", label: "Khác", description: "Các chủ đề khác" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Vui lòng nhập tóm tắt";
    if (!formData.content.trim()) newErrors.content = "Vui lòng nhập nội dung";
    if (formData.title.length > 200)
      newErrors.title = "Tiêu đề không quá 200 ký tự";
    if (formData.excerpt.length > 500)
      newErrors.excerpt = "Tóm tắt không quá 500 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError(null);
    try {
      const response = await proposePost(formData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/member/posts");
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
            Bài viết của bạn đã được gửi và đang chờ Admin duyệt đăng.
          </p>
          <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <PageHeader
        title="Đề xuất bài viết"
        subtitle="Viết và gửi bài viết mới cho dòng họ"
        icon={FileText}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/member/posts")}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Quay lại danh sách bài viết</span>
        </button>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Type
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề hấp dẫn cho bài viết"
                  maxLength={200}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all ${
                    errors.title
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              <div className="flex justify-between mt-1">
                {errors.title ? (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-400">
                  {formData.title.length}/200
                </span>
              </div>
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
                    className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.category === cat.value
                        ? "border-amber-500 bg-amber-50"
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
                    <span
                      className={`text-sm font-medium ${
                        formData.category === cat.value
                          ? "text-amber-700"
                          : "text-gray-800"
                      }`}
                    >
                      {cat.label}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {cat.description}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tóm tắt <span className="text-red-500">*</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Viết tóm tắt ngắn gọn về nội dung bài viết (hiển thị ở danh sách)"
                rows={3}
                maxLength={500}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none ${
                  errors.excerpt
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.excerpt ? (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.excerpt}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-400">
                  {formData.excerpt.length}/500
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung bài viết <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500">
                {/* Simple toolbar */}
                <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="In đậm"
                  >
                    <span className="font-bold text-sm">B</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="In nghiêng"
                  >
                    <span className="italic text-sm">I</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Gạch chân"
                  >
                    <span className="underline text-sm">U</span>
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Thêm ảnh"
                  >
                    <Image size={16} className="text-gray-600" />
                  </button>
                </div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Viết nội dung chi tiết cho bài viết của bạn...

Bạn có thể:
• Chia sẻ câu chuyện về dòng họ
• Viết về lịch sử, truyền thống
• Tường thuật sự kiện đã diễn ra
• Thông báo tin tức quan trọng"
                  rows={12}
                  className={`w-full px-4 py-3 outline-none resize-none ${
                    errors.content ? "bg-red-50" : ""
                  }`}
                />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.content}
                </p>
              )}
            </div>

            {/* Thumbnail Upload Hint */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <Image className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-1">
                Thêm ảnh đại diện cho bài viết (tùy chọn)
              </p>
              <p className="text-xs text-gray-400">
                Chức năng này sẽ được cập nhật trong phiên bản tiếp theo
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0" size={20} />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Lưu ý khi viết bài:</p>
                  <ul className="list-disc list-inside space-y-1 text-amber-700">
                    <li>Bài viết sẽ được Admin xem xét trước khi đăng</li>
                    <li>
                      Nội dung phải phù hợp, không vi phạm thuần phong mỹ tục
                    </li>
                    <li>
                      Thông tin phải chính xác và có nguồn (nếu trích dẫn)
                    </li>
                    <li>Ảnh minh họa nên rõ ràng và liên quan đến nội dung</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preview & Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/member/posts")}
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
                    Gửi bài viết
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

export default UserProposePostPage;

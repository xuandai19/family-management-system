import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Image,
  Calendar,
  User,
  Upload,
  Loader2,
} from "lucide-react";
import {
  getAllPosts,
  getPendingPosts,
  createPost,
  deletePost,
  approvePost,
  rejectPost,
} from "../../services/admin/postApi";
import { uploadSingleImage } from "../../services/common/uploadApi";
import { useToast } from "../../hooks/admin";

const CATEGORIES = {
  news: { label: "Tin tức", color: "bg-blue-100 text-blue-700" },
  history: { label: "Lịch sử", color: "bg-amber-100 text-amber-700" },
  announcement: { label: "Thông báo", color: "bg-red-100 text-red-700" },
  story: { label: "Câu chuyện", color: "bg-purple-100 text-purple-700" },
  other: { label: "Khác", color: "bg-gray-100 text-gray-700" },
};

const STATUS = {
  draft: { label: "Nháp", color: "bg-gray-100 text-gray-600", icon: Clock },
  pending: {
    label: "Chờ duyệt",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  published: {
    label: "Đã đăng",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  rejected: {
    label: "Từ chối",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const { toast, showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail_url: "",
    category: "news",
    is_featured: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, pendingRes] = await Promise.all([
        getAllPosts(),
        getPendingPosts(),
      ]);
      setPosts(allRes.data || []);
      setPendingPosts(pendingRes.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upload ảnh
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Chỉ cho phép upload ảnh", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ảnh không được quá 5MB", "error");
      return;
    }

    setUploading(true);
    try {
      const res = await uploadSingleImage(file, "posts");
      if (res.success) {
        setNewPost({ ...newPost, thumbnail_url: res.data.url });
        showToast("Upload ảnh thành công!");
      } else {
        showToast(res.message || "Upload thất bại", "error");
      }
    } catch (err) {
      showToast("Lỗi upload: " + (err.message || "Không xác định"), "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      showToast("Vui lòng nhập tiêu đề và nội dung", "error");
      return;
    }
    try {
      await createPost(newPost);
      showToast("Đăng bài thành công!");
      setShowCreateModal(false);
      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        thumbnail_url: "",
        category: "news",
        is_featured: false,
      });
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa bài viết này?")) return;
    try {
      await deletePost(id);
      showToast("Đã xóa bài viết");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approvePost(id);
      showToast("Đã duyệt bài viết");
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const handleReject = async () => {
    if (!rejectReason) {
      showToast("Vui lòng nhập lý do từ chối", "error");
      return;
    }
    try {
      await rejectPost(selectedPost.id, rejectReason);
      showToast("Đã từ chối bài viết");
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedPost(null);
      fetchData();
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const filteredPosts = (activeTab === "pending" ? pendingPosts : posts).filter(
    (post) => {
      const matchSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = !filterCategory || post.category === filterCategory;
      return matchSearch && matchCategory;
    },
  );

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Quản lý bài viết
            </h1>
            <p className="text-gray-500 mt-1">Duyệt và quản lý các bài đăng</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            <Plus size={18} />
            Tạo bài viết
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {posts.length}
                </p>
                <p className="text-sm text-gray-500">Tổng bài viết</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {pendingPosts.length}
                </p>
                <p className="text-sm text-gray-500">Chờ duyệt</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {posts.filter((p) => p.status === "published").length}
                </p>
                <p className="text-sm text-gray-500">Đã đăng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === "all"
                    ? "bg-slate-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                  activeTab === "pending"
                    ? "bg-slate-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Chờ duyệt
                {pendingPosts.length > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded-full">
                    {pendingPosts.length}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none w-64"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Tất cả danh mục</option>
                {Object.entries(CATEGORIES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Đang tải...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FileText size={40} className="mx-auto mb-3 text-gray-300" />
                <p>Không có bài viết nào</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image size={24} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {post.excerpt || post.content?.substring(0, 150)}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {post.author?.username || "Admin"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(post.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Tags & Actions */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                CATEGORIES[post.category]?.color ||
                                "bg-gray-100"
                              }`}
                            >
                              {CATEGORIES[post.category]?.label ||
                                post.category}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                STATUS[post.status]?.color || "bg-gray-100"
                              }`}
                            >
                              {STATUS[post.status]?.label || post.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {post.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(post.id)}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                                  title="Duyệt"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedPost(post);
                                    setShowRejectModal(true);
                                  }}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Từ chối"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                setShowDetailModal(true);
                              }}
                              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                              title="Xem chi tiết"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="Xóa"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Tạo bài viết mới
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tóm tắt
                </label>
                <input
                  type="text"
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({ ...newPost, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  placeholder="Mô tả ngắn gọn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                  placeholder="Nội dung chi tiết"
                />
              </div>

              {/* Upload ảnh đại diện */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh đại diện
                </label>
                <div className="flex gap-4 items-start">
                  {newPost.thumbnail_url ? (
                    <div className="relative">
                      <img
                        src={newPost.thumbnail_url}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setNewPost({ ...newPost, thumbnail_url: "" })
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        !uploading && fileInputRef.current?.click()
                      }
                      className={`w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        uploading
                          ? "bg-gray-100 border-gray-300"
                          : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                      }`}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                          <span className="text-xs text-gray-500 mt-2">
                            Đang tải...
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-xs text-gray-500 mt-2">
                            Chọn ảnh
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2">
                      Hoặc nhập URL ảnh:
                    </p>
                    <input
                      type="text"
                      value={newPost.thumbnail_url}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          thumbnail_url: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none bg-white"
                >
                  {Object.entries(CATEGORIES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={newPost.is_featured}
                  onChange={(e) =>
                    setNewPost({ ...newPost, is_featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="is_featured" className="text-sm text-gray-700">
                  Bài viết nổi bật
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Chi tiết bài viết
              </h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPost(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {selectedPost.thumbnail_url && (
                <img
                  src={selectedPost.thumbnail_url}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    CATEGORIES[selectedPost.category]?.color
                  }`}
                >
                  {CATEGORIES[selectedPost.category]?.label}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    STATUS[selectedPost.status]?.color
                  }`}
                >
                  {STATUS[selectedPost.status]?.label}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedPost.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>Tác giả: {selectedPost.author?.username || "Admin"}</span>
                <span>Ngày tạo: {formatDate(selectedPost.created_at)}</span>
              </div>
              {selectedPost.excerpt && (
                <p className="text-gray-600 italic mb-4">
                  {selectedPost.excerpt}
                </p>
              )}
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {selectedPost.content}
              </div>
              {selectedPost.status === "rejected" &&
                selectedPost.reject_reason && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-sm font-medium text-red-700">
                      Lý do từ chối:
                    </p>
                    <p className="text-sm text-red-600">
                      {selectedPost.reject_reason}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Từ chối bài viết
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Bạn đang từ chối bài viết: <strong>{selectedPost.title}</strong>
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                placeholder="Nhập lý do..."
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedPost(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
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

export default PostsPage;

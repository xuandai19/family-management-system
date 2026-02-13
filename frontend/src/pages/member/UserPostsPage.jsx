import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  User,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Tag,
} from "lucide-react";
import { PageHeader, QuickNavigation } from "./index";
import { getMemberPosts, toggleLikePost } from "../../services/memberApi";

const UserPostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMemberPosts();
      if (response.success) {
        setPosts(response.data || []);
      } else {
        setError(response.message || "Không thể tải danh sách bài viết");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Không thể kết nối đến server");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await toggleLikePost(postId);
      if (response.success) {
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: response.data.like_count,
                  isLiked: response.data.isLiked,
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      history: { label: "Lịch sử", color: "bg-amber-100 text-amber-700" },
      news: { label: "Tin tức", color: "bg-blue-100 text-blue-700" },
      contribution: { label: "Công đức", color: "bg-green-100 text-green-700" },
      guide: { label: "Hướng dẫn", color: "bg-purple-100 text-purple-700" },
      event: { label: "Sự kiện", color: "bg-rose-100 text-rose-700" },
      other: { label: "Khác", color: "bg-gray-100 text-gray-700" },
    };
    return categories[category] || categories.other;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (filter !== "all" && post.category !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        post.title?.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const quickNavItems = [
    { label: "Trang chủ", path: "/member/dashboard" },
    { label: "Cây gia phả", path: "/member/family-tree" },
    { label: "Sự kiện", path: "/member/events" },
    { label: "Từ đường", path: "/member/ancestral-house" },
  ];

  const categoryFilters = [
    { key: "all", label: "Tất cả" },
    { key: "news", label: "Tin tức" },
    { key: "history", label: "Lịch sử" },
    { key: "contribution", label: "Công đức" },
    { key: "guide", label: "Hướng dẫn" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <PageHeader
        title="Bài viết dòng họ"
        subtitle="Tin tức, lịch sử và các thông tin về dòng họ"
        icon={FileText}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <QuickNavigation items={quickNavItems} />

        {/* Filters & Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl overflow-x-auto">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === cat.key
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Propose Post Button */}
            <button
              onClick={() => navigate("/member/propose-post")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25"
            >
              <Plus size={20} />
              <span className="font-medium">Đề xuất bài viết</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Chưa có bài viết
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Không tìm thấy bài viết phù hợp"
                : "Hãy đề xuất bài viết mới cho dòng họ"}
            </p>
            <button
              onClick={() => navigate("/member/propose-post")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              <Plus size={18} />
              Đề xuất bài viết
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const categoryInfo = getCategoryLabel(post.category);

              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText size={48} className="text-amber-300" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}
                    >
                      {categoryInfo.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        {post.author?.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User size={16} className="text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {post.author?.name || "Ẩn danh"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative">
                {selectedPost.thumbnail ? (
                  <img
                    src={selectedPost.thumbnail}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText size={64} className="text-amber-300" />
                  </div>
                )}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {/* Category */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    getCategoryLabel(selectedPost.category).color
                  }`}
                >
                  {getCategoryLabel(selectedPost.category).label}
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedPost.title}
                </h2>

                {/* Author & Meta */}
                <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedPost.author?.name || "Ẩn danh"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(selectedPost.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {selectedPost.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={16} />
                      {selectedPost.likes}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-amber max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPost.content || selectedPost.excerpt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart size={18} />
                    Thích
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    <MessageCircle size={18} />
                    Bình luận
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostsPage;

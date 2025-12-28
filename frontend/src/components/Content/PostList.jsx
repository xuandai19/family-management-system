import React, { useState, useMemo } from "react";
import { POSTS_DATA } from "../../constants/mockData";
import {
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  X,
  Save,
  FileText,
  Calendar,
  User,
  BookOpen,
} from "lucide-react";

const PostList = () => {
  const [posts, setPosts] = useState(POSTS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Tin tức",
    status: "Nháp",
    content: "",
  });

  const itemsPerPage = 10;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter
        ? post.category === categoryFilter
        : true;
      const matchStatus = statusFilter ? post.status === statusFilter : true;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [posts, searchTerm, categoryFilter, statusFilter]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      category: "Tin tức",
      status: "Nháp",
      content: "",
    });
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPostId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      status: post.status === "Đã đăng" ? "Đã đăng" : "Nháp",
      content: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title) return alert("Vui lòng nhập tiêu đề!");
    if (isEditing) {
      setPosts(
        posts.map((p) =>
          p.id === currentPostId
            ? {
                ...p,
                ...formData,
                status: formData.status === "Đã đăng" ? "Đã đăng" : "Chưa đăng",
              }
            : p
        )
      );
    } else {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        author: "Tộc Phả",
        date: "25/12/2025",
        status: formData.status === "Đã đăng" ? "Đã đăng" : "Chưa đăng",
      };
      setPosts([newPost, ...posts]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-[#f4f7f4] min-h-screen font-sans text-left">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase italic">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] text-white">
              <BookOpen size={28} />
            </div>
            Quản Lý Tộc Phả
          </h2>
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 border-l-4 border-emerald-500 pl-3">
            Lưu trữ sử ký dòng họ
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="group flex items-center gap-2 bg-emerald-600 text-white px-7 py-3.5 rounded-2xl shadow-xl hover:bg-emerald-700 transition-all font-black active:scale-95 border-b-4 border-emerald-800 uppercase text-xs tracking-widest"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Viết bài mới</span>
        </button>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="bg-white rounded-[2rem] shadow-xl border-2 border-emerald-50 mb-8 p-6 flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <Search
              className="absolute left-4 top-3.5 text-emerald-400 group-focus-within:text-emerald-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm nội dung tộc phả..."
              className="pl-12 pr-6 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none w-full md:w-64 text-sm font-bold text-slate-700 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 text-sm font-bold text-slate-600 outline-none cursor-pointer shadow-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">📁 Chuyên mục</option>
            <option value="Phả ký">Phả ký</option>
            <option value="Tin tức">Tin tức</option>
            <option value="Thư viện">Thư viện</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("");
            setStatusFilter("");
          }}
          className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-md"
        >
          <RefreshCw size={22} />
        </button>
      </div>

      {/* --- BẢNG DANH SÁCH (GIỐNG HÌNH 1) --- */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-emerald-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center w-20">
                STT
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest">
                Nội dung tộc phả
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">
                Chuyên mục
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">
                Trạng thái
              </th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-emerald-50">
            {currentPosts.map((post, index) => (
              <tr
                key={post.id}
                className="group hover:bg-emerald-50/50 transition-all"
              >
                <td className="px-8 py-7 text-center font-black text-slate-300 group-hover:text-emerald-600 italic">
                  #{indexOfFirstPost + index + 1}
                </td>
                <td className="px-8 py-7">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 uppercase text-sm group-hover:text-emerald-700 transition-colors">
                      {post.title}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold italic">
                      <span className="flex items-center gap-1 text-emerald-600/60">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-7 text-center">
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase border border-slate-200">
                    {post.category}
                  </span>
                </td>
                <td className="px-8 py-7 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 shadow-sm ${
                      post.status === "Đã đăng"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-8 py-7 text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-110">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-90"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2.5 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (TÔNG XANH ĐẬM NỔI BẬT) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-left">
          <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-2xl overflow-hidden border-[12px] border-white animate-in zoom-in duration-300">
            <div className="bg-emerald-700 px-10 py-8 flex justify-between items-center text-white border-b-8 border-emerald-800">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Plus size={24} strokeWidth={4} />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                  {isEditing ? "Cập Nhật Bản Ghi" : "Thêm Vào Tộc Phả"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">
                  Tiêu đề sử ký *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-800 transition-all shadow-inner text-lg"
                  placeholder="Nhập nội dung tiêu đề..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">
                    Chuyên mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 cursor-pointer shadow-sm"
                  >
                    <option value="Tin tức">Tin tức dòng họ</option>
                    <option value="Phả ký">Phả ký truyền thừa</option>
                    <option value="Thư viện">Thư viện hình ảnh</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">
                    Trạng thái lưu trữ
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 cursor-pointer shadow-sm"
                  >
                    <option value="Đã đăng">Xuất bản công khai</option>
                    <option value="Nháp">Lưu bản nháp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">
                  Nội dung tóm tắt
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] px-8 py-6 outline-none focus:border-emerald-500 h-40 font-medium text-slate-600 transition-all shadow-inner italic text-base resize-none"
                  placeholder="Viết nội dung tại đây..."
                ></textarea>
              </div>
            </div>

            <div className="bg-slate-50 px-10 py-8 flex justify-end gap-5 border-t border-slate-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 font-black text-slate-400 hover:text-red-600 transition-colors uppercase text-xs tracking-widest"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="px-14 py-5 bg-emerald-600 text-white rounded-3xl font-black shadow-[0_15px_35px_-10px_rgba(16,185,129,0.5)] hover:bg-emerald-700 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] border-b-8 border-emerald-800 flex items-center gap-3"
              >
                <Save size={20} />{" "}
                {isEditing ? "Cập nhật sử ký" : "Lưu vào tộc phả"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;

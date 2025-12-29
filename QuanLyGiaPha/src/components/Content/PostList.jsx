








// // src/components/Content/PostList.jsx
// import React, { useState, useMemo } from 'react';
// import { POSTS_DATA } from '../../constants/mockData';
// import { Search, RefreshCw, Plus, Trash2, Edit, X, Save, FileText, Calendar, User } from 'lucide-react';

// const PostList = () => {
//   const [posts, setPosts] = useState(POSTS_DATA);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
  
//   // --- BỔ SUNG STATE CHO CHỈNH SỬA ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'Tin tức',
//     status: 'Nháp',
//     content: ''
//   });

//   const itemsPerPage = 10;

//   // Logic lọc dữ liệu
//   const filteredPosts = useMemo(() => {
//     return posts.filter(post => {
//       const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchCategory = categoryFilter ? post.category === categoryFilter : true;
//       const matchStatus = statusFilter ? post.status === statusFilter : true;
//       return matchSearch && matchCategory && matchStatus;
//     });
//   }, [posts, searchTerm, categoryFilter, statusFilter]);

//   const indexOfLastPost = currentPage * itemsPerPage;
//   const indexOfFirstPost = indexOfLastPost - itemsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   // --- HÀM MỞ MODAL ĐỂ VIẾT BÀI MỚI ---
//   const handleOpenAddModal = () => {
//     setIsEditing(false);
//     setFormData({ title: '', category: 'Tin tức', status: 'Nháp', content: '' });
//     setShowModal(true);
//   };

//   // --- HÀM MỞ MODAL ĐỂ CHỈNH SỬA ---
//   const handleEdit = (post) => {
//     setIsEditing(true);
//     setCurrentPostId(post.id);
//     setFormData({
//       title: post.title,
//       category: post.category,
//       status: post.status === 'Đã đăng' ? 'Đã đăng' : 'Nháp',
//       content: '' // Trong thực tế sẽ lấy từ database
//     });
//     setShowModal(true);
//   };

//   // --- HÀM LƯU (CẢ THÊM MỚI VÀ CẬP NHẬT) ---
//   const handleSave = () => {
//     if (!formData.title) return alert("Vui lòng nhập tiêu đề!");

//     if (isEditing) {
//       // Logic cập nhật bài viết cũ
//       setPosts(posts.map(p => p.id === currentPostId ? { ...p, ...formData, status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng' } : p));
//     } else {
//       // Logic thêm bài viết mới
//       const newPost = {
//         id: posts.length + 1,
//         ...formData,
//         author: 'Thanh Thủy',
//         date: '25/12/2025',
//         status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng'
//       };
//       setPosts([newPost, ...posts]);
//     }
//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
//       setPosts(posts.filter(post => post.id !== id));
//     }
//   };

//   return (
//     <div className="p-8 bg-[#fdfbf9] min-h-screen font-sans">
//       {/* --- HEADER --- */}
//       <div className="flex justify-between items-center mb-10">
//         <div className="relative">
//           <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
//             <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-200 text-white">
//                 <FileText size={28} />
//             </div>
//             Quản Lý Bài Viết
//           </h2>
//           <div className="absolute -bottom-2 left-16 w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
//         </div>

//         <button 
//           onClick={handleOpenAddModal}
//           className="group relative px-6 py-3.5 bg-slate-900 text-white rounded-2xl flex items-center gap-2 hover:bg-teal-600 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-95 overflow-hidden"
//         >
//           <Plus size={20} strokeWidth={3} />
//           <span className="font-bold">Viết bài mới</span>
//         </button>
//       </div>

//       {/* --- TOOLBAR --- */}
//       <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-white mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between">
//         <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
//           <div className="relative group flex-1 md:flex-none">
//             <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
//             <input 
//               type="text" 
//               placeholder="Tìm tên bài viết..." 
//               className="pl-12 pr-6 py-3.5 bg-white border-none rounded-2xl shadow-inner-sm focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-64 text-sm font-medium transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <select 
//             className="px-4 py-3.5 bg-white border-none rounded-2xl shadow-sm text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//           >
//             <option value="">📁 Tất cả chuyên mục</option>
//             <option value="Phả ký">Phả ký</option>
//             <option value="Tin tức">Tin tức</option>
//             <option value="Thư viện">Thư viện</option>
//           </select>

//           <select 
//             className="px-4 py-3.5 bg-white border-none rounded-2xl shadow-sm text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">✨ Tất cả trạng thái</option>
//             <option value="Đã đăng">✅ Đã đăng</option>
//             <option value="Chưa đăng">⏳ Chưa đăng</option>
//           </select>
//         </div>

//         <button 
//           onClick={() => {setSearchTerm(''); setCategoryFilter(''); setStatusFilter('');}}
//           className="p-3.5 bg-white text-slate-400 rounded-2xl hover:text-orange-500 hover:rotate-180 transition-all duration-500 shadow-sm border border-slate-50"
//         >
//           <RefreshCw size={22} />
//         </button>
//       </div>

//       {/* --- TABLE --- */}
//       <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-white">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/50">
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">ID</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Nội dung bài viết</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Chuyên mục</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Ngày đăng</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Trạng thái</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Hành động</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {currentPosts.map((post) => (
//               <tr key={post.id} className="group hover:bg-orange-50/30 transition-all duration-300 cursor-default">
//                 <td className="px-8 py-6 text-center text-sm font-black text-slate-300 group-hover:text-orange-500 transition-colors">#{post.id}</td>
//                 <td className="px-8 py-6">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-base font-bold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-1">{post.title}</span>
//                     <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
//                       <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
//                       <span className="flex items-center gap-1"><Calendar size={12}/> {post.date || '25/12/2025'}</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-8 py-6 text-center">
//                   <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-wider">{post.category}</span>
//                 </td>
//                 <td className="px-8 py-6 text-center text-slate-500 font-bold text-sm">{post.date || '25/12/2025'}</td>
//                 <td className="px-8 py-6 text-center">
//                   <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm border ${post.status === 'Đã đăng' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
//                     <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'Đã đăng' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
//                     {post.status}
//                   </span>
//                 </td>
//                 <td className="px-8 py-6 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <button 
//                       onClick={() => handleEdit(post)} // <--- GẮN SỰ KIỆN TẠI ĐÂY
//                       className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(post.id)} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-lg active:scale-90">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- PHÂN TRANG --- */}
//       <div className="flex justify-between items-center mt-10 px-4">
//         <p className="text-sm text-slate-400 font-bold tracking-tight">Hiển thị {indexOfFirstPost + 1} đến {Math.min(indexOfLastPost, filteredPosts.length)} của {filteredPosts.length} bài viết</p>
//         <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-slate-100 border border-slate-50">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-300 ${currentPage === i + 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110' : 'text-slate-400 hover:bg-slate-50'}`}>{i + 1}</button>
//           ))}
//         </div>
//       </div>

//       {/* --- MODAL CHỈNH SỬA / THÊM MỚI --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-left">
//           <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
//             <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-10 py-8 flex justify-between items-center text-white text-left">
//               <h3 className="text-2xl font-black italic tracking-tighter">
//                 {isEditing ? '✏️ CẬP NHẬT BÀI VIẾT' : '✨ VIẾT BÀI MỚI'}
//               </h3>
//               <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"><X size={24} /></button>
//             </div>
            
//             <div className="p-10 space-y-6">
//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">Tiêu đề bài viết</label>
//                 <input 
//                   type="text" 
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 transition-all" 
//                   placeholder="Nhập tiêu đề hấp dẫn..." 
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">Chuyên mục</label>
//                   <select 
//                     value={formData.category}
//                     onChange={(e) => setFormData({...formData, category: e.target.value})}
//                     className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 cursor-pointer"
//                   >
//                     <option value="Tin tức">Tin tức</option>
//                     <option value="Sự kiện">Sự kiện</option>
//                     <option value="Phả ký">Phả ký</option>
//                   </select>
//                 </div>
//                 <div>
//                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">Trạng thái đăng</label>
//                    <select 
//                     value={formData.status}
//                     onChange={(e) => setFormData({...formData, status: e.target.value})}
//                     className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 cursor-pointer"
//                    >
//                     <option value="Đã đăng">Đã đăng</option>
//                     <option value="Nháp">Nháp / Chờ duyệt</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">Nội dung tóm tắt</label>
//                 <textarea 
//                   value={formData.content}
//                   onChange={(e) => setFormData({...formData, content: e.target.value})}
//                   className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 h-32 font-medium text-slate-600 transition-all" 
//                   placeholder="Viết gì đó mô tả cho bài viết này..."
//                 ></textarea>
//               </div>
//             </div>

//             <div className="bg-slate-50 px-10 py-8 flex justify-end gap-4 border-t border-slate-100">
//               <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors text-xs uppercase tracking-widest">Bỏ qua</button>
//               <button 
//                 onClick={handleSave}
//                 className="px-10 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-black shadow-lg shadow-orange-200 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
//               >
//                 <Save size={18}/> {isEditing ? 'CẬP NHẬT NGAY' : 'XUẤT BẢN NGAY'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostList;














// // src/components/Content/PostList.jsx
// import React, { useState, useMemo } from 'react';
// import { POSTS_DATA } from '../../constants/mockData';
// import { Search, RefreshCw, Plus, Trash2, Edit, X, Save, FileText, Calendar, User, BookOpen } from 'lucide-react';

// const PostList = () => {
//   const [posts, setPosts] = useState(POSTS_DATA);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'Tin tức',
//     status: 'Nháp',
//     content: ''
//   });

//   const itemsPerPage = 10;

//   const filteredPosts = useMemo(() => {
//     return posts.filter(post => {
//       const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchCategory = categoryFilter ? post.category === categoryFilter : true;
//       const matchStatus = statusFilter ? post.status === statusFilter : true;
//       return matchSearch && matchCategory && matchStatus;
//     });
//   }, [posts, searchTerm, categoryFilter, statusFilter]);

//   const indexOfLastPost = currentPage * itemsPerPage;
//   const indexOfFirstPost = indexOfLastPost - itemsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

//   const handleOpenAddModal = () => {
//     setIsEditing(false);
//     setFormData({ title: '', category: 'Tin tức', status: 'Nháp', content: '' });
//     setShowModal(true);
//   };

//   const handleEdit = (post) => {
//     setIsEditing(true);
//     setCurrentPostId(post.id);
//     setFormData({
//       title: post.title,
//       category: post.category,
//       status: post.status === 'Đã đăng' ? 'Đã đăng' : 'Nháp',
//       content: ''
//     });
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (!formData.title) return alert("Vui lòng nhập tiêu đề!");
//     if (isEditing) {
//       setPosts(posts.map(p => p.id === currentPostId ? { ...p, ...formData, status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng' } : p));
//     } else {
//       const newPost = {
//         id: posts.length + 1,
//         ...formData,
//         author: 'Tộc Phả',
//         date: '25/12/2025',
//         status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng'
//       };
//       setPosts([newPost, ...posts]);
//     }
//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
//       setPosts(posts.filter(post => post.id !== id));
//     }
//   };

//   return (
//     <div className="p-8 bg-[#f4f7f4] min-h-screen font-sans text-left">
//       {/* --- HEADER NỔI BẬT --- */}
//       <div className="flex justify-between items-center mb-10">
//         <div className="relative">
//           <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
//             <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-200 text-white animate-pulse">
//                 <BookOpen size={28} />
//             </div>
//             Quản Lý Tộc Phả
//           </h2>
//           <div className="absolute -bottom-2 left-16 w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
//         </div>

//         <button 
//           onClick={handleOpenAddModal}
//           className="group relative px-6 py-3.5 bg-emerald-600 text-white rounded-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all duration-500 shadow-xl shadow-emerald-100 active:scale-95 overflow-hidden border-b-4 border-emerald-800"
//         >
//           <Plus size={20} strokeWidth={3} />
//           <span className="font-bold uppercase tracking-wider text-xs">Viết bài mới</span>
//         </button>
//       </div>

//       {/* --- TOOLBAR --- */}
//       <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between">
//         <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
//           <div className="relative group flex-1 md:flex-none">
//             <Search className="absolute left-4 top-3.5 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
//             <input 
//               type="text" 
//               placeholder="Tìm nội dung tộc phả..." 
//               className="pl-12 pr-6 py-3.5 bg-white border-2 border-emerald-50 rounded-2xl shadow-inner focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none w-full md:w-64 text-sm font-medium transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <select 
//             className="px-4 py-3.5 bg-white border-2 border-emerald-50 rounded-2xl shadow-sm text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//           >
//             <option value="">📁 Tất cả chuyên mục</option>
//             <option value="Phả ký">Phả ký</option>
//             <option value="Tin tức">Tin tức</option>
//             <option value="Thư viện">Thư viện</option>
//           </select>
//         </div>

//         <button 
//           onClick={() => {setSearchTerm(''); setCategoryFilter(''); setStatusFilter('');}}
//           className="p-3.5 bg-white text-emerald-400 rounded-2xl hover:text-emerald-600 hover:rotate-180 transition-all duration-500 shadow-md border border-emerald-50"
//         >
//           <RefreshCw size={22} />
//         </button>
//       </div>

//       {/* --- TABLE NỔI KHỐI --- */}
//       <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-emerald-50/50">
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 text-center">STT</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Nội dung tộc phả</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 text-center">Chuyên mục</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 text-center">Trạng thái</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 text-center">Hành động</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-emerald-50">
//             {currentPosts.map((post, index) => (
//               <tr key={post.id} className="group hover:bg-emerald-50/30 transition-all duration-300">
//                 <td className="px-8 py-6 text-center text-sm font-black text-emerald-200 group-hover:text-emerald-600 italic">#{indexOfFirstPost + index + 1}</td>
//                 <td className="px-8 py-6">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-base font-bold text-slate-700 group-hover:text-emerald-700 transition-colors line-clamp-1">{post.title}</span>
//                     <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium italic">
//                       <span className="flex items-center gap-1"><User size={12} className="text-emerald-400"/> {post.author}</span>
//                       <span className="flex items-center gap-1"><Calendar size={12} className="text-emerald-400"/> {post.date || '25/12/2025'}</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-8 py-6 text-center">
//                   <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-100">{post.category}</span>
//                 </td>
//                 <td className="px-8 py-6 text-center">
//                   <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm border ${post.status === 'Đã đăng' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
//                     <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'Đã đăng' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
//                     {post.status}
//                   </span>
//                 </td>
//                 <td className="px-8 py-6 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
//                     <button onClick={() => handleEdit(post)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md active:scale-90"><Edit size={16} /></button>
//                     <button onClick={() => handleDelete(post.id)} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-md active:scale-90"><Trash2 size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- MODAL XANH MINT NHẸ NHÀNG --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-left">
//           <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden border-[12px] border-emerald-50 animate-in zoom-in duration-300">
//             <div className="bg-emerald-600 px-10 py-8 flex justify-between items-center text-white border-b-8 border-emerald-700">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 rounded-2xl shadow-inner"><Plus size={24} strokeWidth={3} /></div>
//                 <h3 className="text-2xl font-black italic tracking-tighter uppercase">
//                   {isEditing ? 'Cập nhật ghi chép' : 'Thêm vào Tộc Phả'}
//                 </h3>
//               </div>
//               <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"><X size={24} /></button>
//             </div>
            
//             <div className="p-10 space-y-8 bg-gradient-to-b from-emerald-50/30 to-white">
//               <section className="space-y-4">
//                 <label className="block text-[10px] font-black uppercase text-emerald-600 mb-2 ml-1 tracking-[0.2em] border-l-4 border-emerald-400 pl-2">Tiêu đề bản ghi</label>
//                 <input 
//                   type="text" 
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   className="w-full bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-200 font-bold text-slate-700 transition-all shadow-inner" 
//                   placeholder="Nhập tiêu đề..." 
//                 />
//               </section>
              
//               <div className="grid grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   <label className="block text-[10px] font-black uppercase text-emerald-600 mb-2 ml-1 tracking-[0.2em] border-l-4 border-emerald-400 pl-2">Phân loại</label>
//                   <select 
//                     value={formData.category}
//                     onChange={(e) => setCategoryFilter(e.target.value)} // Lưu ý: trong thực tế dùng setFormData
//                     className="w-full bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-200 font-bold text-slate-700 cursor-pointer shadow-sm"
//                   >
//                     <option value="Tin tức">Tin tức dòng họ</option>
//                     <option value="Phả ký">Phả ký truyền thừa</option>
//                     <option value="Thư viện">Thư viện hình ảnh</option>
//                   </select>
//                 </div>
//                 <div className="space-y-4">
//                    <label className="block text-[10px] font-black uppercase text-emerald-600 mb-2 ml-1 tracking-[0.2em] border-l-4 border-emerald-400 pl-2">Trạng thái lưu trữ</label>
//                    <select 
//                     value={formData.status}
//                     onChange={(e) => setFormData({...formData, status: e.target.value})}
//                     className="w-full bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-200 font-bold text-slate-700 cursor-pointer shadow-sm"
//                    >
//                     <option value="Đã đăng">Đã lưu (Công khai)</option>
//                     <option value="Nháp">Bản nháp (Nội bộ)</option>
//                   </select>
//                 </div>
//               </div>

//               <section className="space-y-4">
//                 <label className="block text-[10px] font-black uppercase text-emerald-600 mb-2 ml-1 tracking-[0.2em] border-l-4 border-emerald-400 pl-2">Nội dung tóm lược</label>
//                 <textarea 
//                   value={formData.content}
//                   onChange={(e) => setFormData({...formData, content: e.target.value})}
//                   className="w-full bg-white border-2 border-emerald-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-200 h-32 font-medium text-slate-600 transition-all shadow-inner italic" 
//                   placeholder="Ghi chú nội dung..."
//                 ></textarea>
//               </section>
//             </div>

//             <div className="bg-emerald-50 px-10 py-8 flex justify-end gap-5">
//               <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-emerald-400 hover:text-emerald-700 transition-colors text-xs uppercase tracking-widest">Bỏ qua</button>
//               <button 
//                 onClick={handleSave}
//                 className="px-12 py-5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 font-black shadow-2xl shadow-emerald-200 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] border-b-4 border-emerald-800"
//               >
//                 <Save size={18}/> {isEditing ? 'Cập nhật Tộc Phả' : 'Lưu vào Tộc Phả'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostList;













// src/components/Content/PostList.jsx
import React, { useState, useMemo } from 'react';
import { POSTS_DATA } from '../../constants/mockData';
import { Search, RefreshCw, Plus, Trash2, Edit, X, Save, FileText, Calendar, User, BookOpen } from 'lucide-react';

const PostList = () => {
  const [posts, setPosts] = useState(POSTS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tin tức',
    status: 'Nháp',
    content: ''
  });

  const itemsPerPage = 10;

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter ? post.category === categoryFilter : true;
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
    setFormData({ title: '', category: 'Tin tức', status: 'Nháp', content: '' });
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPostId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      status: post.status === 'Đã đăng' ? 'Đã đăng' : 'Nháp',
      content: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title) return alert("Vui lòng nhập tiêu đề!");
    if (isEditing) {
      setPosts(posts.map(p => p.id === currentPostId ? { ...p, ...formData, status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng' } : p));
    } else {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        author: 'Tộc Phả',
        date: '25/12/2025',
        status: formData.status === 'Đã đăng' ? 'Đã đăng' : 'Chưa đăng'
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
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 border-l-4 border-emerald-500 pl-3">Lưu trữ sử ký dòng họ</p>
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
            <Search className="absolute left-4 top-3.5 text-emerald-400 group-focus-within:text-emerald-600" size={20} />
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
          onClick={() => {setSearchTerm(''); setCategoryFilter(''); setStatusFilter('');}}
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
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center w-20">STT</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest">Nội dung tộc phả</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Chuyên mục</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-emerald-50">
            {currentPosts.map((post, index) => (
              <tr key={post.id} className="group hover:bg-emerald-50/50 transition-all">
                <td className="px-8 py-7 text-center font-black text-slate-300 group-hover:text-emerald-600 italic">#{indexOfFirstPost + index + 1}</td>
                <td className="px-8 py-7">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 uppercase text-sm group-hover:text-emerald-700 transition-colors">{post.title}</span>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold italic">
                      <span className="flex items-center gap-1 text-emerald-600/60"><User size={12}/> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-7 text-center">
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase border border-slate-200">{post.category}</span>
                </td>
                <td className="px-8 py-7 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 shadow-sm ${
                    post.status === 'Đã đăng' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-8 py-7 text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-110">
                    <button onClick={() => handleEdit(post)} className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-90"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-2.5 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 active:scale-90"><Trash2 size={16} /></button>
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
                <div className="p-3 bg-white/20 rounded-2xl"><Plus size={24} strokeWidth={4} /></div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                  {isEditing ? 'Cập Nhật Bản Ghi' : 'Thêm Vào Tộc Phả'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-all"><X size={28} /></button>
            </div>
            
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">Tiêu đề sử ký *</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-800 transition-all shadow-inner text-lg" 
                  placeholder="Nhập nội dung tiêu đề..." 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">Chuyên mục</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 cursor-pointer shadow-sm"
                  >
                    <option value="Tin tức">Tin tức dòng họ</option>
                    <option value="Phả ký">Phả ký truyền thừa</option>
                    <option value="Thư viện">Thư viện hình ảnh</option>
                  </select>
                </div>
                <div className="space-y-3">
                   <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">Trạng thái lưu trữ</label>
                   <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 cursor-pointer shadow-sm"
                   >
                    <option value="Đã đăng">Xuất bản công khai</option>
                    <option value="Nháp">Lưu bản nháp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase text-emerald-700 tracking-widest ml-1">Nội dung tóm tắt</label>
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] px-8 py-6 outline-none focus:border-emerald-500 h-40 font-medium text-slate-600 transition-all shadow-inner italic text-base resize-none" 
                  placeholder="Viết nội dung tại đây..."
                ></textarea>
              </div>
            </div>

            <div className="bg-slate-50 px-10 py-8 flex justify-end gap-5 border-t border-slate-200">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-red-600 transition-colors uppercase text-xs tracking-widest">Hủy bỏ</button>
              <button 
                onClick={handleSave}
                className="px-14 py-5 bg-emerald-600 text-white rounded-3xl font-black shadow-[0_15px_35px_-10px_rgba(16,185,129,0.5)] hover:bg-emerald-700 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] border-b-8 border-emerald-800 flex items-center gap-3"
              >
                <Save size={20}/> {isEditing ? 'Cập nhật sử ký' : 'Lưu vào tộc phả'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
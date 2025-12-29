








// // src/components/Category/Category.jsx
// import React, { useState } from 'react';
// import { Search, Plus, Trash2, Edit, X, Save, FolderTree, FileText, Globe, Lock } from 'lucide-react';

// const INITIAL_CATEGORIES = [
//   { id: 1, name: 'Phả Ký', description: 'Lịch sử dòng họ, nguồn gốc...', count: 15, status: 'Hoạt động', order: 1, scope: 'Công khai', color: 'from-blue-600 to-cyan-500' },
//   { id: 2, name: 'Tin Tức & Sự Kiện', description: 'Thông báo họp họ, hiếu hỉ...', count: 42, status: 'Hoạt động', order: 2, scope: 'Công khai', color: 'from-orange-600 to-yellow-500' },
//   { id: 3, name: 'Vấn Khấn & Nghi Lễ', description: 'Bài cúng gia tiên...', count: 8, status: 'Hoạt động', order: 3, scope: 'Nội bộ', color: 'from-emerald-600 to-teal-500' },
//   { id: 4, name: 'Gia Quy - Tộc Ước', description: 'Quy định dòng họ...', count: 5, status: 'Hoạt động', order: 4, scope: 'Nội bộ', color: 'from-purple-600 to-pink-500' },
//   { id: 5, name: 'Gương Sáng Dòng Họ', description: 'Vinh danh bảng vàng...', count: 12, status: 'Hoạt động', order: 5, scope: 'Công khai', color: 'from-red-600 to-orange-500' },
//   { id: 6, name: 'Sổ Vàng Công Đức', description: 'Ghi nhận đóng góp...', count: 120, status: 'Hoạt động', order: 6, scope: 'Công khai', color: 'from-amber-600 to-yellow-600' },
//   { id: 7, name: 'Thư Viện (Media)', description: 'Hình ảnh video...', count: 200, status: 'Hoạt động', order: 7, scope: 'Nội bộ', color: 'from-indigo-600 to-blue-500' }
// ];

// const Category = () => {
//   const [categories, setCategories] = useState(INITIAL_CATEGORIES);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '', description: '', status: 'Hoạt động', order: 1, scope: 'Công khai'
//   });

//   const filteredCategories = categories
//     .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => a.order - b.order);

//   const handleAddNew = () => {
//     setIsEditing(false);
//     const nextOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1;
//     setFormData({ name: '', description: '', status: 'Hoạt động', order: nextOrder, scope: 'Công khai' });
//     setShowModal(true);
//   };

//   const handleEdit = (category) => {
//     setIsEditing(true);
//     setCurrentId(category.id);
//     setFormData({ ...category });
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa chuyên mục này?')) {
//       setCategories(categories.filter(cat => cat.id !== id));
//     }
//   };

//   const handleSave = () => {
//     if (!formData.name) return alert("Vui lòng nhập tên chuyên mục!");
//     if (isEditing) {
//       setCategories(categories.map(cat => cat.id === currentId ? { ...cat, ...formData } : cat));
//     } else {
//       setCategories([...categories, { id: Date.now(), count: 0, color: 'from-emerald-600 to-green-400', ...formData }]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="p-8 bg-[#f1f5f9] min-h-screen font-sans text-left">
//       {/* --- HEADER --- */}
//       <div className="flex justify-between items-center mb-12">
//         <div className="relative">
//           <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 drop-shadow-md">
//             <div className="p-3 bg-emerald-600 rounded-2xl shadow-[0_10px_20px_rgba(5,150,105,0.4)] text-white">
//                 <FolderTree size={32} />
//             </div>
//             Quản Lý Chuyên Mục
//           </h2>
//           <div className="absolute -bottom-3 left-16 w-24 h-2 bg-emerald-500 rounded-full shadow-lg"></div>
//         </div>
        
//         <button 
//             onClick={handleAddNew} 
//             className="group relative px-8 py-4 bg-emerald-700 text-white rounded-2xl flex items-center gap-3 hover:bg-emerald-800 transition-all duration-500 shadow-[0_15px_30px_rgba(5,150,105,0.3)] active:scale-90 overflow-hidden border-b-4 border-emerald-900"
//         >
//           <Plus size={22} strokeWidth={4} /> 
//           <span className="font-black uppercase tracking-widest text-sm">Thêm chuyên mục</span>
//         </button>
//       </div>

//       {/* --- SEARCH BOX --- */}
//       <div className="flex justify-end mb-10">
//         <div className="relative w-full md:w-[450px] group text-left">
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm chuyên mục dòng họ..." 
//             className="w-full border-2 border-white bg-white rounded-2xl px-8 py-5 pl-14 shadow-[0_15px_30px_rgba(0,0,0,0.08)] outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 font-bold"
//             value={searchTerm} 
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-5 top-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={24} />
//         </div>
//       </div>

//       {/* --- DANH SÁCH BẢNG --- */}
//       <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden border-2 border-white">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             {/* THAY ĐỔI: Chuyển màu nền tiêu đề từ Slate-900 (Đen) sang Emerald-800 (Xanh lá đậm) */}
//             <tr className="bg-emerald-800 text-white border-b-4 border-emerald-900">
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center w-24">Số TT</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em]">Thông tin chuyên mục</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Phạm vi</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Số lượng</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Trạng thái</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Thao tác</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y-2 divide-slate-100">
//             {filteredCategories.map((cat) => (
//               <tr key={cat.id} className="group hover:bg-emerald-50/50 transition-all duration-300">
//                 <td className="px-8 py-8 text-center border-r border-slate-50">
//                   <span className="text-2xl font-black text-slate-200 group-hover:text-emerald-600 transition-colors italic font-serif">
//                     {cat.order < 10 ? `0${cat.order}` : cat.order}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-lg font-black text-slate-800 group-hover:translate-x-2 transition-transform inline-flex items-center gap-3">
//                       <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${cat.color} shadow-lg shadow-current/30`}></div>
//                       {cat.name}
//                     </span>
//                     <span className="text-sm text-slate-500 mt-1 font-medium italic border-l-2 border-emerald-500 pl-3 ml-1">{cat.description}</span>
//                   </div>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-md border-2 ${
//                     cat.scope === 'Công khai' 
//                     ? 'bg-blue-50 text-blue-700 border-blue-200' 
//                     : 'bg-purple-50 text-purple-700 border-purple-200'
//                   }`}>
//                     {cat.scope === 'Công khai' ? <Globe size={12}/> : <Lock size={12}/>}
//                     {cat.scope}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                    {/* THAY ĐỔI: Chuyển màu nền số lượng sang Emerald đậm để đồng bộ */}
//                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-xl font-black shadow-lg shadow-emerald-900/20">
//                       <FileText size={14} className="text-emerald-300" />
//                       {cat.count}
//                    </div>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black shadow-sm border-2 ${
//                     cat.status === 'Hoạt động' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
//                   }`}>
//                     <div className={`w-2 h-2 rounded-full ${cat.status === 'Hoạt động' ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></div>
//                     {cat.status}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-110">
//                     <button onClick={() => handleEdit(cat)} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-90"><Edit size={18}/></button>
//                     <button onClick={() => handleDelete(cat.id)} className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-[0_10px_20px_rgba(220,38,38,0.3)] active:scale-90"><Trash2 size={18}/></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- MODAL --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden animate-in zoom-in duration-300 border-[10px] border-white/20">
//             {/* THAY ĐỔI: Header Modal xanh lá đậm */}
//             <div className="bg-emerald-800 px-10 py-8 flex justify-between items-center text-white border-b-4 border-emerald-900">
//               <h3 className="text-2xl font-black uppercase tracking-tighter italic">
//                 {isEditing ? '✏️ Cập Nhật' : '✨ Khởi Tạo'}
//               </h3>
//               <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-red-500 p-2 rounded-full transition-all">
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="p-10 space-y-8 text-left">
//               <div className="grid grid-cols-4 gap-6">
//                 <div className="col-span-3 text-left">
//                   <label className="block text-xs font-black uppercase text-slate-500 mb-2 ml-1 tracking-[0.2em]">Tên Chuyên Mục</label>
//                   <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-800 shadow-inner" placeholder="VD: Lịch Sử Dòng Họ" />
//                 </div>
//                 <div className="col-span-1">
//                   <label className="block text-xs font-black uppercase text-slate-500 mb-2 text-center tracking-[0.2em]">Thứ Tự</label>
//                   <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-4 outline-none focus:border-emerald-500 focus:bg-white text-center font-black text-slate-800 shadow-inner" />
//                 </div>
//               </div>

//               <div className="text-left">
//                 <label className="block text-xs font-black uppercase text-slate-500 mb-2 ml-1 tracking-[0.2em]">Mô Tả Chi Tiết</label>
//                 <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-200 rounded-[2rem] px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white h-32 font-medium text-slate-700 shadow-inner italic" placeholder="Ghi chú ý nghĩa..."></textarea>
//               </div>

//               <div className="grid grid-cols-2 gap-8 text-left">
//                 <div>
//                    <label className="block text-xs font-black uppercase text-slate-500 mb-2 ml-1 tracking-[0.2em]">Phạm Vi Truy Cập</label>
//                    <select value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
//                      <option value="Công khai">🌐 Công khai</option>
//                      <option value="Nội bộ">🔒 Nội bộ</option>
//                    </select>
//                 </div>
//                 <div>
//                    <label className="block text-xs font-black uppercase text-slate-500 mb-2 ml-1 tracking-[0.2em]">Trạng Thái Hiển Thị</label>
//                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
//                      <option value="Hoạt động">✅ Đang hoạt động</option>
//                      <option value="Tạm ẩn">❌ Tạm ẩn</option>
//                    </select>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-slate-100 px-10 py-8 flex justify-end gap-5">
//               <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase text-xs tracking-[0.2em]">Bỏ qua</button>
//               <button onClick={handleSave} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-800 font-black shadow-[0_15px_30px_rgba(5,150,105,0.4)] flex items-center gap-3 active:scale-95 transition-all uppercase text-xs tracking-widest border-b-4 border-emerald-900">
//                 <Save size={20}/> Lưu Thay Đổi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;




















// // src/components/Category/Category.jsx
// import React, { useState } from 'react';
// import { Search, Plus, Trash2, Edit, X, Save, FolderTree, FileText, Globe, Lock } from 'lucide-react';

// const INITIAL_CATEGORIES = [
//   { id: 1, name: 'Phả Ký', description: 'Lịch sử dòng họ, nguồn gốc...', count: 15, status: 'Hoạt động', order: 1, scope: 'Công khai', color: 'from-blue-600 to-cyan-500' },
//   { id: 2, name: 'Tin Tức & Sự Kiện', description: 'Thông báo họp họ, hiếu hỉ...', count: 42, status: 'Hoạt động', order: 2, scope: 'Công khai', color: 'from-orange-600 to-yellow-500' },
//   { id: 3, name: 'Vấn Khấn & Nghi Lễ', description: 'Bài cúng gia tiên...', count: 8, status: 'Hoạt động', order: 3, scope: 'Nội bộ', color: 'from-emerald-600 to-teal-500' },
//   { id: 4, name: 'Gia Quy - Tộc Ước', description: 'Quy định dòng họ...', count: 5, status: 'Hoạt động', order: 4, scope: 'Nội bộ', color: 'from-purple-600 to-pink-500' },
//   { id: 5, name: 'Gương Sáng Dòng Họ', description: 'Vinh danh bảng vàng...', count: 12, status: 'Hoạt động', order: 5, scope: 'Công khai', color: 'from-red-600 to-orange-500' },
//   { id: 6, name: 'Sổ Vàng Công Đức', description: 'Ghi nhận đóng góp...', count: 120, status: 'Hoạt động', order: 6, scope: 'Công khai', color: 'from-amber-600 to-yellow-600' },
//   { id: 7, name: 'Thư Viện (Media)', description: 'Hình ảnh video...', count: 200, status: 'Hoạt động', order: 7, scope: 'Nội bộ', color: 'from-indigo-600 to-blue-500' }
// ];

// const Category = () => {
//   const [categories, setCategories] = useState(INITIAL_CATEGORIES);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '', description: '', status: 'Hoạt động', order: 1, scope: 'Công khai'
//   });

//   const filteredCategories = categories
//     .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => a.order - b.order);

//   const handleAddNew = () => {
//     setIsEditing(false);
//     const nextOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1;
//     setFormData({ name: '', description: '', status: 'Hoạt động', order: nextOrder, scope: 'Công khai' });
//     setShowModal(true);
//   };

//   const handleEdit = (category) => {
//     setIsEditing(true);
//     setCurrentId(category.id);
//     setFormData({ ...category });
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa chuyên mục này?')) {
//       setCategories(categories.filter(cat => cat.id !== id));
//     }
//   };

//   const handleSave = () => {
//     if (!formData.name) return alert("Vui lòng nhập tên chuyên mục!");
//     if (isEditing) {
//       setCategories(categories.map(cat => cat.id === currentId ? { ...cat, ...formData } : cat));
//     } else {
//       setCategories([...categories, { id: Date.now(), count: 0, color: 'from-emerald-600 to-green-400', ...formData }]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="p-8 bg-[#f4f7f4] min-h-screen font-sans text-left">
//       {/* --- HEADER --- */}
//       <div className="flex justify-between items-center mb-12">
//         <div className="relative">
//           <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 drop-shadow-md">
//             <div className="p-3 bg-emerald-600 rounded-2xl shadow-[0_10px_20px_rgba(5,150,105,0.4)] text-white">
//                 <FolderTree size={32} />
//             </div>
//             Quản Lý Chuyên Mục
//           </h2>
//           <div className="absolute -bottom-3 left-16 w-24 h-2 bg-emerald-500 rounded-full shadow-lg"></div>
//         </div>
        
//         <button 
//             onClick={handleAddNew} 
//             className="group relative px-8 py-4 bg-emerald-700 text-white rounded-2xl flex items-center gap-3 hover:bg-emerald-800 transition-all duration-300 shadow-[0_15px_30px_rgba(5,150,105,0.3)] active:scale-90 overflow-hidden border-b-4 border-emerald-900"
//         >
//           <Plus size={22} strokeWidth={4} /> 
//           <span className="font-black uppercase tracking-widest text-sm">Thêm chuyên mục</span>
//         </button>
//       </div>

//       {/* --- SEARCH BOX --- */}
//       <div className="flex justify-end mb-10">
//         <div className="relative w-full md:w-[450px] group text-left">
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm chuyên mục dòng họ..." 
//             className="w-full border-2 border-white bg-white rounded-2xl px-8 py-5 pl-14 shadow-[0_15px_30px_rgba(0,0,0,0.08)] outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 font-bold"
//             value={searchTerm} 
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-5 top-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={24} />
//         </div>
//       </div>

//       {/* --- DANH SÁCH BẢNG --- */}
//       <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden border-2 border-white">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             {/* THAY ĐỔI: Màu xanh đặc trưng cho thanh chính của bảng */}
//             <tr className="bg-emerald-700 text-white border-b-4 border-emerald-800">
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center w-24">Số TT</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em]">Thông tin chuyên mục</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Phạm vi</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Số lượng</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Trạng thái</th>
//               <th className="px-8 py-7 text-xs font-black uppercase tracking-[0.2em] text-center">Thao tác</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y-2 divide-slate-100">
//             {filteredCategories.map((cat) => (
//               <tr key={cat.id} className="group hover:bg-emerald-50/50 transition-all duration-300">
//                 <td className="px-8 py-8 text-center border-r border-slate-50">
//                   <span className="text-2xl font-black text-slate-200 group-hover:text-emerald-600 transition-colors italic">
//                     {cat.order < 10 ? `0${cat.order}` : cat.order}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8">
//                   <div className="flex flex-col gap-1 text-left">
//                     <span className="text-lg font-black text-slate-800 group-hover:translate-x-2 transition-transform inline-flex items-center gap-3">
//                       <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${cat.color} shadow-lg`}></div>
//                       {cat.name}
//                     </span>
//                     <span className="text-sm text-slate-500 mt-1 font-medium italic border-l-2 border-emerald-500 pl-3 ml-1">{cat.description}</span>
//                   </div>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-md border-2 ${
//                     cat.scope === 'Công khai' 
//                     ? 'bg-blue-50 text-blue-700 border-blue-200' 
//                     : 'bg-purple-50 text-purple-700 border-purple-200'
//                   }`}>
//                     {cat.scope === 'Công khai' ? <Globe size={12}/> : <Lock size={12}/>}
//                     {cat.scope}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-xl font-black shadow-lg">
//                       <FileText size={14} className="text-emerald-300" />
//                       {cat.count}
//                    </div>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black shadow-sm border-2 ${
//                     cat.status === 'Hoạt động' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
//                   }`}>
//                     <div className={`w-2 h-2 rounded-full ${cat.status === 'Hoạt động' ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></div>
//                     {cat.status}
//                   </span>
//                 </td>
//                 <td className="px-8 py-8 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
//                     <button onClick={() => handleEdit(cat)} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg active:scale-90"><Edit size={18}/></button>
//                     <button onClick={() => handleDelete(cat.id)} className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg active:scale-90"><Trash2 size={18}/></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- MODAL HIỆU ỨNG NỔI KHỐI --- */}
//       {showModal && (
//         <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden animate-in zoom-in duration-300 border-[10px] border-white/20 text-left">
//             <div className="bg-emerald-700 px-10 py-8 flex justify-between items-center text-white border-b-8 border-emerald-800">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 rounded-2xl"><Plus size={24} strokeWidth={4} /></div>
//                 <h3 className="text-2xl font-black uppercase tracking-tighter italic">
//                     {isEditing ? 'Cập Nhật Chuyên Mục' : 'Khởi Tạo Chuyên Mục'}
//                 </h3>
//               </div>
//               <button onClick={() => setShowModal(false)} className="bg-white/10 hover:bg-red-500 p-2 rounded-full transition-all">
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="p-10 space-y-8">
//               <div className="grid grid-cols-4 gap-6">
//                 <div className="col-span-3 text-left">
//                   <label className="block text-xs font-black uppercase text-emerald-700 mb-2 ml-1 tracking-[0.2em]">Tên Chuyên Mục</label>
//                   <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-800 shadow-inner" placeholder="VD: Lịch Sử Dòng Họ" />
//                 </div>
//                 <div className="col-span-1 text-left">
//                   <label className="block text-xs font-black uppercase text-emerald-700 mb-2 text-center tracking-[0.2em]">Thứ Tự</label>
//                   <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-4 py-4 outline-none focus:border-emerald-500 focus:bg-white text-center font-black text-slate-800 shadow-inner" />
//                 </div>
//               </div>

//               <div className="text-left">
//                 <label className="block text-xs font-black uppercase text-emerald-700 mb-2 ml-1 tracking-[0.2em]">Mô Tả Chi Tiết</label>
//                 <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white h-32 font-medium text-slate-700 shadow-inner italic resize-none" placeholder="Ghi chú ý nghĩa..."></textarea>
//               </div>

//               <div className="grid grid-cols-2 gap-8 text-left">
//                 <div className="text-left">
//                    <label className="block text-xs font-black uppercase text-emerald-700 mb-2 ml-1 tracking-[0.2em]">Phạm Vi Truy Cập</label>
//                    <select value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
//                      <option value="Công khai">🌐 Công khai</option>
//                      <option value="Nội bộ">🔒 Nội bộ</option>
//                    </select>
//                 </div>
//                 <div className="text-left">
//                    <label className="block text-xs font-black uppercase text-emerald-700 mb-2 ml-1 tracking-[0.2em]">Trạng Thái Hiển Thị</label>
//                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
//                      <option value="Hoạt động">✅ Đang hoạt động</option>
//                      <option value="Tạm ẩn">❌ Tạm ẩn</option>
//                    </select>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-slate-100 px-10 py-8 flex justify-end gap-5 border-t border-slate-200">
//               <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase text-xs tracking-[0.2em]">Bỏ qua</button>
//               <button onClick={handleSave} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 font-black shadow-[0_15px_30px_rgba(5,150,105,0.4)] flex items-center gap-3 active:scale-95 transition-all uppercase text-xs tracking-widest border-b-8 border-emerald-800">
//                 <Save size={20}/> Lưu Thay Đổi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;










// src/components/Category/Category.jsx
import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, X, Save, FolderTree, FileText, Globe, Lock } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Phả Ký', description: 'Lịch sử dòng họ, nguồn gốc...', count: 15, status: 'Hoạt động', order: 1, scope: 'Công khai', color: 'from-blue-600 to-cyan-500' },
  { id: 2, name: 'Tin Tức & Sự Kiện', description: 'Thông báo họp họ, hiếu hỉ...', count: 42, status: 'Hoạt động', order: 2, scope: 'Công khai', color: 'from-orange-600 to-yellow-500' },
  { id: 3, name: 'Vấn Khấn & Nghi Lễ', description: 'Bài cúng gia tiên...', count: 8, status: 'Hoạt động', order: 3, scope: 'Nội bộ', color: 'from-emerald-600 to-teal-500' },
  { id: 4, name: 'Gia Quy - Tộc Ước', description: 'Quy định dòng họ...', count: 5, status: 'Hoạt động', order: 4, scope: 'Nội bộ', color: 'from-purple-600 to-pink-500' },
  { id: 5, name: 'Gương Sáng Dòng Họ', description: 'Vinh danh bảng vàng...', count: 12, status: 'Hoạt động', order: 5, scope: 'Công khai', color: 'from-red-600 to-orange-500' },
  { id: 6, name: 'Sổ Vàng Công Đức', description: 'Ghi nhận đóng góp...', count: 120, status: 'Hoạt động', order: 6, scope: 'Công khai', color: 'from-amber-600 to-yellow-600' },
  { id: 7, name: 'Thư Viện (Media)', description: 'Hình ảnh video...', count: 200, status: 'Hoạt động', order: 7, scope: 'Nội bộ', color: 'from-indigo-600 to-blue-500' }
];

const Category = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', description: '', status: 'Hoạt động', order: 1, scope: 'Công khai'
  });

  const filteredCategories = categories
    .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const handleAddNew = () => {
    setIsEditing(false);
    const nextOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1;
    setFormData({ name: '', description: '', status: 'Hoạt động', order: nextOrder, scope: 'Công khai' });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentId(category.id);
    setFormData({ ...category });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chuyên mục này?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) return alert("Vui lòng nhập tên chuyên mục!");
    if (isEditing) {
      setCategories(categories.map(cat => cat.id === currentId ? { ...cat, ...formData } : cat));
    } else {
      setCategories([...categories, { id: Date.now(), count: 0, color: 'from-emerald-500 to-emerald-400', ...formData }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-[#f4f7f4] min-h-screen font-sans text-left">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative">
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 uppercase italic">
            <div className="p-3 bg-[#10b981] rounded-2xl shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] text-white">
                <FolderTree size={28} />
            </div>
            Quản Lý Chuyên Mục
          </h2>
          <div className="absolute -bottom-2 left-16 w-24 h-1.5 bg-[#10b981] rounded-full"></div>
        </div>
        
        <button 
            onClick={handleAddNew} 
            className="group flex items-center gap-2 bg-[#10b981] text-white px-7 py-3.5 rounded-2xl shadow-xl hover:bg-[#059669] transition-all font-black active:scale-95 border-b-4 border-[#047857] uppercase text-xs tracking-widest"
        >
          <Plus size={20} strokeWidth={3} /> 
          <span>Thêm chuyên mục</span>
        </button>
      </div>

      {/* --- SEARCH BOX --- */}
      <div className="flex justify-end mb-8">
        <div className="relative w-full md:w-[400px] group text-left">
          <input 
            type="text" 
            placeholder="Tìm kiếm chuyên mục..." 
            className="w-full border-2 border-transparent bg-white rounded-2xl px-6 py-4 pl-14 shadow-lg focus:border-[#10b981] outline-none transition-all text-slate-700 font-bold"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-5 top-4.5 text-slate-400 group-focus-within:text-[#10b981] transition-colors" size={22} />
        </div>
      </div>

      {/* --- DANH SÁCH BẢNG --- */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-emerald-50">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* THAY ĐỔI: Màu xanh Emerald như hình 1 */}
            <tr className="bg-[#10b981] text-white">
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center w-24">Số TT</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest">Thông tin chuyên mục</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Phạm vi</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Số lượng</th>
              <th className="px-8 py-7 text-[11px] font-black uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-emerald-50">
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="group hover:bg-emerald-50/50 transition-all">
                <td className="px-8 py-7 text-center">
                  <span className="text-xl font-black text-slate-200 group-hover:text-[#10b981] transition-colors italic">
                    {cat.order < 10 ? `0${cat.order}` : cat.order}
                  </span>
                </td>
                <td className="px-8 py-7">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-base font-bold text-slate-800 uppercase group-hover:text-[#059669] transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium italic">{cat.description}</span>
                  </div>
                </td>
                <td className="px-8 py-7 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${
                    cat.scope === 'Công khai' 
                    ? 'bg-blue-50 text-blue-700 border-blue-100' 
                    : 'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    {cat.scope === 'Công khai' ? <Globe size={12}/> : <Lock size={12}/>}
                    {cat.scope}
                  </span>
                </td>
                <td className="px-8 py-7 text-center">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-600 text-xs">
                      <FileText size={14} className="text-[#10b981]" />
                      {cat.count}
                   </div>
                </td>
                <td className="px-8 py-7 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-700 border-2 border-emerald-100 rounded-full text-[10px] font-black uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                    {cat.status}
                  </span>
                </td>
                <td className="px-8 py-7 text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                    <button onClick={() => handleEdit(cat)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden border-[12px] border-white animate-in zoom-in duration-300">
            {/* Modal Header Xanh Emerald */}
            <div className="bg-[#10b981] px-10 py-8 flex justify-between items-center text-white border-b-8 border-[#059669]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl shadow-inner"><Plus size={24} strokeWidth={4} /></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    {isEditing ? 'Cập Nhật Chuyên Mục' : 'Thêm Vào Tộc Phả'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-all">
                <X size={28} />
              </button>
            </div>
            
            <div className="p-10 space-y-8 text-left">
              <div className="grid grid-cols-4 gap-6 text-left">
                <div className="col-span-3 text-left">
                  <label className="block text-[10px] font-black uppercase text-[#10b981] mb-2 ml-1 tracking-[0.2em] border-l-4 border-[#10b981] pl-2">Tên Chuyên Mục</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#10b981] transition-all font-bold text-slate-800 shadow-inner text-lg" placeholder="Nhập tên..." />
                </div>
                <div className="col-span-1 text-left">
                  <label className="block text-[10px] font-black uppercase text-[#10b981] mb-2 text-center tracking-[0.2em]">Thứ Tự</label>
                  <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-4 py-4 outline-none focus:border-[#10b981] text-center font-black text-slate-800 shadow-inner text-lg" />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-black uppercase text-[#10b981] mb-2 ml-1 tracking-[0.2em] border-l-4 border-[#10b981] pl-2">Mô Tả Chi Tiết</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] px-6 py-4 outline-none focus:border-[#10b981] h-32 font-medium text-slate-700 shadow-inner italic resize-none" placeholder="Viết mô tả ngắn..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-8 text-left">
                <div className="text-left">
                   <label className="block text-[10px] font-black uppercase text-[#10b981] mb-2 ml-1 tracking-[0.2em] border-l-4 border-[#10b981] pl-2">Phạm Vi</label>
                   <select value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#10b981] font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
                     <option value="Công khai">🌐 Công khai</option>
                     <option value="Nội bộ">🔒 Nội bộ</option>
                   </select>
                </div>
                <div className="text-left">
                   <label className="block text-[10px] font-black uppercase text-[#10b981] mb-2 ml-1 tracking-[0.2em] border-l-4 border-[#10b981] pl-2">Trạng Thái</label>
                   <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#10b981] font-black text-slate-800 cursor-pointer shadow-inner appearance-none">
                     <option value="Hoạt động">✅ Đang hoạt động</option>
                     <option value="Tạm ẩn">❌ Tạm ẩn</option>
                   </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-10 py-8 flex justify-end gap-5 border-t border-slate-200">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-red-600 transition-colors uppercase text-xs tracking-widest">Hủy bỏ</button>
              <button onClick={handleSave} className="px-12 py-5 bg-[#10b981] text-white rounded-3xl hover:bg-[#059669] font-black shadow-[0_15px_35px_-10px_rgba(16,185,129,0.5)] flex items-center gap-3 active:scale-95 transition-all uppercase text-sm tracking-widest border-b-8 border-[#047857]">
                <Save size={20}/> Lưu Vào Tộc Phả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
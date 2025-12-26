// // src/components/Library/Library.jsx
// import React from 'react';
// import { LIBRARY_ITEMS } from '../../constants/mockData';
// import { FileText, Image, File, Download, Eye, Search, Filter, Plus } from 'lucide-react';

// const Library = () => {
//   // Hàm chọn icon dựa theo loại file
//   const getFileIcon = (type) => {
//     switch (type) {
//       case 'pdf': return <FileText className="text-red-500" size={40} />;
//       case 'image': return <Image className="text-blue-500" size={40} />;
//       case 'doc': return <File className="text-blue-700" size={40} />;
//       default: return <File className="text-gray-500" size={40} />;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Thư viện số</h2>
//           <p className="text-sm text-gray-500 mt-1">Lưu trữ văn bản, hình ảnh và tư liệu dòng họ</p>
//         </div>
//         <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700 transition">
//           <Plus size={18} /> Tải tài liệu lên
//         </button>
//       </div>

//       {/* Toolbar: Tìm kiếm & Lọc */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm tài liệu..." 
//             className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//         </div>
//         <div className="flex gap-2">
//            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 text-gray-700">
//              <Filter size={18} /> Bộ lọc
//            </button>
//         </div>
//       </div>

//       {/* Danh sách tài liệu (Grid View) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {LIBRARY_ITEMS.map((item) => (
//           <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition group">
//             <div className="flex justify-between items-start mb-4">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 {getFileIcon(item.type)}
//               </div>
//               <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase">
//                 {item.type}
//               </span>
//             </div>
            
//             <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
//               {item.title}
//             </h3>
            
//             <div className="text-sm text-gray-500 space-y-1 mb-4">
//               <p>Danh mục: <span className="text-gray-700">{item.category}</span></p>
//               <p>Ngày đăng: {item.date}</p>
//               <p>Dung lượng: {item.size}</p>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2 mt-auto pt-3 border-t">
//               <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">
//                 <Eye size={16} /> Xem
//               </button>
//               <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded">
//                 <Download size={16} /> Tải về
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Library;











// // src/components/Library/Library.jsx
// import React, { useState } from 'react';
// import { LIBRARY_ITEMS } from '../../constants/mockData';
// import { 
//   FileText, Image as ImageIcon, File, Download, Eye, 
//   Search, Filter, Plus, X, LayoutGrid, List, User 
// } from 'lucide-react';

// const Library = () => {
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' hoặc 'list'
//   const [selectedPreview, setSelectedPreview] = useState(null); // Quản lý Modal Preview
//   const [searchTerm, setSearchTerm] = useState('');

//   // 1. PHÂN LOẠI MÀU SẮC & ICON (Visual Coding)
//   const getFileStyle = (type) => {
//     switch (type) {
//       case 'pdf': 
//         return {
//           icon: <FileText size={32} />, 
//           color: 'text-rose-600', 
//           bg: 'bg-rose-50', 
//           border: 'border-rose-200',
//           btn: 'bg-rose-600 hover:bg-rose-700'
//         };
//       case 'image': 
//         return {
//           icon: <ImageIcon size={32} />, 
//           color: 'text-emerald-600', 
//           bg: 'bg-emerald-50', 
//           border: 'border-emerald-200',
//           btn: 'bg-emerald-600 hover:bg-emerald-700'
//         };
//       case 'doc': 
//         return {
//           icon: <File size={32} />, 
//           color: 'text-blue-600', 
//           bg: 'bg-blue-50', 
//           border: 'border-blue-200',
//           btn: 'bg-blue-600 hover:bg-blue-700'
//         };
//       default: 
//         return {
//           icon: <File size={32} />, 
//           color: 'text-amber-600', 
//           bg: 'bg-amber-50', 
//           border: 'border-amber-200',
//           btn: 'bg-amber-600 hover:bg-amber-700'
//         };
//     }
//   };

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
//       {/* HEADER CAO CẤP */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Thư viện số</h2>
//           <p className="text-slate-500 font-medium mt-1">Lưu trữ bảo vật và tư liệu quý của dòng họ</p>
//         </div>
//         <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-200 hover:bg-teal-600 hover:-translate-y-1 transition-all duration-300 font-bold active:scale-95">
//           <Plus size={20} strokeWidth={3} /> Tải tài liệu lên
//         </button>
//       </div>

//       {/* 2. TOOLBAR THÔNG MINH */}
//       <div className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] shadow-xl shadow-slate-100 border border-white mb-8 flex flex-col xl:flex-row gap-5 items-center justify-between">
//         <div className="relative group flex-1 max-w-xl">
//           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
//           <input 
//             type="text" 
//             placeholder="Tìm tên sử tích, văn bản, hình ảnh..." 
//             className="w-full pl-14 pr-6 py-3.5 bg-white border-none rounded-2xl shadow-inner-sm focus:ring-2 focus:ring-teal-500 outline-none text-sm font-medium transition-all"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center gap-3">
//           {/* Lọc nhanh theo loại */}
//           <div className="hidden md:flex bg-slate-100 p-1.5 rounded-2xl gap-1">
//             <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white rounded-xl shadow-sm">Tất cả</button>
//             <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">PDF</button>
//             <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">Ảnh</button>
//           </div>

//           <span className="h-8 w-[1px] bg-slate-200 mx-2"></span>

//           {/* Chuyển đổi Grid/List */}
//           <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
//             <button 
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}
//             >
//               <LayoutGrid size={18} />
//             </button>
//             <button 
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}
//             >
//               <List size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 3 & 4. DANH SÁCH TÀI LIỆU (GRID VIEW NỔI KHỐI) */}
//       <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" : "space-y-4"}>
//         {LIBRARY_ITEMS.map((item) => {
//           const style = getFileStyle(item.type);
          
//           return (
//             <div 
//               key={item.id} 
//               className={`bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border-2 ${style.border} p-6 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden`}
//             >
//               {/* Thêm nhãn (Tag) góc thẻ */}
//               <div className="absolute top-4 right-4 flex gap-2">
//                  <span className="text-[10px] font-black px-2.5 py-1 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-600 border border-slate-100 uppercase tracking-widest">
//                     {item.size}
//                  </span>
//               </div>

//               <div className="flex justify-between items-start mb-6">
//                 <div className={`p-4 rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.bg} ${style.color}`}>
//                   {style.icon}
//                 </div>
//                 <div className="text-right">
//                   <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${style.bg} ${style.color}`}>
//                     {item.type}
//                   </span>
//                 </div>
//               </div>
              
//               <h3 className="font-black text-slate-800 mb-2 line-clamp-2 min-h-[3.5rem] text-lg leading-snug group-hover:text-teal-600 transition-colors">
//                 {item.title}
//               </h3>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
//                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
//                    DANH MỤC: <span className="text-slate-800">{item.category}</span>
//                 </div>
//                 {/* Thông tin người đăng */}
//                 <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
//                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-sm overflow-hidden">
//                       <User size={14} className="text-slate-400" />
//                    </div>
//                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Đăng bởi: Thanh Thủy</span>
//                 </div>
//               </div>

//               {/* Actions Nổi bật */}
//               <div className="flex gap-3 relative z-10 pt-4 border-t border-slate-50">
//                 <button 
//                   onClick={() => setSelectedPreview(item)}
//                   className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl transition-all active:scale-90"
//                 >
//                   <Eye size={16} strokeWidth={3} /> Xem
//                 </button>
//                 <button className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-lg transition-all active:scale-90 ${style.btn}`}>
//                   <Download size={16} strokeWidth={3} /> Tải về
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* PREVIEW MODAL (Quick Preview) */}
//       {selectedPreview && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
//           <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300">
//             <div className="p-8 border-b flex justify-between items-center bg-slate-50">
//               <div className="flex items-center gap-4">
//                  <div className={`p-3 rounded-2xl text-white ${getFileStyle(selectedPreview.type).btn}`}>
//                     <FileText size={24} />
//                  </div>
//                  <div>
//                     <h3 className="font-black text-xl text-slate-800 tracking-tight">{selectedPreview.title}</h3>
//                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Đang xem trước tài liệu • {selectedPreview.size}</p>
//                  </div>
//               </div>
//               <button 
//                 onClick={() => setSelectedPreview(null)}
//                 className="p-3 bg-white hover:bg-red-50 hover:text-red-500 rounded-full shadow-md transition-all active:scale-90"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             {/* Vùng nội dung giả lập Preview */}
//             <div className="flex-1 bg-slate-200 overflow-y-auto p-10 flex items-center justify-center">
//                <div className="bg-white w-full max-w-2xl aspect-[1/1.4] shadow-2xl rounded-sm p-12 text-slate-300 flex flex-col gap-4">
//                   <div className="h-8 w-3/4 bg-slate-100 rounded"></div>
//                   <div className="h-4 w-full bg-slate-50 rounded"></div>
//                   <div className="h-4 w-full bg-slate-50 rounded"></div>
//                   <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
//                   <div className="mt-10 h-64 w-full bg-slate-50 rounded-lg flex items-center justify-center">
//                      <ImageIcon size={48} />
//                   </div>
//                   <div className="mt-auto h-10 w-32 bg-slate-100 rounded self-end"></div>
//                </div>
//             </div>

//             <div className="p-8 bg-white border-t flex justify-end gap-4">
//                <button className="px-8 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs tracking-widest">In tài liệu</button>
//                <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg shadow-slate-200 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest">
//                  <Download size={18}/> Tải bản gốc về máy
//                </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Library;











// src/components/Library/Library.jsx
import React, { useState } from 'react';
import { LIBRARY_ITEMS } from '../../constants/mockData';
import { 
  FileText, Image as ImageIcon, File, Download, Eye, 
  Search, Filter, Plus, X, LayoutGrid, List, User, Upload, Save
} from 'lucide-react';

const Library = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- BỔ SUNG STATE TẢI LÊN ---
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getFileStyle = (type) => {
    switch (type) {
      case 'pdf': return { icon: <FileText size={32} />, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', btn: 'bg-rose-600 hover:bg-rose-700' };
      case 'image': return { icon: <ImageIcon size={32} />, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'doc': return { icon: <File size={32} />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700' };
      default: return { icon: <File size={32} />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', btn: 'bg-amber-600 hover:bg-amber-700' };
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left">
      {/* HEADER CAO CẤP */}
      <div className="flex justify-between items-center mb-8 text-left">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Thư viện số</h2>
          <p className="text-slate-500 font-medium mt-1">Lưu trữ bảo vật và tư liệu quý của dòng họ</p>
        </div>
        {/* --- GẮN SỰ KIỆN CLICK VÀO ĐÂY --- */}
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-200 hover:bg-teal-600 hover:-translate-y-1 transition-all duration-300 font-bold active:scale-95"
        >
          <Plus size={20} strokeWidth={3} /> Tải tài liệu lên
        </button>
      </div>

      {/* TOOLBAR THÔNG MINH */}
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] shadow-xl shadow-slate-100 border border-white mb-8 flex flex-col xl:flex-row gap-5 items-center justify-between">
        <div className="relative group flex-1 max-w-xl text-left">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Tìm tên sử tích, văn bản, hình ảnh..." 
            className="w-full pl-14 pr-6 py-3.5 bg-white border-none rounded-2xl shadow-inner-sm focus:ring-2 focus:ring-teal-500 outline-none text-sm font-medium transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-slate-100 p-1.5 rounded-2xl gap-1">
            <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white rounded-xl shadow-sm">Tất cả</button>
            <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">PDF</button>
            <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">Ảnh</button>
          </div>
          <span className="h-8 w-[1px] bg-slate-200 mx-2"></span>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}><List size={18} /></button>
          </div>
        </div>
      </div>

      {/* DANH SÁCH TÀI LIỆU */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" : "space-y-4"}>
        {LIBRARY_ITEMS.map((item) => {
          const style = getFileStyle(item.type);
          return (
            <div key={item.id} className={`bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border-2 ${style.border} p-6 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden text-left`}>
              <div className="absolute top-4 right-4 flex gap-2">
                 <span className="text-[10px] font-black px-2.5 py-1 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-600 border border-slate-100 uppercase tracking-widest">{item.size}</span>
              </div>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.bg} ${style.color}`}>{style.icon}</div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${style.bg} ${style.color}`}>{item.type}</span>
              </div>
              <h3 className="font-black text-slate-800 mb-2 line-clamp-2 min-h-[3.5rem] text-lg leading-snug group-hover:text-teal-600 transition-colors">{item.title}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                   DANH MỤC: <span className="text-slate-800">{item.category}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                   <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-sm overflow-hidden"><User size={14} className="text-slate-400" /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Đăng bởi: Thanh Thủy</span>
                </div>
              </div>
              <div className="flex gap-3 relative z-10 pt-4 border-t border-slate-50">
                <button onClick={() => setSelectedPreview(item)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl transition-all"><Eye size={16} strokeWidth={3} /> Xem</button>
                <button className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-lg transition-all active:scale-90 ${style.btn}`}><Download size={16} strokeWidth={3} /> Tải về</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL TẢI TÀI LIỆU LÊN (MỚI BỔ SUNG) --- */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in duration-300 text-left">
            <div className="p-8 bg-gradient-to-r from-teal-600 to-emerald-500 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <Upload size={24} strokeWidth={3} />
                <h3 className="font-black text-xl tracking-tight uppercase italic">Tải tài liệu mới</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-all"><X size={24} /></button>
            </div>

            <div className="p-10 space-y-6">
              {/* Vùng kéo thả file */}
              <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-teal-200 hover:bg-teal-50/30 transition-all group cursor-pointer">
                 <div className="p-5 bg-teal-50 text-teal-600 rounded-full group-hover:scale-110 transition-transform">
                    <Plus size={40} strokeWidth={3} />
                 </div>
                 <div className="text-center">
                    <p className="font-black text-slate-700 uppercase text-xs tracking-widest">Nhấn để chọn file hoặc kéo thả</p>
                    <p className="text-slate-400 text-[10px] mt-1 font-bold">PDF, JPG, PNG, DOCX (Tối đa 25MB)</p>
                 </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Tên tài liệu / Tiêu đề</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 transition-all" placeholder="Nhập tên tài liệu..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Danh mục</label>
                   <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 appearance-none cursor-pointer">
                      <option>Sử tích</option><option>Gia phả gốc</option><option>Hình ảnh cổ</option><option>Văn bản khác</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Quyền xem</label>
                   <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 appearance-none cursor-pointer">
                      <option>Công khai</option><option>Nội bộ</option>
                   </select>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t flex justify-end gap-4">
               <button onClick={() => setShowUploadModal(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs tracking-widest">Hủy bỏ</button>
               <button className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-lg shadow-teal-200 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest">
                 <Save size={18}/> Lưu tài liệu
               </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL GIỮ NGUYÊN */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[120] p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-2xl text-white ${getFileStyle(selectedPreview.type).btn}`}><FileText size={24} /></div>
                 <div>
                    <h3 className="font-black text-xl text-slate-800 tracking-tight">{selectedPreview.title}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Đang xem trước • {selectedPreview.size}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedPreview(null)} className="p-3 bg-white hover:bg-red-50 hover:text-red-500 rounded-full shadow-md active:scale-90 transition-all"><X size={24} /></button>
            </div>
            <div className="flex-1 bg-slate-200 overflow-y-auto p-10 flex items-center justify-center italic text-slate-400">Vùng xem trước tài liệu...</div>
            <div className="p-8 bg-white border-t flex justify-end gap-4">
               <button onClick={() => setSelectedPreview(null)} className="px-8 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs tracking-widest">Đóng</button>
               <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg shadow-slate-200 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest"><Download size={18}/> Tải xuống ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

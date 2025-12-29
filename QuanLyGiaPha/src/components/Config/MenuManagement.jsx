






// import React, { useState } from 'react';
// import { 
//   Plus, ChevronDown, ChevronUp, Link, Layers, 
//   FileText, Globe, Move, Trash2, CheckCircle2,
//   Eye, ShieldCheck, ExternalLink, Settings
// } from 'lucide-react';

// const MenuManagement = () => {
//   const [isActive, setIsActive] = useState(true);
//   const [openAccordion, setOpenAccordion] = useState('custom');

//   // Dữ liệu mẫu tích hợp thêm trường 'scope' (Phân quyền hiển thị)
//   const [menuStructure, setMenuStructure] = useState([
//     { id: 1, name: 'Trang chủ', type: 'Trang', scope: 'Công khai' },
//     { id: 2, name: 'Phả ký', type: 'Chuyên mục', scope: 'Công khai' },
//     { id: 3, name: 'Phả đồ', type: 'Trang', scope: 'Thành viên' },
//     { id: 4, name: 'Sự kiện', type: 'Trang', scope: 'Công khai' },
//     { id: 5, name: 'Thư viện', type: 'Trang', scope: 'Công khai' },
//     { id: 6, name: 'Quản lý Chi tiêu', type: 'Trang', scope: 'Ban quản trị' },
//   ]);

//   const cardStyle = "bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden transition-all";

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left">
//       {/* Header bổ sung nút Preview */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4 text-left">
//           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//              Menu Hệ Thống
//           </h2>
//           <button 
//             onClick={() => window.open('/', '_blank')}
//             className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black uppercase hover:bg-emerald-50 transition-all shadow-sm"
//           >
//             <ExternalLink size={14} /> Xem trang chủ
//           </button>
//         </div>
//         <div className="text-xs text-slate-400 font-medium italic">
//           Website / <span className="text-emerald-600 font-bold">Quản lý Menu</span>
//         </div>
//       </div>

//       {/* Thông báo kích hoạt */}
//       <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-5 mb-8 shadow-sm">
//         <p className="text-sm font-bold text-emerald-900 mb-2 italic">
//           Để sử dụng chức năng menu tùy chỉnh này, vui lòng tích chọn ô kích hoạt hệ thống
//         </p>
//         <label className="flex items-center gap-3 cursor-pointer w-fit group">
//           <div className="relative">
//             <input 
//               type="checkbox" 
//               checked={isActive} 
//               onChange={() => setIsActive(!isActive)}
//               className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer transition-transform group-active:scale-90"
//             />
//           </div>
//           <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Kích hoạt Menu</span>
//         </label>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* CỘT TRÁI: THÊM CÁC MỤC MENU */}
//         <div className="lg:col-span-4 space-y-4 text-left">
//           <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-4 ml-2 italic">Thêm mục điều hướng</h3>
          
//           {/* Accordion: Liên kết tự tạo */}
//           <div className={cardStyle}>
//             <button 
//               onClick={() => setOpenAccordion(openAccordion === 'custom' ? '' : 'custom')}
//               className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition-all font-bold text-slate-700 text-xs uppercase tracking-tighter"
//             >
//               <div className="flex items-center gap-3"><Link size={16} className="text-emerald-500"/> Liên kết tự tạo</div>
//               {openAccordion === 'custom' ? <ChevronUp size={18} className="text-emerald-600"/> : <ChevronDown size={18}/>}
//             </button>
//             {openAccordion === 'custom' && (
//               <div className="p-6 bg-white border-t border-emerald-50 space-y-5 animate-in slide-in-from-top-2 duration-300">
//                 <div className="text-left">
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 italic">Đường dẫn liên kết (URL)</label>
//                   <input type="text" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium shadow-inner" />
//                 </div>
//                 <div className="text-left">
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 italic">Tên hiển thị trên Menu</label>
//                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold shadow-inner" />
//                 </div>
//                 <div className="flex justify-end pt-2">
//                    <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
//                       Thêm vào menu
//                    </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Accordion: Chuyên mục & Trang */}
//           <div className={cardStyle}>
//             <button 
//               onClick={() => setOpenAccordion(openAccordion === 'category' ? '' : 'category')}
//               className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition-all font-bold text-slate-700 text-xs uppercase"
//             >
//               <div className="flex items-center gap-3"><Layers size={16} className="text-emerald-500"/> Chuyên mục bài viết</div>
//               <ChevronDown size={18}/>
//             </button>
//           </div>

//           <div className={cardStyle}>
//             <button 
//               onClick={() => setOpenAccordion(openAccordion === 'page' ? '' : 'page')}
//               className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition-all font-bold text-slate-700 text-xs uppercase"
//             >
//               <div className="flex items-center gap-3"><FileText size={16} className="text-emerald-500"/> Trang nội dung</div>
//               <ChevronDown size={18}/>
//             </button>
//           </div>
//         </div>

//         {/* CỘT PHẢI: CẤU TRÚC MENU TÍCH HỢP PHÂN QUYỀN */}
//         <div className="lg:col-span-8 text-left">
//           <div className="flex justify-between items-end mb-4 px-2">
//             <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] italic text-left">Cấu trúc phân cấp menu</h3>
//             <span className="text-[9px] font-bold text-emerald-500 uppercase italic">Kéo thả để sắp xếp vị trí</span>
//           </div>

//           <div className="space-y-3">
//             {menuStructure.map((item) => (
//               <div key={item.id} className="flex items-center gap-3 group text-left">
//                 {/* Thanh menu chính */}
//                 <div className="bg-white border border-slate-200 flex-1 rounded-2xl px-6 py-4 flex justify-between items-center shadow-sm group-hover:border-emerald-400 group-hover:shadow-md transition-all cursor-move">
//                   <div className="flex items-center gap-4">
//                      <Move size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
//                      <div className="flex flex-col text-left">
//                         <span className="font-black text-slate-700 text-xs uppercase tracking-tight">{item.name}</span>
//                         {/* Hiển thị phân quyền hiển thị */}
//                         <div className="flex items-center gap-1.5 mt-0.5">
//                            <ShieldCheck size={10} className="text-emerald-500" />
//                            <span className="text-[9px] font-bold text-emerald-600 italic">Quyền: {item.scope}</span>
//                         </div>
//                      </div>
//                   </div>
//                   <div className="flex items-center gap-5">
//                     <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black uppercase text-slate-400 rounded-md italic">{item.type}</span>
//                     <Settings size={16} className="text-slate-300 cursor-pointer hover:text-emerald-600 transition-colors" />
//                   </div>
//                 </div>
                
//                 {/* Nút xóa nhanh */}
//                 <button className="p-3 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all active:scale-90">
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Nút Lưu cấu hình */}
//           <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-200 flex justify-end">
//             <button className="flex items-center gap-3 bg-slate-900 text-white px-12 py-4 rounded-[2rem] font-black shadow-xl hover:bg-emerald-600 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
//               <CheckCircle2 size={20} /> Lưu cấu trúc menu website
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuManagement;











import React, { useState } from 'react';
import { 
  Plus, ChevronDown, ChevronUp, Link, Layers, 
  FileText, Globe, Move, Trash2, CheckCircle2,
  ShieldCheck, ExternalLink, Settings
} from 'lucide-react';

const MenuManagement = () => {
  const [isActive, setIsActive] = useState(true);
  const [openAccordion, setOpenAccordion] = useState('custom');

  const [menuStructure, setMenuStructure] = useState([
    { id: 1, name: 'Trang chủ', type: 'Trang', scope: 'Công khai' },
    { id: 2, name: 'Phả ký', type: 'Chuyên mục', scope: 'Công khai' },
    { id: 3, name: 'Phả đồ', type: 'Trang', scope: 'Thành viên' },
    { id: 4, name: 'Sự kiện', type: 'Trang', scope: 'Công khai' },
    { id: 5, name: 'Thư viện', type: 'Trang', scope: 'Công khai' },
    { id: 6, name: 'Quản lý Chi tiêu', type: 'Trang', scope: 'Ban quản trị' },
  ]);

  const cardStyle = "bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden transition-all";

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 text-left">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             Menu Hệ Thống
          </h2>
          <button 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black uppercase hover:bg-emerald-50 transition-all shadow-sm"
          >
            <ExternalLink size={14} /> Xem trang chủ
          </button>
        </div>
        <div className="text-xs text-slate-400 font-medium italic">
          Website / <span className="text-emerald-600 font-bold">Quản lý Menu</span>
        </div>
      </div>

      {/* THÔNG BÁO KÍCH HOẠT - MÀU ĐẬM GẤP 2.5 LẦN */}
      <div className="bg-[#10b981] border-l-[12px] border-[#065f46] rounded-2xl p-6 mb-10 shadow-lg shadow-emerald-200/50">
        <p className="text-sm font-black text-white mb-3 uppercase tracking-wide">
          Hệ thống Menu tùy chỉnh đang hoạt động
        </p>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group bg-[#065f46] px-5 py-2.5 rounded-xl border border-emerald-400/30 transition-all hover:bg-emerald-900">
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={() => setIsActive(!isActive)}
              className="w-5 h-5 accent-emerald-400 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-black text-emerald-50 uppercase tracking-[0.1em]">KÍCH HOẠT HỆ THỐNG MENU</span>
          </label>
          <div className="text-[10px] font-bold text-emerald-100 italic bg-white/10 px-3 py-1 rounded-full">
            Trạng thái: Sẵn sàng vận hành
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI: THÊM CÁC MỤC MENU */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-4 ml-2 italic text-left">Thêm mục điều hướng</h3>
          
          <div className={cardStyle}>
            <button 
              onClick={() => setOpenAccordion(openAccordion === 'custom' ? '' : 'custom')}
              className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-emerald-50/30 transition-all font-bold text-slate-700 text-xs uppercase tracking-tighter"
            >
              <div className="flex items-center gap-3"><Link size={16} className="text-emerald-500"/> Liên kết tự tạo</div>
              {openAccordion === 'custom' ? <ChevronUp size={18} className="text-emerald-600"/> : <ChevronDown size={18}/>}
            </button>
            {openAccordion === 'custom' && (
              <div className="p-6 bg-white border-t border-emerald-50 space-y-5 animate-in slide-in-from-top-2 duration-300">
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 italic text-left">URL</label>
                  <input type="text" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" />
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 italic text-left">Tên hiển thị</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold" />
                </div>
                <div className="flex justify-end pt-2">
                   <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
                      Thêm vào menu
                   </button>
                </div>
              </div>
            )}
          </div>
          {/* ... Chuyên mục & Trang giữ nguyên cấu trúc ... */}
        </div>

        {/* CỘT PHẢI: CẤU TRÚC MENU */}
        <div className="lg:col-span-8 text-left">
          <div className="flex justify-between items-end mb-4 px-2">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] italic text-left">Cấu trúc phân cấp menu</h3>
            <span className="text-[9px] font-bold text-emerald-500 uppercase italic">Kéo thả để sắp xếp vị trí</span>
          </div>

          <div className="space-y-3">
            {menuStructure.map((item) => (
              <div key={item.id} className="flex items-center gap-3 group text-left">
                <div className="bg-white border border-slate-200 flex-1 rounded-2xl px-6 py-4 flex justify-between items-center shadow-sm group-hover:border-emerald-400 group-hover:shadow-md transition-all cursor-move">
                  <div className="flex items-center gap-4">
                     <Move size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                     <div className="flex flex-col text-left">
                        <span className="font-black text-slate-700 text-xs uppercase tracking-tight text-left">{item.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5 text-left">
                           <ShieldCheck size={10} className="text-emerald-500" />
                           <span className="text-[9px] font-bold text-emerald-600 italic">Quyền: {item.scope}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black uppercase text-slate-400 rounded-md italic">{item.type}</span>
                    <Settings size={16} className="text-slate-300 cursor-pointer hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
                <button className="p-3 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-200 flex justify-end">
            <button className="flex items-center gap-3 bg-slate-900 text-white px-12 py-4 rounded-[2rem] font-black shadow-xl hover:bg-emerald-600 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
              <CheckCircle2 size={20} /> Lưu cấu trúc menu website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
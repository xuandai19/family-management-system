// import React, { useState } from 'react';
// import { 
//   Save, Image as ImageIcon, Trash2, Mail, 
//   Globe, Facebook, Phone, MapPin, Monitor, Send
// } from 'lucide-react';

// const ConfigPage = () => {
//   const [activeMenu, setActiveMenu] = useState(true);

//   return (
//     <div className="p-6 bg-[#f4f7f4] min-h-screen font-sans text-left">
//       {/* Breadcrumb */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Cấu hình Website</h1>
//         <div className="text-sm text-slate-400 font-bold">
//           Trang chủ / <span className="text-emerald-600">Cấu hình</span>
//         </div>
//       </div>

//       {/* Nút Phả đồ trực tuyến nổi bật */}
//       <button className="mb-6 flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-800 transition-all font-bold text-sm">
//         <Monitor size={18} /> Phả đồ trực tuyến <span className="bg-red-500 text-[10px] px-1 rounded-full animate-bounce">New</span>
//       </button>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
//         {/* CỘT 1: HEADER & FOOTER */}
//         <div className="space-y-6">
//           {/* Section Header */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
//             <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-black text-slate-700 text-sm uppercase">Header</div>
//             <div className="p-5 space-y-4">
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Tên gia phả *</label>
//                 <input type="text" defaultValue="Họ Nguyễn Việt Nam" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 transition-all shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Banner *</label>
//                 <div className="relative rounded-xl overflow-hidden border-2 border-slate-100 shadow-inner group">
//                   <img src="https://i.imgur.com/your-banner-placeholder.png" alt="Banner" className="w-full h-32 object-cover opacity-80" />
//                   <div className="absolute top-2 right-2 flex gap-2">
//                     <button className="p-1.5 bg-red-500 text-white rounded-md shadow-lg"><Trash2 size={14}/></button>
//                     <button className="p-1.5 bg-emerald-600 text-white rounded-md shadow-lg flex items-center gap-1 text-[10px] font-bold"><ImageIcon size={14}/> Chọn ảnh</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Logo *</label>
//                   <div className="w-20 h-20 bg-slate-50 rounded-xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-300">GP</div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Favicon</label>
//                   <div className="w-20 h-20 bg-slate-50 rounded-xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-300">GP</div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Phả đồ</label>
//                 <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 font-bold text-slate-700 outline-none focus:border-emerald-500">
//                   <option>Nằm ngang</option>
//                   <option>Nằm dọc</option>
//                 </select>
//               </div>
//               <div className="flex items-center justify-between pt-2">
//                 <span className="text-xs font-black text-slate-600 uppercase">Hiển thị sự kiện</span>
//                 <div className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${activeMenu ? 'bg-emerald-500' : 'bg-slate-300'}`} onClick={() => setActiveMenu(!activeMenu)}>
//                   <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-all ${activeMenu ? 'translate-x-5' : ''}`}></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section Footer */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
//             <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-black text-slate-700 text-sm uppercase">Footer</div>
//             <div className="p-5">
//               <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Thông tin liên hệ *</label>
//               <textarea rows="4" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-medium text-slate-600 shadow-inner italic resize-none" defaultValue="*MÃ BẢO MẬT để xem phả đồ là: 1234. Đây là website gia phả mẫu..."></textarea>
//             </div>
//           </div>
//         </div>

//         {/* CỘT 2: BODY & MẠNG XÃ HỘI */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
//             <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-black text-slate-700 text-sm uppercase">Body</div>
//             <div className="p-5 space-y-4">
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Ảnh thuộc lời nói đầu *</label>
//                 <div className="relative rounded-xl overflow-hidden border-2 border-slate-100 shadow-inner group">
//                   <img src="https://i.imgur.com/template-house.png" alt="Ancestral House" className="w-full h-44 object-cover" />
//                   <div className="absolute top-2 right-2 flex gap-2">
//                     <button className="p-1.5 bg-red-500 text-white rounded-md shadow-lg"><Trash2 size={14}/></button>
//                     <button className="p-1.5 bg-emerald-600 text-white rounded-md shadow-lg flex items-center gap-1 text-[10px] font-bold"><ImageIcon size={14}/> Chọn ảnh</button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Lời nói đầu *</label>
//                 <textarea rows="6" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-medium text-slate-600 shadow-inner text-sm leading-relaxed" defaultValue="Trong thời đại công nghệ thông tin phát triển mạnh mẽ, internet đã trở thành công cụ phổ biến..."></textarea>
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Đường dẫn iframe Google Map</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-emerald-400" size={16}/>
//                   <input type="text" placeholder="https://www.google.com/maps/embed?..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner text-xs" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section Mạng xã hội */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
//             <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-black text-slate-700 text-sm uppercase">Mạng xã hội</div>
//             <div className="p-5 space-y-4">
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-1 ml-1">Facebook *</label>
//                 <div className="relative">
//                   <Facebook className="absolute left-3 top-2.5 text-blue-600" size={18}/>
//                   <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-blue-500 font-bold text-slate-700" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-1 ml-1">Phone *</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-2.5 text-green-600" size={18}/>
//                   <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-green-500 font-bold text-slate-700" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CỘT 3: CẤU HÌNH EMAIL */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 h-full">
//             <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-black text-slate-700 text-sm uppercase">Cấu hình Email</div>
//             <div className="p-5 space-y-5">
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Tên hiển thị</label>
//                 <input type="text" defaultValue="Trưởng tộc họ Nguyễn" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Email</label>
//                 <input type="email" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Password</label>
//                 <input type="password" placeholder="••••••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner" />
//                 <p className="text-[10px] text-slate-400 mt-2 italic">Lưu ý: nếu bạn dùng Gmail thì phải dùng mật khẩu ứng dụng. <span className="text-emerald-500 underline cursor-pointer font-bold">Xem hướng dẫn tại đây</span></p>
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Host</label>
//                 <input type="text" defaultValue="smtp.gmail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-xs font-black text-emerald-700 uppercase mb-2">Port</label>
//                 <input type="text" defaultValue="587" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 font-bold text-slate-700 shadow-inner" />
//               </div>
              
//               <div className="pt-4 border-t border-slate-100 space-y-3">
//                 <label className="block text-xs font-black text-emerald-700 uppercase">Nhập email để gửi thử</label>
//                 <div className="flex gap-2">
//                   <input type="text" placeholder="Gửi thử đến email" className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 text-sm shadow-inner" />
//                   <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-600 shadow-md">Kiểm tra</button>
//                 </div>
//               </div>

//               <div className="pt-10">
//                 <button className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black shadow-[0_15px_30px_-5px_rgba(16,185,129,0.5)] hover:bg-[#059669] hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 border-b-8 border-[#047857]">
//                    <Save size={20} strokeWidth={3}/> Lưu tất cả cấu hình
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ConfigPage;





















// import React, { useState } from 'react';
// import { 
//   Save, Image as ImageIcon, Trash2, Mail, 
//   Globe, Facebook, Phone, MapPin, Monitor, Send,
//   Layout, Type, ShieldCheck, BarChart3, BellRing, Settings2, Network, ChevronRight
// } from 'lucide-react';

// const ConfigPage = () => {
//   const [activeMenu, setActiveMenu] = useState(true);

//   return (
//     <div className="p-6 bg-[#f0f4f0] min-h-screen font-sans text-left">
//       {/* Breadcrumb */}
//       <div className="flex justify-between items-center mb-8">
//         <div className="relative">
//           <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter drop-shadow-sm">
//             Cấu hình Website
//           </h1>
//           <div className="absolute -bottom-2 left-0 w-20 h-1.5 bg-[#10b981] rounded-full"></div>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-slate-400 font-bold bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-50">
//           Trang chủ <ChevronRight size={14} /> <span className="text-[#10b981]">Cấu hình</span>
//         </div>
//       </div>

//       {/* Nút Icon Phả đồ (Đã xóa chữ) */}
//       <div className="mb-10">
//         <button className="relative p-4 bg-white text-[#065f46] rounded-2xl shadow-[0_15px_30px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all border-2 border-white group">
//           <Network size={28} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
//           <span className="absolute -top-2 -right-6 flex h-6 w-12">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-6 w-12 bg-red-500 text-[10px] items-center justify-center font-black text-white shadow-md border border-white">New</span>
//           </span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
//         {/* CỘT 1: HEADER & FOOTER */}
//         <div className="space-y-8">
//           {/* Section Header */}
//           <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white">
//             <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
//               <Layout size={18} /> Header
//             </div>
//             <div className="p-8 space-y-5">
//               <div className="group">
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Tên gia phả *</label>
//                 <input type="text" defaultValue="Họ Nguyễn Việt Nam" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 transition-all shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Slogan dòng họ</label>
//                 <input type="text" placeholder="VD: Uống nước nhớ nguồn..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 transition-all shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Banner *</label>
//                 <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl group h-40 bg-slate-200">
//                   <img src="https://via.placeholder.com/600x300" alt="Banner" className="w-full h-full object-cover" />
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
//                   <div className="absolute top-3 right-3 flex gap-2">
//                     <button className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"><Trash2 size={16}/></button>
//                     <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl shadow-lg font-black text-[10px] uppercase hover:bg-[#059669] transition-colors"><ImageIcon size={16}/> Chọn ảnh</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-black text-emerald-700 uppercase ml-1">Logo *</label>
//                   <div className="w-full h-24 bg-white rounded-2xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-200 font-black text-xs shadow-inner">LOGO</div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-black text-emerald-700 uppercase ml-1">Favicon</label>
//                   <div className="w-full h-24 bg-white rounded-2xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-200 font-black text-xs shadow-inner">FAV</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section Footer */}
//           <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white">
//             <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
//               <Monitor size={18} /> Footer
//             </div>
//             <div className="p-8 space-y-6">
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Thông tin liên hệ *</label>
//                 <textarea rows="4" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] focus:bg-white font-medium text-slate-600 shadow-inner italic resize-none" defaultValue="Đây là website gia phả mẫu của Gia phả Đại Việt Online..."></textarea>
//               </div>
//               <div className="bg-red-50 p-6 rounded-[2rem] border-2 border-red-100 shadow-inner">
//                 <label className="block text-[10px] font-black text-red-600 uppercase mb-3 ml-1 flex items-center gap-2">
//                   <ShieldCheck size={16}/> Mã PIN bảo mật
//                 </label>
//                 <input type="text" defaultValue="1234" className="w-full bg-white border-2 border-red-100 rounded-xl px-5 py-3 outline-none focus:border-red-500 font-black text-red-700 text-center text-lg tracking-[0.5em]" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CỘT 2: BODY CONTENT */}
//         <div className="space-y-8">
//           <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white">
//             <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
//               <Settings2 size={18} /> Nội dung chính
//             </div>
//             <div className="p-8 space-y-6">
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Ảnh lời nói đầu *</label>
//                 <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-2xl group h-52 bg-slate-200">
//                   <img src="https://via.placeholder.com/500x300" alt="House" className="w-full h-full object-cover" />
//                   <div className="absolute top-4 right-4 flex gap-2">
//                     <button className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"><Trash2 size={16}/></button>
//                     <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl shadow-lg font-black text-[10px] uppercase hover:bg-[#059669] transition-colors"><ImageIcon size={16}/> Thay đổi</button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Lời nói đầu *</label>
//                 <textarea rows="6" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] focus:bg-white font-medium text-slate-600 shadow-inner text-sm leading-relaxed"></textarea>
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest flex items-center gap-2">
//                   <BellRing size={14} className="text-amber-500"/> Thông báo chạy chữ
//                 </label>
//                 <input type="text" placeholder="Nhập thông báo khẩn..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div className="bg-emerald-50/30 p-6 rounded-[2rem] border-2 border-emerald-50">
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Google Map Iframe</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-3.5 text-emerald-400" size={18}/>
//                   <input type="text" placeholder="Nhúng mã <iframe>..." className="w-full bg-white border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-700 text-xs shadow-sm" />
//                 </div>
//                 <p className="text-[9px] text-slate-400 mt-3 ml-1 italic leading-relaxed">
//                   * Hướng dẫn: Mở Google Maps {'>'} Chia sẻ {'>'} Nhúng bản đồ {'>'} Sao chép HTML.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CỘT 3: EMAIL & KẾT NỐI */}
//         <div className="space-y-8">
//           <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white">
//             <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
//               <Mail size={18} /> Hệ thống Email
//             </div>
//             <div className="p-8 space-y-5">
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1">Tên hiển thị</label>
//                 <input type="text" defaultValue="Hội đồng Trưởng tộc" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1">Email</label>
//                 <input type="email" placeholder="example@gmail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">SMTP Password</label>
//                 <input type="password" placeholder="••••••••••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
//                 <p className="text-[9px] text-emerald-600 mt-2 font-bold px-2">Sử dụng "Mật khẩu ứng dụng" nếu dùng Gmail.</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <input type="text" defaultValue="smtp.gmail.com" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-500 text-xs shadow-inner" />
//                 <input type="text" defaultValue="587" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-500 text-xs shadow-inner" />
//               </div>
              
//               <div className="pt-6 border-t border-emerald-50">
//                 <label className="block text-[10px] font-black text-emerald-700 uppercase mb-3 ml-1 tracking-widest italic">Email Testing</label>
//                 <div className="flex gap-2">
//                   <input type="text" placeholder="Email nhận thử..." className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 text-xs shadow-inner font-bold" />
//                   <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-red-700 shadow-lg flex items-center gap-2 transition-all active:scale-90">
//                     <Send size={14}/> Test
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-10">
//                 <button className="w-full bg-[#10b981] text-white py-5 rounded-[2rem] font-black shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:bg-[#059669] hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 border-b-8 border-[#047857]">
//                    <Save size={22} strokeWidth={3}/> Lưu cấu hình
//                 </button>
//                 <div className="text-center mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
//                   <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">
//                     Hệ thống Gia phả Đại Việt
//                   </p>
//                   <p className="text-[9px] text-slate-400 mt-1 font-bold italic">Cập nhật: 25/12/2025 - 23:50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ConfigPage;










import React, { useState, useRef } from 'react';
import { 
  Save, Image as ImageIcon, Trash2, Mail, 
  Globe, Facebook, Phone, MapPin, Monitor, Send,
  Layout, Type, ShieldCheck, BarChart3, BellRing, Settings2, Network, ChevronRight
} from 'lucide-react';

const ConfigPage = () => {
  const [activeMenu, setActiveMenu] = useState(true);

  // --- BỔ SUNG REF VÀ LOGIC XỬ LÝ ---
  const fileInputRef = useRef(null);

  const handleSelectImage = () => {
    // Kích hoạt ô chọn file ẩn khi nhấn nút "Chọn ảnh" hoặc "Thay đổi"
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Bạn đã chọn ảnh: ${file.name}`);
    }
  };

  const handleTestEmail = () => {
    alert("🚀 Hệ thống đang gửi Email kiểm tra... Vui lòng đợi trong giây lát!");
  };

  const handleSaveConfig = () => {
    alert("✅ Thành công! Tất cả cấu hình Website đã được lưu trữ vào hệ thống.");
  };

  const handleDeleteImage = () => {
    if(window.confirm("Bạn có chắc chắn muốn xóa hình ảnh này không?")) {
      alert("Đã xóa ảnh thành công.");
    }
  };

  return (
    <div className="p-6 bg-[#f0f4f0] min-h-screen font-sans text-left">
      {/* Input file ẩn dùng chung cho các nút chọn ảnh */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />

      {/* Breadcrumb */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter drop-shadow-sm">
            Cấu hình Website
          </h1>
          <div className="absolute -bottom-2 left-0 w-20 h-1.5 bg-[#10b981] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400 font-bold bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-50">
          Trang chủ <ChevronRight size={14} /> <span className="text-[#10b981]">Cấu hình</span>
        </div>
      </div>

      {/* Nút Icon Phả đồ (Đã xóa chữ) */}
      <div className="mb-10">
        <button className="relative p-4 bg-white text-[#065f46] rounded-2xl shadow-[0_15px_30px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all border-2 border-white group active:scale-95">
          <Network size={28} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-2 -right-6 flex h-6 w-12">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-12 bg-red-500 text-[10px] items-center justify-center font-black text-white shadow-md border border-white">New</span>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* CỘT 1: HEADER & FOOTER */}
        <div className="space-y-8">
          {/* Section Header */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white transition-all hover:shadow-2xl">
            <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
              <Layout size={18} /> Header
            </div>
            <div className="p-8 space-y-5">
              <div className="group">
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Tên gia phả *</label>
                <input type="text" defaultValue="Họ Nguyễn Việt Nam" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 transition-all shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Slogan dòng họ</label>
                <input type="text" placeholder="VD: Uống nước nhớ nguồn..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 transition-all shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Banner *</label>
                <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl group h-40 bg-slate-200">
                  <img src="https://via.placeholder.com/600x300" alt="Banner" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={handleDeleteImage} className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors active:scale-90"><Trash2 size={16}/></button>
                    <button onClick={handleSelectImage} className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl shadow-lg font-black text-[10px] uppercase hover:bg-[#059669] transition-colors active:scale-95"><ImageIcon size={16}/> Chọn ảnh</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div onClick={handleSelectImage} className="cursor-pointer space-y-2 group">
                  <label className="block text-[10px] font-black text-emerald-700 uppercase ml-1 group-hover:text-[#10b981]">Logo *</label>
                  <div className="w-full h-24 bg-white rounded-2xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-200 font-black text-xs shadow-inner group-hover:border-[#10b981] group-hover:text-[#10b981] transition-all">LOGO</div>
                </div>
                <div onClick={handleSelectImage} className="cursor-pointer space-y-2 group">
                  <label className="block text-[10px] font-black text-emerald-700 uppercase ml-1 group-hover:text-[#10b981]">Favicon</label>
                  <div className="w-full h-24 bg-white rounded-2xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-200 font-black text-xs shadow-inner group-hover:border-[#10b981] group-hover:text-[#10b981] transition-all">FAV</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white transition-all hover:shadow-2xl">
            <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
              <Monitor size={18} /> Footer
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Thông tin liên hệ *</label>
                <textarea rows="4" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] focus:bg-white font-medium text-slate-600 shadow-inner italic resize-none transition-all" defaultValue="Đây là website gia phả mẫu của Gia phả Đại Việt Online..."></textarea>
              </div>
              <div className="bg-red-50 p-6 rounded-[2rem] border-2 border-red-100 shadow-inner">
                <label className="block text-[10px] font-black text-red-600 uppercase mb-3 ml-1 flex items-center gap-2">
                  <ShieldCheck size={16}/> Mã PIN bảo mật
                </label>
                <input type="text" defaultValue="1234" className="w-full bg-white border-2 border-red-100 rounded-xl px-5 py-3 outline-none focus:border-red-500 font-black text-red-700 text-center text-lg tracking-[0.5em]" />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT 2: BODY CONTENT */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white transition-all hover:shadow-2xl">
            <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
              <Settings2 size={18} /> Nội dung chính
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Ảnh lời nói đầu *</label>
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-2xl group h-52 bg-slate-200">
                  <img src="https://via.placeholder.com/500x300" alt="House" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={handleDeleteImage} className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors active:scale-90"><Trash2 size={16}/></button>
                    <button onClick={handleSelectImage} className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl shadow-lg font-black text-[10px] uppercase hover:bg-[#059669] transition-colors active:scale-95"><ImageIcon size={16}/> Thay đổi</button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Lời nói đầu *</label>
                <textarea rows="6" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] focus:bg-white font-medium text-slate-600 shadow-inner text-sm leading-relaxed transition-all"></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest flex items-center gap-2">
                  <BellRing size={14} className="text-amber-500"/> Thông báo chạy chữ
                </label>
                <input type="text" placeholder="Nhập thông báo khẩn..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] focus:bg-white font-bold text-slate-700 shadow-inner transition-all" />
              </div>
              <div className="bg-emerald-50/30 p-6 rounded-[2rem] border-2 border-emerald-50">
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Google Map Iframe</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-emerald-400" size={18}/>
                  <input type="text" placeholder="Nhúng mã <iframe>..." className="w-full bg-white border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-700 text-xs shadow-sm transition-all" />
                </div>
                <p className="text-[9px] text-slate-400 mt-3 ml-1 italic leading-relaxed">
                  * Hướng dẫn: Mở Google Maps {'>'} Chia sẻ {'>'} Nhúng bản đồ {'>'} Sao chép HTML.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT 3: EMAIL & KẾT NỐI */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border-2 border-white transition-all hover:shadow-2xl">
            <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
              <Mail size={18} /> Hệ thống Email
            </div>
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1">Tên hiển thị</label>
                <input type="text" defaultValue="Hội đồng Trưởng tộc" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1">Email</label>
                <input type="email" placeholder="example@gmail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">SMTP Password</label>
                <input type="password" placeholder="••••••••••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                <p className="text-[9px] text-emerald-600 mt-2 font-bold px-2 italic">Dùng "Mật khẩu ứng dụng" nếu dùng Gmail.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" defaultValue="smtp.gmail.com" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-500 text-xs shadow-inner" />
                <input type="text" defaultValue="587" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-500 text-xs shadow-inner" />
              </div>
              
              <div className="pt-6 border-t border-emerald-50">
                <label className="block text-[10px] font-black text-emerald-700 uppercase mb-3 ml-1 tracking-widest italic">Email Testing</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Email nhận thử..." className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 text-xs shadow-inner font-bold" />
                  <button onClick={handleTestEmail} className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-red-700 shadow-lg flex items-center gap-2 transition-all active:scale-90 shadow-red-200/50 border-b-4 border-red-800">
                    <Send size={14}/> Test
                  </button>
                </div>
              </div>

              <div className="pt-10">
                <button onClick={handleSaveConfig} className="w-full bg-[#10b981] text-white py-5 rounded-[2rem] font-black shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:bg-[#059669] active:translate-y-1 active:border-b-0 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 border-b-8 border-[#047857]">
                   <Save size={22} strokeWidth={3}/> Lưu cấu hình
                </button>
                <div className="text-center mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-inner transition-all hover:bg-white">
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">
                    Hệ thống Gia phả Đại Việt
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1 font-bold italic uppercase tracking-tighter">Cập nhật: 25/12/2025 - 23:50</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigPage;
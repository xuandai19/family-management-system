



// import React, { useState } from 'react';
// import { 
//   Coins, Plus, Search, Filter, Download, Trash2, Edit, Calendar, 
//   CheckCircle, Paperclip, X, Save, Upload, Eye, ChevronDown
// } from 'lucide-react';

// const ExpenseManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
  
//   // 1. Khai báo các nhóm chi tiêu theo yêu cầu của bạn
//   const expenseCategories = [
//     "Thờ cúng & Tâm linh", 
//     "Hiếu, hỉ & Thăm hỏi", 
//     "Giáo dục & Khuyến học", 
//     "Quản lý & Vận hành", 
//     "Chi phí dự phòng"
//   ];

//   const [expenses, setExpenses] = useState([
//     { id: 1, date: '2025-12-15', title: 'Tu bổ lăng mộ tổ đời thứ 3', amount: '25.000.000', person: 'Nguyễn Văn An', status: 'Đã chi', category: 'Thờ cúng & Tâm linh', note: 'Chi trả tiền nhân công và vật liệu đá.' },
//     { id: 2, date: '2025-12-20', title: 'Phát thưởng khuyến học cuối năm', amount: '10.000.000', person: 'Trần Thị Bình', status: 'Chờ duyệt', category: 'Giáo dục & Khuyến học', note: 'Thưởng cho 15 cháu đỗ đại học.' },
//     { id: 3, date: '2025-12-22', title: 'Duy trì Hosting & Tên miền web', amount: '2.500.000', person: 'Lê Văn Cường', status: 'Đã chi', category: 'Quản lý & Vận hành', note: 'Gia hạn 1 năm dịch vụ số hóa gia phả.' }
//   ]);

//   const handleSave = () => {
//     setShowModal(false);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative">
      
//       {/* THÔNG BÁO TOAST */}
//       {showToast && (
//         <div className="fixed top-10 right-10 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
//           <CheckCircle size={24} />
//           <span className="font-black uppercase text-xs tracking-widest text-left">Cập nhật dữ liệu thành công!</span>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex justify-between items-end mb-10 text-left">
//         <div className="text-left">
//           <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4 uppercase italic text-left">
//              <div className="p-3 bg-[#10b981] rounded-2xl text-white shadow-lg shadow-emerald-200">
//                 <Coins size={32} />
//              </div>
//              Quản Lý Chi Tiêu Dòng Họ
//           </h2>
//           <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] ml-1 text-left italic">Minh bạch tài chính - Vững bền gia tộc</p>
//         </div>
//         <div className="flex gap-3 text-left">
//           <button className="flex items-center gap-2 bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-50 shadow-md">
//             <Download size={18} /> Xuất báo cáo Excel
//           </button>
//           <button 
//             onClick={() => setShowModal(true)} 
//             className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-xl hover:bg-[#10b981] transition-all font-black text-xs uppercase active:scale-95 text-left"
//           >
//             <Plus size={20} strokeWidth={3} /> Lập phiếu chi mới
//           </button>
//         </div>
//       </div>

//       {/* MODAL LẬP PHIẾU CHI - TÍCH HỢP PHÂN LOẠI MỚI */}
//       {showModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
//           <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200 text-left">
//             <div className="bg-[#10b981] p-6 text-white flex justify-between items-center text-left">
//               <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 italic text-left"><Plus size={20}/> Tạo phiếu chi mới</h3>
//               <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-all"><X /></button>
//             </div>
//             <div className="p-8 space-y-5 text-left">
//               {/* Chọn Nhóm Chi Tiêu */}
//               <div className="text-left">
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic text-left tracking-widest">Phân loại chi tiêu</label>
//                 <div className="relative text-left">
//                   <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold appearance-none text-slate-700 text-left">
//                     {expenseCategories.map((cat, index) => (
//                       <option key={index} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
//                 </div>
//               </div>

//               <div className="text-left">
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic text-left tracking-widest">Nội dung chi tiết</label>
//                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-left" placeholder="Ví dụ: Mua sắm đồ lễ ngày Giỗ Tổ..." />
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-left">
//                 <div className="text-left">
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic text-left tracking-widest">Số tiền (VNĐ)</label>
//                   <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-black text-rose-600 text-left" placeholder="0" />
//                 </div>
//                 <div className="text-left">
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic text-left tracking-widest">Ngày thực hiện</label>
//                   <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-left" />
//                 </div>
//               </div>

//               <div className="text-left">
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic text-left tracking-widest">Minh chứng (Ảnh hóa đơn)</label>
//                 <div className="w-full border-2 border-dashed border-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-emerald-50 transition-all text-left">
//                   <Upload className="text-emerald-500" size={24} />
//                   <span className="text-[9px] font-bold text-emerald-700 uppercase italic text-left">Tải lên ảnh chứng từ hoặc hóa đơn liên quan</span>
//                 </div>
//               </div>

//               <button onClick={handleSave} className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 hover:bg-[#065f46] transition-all flex items-center justify-center gap-2 text-left">
//                 <Save size={18}/> Xác nhận lưu phiếu chi
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* THỐNG KÊ TỔNG QUAN */}
//       <div className="bg-[#10b981] border-l-[12px] border-[#065f46] rounded-[2.5rem] p-8 mb-10 shadow-2xl flex items-center justify-between text-white text-left">
//         <div className="space-y-1 text-left">
//           <p className="text-[10px] font-black uppercase tracking-widest opacity-80 italic text-left">Ngân quỹ dòng tộc hiện tại</p>
//           <h3 className="text-4xl font-black italic tracking-tighter text-left">154.250.000 <span className="text-sm font-bold opacity-70 ml-2">VNĐ</span></h3>
//         </div>
//         <div className="flex gap-10 border-l border-white/20 pl-10 text-left">
//            <div className="text-left">
//               <p className="text-[9px] font-black uppercase opacity-70 text-left">Đã chi (Tháng)</p>
//               <p className="text-xl font-black text-emerald-100 text-left">30.000.000</p>
//            </div>
//            <div className="text-left">
//               <p className="text-[9px] font-black uppercase opacity-70 text-left text-left">Chờ phê duyệt</p>
//               <p className="text-xl font-black text-amber-300 text-left text-left">5.000.000</p>
//            </div>
//         </div>
//       </div>

//       {/* BẢNG DANH SÁCH CHI TIẾT THEO PHÂN LOẠI */}
//       <div className="bg-white rounded-[2rem] shadow-xl border border-emerald-100 overflow-hidden text-left">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/50">
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">Nội dung & Nhóm chi tiêu</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left">Số tiền (VNĐ)</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left">Người chi</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left text-left">Trạng thái</th>
//               <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left">Thao tác</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {expenses.map((item) => (
//               <tr key={item.id} className="group hover:bg-emerald-50/30 transition-all duration-300 text-left">
//                 <td className="px-8 py-6 text-left">
//                   <div className="flex flex-col gap-1 text-left">
//                     <span className="font-black text-slate-700 uppercase text-xs tracking-tight text-left">{item.title}</span>
//                     <div className="flex items-center gap-3 text-left">
//                        <span className="text-[10px] text-emerald-600 font-black px-2 py-0.5 bg-emerald-50 rounded-lg uppercase tracking-tighter text-left">{item.category}</span>
//                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 italic text-left"><Calendar size={12}/> {item.date}</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-8 py-6 text-center text-left">
//                    <span className="text-base font-black text-rose-600 italic text-left">-{item.amount}</span>
//                 </td>
//                 <td className="px-8 py-6 text-center text-left text-left text-left">
//                    <div className="flex items-center justify-center gap-2 text-left">
//                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500 uppercase text-left">
//                          {item.person.charAt(0)}
//                       </div>
//                       <span className="text-xs font-bold text-slate-600 text-left">{item.person}</span>
//                    </div>
//                 </td>
//                 <td className="px-8 py-6 text-center text-left text-left text-left">
//                   <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase text-left ${item.status === 'Đã chi' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-8 py-6 text-center text-left">
//                   <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-left">
//                     <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90 text-left"><Edit size={16}/></button>
//                     <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90 text-left"><Trash2 size={16}/></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ExpenseManagement;












// import React, { useState } from 'react';
// import { 
//   Coins, Plus, Search, Filter, Download, Trash2, Edit, Calendar, 
//   CheckCircle, Paperclip, X, Save, Upload, Eye, ChevronDown,
//   TrendingUp, Wallet, Award, Box, ShieldAlert, History, UserCheck
// } from 'lucide-react';

// const ExpenseManagement = () => {
//   const [activeTab, setActiveTab] = useState('expense'); // 'expense', 'income', 'assets', 'reports'
//   const [showModal, setShowModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
  
//   // Danh mục Phân quyền giả lập
//   const userRole = "Thủ quỹ"; // Quản trị viên, Thủ quỹ, Thành viên

//   const expenseCategories = [
//     "Thờ cúng & Tâm linh", "Hiếu, hỉ & Thăm hỏi", 
//     "Giáo dục & Khuyến học", "Quản lý & Vận hành", "Chi phí dự phòng"
//   ];

//   const incomeCategories = [
//     "Đóng góp định kỳ", "Sổ vàng công đức", "Lãi tiết kiệm dòng họ"
//   ];

//   const [expenses, setExpenses] = useState([
//     { id: 1, date: '2025-12-15', title: 'Tu bổ lăng mộ tổ đời thứ 3', amount: '25.000.000', person: 'Nguyễn Văn An', status: 'Đã chi', category: 'Thờ cúng & Tâm linh' },
//     { id: 2, date: '2025-12-20', title: 'Phát thưởng khuyến học cuối năm', amount: '10.000.000', person: 'Trần Thị Bình', status: 'Chờ duyệt', category: 'Giáo dục & Khuyến học' },
//   ]);

//   const [assets, setAssets] = useState([
//     { id: 1, name: 'Bát hương cổ đời Lê', quantity: 3, condition: 'Tốt', location: 'Nhà thờ chính' },
//     { id: 2, name: 'Đỉnh đồng khảm tam khí', quantity: 1, condition: 'Cần đánh bóng', location: 'Điện thờ tổ' }
//   ]);

//   const handleSave = () => {
//     setShowModal(false);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative">
      
//       {/* THÔNG BÁO TOAST */}
//       {showToast && (
//         <div className="fixed top-10 right-10 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
//           <CheckCircle size={24} />
//           <span className="font-black uppercase text-xs tracking-widest text-left">Cập nhật dữ liệu thành công!</span>
//         </div>
//       )}

//       {/* HEADER & PHÂN QUYỀN */}
//       <div className="flex justify-between items-end mb-8">
//         <div className="text-left">
//           <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4 uppercase italic">
//              <div className="p-3 bg-[#10b981] rounded-2xl text-white shadow-lg shadow-emerald-200">
//                 <Wallet size={32} />
//              </div>
//              Quản Lý Tài Chính & Tài Sản Dòng Họ
//           </h2>
//           <div className="flex items-center gap-2 mt-2 ml-1">
//             <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-1 rounded-md uppercase flex items-center gap-1">
//               <ShieldAlert size={10}/> Quyền: {userRole}
//             </span>
//             <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest italic leading-none">Minh bạch tài chính - Vững bền gia tộc</p>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-50 shadow-md transition-all active:scale-95">
//             <TrendingUp size={18} /> Báo cáo năm
//           </button>
//           <button 
//             onClick={() => setShowModal(true)} 
//             className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-xl hover:bg-[#10b981] transition-all font-black text-xs uppercase active:scale-95"
//           >
//             <Plus size={20} strokeWidth={3} /> Lập phiếu mới
//           </button>
//         </div>
//       </div>

//       {/* TABS ĐIỀU HƯỚNG MỚI */}
//       <div className="flex gap-4 mb-8">
//         {[
//           {id: 'expense', label: 'Quản lý Chi', icon: <Coins size={16}/>},
//           {id: 'income', label: 'Quản lý Thu', icon: <Award size={16}/>},
//           {id: 'assets', label: 'Tài sản công', icon: <Box size={16}/>},
//           {id: 'history', label: 'Nhật ký (Audit Log)', icon: <History size={16}/>},
//         ].map(tab => (
//           <button 
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all ${activeTab === tab.id ? 'bg-[#10b981] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* THỐNG KÊ TỔNG QUAN (NỔI KHỐI) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-[#10b981] rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden border-b-8 border-[#065f46]">
//            <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={120}/></div>
//            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Ngân quỹ hiện tại</p>
//            <h3 className="text-3xl font-black italic tracking-tighter">154.250.000 <span className="text-xs opacity-70">VNĐ</span></h3>
//         </div>
//         <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-white flex flex-col justify-center">
//            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">Tổng chi trong năm</p>
//            <h3 className="text-3xl font-black text-rose-600 italic tracking-tighter">30.000.000 <span className="text-xs opacity-70">VNĐ</span></h3>
//         </div>
//         <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-white flex flex-col justify-center">
//            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Đóng góp Sổ vàng</p>
//            <h3 className="text-3xl font-black text-[#10b981] italic tracking-tighter">85.000.000 <span className="text-xs opacity-70">VNĐ</span></h3>
//         </div>
//       </div>

//       {/* HIỂN THỊ NỘI DUNG THEO TAB */}
//       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-50 overflow-hidden">
//         {activeTab === 'expense' && (
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-slate-50/50">
//               <tr>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Nội dung & Nhóm chi tiêu</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Số tiền (VNĐ)</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left">Trạng thái</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 italic">
//               {expenses.map((item) => (
//                 <tr key={item.id} className="group hover:bg-emerald-50/30 transition-all duration-300">
//                   <td className="px-8 py-6">
//                     <div className="flex flex-col gap-1">
//                       <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{item.title}</span>
//                       <div className="flex items-center gap-3">
//                          <span className="text-[10px] text-emerald-600 font-black px-2 py-0.5 bg-emerald-50 rounded-lg uppercase">{item.category}</span>
//                          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 italic"><Calendar size={12}/> {item.date}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6 text-center text-rose-600 font-black">-{item.amount}</td>
//                   <td className="px-8 py-6 text-center">
//                     <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase ${item.status === 'Đã chi' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                       <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90"><Edit size={16}/></button>
//                       <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90"><Trash2 size={16}/></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {activeTab === 'assets' && (
//           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//              {assets.map(asset => (
//                <div key={asset.id} className="p-6 border-2 border-slate-100 rounded-3xl bg-slate-50 flex justify-between items-center group hover:border-[#10b981] transition-all">
//                   <div className="space-y-1">
//                     <p className="text-sm font-black text-slate-700 uppercase tracking-tight">{asset.name}</p>
//                     <p className="text-[10px] text-slate-400 font-bold uppercase italic"><Box size={10} className="inline mr-1"/> Vị trí: {asset.location}</p>
//                     <div className="flex gap-2 pt-2">
//                        <span className="bg-emerald-100 text-emerald-700 text-[9px] px-2 py-0.5 rounded font-black uppercase">SL: {asset.quantity}</span>
//                        <span className="bg-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded font-black uppercase">{asset.condition}</span>
//                     </div>
//                   </div>
//                   <div className="opacity-0 group-hover:opacity-100 transition-all">
//                     <button className="p-2 bg-white text-slate-400 rounded-xl shadow hover:text-[#10b981]"><Edit size={16}/></button>
//                   </div>
//                </div>
//              ))}
//           </div>
//         )}

//         {activeTab === 'history' && (
//           <div className="p-8 space-y-4">
//              {[
//                {time: '14:20 - Hôm nay', action: 'Thêm mới phiếu chi', user: 'Thủ quỹ Nguyễn An', detail: 'Tu bổ lăng mộ - 25.000.000 VNĐ'},
//                {time: '09:00 - Hôm qua', action: 'Cập nhật tài sản', user: 'Tộc trưởng Nguyễn Bình', detail: 'Kiểm kê Bát hương cổ'},
//              ].map((log, idx) => (
//                <div key={idx} className="flex gap-4 p-4 border-l-4 border-emerald-500 bg-slate-50 rounded-r-2xl">
//                   <div className="flex-1">
//                     <p className="text-[10px] font-black text-[#10b981] uppercase">{log.action}</p>
//                     <p className="text-xs font-bold text-slate-700 mt-1">{log.detail}</p>
//                     <p className="text-[9px] text-slate-400 mt-2 italic flex items-center gap-1 font-bold">
//                        <UserCheck size={10}/> {log.user} | <Calendar size={10}/> {log.time}
//                     </p>
//                   </div>
//                </div>
//              ))}
//           </div>
//         )}
//       </div>

//       {/* FOOTER BÁO CÁO NHANH */}
//       <div className="mt-8 flex justify-between items-center bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl text-white border-t-8 border-[#10b981]">
//          <div className="text-left">
//            <h4 className="font-black text-sm uppercase tracking-tighter italic">Cảnh báo nợ quỹ (Tháng 12)</h4>
//            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Hệ thống phát hiện 12 hộ gia đình chưa hoàn thành đóng góp định kỳ</p>
//          </div>
//          <button className="bg-emerald-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-emerald-500 active:scale-95 transition-all">Gửi thông báo nhắc nhở (Email/Push)</button>
//       </div>

//       {/* MODAL LẬP PHIẾU - TÍCH HỢP PHÂN LOẠI MỚI */}
//       {showModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
//           <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="bg-[#10b981] p-6 text-white flex justify-between items-center">
//               <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 italic"><Plus size={20}/> Lập bản ghi mới</h3>
//               <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-all"><X /></button>
//             </div>
//             <div className="p-8 space-y-5 text-left">
//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Loại giao dịch</label>
//                 <div className="flex gap-2">
//                    <button className="flex-1 py-3 bg-emerald-50 border-2 border-emerald-500 rounded-xl font-black text-[10px] uppercase text-emerald-700">Phiếu Chi</button>
//                    <button className="flex-1 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-[10px] uppercase text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all">Phiếu Thu (Đóng góp)</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest italic">Phân loại chi tiết</label>
//                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold appearance-none">
//                    {expenseCategories.map((cat, index) => <option key={index}>{cat}</option>)}
//                 </select>
//               </div>
//               <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" placeholder="Nội dung chi tiết..." />
//               <div className="grid grid-cols-2 gap-4">
//                 <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-black text-rose-600" placeholder="Số tiền (VNĐ)" />
//                 <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
//               </div>
//               <button onClick={handleSave} className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#065f46] transition-all flex items-center justify-center gap-2">
//                 <Save size={18}/> Xác nhận lưu vào hệ thống
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpenseManagement;











// import React, { useState } from 'react';
// import { 
//   Coins, Plus, Search, Filter, Download, Trash2, Edit, Calendar, 
//   CheckCircle, Paperclip, X, Save, Upload, Eye, ChevronDown,
//   TrendingUp, Wallet, Award, Box, ShieldAlert, History, UserCheck,
//   CreditCard, UserPlus, AlertTriangle, Send, Trophy
// } from 'lucide-react';

// const ExpenseManagement = () => {
//   const [activeTab, setActiveTab] = useState('expense'); 
//   const [showModal, setShowModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [transactionType, setTransactionType] = useState('chi'); // 'thu' hoặc 'chi'
  
//   const userRole = "Thủ quỹ"; // Phân quyền: Quản trị viên, Thủ quỹ, Thành viên

//   // 1. Phân loại nguồn thu chi tiết (Bổ sung theo yêu cầu)
//   const incomeCategories = [
//     "Đóng góp niên liễm (định kỳ)", 
//     "Sổ vàng Công đức", 
//     "Thu từ tài sản dòng họ (Đất hương hỏa/Hoa lợi)", 
//     "Lãi suất tiết kiệm dòng họ"
//   ];

//   const expenseCategories = [
//     "Thờ cúng & Tâm linh", "Hiếu, hỉ & Thăm hỏi", 
//     "Giáo dục & Khuyến học", "Quản lý & Vận hành", "Chi phí dự phòng"
//   ];

//   // 2. Sổ theo dõi nợ quỹ (Dữ liệu giả lập hộ chưa đóng)
//   const debtList = [
//     { id: 1, family: 'Hộ cụ Nguyễn Văn Nhất', year: '2025', amount: '500.000', status: 'Chưa đóng' },
//     { id: 2, family: 'Hộ cụ Lê Văn Nhánh', year: '2025', amount: '500.000', status: 'Chưa đóng' },
//   ];

//   const [expenses, setExpenses] = useState([
//     { id: 1, date: '2025-12-15', title: 'Tu bổ lăng mộ tổ đời thứ 3', amount: '25.000.000', person: 'Nguyễn Văn An', status: 'Đã chi', category: 'Thờ cúng & Tâm linh', type: 'chi' },
//     { id: 2, date: '2025-12-20', title: 'Phát thưởng khuyến học cuối năm', amount: '10.000.000', person: 'Trần Thị Bình', status: 'Chờ duyệt', category: 'Giáo dục & Khuyến học', type: 'chi' },
//     // Dữ liệu Thu (Xác nhận 2 bước)
//     { id: 3, date: '2025-12-24', title: 'Công đức đúc chuông nhà thờ', amount: '50.000.000', person: 'Mạnh thường quân A', status: 'Chờ xác nhận', category: 'Sổ vàng Công đức', type: 'thu', method: 'Chuyển khoản' },
//   ]);

//   const handleSave = () => {
//     setShowModal(false);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative">
      
//       {/* THÔNG BÁO TOAST */}
//       {showToast && (
//         <div className="fixed top-10 right-10 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
//           <CheckCircle size={24} />
//           <span className="font-black uppercase text-xs tracking-widest text-left">Cập nhật dữ liệu thành công!</span>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex justify-between items-end mb-8">
//         <div className="text-left">
//           <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4 uppercase italic">
//              <div className="p-3 bg-[#10b981] rounded-2xl text-white shadow-lg shadow-emerald-200">
//                 <Wallet size={32} />
//              </div>
//              Hệ Thống Quản Trị Tài Chính Dòng Họ
//           </h2>
//           <div className="flex items-center gap-2 mt-2 ml-1">
//             <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-1 rounded-md uppercase flex items-center gap-1">
//               <ShieldAlert size={10}/> Quyền: {userRole}
//             </span>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-50 shadow-md transition-all active:scale-95">
//             <TrendingUp size={18} /> Báo cáo tài chính năm
//           </button>
//           <button 
//             onClick={() => {setTransactionType('chi'); setShowModal(true)}} 
//             className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-xl hover:bg-[#10b981] transition-all font-black text-xs uppercase active:scale-95"
//           >
//             <Plus size={20} strokeWidth={3} /> Lập phiếu giao dịch
//           </button>
//         </div>
//       </div>

//       {/* TABS ĐIỀU HƯỚNG */}
//       <div className="flex gap-4 mb-8">
//         {[
//           {id: 'expense', label: 'Quản lý Chi', icon: <Coins size={16}/>},
//           {id: 'income', label: 'Quản lý Thu & Công Đức', icon: <Award size={16}/>},
//           {id: 'debts', label: 'Sổ nợ quỹ', icon: <AlertTriangle size={16}/>},
//           {id: 'assets', label: 'Tài sản công', icon: <Box size={16}/>},
//         ].map(tab => (
//           <button 
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all ${activeTab === tab.id ? 'bg-[#10b981] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* THỐNG KÊ TỔNG QUAN */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-[#10b981] rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden border-b-8 border-[#065f46]">
//            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 italic">Ngân quỹ dòng tộc thực tế</p>
//            <h3 className="text-3xl font-black italic tracking-tighter">154.250.000 <span className="text-xs opacity-70">VNĐ</span></h3>
//         </div>
//         {/* 4. Vinh danh mạnh thường quân (Sổ vàng điện tử) */}
//         <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl text-white flex items-center justify-between group">
//            <div>
//              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Bảng vàng Công đức</p>
//              <h4 className="text-sm font-bold italic">Cụ Nguyễn Văn X đóng góp 100tr...</h4>
//            </div>
//            <Trophy className="text-amber-400 animate-bounce" size={32} />
//         </div>
//         <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-white flex flex-col justify-center">
//            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1 italic">Nợ quỹ tồn đọng</p>
//            <h3 className="text-3xl font-black text-rose-600 tracking-tighter">6.500.000 <span className="text-xs opacity-70">VNĐ</span></h3>
//         </div>
//       </div>

//       {/* HIỂN THỊ NỘI DUNG THEO TAB */}
//       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-50 overflow-hidden">
//         {/* TAB CHI TIÊU HOẶC THU NHẬP */}
//         {(activeTab === 'expense' || activeTab === 'income') && (
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-slate-50/50">
//               <tr>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Nội dung & Phân loại chi tiết</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Số tiền (VNĐ)</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Chứng từ</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Xác nhận 2 bước</th>
//                 <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {expenses.filter(item => item.type === (activeTab === 'expense' ? 'chi' : 'thu')).map((item) => (
//                 <tr key={item.id} className="group hover:bg-emerald-50/30 transition-all duration-300 italic font-medium">
//                   <td className="px-8 py-6">
//                     <div className="flex flex-col gap-1 text-left">
//                       <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{item.title}</span>
//                       <div className="flex items-center gap-3">
//                          <span className="text-[9px] text-emerald-600 font-black px-2 py-0.5 bg-emerald-50 rounded-lg uppercase">{item.category}</span>
//                          <span className="text-[9px] text-slate-400 flex items-center gap-1 font-bold uppercase"><Calendar size={12}/> {item.date}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className={`px-8 py-6 text-center font-black ${item.type === 'chi' ? 'text-rose-600' : 'text-emerald-600'}`}>
//                     {item.type === 'chi' ? '-' : '+'}{item.amount}
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <button className="p-2 bg-slate-50 rounded-xl hover:bg-emerald-100 text-slate-400 hover:text-emerald-600 transition-all shadow-sm border border-slate-100">
//                       <Eye size={16} />
//                     </button>
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase ${item.status.includes('Đã') ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                       <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90"><Edit size={16}/></button>
//                       <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90"><Trash2 size={16}/></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* 2. Sổ theo dõi nợ quỹ */}
//         {activeTab === 'debts' && (
//           <div className="p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h4 className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">Danh sách hộ chưa đóng quỹ định kỳ</h4>
//               <button className="bg-rose-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-lg hover:bg-rose-700">
//                 <Send size={14}/> Nhắc nhở tất cả (Email/Push)
//               </button>
//             </div>
//             <div className="space-y-3">
//               {debtList.map(debt => (
//                 <div key={debt.id} className="p-5 border-2 border-slate-50 rounded-[1.5rem] bg-slate-50/50 flex justify-between items-center">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-400 shadow-sm"><AlertTriangle size={20}/></div>
//                     <div>
//                       <p className="font-black text-slate-700 text-xs uppercase">{debt.family}</p>
//                       <p className="text-[10px] text-slate-400 font-bold uppercase italic mt-0.5">Niên khóa: {debt.year} | Nợ: {debt.amount} VNĐ</p>
//                     </div>
//                   </div>
//                   <button className="px-4 py-2 bg-white text-emerald-600 border border-emerald-100 rounded-xl font-black text-[9px] uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-sm">Gửi tin nhắn riêng</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* FOOTER CẢNH BÁO */}
//       <div className="mt-8 flex justify-between items-center bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl text-white border-t-8 border-[#10b981]">
//          <div className="text-left">
//            <h4 className="font-black text-sm uppercase tracking-tighter italic">Quy trình xác nhận 2 bước đang kích hoạt</h4>
//            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Mọi khoản thu - chi đều yêu cầu Thủ quỹ hoặc Tộc trưởng phê duyệt trước khi cộng dồn vào ngân quỹ</p>
//          </div>
//          <button className="bg-emerald-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-emerald-500 active:scale-95 transition-all flex items-center gap-2">
//            <UserCheck size={16}/> Xem danh sách chờ duyệt
//          </button>
//       </div>

//       {/* MODAL LẬP PHIẾU (TÍCH HỢP PHÂN LOẠI CHI TIẾT & CHỨNG TỪ) */}
//       {showModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
//           <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="bg-[#10b981] p-6 text-white flex justify-between items-center">
//               <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 italic"><Plus size={20}/> Khai báo giao dịch tài chính</h3>
//               <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-all"><X /></button>
//             </div>
//             <div className="p-8 space-y-5 text-left">
//               <div className="grid grid-cols-2 gap-2">
//                  <button onClick={() => setTransactionType('chi')} className={`py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${transactionType === 'chi' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>Hạch toán Chi</button>
//                  <button onClick={() => setTransactionType('thu')} className={`py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${transactionType === 'thu' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>Hạch toán Thu</button>
//               </div>

//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest italic">Phân loại cụ thể</label>
//                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold appearance-none italic">
//                    {(transactionType === 'chi' ? expenseCategories : incomeCategories).map((cat, index) => <option key={index}>{cat}</option>)}
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Số tiền (VNĐ)</label>
//                   <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-black text-rose-600" placeholder="0" />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Hình thức</label>
//                   <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold">
//                     <option>Chuyển khoản</option>
//                     <option>Tiền mặt</option>
//                   </select>
//                 </div>
//               </div>

//               {/* 5. Gợi ý bổ sung Chứng từ */}
//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic tracking-widest">Chứng từ (Biên lai/Màn hình CK)</label>
//                 <div className="w-full border-2 border-dashed border-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-emerald-50 transition-all group">
//                   <Upload className="text-emerald-500 group-hover:animate-bounce" size={24} />
//                   <span className="text-[9px] font-black text-emerald-700 uppercase">Tải lên tệp minh chứng</span>
//                 </div>
//               </div>

//               <button onClick={handleSave} className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#065f46] transition-all flex items-center justify-center gap-2">
//                 <Save size={18}/> {transactionType === 'chi' ? 'Lập phiếu chi' : 'Gửi yêu cầu xác nhận thu'}
//               </button>
//               <p className="text-[9px] text-center text-slate-400 font-bold uppercase italic leading-tight">Mọi thông tin sẽ được lưu vào Nhật ký Audit Log của hệ thống</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default ExpenseManagement;











import React, { useState } from 'react';
import { 
  Coins, Plus, Search, Filter, Download, Trash2, Edit, Calendar, 
  CheckCircle, Paperclip, X, Save, Upload, Eye, ChevronDown,
  TrendingUp, Wallet, Award, Box, ShieldAlert, History, UserCheck,
  CreditCard, UserPlus, AlertTriangle, Send, Trophy, LayoutDashboard
} from 'lucide-react';

const ExpenseManagement = () => {
  const [activeTab, setActiveTab] = useState('expense'); 
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [transactionType, setTransactionType] = useState('chi');
  
  const userRole = "Thủ quỹ";

  // --- DỮ LIỆU STATE ---

  // Bổ sung State Quản lý tài sản công (Từ Code 2)
  const [publicAssets, setPublicAssets] = useState([
    { id: 1, name: 'Bộ đỉnh đồng thờ tự', category: 'Đồ thờ tự', value: '45.000.000', status: 'Tốt', location: 'Chính điện nhà thờ' },
    { id: 2, name: 'Máy cắt cỏ cầm tay', category: 'Công cụ', value: '3.500.000', status: 'Đang sửa chữa', location: 'Kho nhà thờ' },
    { id: 3, name: 'Bàn ghế gỗ (20 bộ)', category: 'Nội thất', value: '60.000.000', status: 'Tốt', location: 'Sân nhà thờ' }
  ]);

  const incomeCategories = [
    "Đóng góp niên liễm (định kỳ)", 
    "Sổ vàng Công đức", 
    "Thu từ tài sản dòng họ (Đất hương hỏa/Hoa lợi)", 
    "Lãi suất tiết kiệm dòng họ"
  ];

  const expenseCategories = [
    "Thờ cúng & Tâm linh", "Hiếu, hỉ & Thăm hỏi", 
    "Giáo dục & Khuyến học", "Quản lý & Vận hành", "Chi phí dự phòng"
  ];

  const debtList = [
    { id: 1, family: 'Hộ cụ Nguyễn Văn Nhất', year: '2025', amount: '500.000', status: 'Chưa đóng' },
    { id: 2, family: 'Hộ cụ Lê Văn Nhánh', year: '2025', amount: '500.000', status: 'Chưa đóng' },
  ];

  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-12-15', title: 'Tu bổ lăng mộ tổ đời thứ 3', amount: '25.000.000', person: 'Nguyễn Văn An', status: 'Đã chi', category: 'Thờ cúng & Tâm linh', type: 'chi' },
    { id: 2, date: '2025-12-20', title: 'Phát thưởng khuyến học cuối năm', amount: '10.000.000', person: 'Trần Thị Bình', status: 'Chờ duyệt', category: 'Giáo dục & Khuyến học', type: 'chi' },
    { id: 3, date: '2025-12-24', title: 'Công đức đúc chuông nhà thờ', amount: '50.000.000', person: 'Mạnh thường quân A', status: 'Chờ xác nhận', category: 'Sổ vàng Công đức', type: 'thu', method: 'Chuyển khoản' },
  ]);

  // --- HÀM XỬ LÝ ---

  const handleSave = () => {
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Giao diện hiển thị phần Tài sản công (Từ Code 2)
  const renderPublicAssets = () => (
    <div className="bg-white rounded-[2rem] shadow-xl border border-emerald-100 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-[#009a66] p-6 flex justify-between items-center text-white">
        <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 italic">
          <div className="bg-white/20 p-2 rounded-lg"><LayoutDashboard size={20}/></div>
          Danh mục Tài sản công Dòng họ
        </h3>
        <button className="bg-white text-[#009a66] px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-emerald-50 transition-all">
          + Thêm tài sản mới
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Tên tài sản & Vị trí</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Phân loại</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Giá trị ước tính</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Tình trạng</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {publicAssets.map((asset) => (
              <tr key={asset.id} className="group hover:bg-emerald-50/30 transition-all duration-300">
                <td className="px-8 py-6 text-left">
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{asset.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold italic">Vị trí: {asset.location}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded-lg uppercase italic">{asset.category}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-black text-emerald-600 italic">{asset.value} VNĐ</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase ${
                    asset.status === 'Tốt' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'
                  }`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-left">
                    <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90"><Edit size={16}/></button>
                    <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative">
      
      {/* THÔNG BÁO TOAST */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
          <CheckCircle size={24} />
          <span className="font-black uppercase text-xs tracking-widest text-left">Cập nhật dữ liệu thành công!</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div className="text-left">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4 uppercase italic">
             <div className="p-3 bg-[#10b981] rounded-2xl text-white shadow-lg shadow-emerald-200">
                <Wallet size={32} />
             </div>
             Hệ Thống Quản Trị Tài Chính Dòng Họ
          </h2>
          <div className="flex items-center gap-2 mt-2 ml-1 text-left">
            <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-1 rounded-md uppercase flex items-center gap-1">
              <ShieldAlert size={10}/> Quyền: {userRole}
            </span>
          </div>
        </div>

        <div className="flex gap-3 text-left">
          <button className="flex items-center gap-2 bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-50 shadow-md transition-all active:scale-95">
            <TrendingUp size={18} /> Báo cáo tài chính năm
          </button>
          <button 
            onClick={() => {setTransactionType('chi'); setShowModal(true)}} 
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-xl hover:bg-[#10b981] transition-all font-black text-xs uppercase active:scale-95 text-left"
          >
            <Plus size={20} strokeWidth={3} /> Lập phiếu giao dịch
          </button>
        </div>
      </div>

      {/* TABS ĐIỀU HƯỚNG */}
      <div className="flex gap-4 mb-8 text-left">
        {[
          {id: 'expense', label: 'Quản lý Chi', icon: <Coins size={16}/>},
          {id: 'income', label: 'Quản lý Thu & Công Đức', icon: <Award size={16}/>},
          {id: 'debts', label: 'Sổ nợ quỹ', icon: <AlertTriangle size={16}/>},
          {id: 'assets', label: 'Tài sản công', icon: <Box size={16}/>},
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all ${activeTab === tab.id ? 'bg-[#10b981] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* THỐNG KÊ TỔNG QUAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
        <div className="bg-[#10b981] rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden border-b-8 border-[#065f46]">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 italic text-left">Ngân quỹ dòng tộc thực tế</p>
           <h3 className="text-3xl font-black italic tracking-tighter text-left">154.250.000 <span className="text-xs opacity-70">VNĐ</span></h3>
        </div>
        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl text-white flex items-center justify-between group text-left">
           <div className="text-left">
             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 text-left">Bảng vàng Công đức</p>
             <h4 className="text-sm font-bold italic text-left">Cụ Nguyễn Văn X đóng góp 100tr...</h4>
           </div>
           <Trophy className="text-amber-400 animate-bounce" size={32} />
        </div>
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-white flex flex-col justify-center text-left">
           <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1 italic text-left">Nợ quỹ tồn đọng</p>
           <h3 className="text-3xl font-black text-rose-600 tracking-tighter text-left">6.500.000 <span className="text-xs opacity-70">VNĐ</span></h3>
        </div>
      </div>

      {/* HIỂN THỊ NỘI DUNG THEO TAB */}
      <div className="text-left">
        {/* Tab Thu/Chi */}
        {(activeTab === 'expense' || activeTab === 'income') && (
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-50 overflow-hidden animate-in fade-in duration-500">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">Nội dung & Phân loại chi tiết</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Số tiền (VNĐ)</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Chứng từ</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Xác nhận 2 bước</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {expenses.filter(item => item.type === (activeTab === 'expense' ? 'chi' : 'thu')).map((item) => (
                  <tr key={item.id} className="group hover:bg-emerald-50/30 transition-all duration-300 italic font-medium">
                    <td className="px-8 py-6 text-left">
                      <div className="flex flex-col gap-1 text-left text-left">
                        <span className="font-black text-slate-700 uppercase text-xs tracking-tight text-left">{item.title}</span>
                        <div className="flex items-center gap-3 text-left">
                           <span className="text-[9px] text-emerald-600 font-black px-2 py-0.5 bg-emerald-50 rounded-lg uppercase text-left">{item.category}</span>
                           <span className="text-[9px] text-slate-400 flex items-center gap-1 font-bold uppercase text-left"><Calendar size={12}/> {item.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-8 py-6 text-center font-black ${item.type === 'chi' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {item.type === 'chi' ? '-' : '+'}{item.amount}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button className="p-2 bg-slate-50 rounded-xl hover:bg-emerald-100 text-slate-400 hover:text-emerald-600 transition-all shadow-sm border border-slate-100">
                        <Eye size={16} />
                      </button>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase ${item.status.includes('Đã') ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-left">
                        <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-md active:scale-90 text-left text-left"><Edit size={16}/></button>
                        <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white shadow-md active:scale-90 text-left text-left"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Nợ quỹ */}
        {activeTab === 'debts' && (
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-50 p-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6 text-left">
              <h4 className="font-black text-xs uppercase text-slate-400 tracking-[0.2em] text-left">Danh sách hộ chưa đóng quỹ định kỳ</h4>
              <button className="bg-rose-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-lg hover:bg-rose-700">
                <Send size={14}/> Nhắc nhở tất cả (Email/Push)
              </button>
            </div>
            <div className="space-y-3 text-left">
              {debtList.map(debt => (
                <div key={debt.id} className="p-5 border-2 border-slate-50 rounded-[1.5rem] bg-slate-50/50 flex justify-between items-center text-left">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-400 shadow-sm"><AlertTriangle size={20}/></div>
                    <div className="text-left">
                      <p className="font-black text-slate-700 text-xs uppercase text-left">{debt.family}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase italic mt-0.5 text-left">Niên khóa: {debt.year} | Nợ: {debt.amount} VNĐ</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-emerald-600 border border-emerald-100 rounded-xl font-black text-[9px] uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-sm">Gửi tin nhắn riêng</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Tài sản công (Được chèn từ Code 2) */}
        {activeTab === 'assets' && renderPublicAssets()}
      </div>

      {/* FOOTER CẢNH BÁO */}
      <div className="mt-8 flex justify-between items-center bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl text-white border-t-8 border-[#10b981] text-left">
         <div className="text-left">
           <h4 className="font-black text-sm uppercase tracking-tighter italic text-left">Quy trình xác nhận 2 bước đang kích hoạt</h4>
           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 text-left">Mọi khoản thu - chi đều yêu cầu Thủ quỹ hoặc Tộc trưởng phê duyệt trước khi cộng dồn vào ngân quỹ</p>
         </div>
         <button className="bg-emerald-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-emerald-500 active:scale-95 transition-all flex items-center gap-2">
           <UserCheck size={16}/> Xem danh sách chờ duyệt
         </button>
      </div>

      {/* MODAL LẬP PHIẾU */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#10b981] p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 italic"><Plus size={20}/> Khai báo giao dịch tài chính</h3>
              <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-all"><X /></button>
            </div>
            <div className="p-8 space-y-5 text-left">
              <div className="grid grid-cols-2 gap-2 text-left">
                  <button onClick={() => setTransactionType('chi')} className={`py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${transactionType === 'chi' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>Hạch toán Chi</button>
                  <button onClick={() => setTransactionType('thu')} className={`py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${transactionType === 'thu' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>Hạch toán Thu</button>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest italic text-left">Phân loại cụ thể</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold appearance-none italic">
                    {(transactionType === 'chi' ? expenseCategories : incomeCategories).map((cat, index) => <option key={index}>{cat}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest text-left">Số tiền (VNĐ)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-black text-rose-600" placeholder="0" />
                </div>
                <div className="text-left text-left">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest text-left">Hình thức</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-left">
                    <option>Chuyển khoản</option>
                    <option>Tiền mặt</option>
                  </select>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 italic tracking-widest text-left">Chứng từ (Biên lai/Màn hình CK)</label>
                <div className="w-full border-2 border-dashed border-emerald-100 rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-emerald-50 transition-all group">
                  <Upload className="text-emerald-500 group-hover:animate-bounce" size={24} />
                  <span className="text-[9px] font-black text-emerald-700 uppercase text-left text-left">Tải lên tệp minh chứng</span>
                </div>
              </div>

              <button onClick={handleSave} className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#065f46] transition-all flex items-center justify-center gap-2 text-left text-left">
                <Save size={18}/> {transactionType === 'chi' ? 'Lập phiếu chi' : 'Gửi yêu cầu xác nhận thu'}
              </button>
              <p className="text-[9px] text-center text-slate-400 font-bold uppercase italic leading-tight text-left">Mọi thông tin sẽ được lưu vào Nhật ký Audit Log của hệ thống</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagement;





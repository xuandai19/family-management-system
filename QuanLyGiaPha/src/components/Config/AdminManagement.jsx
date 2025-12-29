// import React, { useState, useEffect } from 'react';
// import { 
//   UserPlus, Search, Trash2, Mail, Lock, User, 
//   X, Save, ShieldCheck, RefreshCcw, Download, 
//   History, FileJson, CheckCircle, AlertCircle
// } from 'lucide-react';



// const AdminManagement = () => {
//   // --- STATES QUẢN LÝ ---
//   const [showModal, setShowModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMsg, setToastMsg] = useState("");
//   const [showLogs, setShowLogs] = useState(false); //

//   const [admins, setAdmins] = useState([
//     { id: 1, name: 'Thanh Thủy', email: 'thuy@giapha.vn', role: 'QTV', date: '05/09/2024 14:32:21' },
//     { id: 2, name: 'Văn Kiểm', email: 'kiem@giapha.vn', role: 'BTV', date: '24/10/2024 11:08:11' },
//     { id: 3, name: 'Nguyễn Thu Hà', email: 'ha@giapha.vn', role: 'BTV', date: '24/10/2024 11:08:08' },
//   ]);

//   // Dữ liệu giả lập Nhật ký hệ thống
//   const auditLogs = [
//     { id: 1, user: 'Thanh Thủy', action: 'Cập nhật cây gia phả Họ Nguyễn', time: '10:15 - 26/12/2025' },
//     { id: 2, user: 'Văn Kiểm', action: 'Lập phiếu chi: Tu bổ lăng mộ', time: '09:30 - 26/12/2025' },
//   ];

//   // --- FUNCTIONS ---
//   const triggerToast = (msg) => {
//     setToastMsg(msg);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleSave = () => {
//     triggerToast("Lưu dữ liệu quản trị viên thành công!");
//     setShowModal(false);
//   };

//   const handleExport = () => {
//     triggerToast("Đang xuất dữ liệu sao lưu (JSON/Excel)...");
//   };

//   return (
//     <div className="p-4 lg:p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative overflow-x-hidden">
      
//       {/* 1. TOAST NOTIFICATION */}
//       {showToast && (
//         <div className="fixed top-5 right-5 z-[110] bg-[#009a66] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
//           <CheckCircle size={20} />
//           <span className="font-bold text-sm uppercase italic tracking-wider">{toastMsg}</span>
//         </div>
//       )}

//       {/* Header Area */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//         <div>
//           <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase italic">
//             <div className="p-3 bg-[#009a66] rounded-2xl text-white shadow-lg">
//               <ShieldCheck size={28} />
//             </div>
//             Hệ thống Quản trị
//           </h2>
//           <p className="text-[10px] text-slate-400 font-bold mt-2 ml-1 uppercase tracking-widest italic">An toàn dữ liệu & Minh bạch dòng tộc</p>
//         </div>
        
//         <div className="flex flex-wrap gap-2 w-full lg:w-auto">
//           <button 
//             onClick={() => setShowLogs(!showLogs)}
//             className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border-2 border-emerald-100 text-slate-600 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-50 transition-all"
//           >
//             <History size={16} /> {showLogs ? "Đóng nhật ký" : "Lịch sử thay đổi"}
//           </button>
//           <button 
//             onClick={handleExport}
//             className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-100 transition-all"
//           >
//             <FileJson size={16} /> Sao lưu (Backup)
//           </button>
//           <button 
//             onClick={() => setShowModal(true)}
//             className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#009a66] text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-emerald-200 active:scale-95 transition-all"
//           >
//             <UserPlus size={18} /> Thêm QTV mới
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* 2. BẢNG DANH SÁCH - TỐI ƯU MOBILE */}
//         <div className={`lg:col-span-${showLogs ? '2' : '3'} bg-white rounded-[2rem] shadow-xl border border-emerald-50 overflow-hidden transition-all duration-500`}>
//           <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
//              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Danh sách quản trị viên hiện tại</span>
//              <div className="relative">
//                 <input type="text" placeholder="Tìm kiếm..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 w-48 shadow-sm" />
//                 <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
//              </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse min-w-[600px]">
//               <thead>
//                 <tr className="bg-[#009a66] text-white">
//                   <th className="px-6 py-4 text-[10px] font-black uppercase">Họ và tên</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase text-center">Chức vụ</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase text-center">Ngày tạo</th>
//                   <th className="px-6 py-4 text-[10px] font-black uppercase text-center text-left">Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {admins.map((admin) => (
//                   <tr key={admin.id} className="group hover:bg-emerald-50/30 transition-all duration-300">
//                     <td className="px-6 py-5 text-left">
//                       <div className="flex flex-col">
//                         <span className="font-black text-slate-700 text-sm uppercase">{admin.name}</span>
//                         <span className="text-[10px] text-slate-400 font-bold italic">{admin.email}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-5 text-center text-left">
//                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${admin.role === 'QTV' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
//                         {admin.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-5 text-center text-slate-500 font-bold text-xs text-left">{admin.date}</td>
//                     <td className="px-6 py-5 text-center text-left">
//                       <div className="flex justify-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
//                         <button className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><RefreshCcw size={14}/></button>
//                         <button onClick={() => triggerToast("Đã xóa quản trị viên!")} className="p-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={14}/></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="p-4 lg:hidden text-center text-[10px] text-slate-400 italic">Vuốt ngang để xem thêm thông tin bảng</div>
//         </div>

//         {/* 3. NHẬT KÝ HỆ THỐNG (AUDIT LOG) */}
//         {showLogs && (
//           <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl text-white animate-in slide-in-from-right duration-500 border-t-8 border-[#009a66]">
//             <div className="flex items-center gap-2 mb-6">
//                <History className="text-emerald-400" size={20} />
//                <h3 className="font-black uppercase italic tracking-widest text-xs">Nhật ký hoạt động</h3>
//             </div>
//             <div className="space-y-4">
//               {auditLogs.map(log => (
//                 <div key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default">
//                   <p className="text-[11px] font-black text-emerald-400 uppercase tracking-tighter mb-1">{log.user}</p>
//                   <p className="text-xs font-medium text-slate-300 mb-2 leading-relaxed">{log.action}</p>
//                   <p className="text-[9px] text-slate-500 font-bold italic text-right">{log.time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* MODAL & ADD LOGIC (GIỮ NGUYÊN CSS NHƯNG THÊM HANDLE SAVE) */}
//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
//           <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-emerald-100 animate-in zoom-in-95 duration-200">
//             <div className="bg-[#009a66] p-6 flex justify-between items-center">
//               <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Thêm quản trị viên mới</h3>
//               <button onClick={() => setShowModal(false)}><X size={24} className="text-white"/></button>
//             </div>
//             <div className="p-8 space-y-6 text-left text-left">
//               {/* Form inputs giữ nguyên... */}
//               <div className="flex justify-end gap-3 pt-4">
//                 <button onClick={() => setShowModal(false)} className="px-6 py-2.5 border-2 border-emerald-100 text-emerald-600 rounded-xl font-black text-[10px] uppercase">Hủy bỏ</button>
//                 <button onClick={handleSave} className="px-8 py-2.5 bg-[#009a66] text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2">
//                   <Save size={14} /> Lưu lại & Cấp quyền
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminManagement;
















import React, { useState } from 'react';
import { 
  UserPlus, Search, Trash2, Mail, Lock, User, 
  X, Save, ShieldCheck, RefreshCcw, Download, 
  History, FileJson, CheckCircle, AlertCircle
} from 'lucide-react';

// --- COMPONENT MODAL (CODE 2 ĐÃ TÍCH HỢP) ---
const AddAdminModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Lớp nền mờ */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      
      {/* Nội dung Modal */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl border-2 border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#009a66] p-6 text-white flex justify-between items-center">
          <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-3 italic">
            <UserPlus size={20}/> Thêm biên tập viên mới
          </h3>
          <button onClick={onClose} className="hover:rotate-90 transition-all p-1 bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-5 text-left">
          {/* Họ và tên */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Họ và tên người quản lý</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
              <input type="text" placeholder="Ví dụ: Nguyễn Văn A..." 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] font-bold text-slate-700 shadow-inner transition-all" />
            </div>
          </div>

          {/* Email đăng nhập */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Email đăng nhập</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
              <input type="email" placeholder="email@giapha.vn" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] font-bold text-slate-700 shadow-inner transition-all" />
            </div>
          </div>

          {/* Vai trò / Chức vụ */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest italic">Phân quyền vai trò</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
              <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] font-bold text-slate-700 appearance-none cursor-pointer shadow-inner">
                <option value="BTV">Biên tập viên (Chỉ sửa gia phả)</option>
                <option value="TQ">Thủ quỹ (Quản lý thu chi)</option>
                <option value="QTV">Quản trị viên (Toàn quyền)</option>
              </select>
            </div>
          </div>

          {/* Mật khẩu tạm thời */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest italic">Mật khẩu tạm thời</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
              <input type="password" placeholder="••••••••" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] font-bold text-slate-700 shadow-inner transition-all" />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button onClick={onSave} className="w-full bg-[#009a66] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:bg-emerald-700 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 border-b-8 border-emerald-900">
              <Save size={20} strokeWidth={3}/> Cấp quyền truy cập
            </button>
            <p className="text-[9px] text-center text-slate-400 font-bold uppercase italic leading-tight">
              Lưu ý: Hệ thống sẽ gửi một email thông báo tài khoản cho thành viên mới này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH (CODE 1) ---
const AdminManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showLogs, setShowLogs] = useState(false);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Thanh Thủy', email: 'thuy@giapha.vn', role: 'QTV', date: '05/09/2024 14:32:21' },
    { id: 2, name: 'Văn Kiểm', email: 'kiem@giapha.vn', role: 'BTV', date: '24/10/2024 11:08:11' },
    { id: 3, name: 'Nguyễn Thu Hà', email: 'ha@giapha.vn', role: 'BTV', date: '24/10/2024 11:08:08' },
  ]);

  const auditLogs = [
    { id: 1, user: 'Thanh Thủy', action: 'Cập nhật cây gia phả Họ Nguyễn', time: '10:15 - 26/12/2025' },
    { id: 2, user: 'Văn Kiểm', action: 'Lập phiếu chi: Tu bổ lăng mộ', time: '09:30 - 26/12/2025' },
  ];

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    triggerToast("Cấp quyền truy cập thành công!");
    setShowModal(false);
  };

  const handleExport = () => {
    triggerToast("Đang xuất dữ liệu sao lưu (JSON/Excel)...");
  };

  return (
    <div className="p-4 lg:p-8 bg-[#f8fafc] min-h-screen font-sans text-left relative overflow-x-hidden">
      
      {showToast && (
        <div className="fixed top-5 right-5 z-[110] bg-[#009a66] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
          <CheckCircle size={20} />
          <span className="font-bold text-sm uppercase italic tracking-wider">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase italic">
            <div className="p-3 bg-[#009a66] rounded-2xl text-white shadow-lg">
              <ShieldCheck size={28} />
            </div>
             Quản trị viên 
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-2 ml-1 uppercase tracking-widest italic">An toàn dữ liệu & Minh bạch dòng tộc</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button 
            onClick={() => setShowLogs(!showLogs)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border-2 border-emerald-100 text-slate-600 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-50 transition-all"
          >
            <History size={16} /> {showLogs ? "Đóng nhật ký" : "Lịch sử thay đổi"}
          </button>
          <button 
            onClick={handleExport}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-100 transition-all"
          >
            <FileJson size={16} /> Sao lưu (Backup)
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#009a66] text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-emerald-200 active:scale-95 transition-all"
          >
            <UserPlus size={18} /> Thêm QTV mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${showLogs ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-[2rem] shadow-xl border border-emerald-50 overflow-hidden transition-all duration-500`}>
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Danh sách quản trị viên hiện tại</span>
             <div className="relative">
                <input type="text" placeholder="Tìm kiếm..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 w-48 shadow-sm" />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
             </div>
          </div>
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#009a66] text-white">
                  <th className="px-6 py-4 text-[10px] font-black uppercase">Họ và tên</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-center">Chức vụ</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-center">Ngày tạo</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {admins.map((admin) => (
                  <tr key={admin.id} className="group hover:bg-emerald-50/30 transition-all duration-300">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-700 text-sm uppercase">{admin.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold italic">{admin.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${admin.role === 'QTV' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center text-slate-500 font-bold text-xs">{admin.date}</td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                        <button className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><RefreshCcw size={14}/></button>
                        <button onClick={() => triggerToast("Đã xóa quản trị viên!")} className="p-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showLogs && (
          <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl text-white animate-in slide-in-from-right duration-500 border-t-8 border-[#009a66]">
            <div className="flex items-center gap-2 mb-6">
               <History className="text-emerald-400" size={20} />
               <h3 className="font-black uppercase italic tracking-widest text-xs">Nhật ký hoạt động</h3>
            </div>
            <div className="space-y-4">
              {auditLogs.map(log => (
                <div key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default text-left">
                  <p className="text-[11px] font-black text-emerald-400 uppercase tracking-tighter mb-1">{log.user}</p>
                  <p className="text-xs font-medium text-slate-300 mb-2 leading-relaxed">{log.action}</p>
                  <p className="text-[9px] text-slate-500 font-bold italic text-right">{log.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL GỌI TỪ CODE 2 */}
      <AddAdminModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default AdminManagement;





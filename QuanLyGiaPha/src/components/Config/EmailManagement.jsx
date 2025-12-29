import React, { useState, useRef } from 'react';
import { 
  Mail, Send, Settings, Users, PenTool, Paperclip, 
  ChevronRight, Save, Trash2, Bell, Heart, Cake, 
  History, Coins, ShieldCheck, CheckCircle2
} from 'lucide-react';

const EmailManagement = () => {
  const [activeTab, setActiveTab] = useState('templates'); // 'config', 'templates', 'lists'
  const fileInputRef = useRef(null);

  // Style cho các nút và khối nổi 3D
  const activeEffect = "active:scale-[0.98] active:shadow-inner transition-all duration-200 cursor-pointer";
  const cardStyle = "bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border-2 border-white overflow-hidden transition-all hover:shadow-2xl";

  const handleTestEmail = () => {
    alert("🚀 Hệ thống đang gửi Email kiểm tra cấu hình SMTP... Vui lòng đợi!");
  };

  return (
    <div className="p-6 bg-[#f0f4f0] min-h-screen font-sans text-left selection:bg-emerald-200">
      {/* Header & Breadcrumb */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter drop-shadow-sm flex items-center gap-3">
            <div className="p-2 bg-[#10b981] rounded-xl text-white shadow-lg"><Mail size={24}/></div>
            Hệ thống Email Dòng Họ
          </h1>
          <div className="absolute -bottom-2 left-14 w-24 h-1.5 bg-[#10b981] rounded-full"></div>
        </div>
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-emerald-50">
          {['templates', 'lists', 'config'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                activeTab === tab ? 'bg-[#10b981] text-white shadow-md' : 'text-slate-400 hover:bg-emerald-50'
              }`}
            >
              {tab === 'templates' ? 'Kịch bản mẫu' : tab === 'lists' ? 'Danh sách gửi' : 'Cấu hình kỹ thuật'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* PANEL TRÁI (8 CỘT): NỘI DUNG CHÍNH */}
        <div className="xl:col-span-8 space-y-8">
          
          {activeTab === 'templates' && (
            <div className={cardStyle}>
              <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
                <PenTool size={18} /> Soạn thảo kịch bản mẫu
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Các loại kịch bản */}
                {[
                  { icon: <Cake className="text-pink-500"/>, label: "Chúc mừng (Sinh nhật/Thọ)", color: "border-pink-100 bg-pink-50 text-pink-700" },
                  { icon: <Heart className="text-red-500"/>, label: "Việc Hiếu / Hỉ (Tin buồn/Cưới)", color: "border-red-100 bg-red-50 text-red-700" },
                  { icon: <Bell className="text-amber-500"/>, label: "Giỗ chạp / Lễ hội dòng tộc", color: "border-amber-100 bg-amber-50 text-amber-700" },
                  { icon: <History className="text-blue-500"/>, label: "Cập nhật Gia phả mới", color: "border-blue-100 bg-blue-50 text-blue-700" },
                  { icon: <Coins className="text-emerald-500"/>, label: "Kêu gọi đóng góp / Công đức", color: "border-emerald-100 bg-emerald-50 text-emerald-700" },
                ].map((item, idx) => (
                  <button key={idx} className={`flex items-center gap-3 p-4 border-2 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] ${item.color} ${activeEffect}`}>
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
              <div className="px-8 pb-8 space-y-4">
                <input type="text" placeholder="Tiêu đề Email mẫu..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                <textarea rows="8" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] font-medium text-slate-600 shadow-inner leading-relaxed" placeholder="Nội dung chi tiết (Hỗ trợ mã nhúng {TEN_THANH_VIEN}, {NGAY_GIO}...)"></textarea>
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                    <Paperclip size={16}/> Đính kèm (PDF bản tin, tài liệu lịch sử...)
                  </div>
                  <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-[#10b981] hover:text-white transition-all">Chọn tệp</button>
                  <input type="file" ref={fileInputRef} className="hidden" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lists' && (
            <div className={cardStyle}>
              <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
                <Users size={18} /> Phân nhóm Mailing List
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-6 bg-blue-50 border-2 border-blue-100 rounded-[2rem] shadow-inner">
                    <p className="text-2xl font-black text-blue-700">120</p>
                    <p className="text-[10px] font-black text-blue-400 uppercase mt-1">Hội đồng Trưởng tộc</p>
                  </div>
                  <div className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] shadow-inner">
                    <p className="text-2xl font-black text-emerald-700">1.450</p>
                    <p className="text-[10px] font-black text-emerald-400 uppercase mt-1">Con cháu (Công khai)</p>
                  </div>
                  <div className="p-6 bg-purple-50 border-2 border-purple-100 rounded-[2rem] shadow-inner">
                    <p className="text-2xl font-black text-purple-700">45</p>
                    <p className="text-[10px] font-black text-purple-400 uppercase mt-1">Ban Quản Trị (Admin)</p>
                  </div>
                </div>
                <div className="border-2 border-slate-50 rounded-3xl overflow-hidden shadow-inner">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                      <tr>
                        <th className="px-6 py-4 text-left">Nhóm đối tượng</th>
                        <th className="px-6 py-4 text-center">Vai trò</th>
                        <th className="px-6 py-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold text-slate-600">
                      <tr className="border-t border-slate-50">
                        <td className="px-6 py-4">Chi họ Nguyễn Văn (Phía Bắc)</td>
                        <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px]">Thành viên</span></td>
                        <td className="px-6 py-4 text-right text-red-500"><Trash2 size={16} className="inline cursor-pointer"/></td>
                      </tr>
                      <tr className="border-t border-slate-50">
                        <td className="px-6 py-4">Đội ngũ kỹ thuật Web Gia phả</td>
                        <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px]">Quản trị</span></td>
                        <td className="px-6 py-4 text-right text-red-500"><Trash2 size={16} className="inline cursor-pointer"/></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className={cardStyle}>
              <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
                <Settings size={18} /> Cấu hình kỹ thuật SMTP
              </div>
              <div className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Tên hiển thị (Display Name)</label>
                    <input type="text" defaultValue="Hội đồng Trưởng tộc Họ Nguyễn" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Email gửi (Sender Email)</label>
                    <input type="email" placeholder="lienhe@dongho.vn" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">SMTP Server</label>
                    <input type="text" defaultValue="smtp.gmail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Port</label>
                    <input type="text" defaultValue="587" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-700 uppercase mb-2 ml-1 tracking-widest">Mật khẩu ứng dụng (App Password)</label>
                  <input type="password" placeholder="••••••••••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3.5 outline-none focus:border-[#10b981] font-bold text-slate-700 shadow-inner" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PANEL PHẢI (4 CỘT): TEST & SIGNATURE */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Chữ ký Email */}
          <div className={cardStyle}>
            <div className="bg-emerald-50/50 px-8 py-5 border-b-2 border-emerald-100 font-black text-emerald-800 text-sm uppercase flex items-center gap-3">
              <ShieldCheck size={18} /> Chữ ký Email cuối thư
            </div>
            <div className="p-8 space-y-4">
              <textarea rows="5" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-[#10b981] font-medium text-[11px] text-slate-500 italic shadow-inner resize-none" 
                defaultValue="Trân trọng,&#10;Hội đồng Trưởng tộc Họ Nguyễn&#10;Địa chỉ: Nhà thờ tổ, Hòa Hải, Đà Nẵng&#10;SĐT: 0905.xxx.xxx&#10;Website: giaphahonguyen.vn"></textarea>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-inner">
                <CheckCircle2 size={14}/> Tự động chèn vào mọi email gửi đi
              </div>
            </div>
          </div>

          {/* Email Nhận thử */}
          <div className="bg-[#065f46] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border-b-8 border-[#043d2e]">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Send size={80}/></div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter mb-4 flex items-center gap-2">
              <ShieldCheck size={20}/> Email Nhận Thử
            </h3>
            <div className="space-y-4">
              <input type="email" placeholder="Nhập email cá nhân..." className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 outline-none focus:bg-white/20 text-sm font-bold text-white placeholder:text-white/40 shadow-inner" />
              <button onClick={handleTestEmail} className="w-full bg-[#10b981] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-400 active:scale-95 transition-all text-xs uppercase tracking-widest border-b-4 border-[#0a8f63]">
                Gửi Test Ngay
              </button>
            </div>
          </div>

          {/* Nút lưu tất cả cấu hình */}
          <button className={`w-full bg-slate-800 text-white py-6 rounded-[2.5rem] font-black shadow-2xl hover:bg-black active:translate-y-1 active:border-b-0 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 border-b-8 border-slate-950 ${activeEffect}`}>
             <Save size={24} strokeWidth={3}/> Lưu tất cả cấu hình
          </button>

        </div>
      </div>
    </div>
  );
};

export default EmailManagement;











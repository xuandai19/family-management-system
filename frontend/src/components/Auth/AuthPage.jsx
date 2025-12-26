import React, { useState } from 'react';
import { 
  Mail, Lock, User, ShieldCheck, ArrowRight, 
  UserPlus, LogIn, CheckCircle, AlertCircle 
} from 'lucide-react';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Chuyển đổi giữa Đăng nhập và Đăng ký
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleAction = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Giả lập đăng nhập thành công
      alert("🔓 Đăng nhập thành công vào hệ thống Gia Phả Đại Việt!");
      onLoginSuccess();
    } else {
      alert("📩 Yêu cầu đăng ký đã được gửi tới Quản trị viên (Tộc trưởng) để phê duyệt!");
      setIsLogin(true);
    }
  };

  const activeEffect = "active:scale-[0.98] transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#f0f4f0] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-[1000px] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-2 border-white overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
        
        {/* PANEL TRÁI: GIỚI THIỆU DÒNG HỌ */}
        <div className="md:w-1/2 bg-[#009a66] p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
            <ShieldCheck size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-tight mb-4">
              Gia Phả <br /> Đại Việt
            </h1>
            <p className="text-emerald-100 font-medium leading-relaxed mb-8 italic">
              "Cây có gốc mới nở cành xanh ngọn, <br /> Nước có nguồn mới bể rộng sông sâu."
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle size={20} className="text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Bảo mật thông tin dòng tộc</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle size={20} className="text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Kết nối con cháu muôn phương</span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center gap-3">
              {isLogin ? <LogIn className="text-[#009a66]" /> : <UserPlus className="text-[#009a66]" />}
              {isLogin ? "Đăng nhập" : "Đăng ký thành viên"}
            </h2>
            <div className="w-16 h-1.5 bg-[#009a66] rounded-full mt-2"></div>
          </div>

          <form onSubmit={handleAction} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Họ và tên con cháu</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#009a66] transition-colors" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="Nguyễn Văn A..." 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] focus:bg-white font-bold text-slate-700 shadow-inner transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest text-left">Email cá nhân</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#009a66] transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] focus:bg-white font-bold text-slate-700 shadow-inner transition-all text-left"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest text-left">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#009a66] transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-[#009a66] focus:bg-white font-bold text-slate-700 shadow-inner transition-all text-left"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors">Quên mật khẩu?</button>
              </div>
            )}

            <button 
              type="submit" 
              className={`w-full bg-[#009a66] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 flex items-center justify-center gap-3 border-b-8 border-emerald-900 ${activeEffect}`}
            >
              {isLogin ? "Truy cập phả hệ" : "Gửi yêu cầu đăng ký"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter text-left">
              {isLogin ? "Bạn là thành viên mới?" : "Bạn đã có tài khoản?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-[#009a66] font-black hover:underline text-left"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập tại đây"}
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[9px] text-amber-700 font-bold italic leading-relaxed uppercase tracking-tight">
              Lưu ý: Mọi tài khoản mới cần sự phê duyệt của Hội đồng Trưởng tộc để đảm bảo tính xác thực của dòng máu.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
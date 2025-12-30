import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  UserPlus,
  LogIn,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Chuyển đổi giữa Đăng nhập và Đăng ký
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAction = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Giả lập đăng nhập thành công
      alert("🔓 Đăng nhập thành công vào hệ thống Gia Phả Đại Việt!");
      onLoginSuccess();
    } else {
      alert(
        "📩 Yêu cầu đăng ký đã được gửi tới Quản trị viên (Tộc trưởng) để phê duyệt!"
      );
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
              "Cây có gốc mới nở cành xanh ngọn, <br /> Nước có nguồn mới bể
              rộng sông sâu."
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle size={20} className="text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Bảo mật thông tin dòng tộc
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle size={20} className="text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Kết nối con cháu muôn phương
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

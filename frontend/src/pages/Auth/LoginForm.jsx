import React, { useState } from "react";
import { loginUser } from "../../Api/authApi.js";
import { useNavigate } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  TreePine,
} from "lucide-react";
import LoginBg from "../../assets/imgs/Login.jpg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // Lưu token và thông tin user
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));

        const roleId = result.user.profile?.role_id;

        // Chuyển hướng theo role - Admin luôn vào dashboard
        if (roleId === 1 || roleId === "1") {
          navigate("/admin/dashboard");
        } else {
          // Các role khác - tạm thời về login (chưa có trang user)
          navigate("/UserDashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Background Image */}
        <div
          className="md:w-1/2 min-h-[300px] md:min-h-[600px] relative flex flex-col justify-start p-10 text-white"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay gradient - đổi từ trên xuống */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B6914]/90 via-[#8B6914]/40 to-transparent"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#ffe2a1] rounded-2xl flex items-center justify-center">
                <TreePine size={28} className="text-[#8B6914]" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">GIA PHẢ</h1>
                <p className="text-[#ffe2a1] text-xs font-medium">
                  Hệ thống quản lý dòng tộc
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              Kết nối thế hệ,
              <br />
              <span className="text-[#ffe2a1]">Gìn giữ truyền thống</span>
            </h2>

            <p className="text-white/90 text-sm leading-relaxed">
              Nơi lưu giữ và kết nối các thế hệ trong gia đình. Cùng nhau xây
              dựng cây gia phả, chia sẻ kỷ niệm và gắn kết tình thân.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffe2a1] rounded-xl flex items-center justify-center">
                <LogIn className="text-[#8B6914]" size={22} />
              </div>
              Đăng nhập
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Mật khẩu
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-semibold text-[#8B6914] hover:text-[#6B5210] hover:underline transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#d4a843] hover:bg-[#8B6914] text-white py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-[#ffe2a1]/50 flex items-center justify-center gap-2 transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-[#8B6914] font-semibold hover:text-[#6B5210] hover:underline"
              >
                Đăng ký
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

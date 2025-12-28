import React, { useState } from "react";
import { registerUser } from "../../Api/authApi";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  TreePine,
} from "lucide-react";
import LoginBg from "../../assets/imgs/Login.jpg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate
    if (!formData.username || !formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const result = await registerUser(submitData);
      if (result.success) {
        alert("Đăng ký thành công! Vui lòng chờ Admin phê duyệt.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Background Image */}
        <div
          className="md:w-1/2 min-h-[250px] md:min-h-[500px] relative flex flex-col justify-start p-10 text-white"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
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
              Gia nhập
              <br />
              <span className="text-[#ffe2a1]">Đại gia đình</span>
            </h2>

            <p className="text-white/90 text-sm leading-relaxed">
              Đăng ký tài khoản để kết nối với dòng tộc, cập nhật thông tin cá
              nhân và tham gia các hoạt động chung của gia đình.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffe2a1] rounded-xl flex items-center justify-center">
                <UserPlus className="text-[#8B6914]" size={22} />
              </div>
              Đăng ký
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Điền thông tin để tạo tài khoản mới.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={16}
                />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                  size={16}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] focus:bg-white text-slate-700 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#d4a843] hover:bg-[#8B6914] text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-[#ffe2a1]/50 flex items-center justify-center gap-2 transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Đăng ký
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center">
              Đã có tài khoản?
              <button
                onClick={() => navigate("/login")}
                className="ml-2 text-[#8B6914] font-bold hover:underline"
              >
                Đăng nhập
              </button>
            </p>
          </div>

          {/* Note */}
          <div className="mt-4 p-3 bg-[#ffe2a1]/30 rounded-xl border border-[#d4a843]/30 flex items-start gap-3">
            <AlertCircle size={16} className="text-[#8B6914] shrink-0 mt-0.5" />
            <p className="text-xs text-[#6B5210] leading-relaxed">
              <strong>Lưu ý:</strong> Tài khoản mới cần được Trưởng tộc phê
              duyệt trước khi có thể truy cập đầy đủ hệ thống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  AlertCircle,
  TreePine,
  ArrowRight,
  Calendar,
  Phone,
  Users,
  MapPin,
  FileText,
} from "lucide-react";
import { registerUser } from "../../Api/authApi.js";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/imgs/Login.jpg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sửa lại state để dùng trực tiếp snake_case cho đồng bộ với DB/BE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "",
    birth_date: "", // Đổi từ birthDate
    phone: "",
    father_name: "", // Đổi từ fatherName
    mother_name: "", // Đổi từ motherName
    hometown: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate (giữ nguyên logic nhưng dùng tên biến mới)
    if (!formData.username || !formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!formData.father_name && !formData.mother_name) {
      setError("Vui lòng nhập tên Cha hoặc Mẹ để xác thực");
      return;
    }

    setIsLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi đi - Đảm bảo khớp 100% với tên biến BE nhận
      const submitData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        // Lưu ý: DB của bạn CHECK (gender IN ('Male', 'Female', 'Other'))
        gender: formData.gender,
        birth_date: formData.birth_date || null,
        phone: formData.phone || null,
        father_name: formData.father_name || null,
        mother_name: formData.mother_name || null,
        hometown: formData.hometown || null,
        note: formData.note || null,
      };

      const result = await registerUser(submitData);
      if (result.success) {
        alert("Đăng ký thành công! Vui lòng chờ Trưởng tộc phê duyệt.");
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
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Background Image */}
        <div
          className="md:w-2/5 min-h-[200px] md:min-h-[600px] relative flex flex-col justify-start p-8 text-white"
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

            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">
              Gia nhập
              <br />
              <span className="text-[#ffe2a1]">Đại gia đình</span>
            </h2>

            <p className="text-white/90 text-sm leading-relaxed">
              Đăng ký tài khoản để kết nối với dòng tộc và tham gia các hoạt
              động chung của gia đình.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center max-h-[90vh] overflow-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffe2a1] rounded-xl flex items-center justify-center">
                <UserPlus className="text-[#8B6914]" size={22} />
              </div>
              Đăng ký tài khoản
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ========== THÔNG TIN ĐĂNG NHẬP ========== */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} />
                Thông tin đăng nhập
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Email */}
                <div className="md:col-span-2">
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
                      placeholder="Email *"
                      className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
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
                    placeholder="Mật khẩu *"
                    className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Xác nhận mật khẩu */}
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
                    placeholder="Xác nhận mật khẩu *"
                    className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ========== THÔNG TIN CÁ NHÂN ========== */}
            <div className="p-4 bg-blue-50 rounded-xl space-y-3">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <User size={14} />
                Thông tin cá nhân
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Họ tên */}
                <div className="md:col-span-2 relative group">
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
                    placeholder="Họ và tên đầy đủ *"
                    className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Giới tính */}
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all"
                >
                  <option value="">Giới tính *</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>

                {/* Ngày sinh */}
                <div className="relative group">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                    size={16}
                  />
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="md:col-span-2 relative group">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914] transition-colors"
                    size={16}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full bg-white border-2 border-slate-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-[#d4a843] text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ========== THÔNG TIN XÁC THỰC DÒNG HỌ ========== */}
            <div className="p-4 bg-amber-50 rounded-xl space-y-3 border border-amber-200">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                <Users size={14} />
                Xác thực dòng họ (điền ít nhất tên Cha hoặc Mẹ)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Tên cha */}
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="Họ tên Cha (trong gia phả)"
                    className="w-full bg-white border-2 border-amber-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-amber-500 text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Tên mẹ */}
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    placeholder="Họ tên Mẹ"
                    className="w-full bg-white border-2 border-amber-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-amber-500 text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Quê quán */}
                <div className="md:col-span-2 relative group">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                    placeholder="Quê quán gốc (xã, huyện, tỉnh)"
                    className="w-full bg-white border-2 border-amber-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-amber-500 text-slate-700 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Ghi chú */}
                <div className="md:col-span-2 relative group">
                  <FileText
                    className="absolute left-3 top-3 text-slate-400 group-focus-within:text-amber-600 transition-colors"
                    size={16}
                  />
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Ghi chú thêm (quan hệ, chi nhánh, thông tin khác...)"
                    rows={2}
                    className="w-full bg-white border-2 border-amber-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-amber-500 text-slate-700 text-sm transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>
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
                  Gửi yêu cầu đăng ký
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-4 pt-4 border-t border-slate-100">
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
          <div className="mt-3 p-3 bg-[#ffe2a1]/30 rounded-xl border border-[#d4a843]/30 flex items-start gap-3">
            <AlertCircle size={16} className="text-[#8B6914] shrink-0 mt-0.5" />
            <p className="text-xs text-[#6B5210] leading-relaxed">
              <strong>Lưu ý:</strong> Thông tin Cha/Mẹ giúp Trưởng tộc xác thực
              bạn thuộc dòng họ. Tài khoản sẽ được phê duyệt trong 24-48 giờ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

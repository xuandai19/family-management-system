import React, { useState } from "react";
import { TreePine, ArrowRight, AlertCircle, ChevronLeft } from "lucide-react";
import { registerUser } from "../../services/authApi.js";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/imgs/Login.jpg";
import StepAccount from "../../components/Register/Steps/StepAccount";
import StepPersonal from "../../components/Register/Steps/StepPersonal";
import StepFamily from "../../components/Register/Steps/StepFamily";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Bước hiện tại
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState("member");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "",
    birth_date: "",
    phone: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
    hometown: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Hàm chuyển bước có validation
  const nextStep = () => {
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        return setError("Vui lòng nhập đầy đủ thông tin đăng nhập");
      }
      if (formData.password !== formData.confirmPassword) {
        return setError("Mật khẩu xác nhận không khớp");
      }
    } else if (step === 2) {
      if (!formData.username || !formData.gender) {
        return setError("Vui lòng nhập các thông tin bắt buộc (*)");
      }
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation cuối cùng cho bước 3
    if (
      accountType === "member" &&
      !formData.father_name &&
      !formData.mother_name
    ) {
      return setError("Vui lòng nhập tên Cha hoặc Mẹ để xác thực");
    }
    if (accountType === "spouse" && !formData.spouse_name) {
      return setError("Vui lòng nhập tên Chồng/Vợ để xác thực");
    }

    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        type: accountType,
        birth_date: formData.birth_date || null,
        phone: formData.phone || null,
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

  const renderStep = () => {
    if (step === 1)
      return <StepAccount formData={formData} handleChange={handleChange} />;
    if (step === 2)
      return <StepPersonal formData={formData} handleChange={handleChange} />;
    if (step === 3)
      return (
        <StepFamily
          formData={formData}
          handleChange={handleChange}
          accountType={accountType}
          setAccountType={setAccountType}
        />
      );
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* LEFT SIDE - BRANDING (Giữ nguyên phong cách cũ) */}
        <div
          className="md:w-1/2 min-h-[300px] md:min-h-[600px] relative flex flex-col justify-start p-10 text-white"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B6914]/95 via-[#8B6914]/70 to-[#8B6914]/40"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#ffe2a1] rounded-xl flex items-center justify-center shadow-lg">
                <TreePine size={24} className="text-[#8B6914]" />
              </div>
              <h1 className="text-xl font-black tracking-tight tracking-widest uppercase">
                Gia Phả
              </h1>
            </div>
            <h2 className="text-3xl font-black leading-tight mb-4">
              Bước {step}
              <br />
              <span className="text-[#ffe2a1]">
                {step === 1 ? "Tài khoản" : step === 2 ? "Cá nhân" : "Xác thực"}
              </span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              {step === 1 &&
                "Bắt đầu bằng việc thiết lập thông tin đăng nhập bảo mật."}
              {step === 2 &&
                "Cung cấp thông tin cá nhân để dòng họ dễ dàng nhận diện."}
              {step === 3 &&
                "Thông tin này giúp Trưởng tộc đối soát dữ liệu với gia phả gốc."}
            </p>

            {/* Progress Indicators */}
            <div className="space-y-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      step >= s
                        ? "bg-[#ffe2a1] border-[#ffe2a1] text-[#8B6914]"
                        : "border-white/30 text-white/30"
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      step >= s ? "text-white" : "text-white/30"
                    }`}
                  >
                    {s === 1 ? "Đăng ký" : s === 2 ? "Cá nhân" : "Xác minh"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - MULTI-STEP FORM */}
        <div className="md:w-3/5 p-6 md:p-10 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-800 uppercase">
              {step === 1 && "Thông tin đăng nhập"}
              {step === 2 && "Thông tin cá nhân"}
              {step === 3 && "Xác thực dòng họ"}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
              Bước {step} / 3
            </span>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm flex items-center gap-3 animate-pulse">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-between"
          >
            <div className="space-y-4">{renderStep()}</div>

            {/* NAVIGATION BUTTONS */}
            <div className="mt-10 flex gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                >
                  <ChevronLeft size={20} /> Quay lại
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#d4a843] hover:bg-[#8B6914] text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-200 transition-all"
                >
                  Tiếp tục bước {step + 1} <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#8B6914] hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? "Đang gửi..." : "Hoàn tất đăng ký"}{" "}
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </form>

          {step === 1 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Đã có tài khoản?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#8B6914] font-bold hover:underline"
              >
                Đăng nhập ngay
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

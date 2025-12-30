import { Mail, Lock } from "lucide-react";

export default function StepAccount({ formData, handleChange }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="relative group">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914]"
          size={18}
        />
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        />
      </div>
      <div className="relative group">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914]"
          size={18}
        />
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu *"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        />
      </div>
      <div className="relative group">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914]"
          size={18}
        />
        <input
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Xác nhận mật khẩu *"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        />
      </div>
    </div>
  );
}

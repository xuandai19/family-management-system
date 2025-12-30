import { User, Calendar, Phone } from "lucide-react";

export default function StepPersonal({ formData, handleChange }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="relative group">
        <User
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914]"
          size={18}
        />
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          placeholder="Họ và tên đầy đủ *"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        >
          <option value="">Giới tính *</option>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>
      <div className="relative group">
        <Phone
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B6914]"
          size={18}
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại liên hệ"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-[#d4a843] focus:bg-white transition-all shadow-sm"
        />
      </div>
    </div>
  );
}

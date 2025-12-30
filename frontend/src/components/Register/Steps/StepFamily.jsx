import { MapPin, FileText } from "lucide-react";

export default function StepFamily({
  formData,
  handleChange,
  accountType,
  setAccountType,
}) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setAccountType("member")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            accountType === "member"
              ? "bg-white text-[#8B6914] shadow-sm"
              : "text-slate-500"
          }`}
        >
          HUYẾT THỐNG
        </button>
        <button
          type="button"
          onClick={() => setAccountType("spouse")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            accountType === "spouse"
              ? "bg-white text-[#8B6914] shadow-sm"
              : "text-slate-500"
          }`}
        >
          VỢ / CHỒNG
        </button>
      </div>

      {accountType === "member" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            placeholder="Họ tên Cha"
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-all shadow-sm"
          />
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            placeholder="Họ tên Mẹ"
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-all shadow-sm"
          />
        </div>
      ) : (
        <input
          type="text"
          name="spouse_name"
          value={formData.spouse_name}
          onChange={handleChange}
          placeholder="Họ tên Chồng/Vợ (thành viên đã có trong gia phả)"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-all shadow-sm"
        />
      )}

      <div className="relative group">
        <MapPin
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600"
          size={18}
        />
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          placeholder="Quê quán gốc"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-3 py-3 outline-none focus:border-amber-500 transition-all shadow-sm"
        />
      </div>
      <div className="relative group">
        <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={2}
          placeholder="Ghi chú thêm..."
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-500 transition-all shadow-sm resize-none"
        />
      </div>
    </div>
  );
}

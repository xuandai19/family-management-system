import React from "react";
import { X, User, Calendar, MapPin, Phone, Mail, Briefcase, Heart } from "lucide-react";

const MemberDetailModal = ({ member, isSpouse, onClose }) => {
  if (!member) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className={`px-6 py-4 border-b rounded-t-2xl relative ${
          isSpouse 
            ? "bg-gradient-to-r from-pink-500 to-rose-500" 
            : "bg-gradient-to-r from-blue-500 to-cyan-500"
        }`}>
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full">
            <X size={20} className="text-white" />
          </button>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {isSpouse ? <Heart size={20} /> : <User size={20} />}
            {isSpouse ? "Thông tin Vợ/Chồng" : "Thông tin Thành viên"}
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
              member.gender === "Male" ? "bg-blue-500" : "bg-pink-500"
            }`}>
              {member.full_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">{member.full_name}</h4>
              <p className="text-slate-500">
                {member.gender === "Male" ? "Nam" : member.gender === "Female" ? "Nữ" : "-"}
                {!isSpouse && member.generation_level && ` • Đời ${member.generation_level}`}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-3">
            <InfoRow icon={Calendar} label="Ngày sinh" value={formatDate(member.birth_date)} />
            {member.death_date && (
              <InfoRow icon={Calendar} label="Ngày mất" value={formatDate(member.death_date)} />
            )}
            <InfoRow icon={Briefcase} label="Nghề nghiệp" value={member.occupation} />
            <InfoRow icon={MapPin} label="Nơi sinh" value={member.birth_place} />
            <InfoRow icon={MapPin} label="Quê quán" value={member.hometown} />
            <InfoRow icon={MapPin} label="Địa chỉ" value={member.address} />
            <InfoRow icon={Phone} label="Điện thoại" value={member.phone} />
            <InfoRow icon={Mail} label="Email" value={member.email} />
            
            {member.bio && (
              <div className="bg-slate-50 rounded-xl p-3 mt-4">
                <p className="text-xs text-slate-500 mb-1">Tiểu sử</p>
                <p className="text-sm text-slate-700">{member.bio}</p>
              </div>
            )}

            <div className="pt-3 border-t">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                member.is_alive ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"
              }`}>
                {member.is_alive ? "✓ Còn sống" : "Đã mất"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <Icon size={16} className="text-slate-400 flex-shrink-0" />
    <span className="text-slate-500 w-24">{label}:</span>
    <span className="text-slate-800 font-medium">{value || "-"}</span>
  </div>
);

export default MemberDetailModal;
import React from "react";
import {
  X,
  User,
  Calendar,
  MapPin,
  Heart,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { AgeAvatar } from "./Avatar";

const PersonInfoModal = ({ person, isSpouse, spouseOf, onClose }) => {
  if (!person) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Xác định vai trò vợ/chồng dựa trên giới tính
  const getSpouseRole = () => {
    if (!isSpouse || !spouseOf) return null;

    // Chuẩn hóa gender về lowercase để so sánh
    const gender = (person.gender || "").toLowerCase();
    const role =
      gender === "female" || gender === "f" || gender === "nữ" ? "Vợ" : "Chồng";

    return `${role} của ${spouseOf}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto
          animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`relative p-6 pb-4 rounded-t-2xl ${
            isSpouse
              ? "bg-gradient-to-r from-pink-500 to-rose-400"
              : "bg-gradient-to-r from-blue-500 to-cyan-400"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 
              text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-white">
            <div className="bg-white p-1 rounded-full mb-3">
              <AgeAvatar
                gender={person.gender}
                name={person.full_name || person.name}
                size="large"
              />
            </div>
            <h3 className="text-xl font-bold text-center">
              {person.full_name || person.name}
            </h3>
            {isSpouse && spouseOf && (
              <span className="text-sm opacity-90 mt-1 flex items-center gap-1">
                <Heart size={14} fill="currentColor" />
                {getSpouseRole()}
              </span>
            )}
            {!isSpouse && person.generation && (
              <span className="text-sm opacity-90 mt-1">
                Đời thứ {person.generation}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Giới tính */}
          <InfoRow
            icon={<User size={18} />}
            label="Giới tính"
            value={
              person.gender === "male"
                ? "Nam"
                : person.gender === "female"
                ? "Nữ"
                : "Chưa cập nhật"
            }
          />

          {/* Ngày sinh */}
          <InfoRow
            icon={<Calendar size={18} />}
            label="Ngày sinh"
            value={formatDate(person.birth_date)}
          />

          {/* Ngày mất */}
          {person.death_date && (
            <InfoRow
              icon={<Calendar size={18} />}
              label="Ngày mất"
              value={formatDate(person.death_date)}
              className="text-slate-500"
            />
          )}

          {/* Nơi sinh */}
          {person.birth_place && (
            <InfoRow
              icon={<MapPin size={18} />}
              label="Nơi sinh"
              value={person.birth_place}
            />
          )}

          {/* Địa chỉ hiện tại */}
          {person.current_address && (
            <InfoRow
              icon={<MapPin size={18} />}
              label="Địa chỉ"
              value={person.current_address}
            />
          )}

          {/* Điện thoại */}
          {person.phone && (
            <InfoRow
              icon={<Phone size={18} />}
              label="Điện thoại"
              value={person.phone}
            />
          )}

          {/* Email */}
          {person.email && (
            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={person.email}
            />
          )}

          {/* Nghề nghiệp */}
          {person.occupation && (
            <InfoRow
              icon={<Users size={18} />}
              label="Nghề nghiệp"
              value={person.occupation}
            />
          )}

          {/* Tình trạng hôn nhân (cho spouse) */}
          {person.marriage_date && (
            <InfoRow
              icon={<Heart size={18} />}
              label="Ngày cưới"
              value={formatDate(person.marriage_date)}
              className="text-pink-500"
            />
          )}

          {/* Tiểu sử */}
          {person.bio && (
            <div className="pt-3 border-t">
              <p className="text-sm text-slate-500 mb-1">Tiểu sử</p>
              <p className="text-slate-700">{person.bio}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg 
              font-medium text-slate-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for info rows
const InfoRow = ({ icon, label, value, className = "" }) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-400 mt-0.5">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`font-medium text-slate-700 ${className}`}>{value}</p>
    </div>
  </div>
);

export default PersonInfoModal;

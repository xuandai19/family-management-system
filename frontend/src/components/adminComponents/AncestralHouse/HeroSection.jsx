// src/components/adminComponents/AncestralHouse/HeroSection.jsx
import React, { useState } from "react";
import {
  Landmark,
  MapPin,
  Calendar,
  Edit,
  Plus,
  ImageIcon,
} from "lucide-react";

const HeroSection = ({ house, onEdit, onAddHouse }) => {
  const [imageError, setImageError] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Chưa có nhà thờ tổ
  if (!house) {
    return (
      <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mb-6">
            <Landmark size={48} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Chưa có thông tin nhà thờ tổ
          </h2>
          <p className="text-slate-500 mb-6 max-w-md">
            Hãy thêm thông tin về nhà thờ tổ của dòng họ để lưu giữ và chia sẻ
            với các thành viên
          </p>
          <button
            onClick={onAddHouse}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Thêm nhà thờ tổ
          </button>
        </div>
      </div>
    );
  }

  // Lấy ảnh đầu tiên làm background
  const mainImage =
    house.images && house.images.length > 0 ? house.images[0] : null;

  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden group">
      {/* Background Image */}
      {mainImage && !imageError ? (
        <img
          src={mainImage}
          alt={house.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Edit button */}
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all opacity-0 group-hover:opacity-100"
        title="Chỉnh sửa thông tin"
      >
        <Edit size={20} className="text-white" />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-500/80 backdrop-blur-sm rounded-lg">
            <Landmark size={24} className="text-white" />
          </div>
          <span className="text-amber-200 text-sm font-medium">
            Nhà thờ tổ dòng họ
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {house.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-white/90">
          {house.address && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-300" />
              <span>{house.address}</span>
            </div>
          )}
          {house.established_date && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-amber-300" />
              <span>Thành lập: {formatDate(house.established_date)}</span>
            </div>
          )}
          {house.images && house.images.length > 0 && (
            <div className="flex items-center gap-2">
              <ImageIcon size={16} className="text-amber-300" />
              <span>{house.images.length} hình ảnh</span>
            </div>
          )}
        </div>

        {/* History snippet */}
        {house.history && (
          <p className="mt-4 text-white/80 text-sm line-clamp-2 max-w-2xl">
            {house.history}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

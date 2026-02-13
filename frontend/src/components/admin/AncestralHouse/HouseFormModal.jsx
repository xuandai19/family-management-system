// src/components/adminComponents/AncestralHouse/HouseFormModal.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Landmark,
  MapPin,
  Calendar,
  History,
  ImagePlus,
  Trash2,
  Loader2,
} from "lucide-react";

const HouseFormModal = ({ isOpen, onClose, onSave, house, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    established_date: "",
    history: "",
    images: [],
  });
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (house) {
      setFormData({
        id: house.id,
        name: house.name || "",
        address: house.address || "",
        established_date: house.established_date
          ? house.established_date.split("T")[0]
          : "",
        history: house.history || "",
        images: house.images || [],
      });
    } else {
      setFormData({
        name: "",
        address: "",
        established_date: "",
        history: "",
        images: [],
      });
    }
  }, [house, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Landmark size={22} />
            {house ? "Chỉnh sửa thông tin" : "Thêm nhà thờ tổ"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-5">
            {/* Tên nhà thờ */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Landmark size={16} className="text-amber-500" />
                Tên nhà thờ tổ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="VD: Nhà thờ họ Nguyễn"
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <MapPin size={16} className="text-blue-500" />
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ nhà thờ tổ"
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Ngày thành lập */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={16} className="text-green-500" />
                Ngày thành lập
              </label>
              <input
                type="date"
                name="established_date"
                value={formData.established_date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Lịch sử */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <History size={16} className="text-purple-500" />
                Lịch sử / Mô tả
              </label>
              <textarea
                name="history"
                value={formData.history}
                onChange={handleChange}
                rows={4}
                placeholder="Nhập lịch sử, truyền thống của nhà thờ tổ..."
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <ImagePlus size={16} className="text-pink-500" />
                Hình ảnh
              </label>

              {/* Input thêm ảnh */}
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Nhập URL hình ảnh"
                  className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                >
                  Thêm
                </button>
              </div>

              {/* Preview ảnh */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {house ? "Cập nhật" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HouseFormModal;

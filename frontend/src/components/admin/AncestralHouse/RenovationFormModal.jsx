// src/components/adminComponents/AncestralHouse/RenovationFormModal.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Wrench,
  Calendar,
  Banknote,
  FileText,
  ImagePlus,
  Trash2,
  Loader2,
} from "lucide-react";

const RenovationFormModal = ({
  isOpen,
  onClose,
  onSave,
  renovation,
  houseId,
  loading,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    cost: "",
    renovation_date: "",
    completed_date: "",
    images: [],
  });
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (renovation) {
      setFormData({
        id: renovation.id,
        description: renovation.description || "",
        cost: renovation.cost || "",
        renovation_date: renovation.renovation_date
          ? renovation.renovation_date.split("T")[0]
          : "",
        completed_date: renovation.completed_date
          ? renovation.completed_date.split("T")[0]
          : "",
        images: renovation.images || [],
      });
    } else {
      setFormData({
        description: "",
        cost: "",
        renovation_date: new Date().toISOString().split("T")[0],
        completed_date: "",
        images: [],
      });
    }
  }, [renovation, isOpen]);

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
    onSave({
      ...formData,
      house_id: houseId,
      cost: parseFloat(formData.cost) || 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench size={22} />
            {renovation ? "Chỉnh sửa" : "Thêm lịch sử tu sửa"}
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
            {/* Mô tả */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FileText size={16} className="text-blue-500" />
                Mô tả công việc <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="VD: Sửa chữa mái ngói, quét vôi tường..."
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Chi phí */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Banknote size={16} className="text-green-500" />
                Chi phí (VNĐ)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="VD: 50000000"
                min="0"
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Ngày bắt đầu & kết thúc */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Calendar size={16} className="text-amber-500" />
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="renovation_date"
                  value={formData.renovation_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Calendar size={16} className="text-green-500" />
                  Ngày hoàn thành
                </label>
                <input
                  type="date"
                  name="completed_date"
                  value={formData.completed_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
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
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors"
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
              className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {renovation ? "Cập nhật" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenovationFormModal;

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Calendar,
  MapPin,
  FileText,
  User,
  Clock,
  Bell,
  Repeat,
  Loader2,
} from "lucide-react";
import { EVENT_TYPES } from "../../../services/eventApi";
import { getAllMembers } from "../../../services/adminApi";

const EventFormModal = ({
  isOpen,
  onClose,
  onSave,
  event = null,
  loading = false,
}) => {
  const isEditing = !!event;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "other",
    event_date: "",
    event_time: "",
    end_date: "",
    end_time: "",
    location: "",
    related_member_id: "",
    is_recurring: false,
    reminder_days: 7,
  });

  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});

  // Load members for related_member dropdown
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await getAllMembers();
        // Backend trả về { success: true, data: [...] }
        setMembers(response?.data || response || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách thành viên:", error);
      }
    };
    if (isOpen) {
      loadMembers();
    }
  }, [isOpen]);

  // Initialize form when editing
  useEffect(() => {
    if (event) {
      // Parse date and time from ISO string
      const eventDate = event.event_date ? new Date(event.event_date) : null;
      const endDate = event.end_date ? new Date(event.end_date) : null;

      setFormData({
        title: event.title || "",
        description: event.description || "",
        event_type: event.event_type || "other",
        event_date: eventDate ? eventDate.toISOString().split("T")[0] : "",
        event_time: eventDate ? eventDate.toTimeString().slice(0, 5) : "",
        end_date: endDate ? endDate.toISOString().split("T")[0] : "",
        end_time: endDate ? endDate.toTimeString().slice(0, 5) : "",
        location: event.location || "",
        related_member_id: event.related_member_id || "",
        is_recurring: event.is_recurring || false,
        reminder_days: event.reminder_days || 7,
      });
    } else {
      // Reset form for new event
      setFormData({
        title: "",
        description: "",
        event_type: "other",
        event_date: "",
        event_time: "",
        end_date: "",
        end_time: "",
        location: "",
        related_member_id: "",
        is_recurring: false,
        reminder_days: 7,
      });
    }
    setErrors({});
  }, [event, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề sự kiện";
    }
    if (!formData.event_date) {
      newErrors.event_date = "Vui lòng chọn ngày diễn ra";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Combine date and time into ISO string
    let eventDateTime = formData.event_date;
    if (formData.event_time) {
      eventDateTime = `${formData.event_date}T${formData.event_time}:00`;
    }

    let endDateTime = null;
    if (formData.end_date) {
      endDateTime = formData.end_date;
      if (formData.end_time) {
        endDateTime = `${formData.end_date}T${formData.end_time}:00`;
      }
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      event_type: formData.event_type,
      event_date: eventDateTime,
      end_date: endDateTime,
      location: formData.location.trim() || null,
      related_member_id: formData.related_member_id || null,
      is_recurring: formData.is_recurring,
      reminder_days: parseInt(formData.reminder_days) || 7,
    };

    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Calendar size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {isEditing ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}
                </h2>
                <p className="text-emerald-100 text-sm">
                  {isEditing
                    ? "Cập nhật thông tin sự kiện"
                    : "Thêm sự kiện mới cho dòng họ"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText size={16} className="text-emerald-500" />
                Tiêu đề sự kiện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: Giỗ Tổ năm 2026"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-emerald-500 ${
                  errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                Loại sự kiện
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(EVENT_TYPES).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, event_type: key }))
                    }
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.event_type === key
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{value.icon}</span>
                    <span className="text-xs font-medium">{value.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="text-emerald-500" />
                  Ngày diễn ra <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-emerald-500 ${
                    errors.event_date
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {errors.event_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.event_date}
                  </p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock size={16} className="text-emerald-500" />
                  Giờ bắt đầu
                </label>
                <input
                  type="time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* End Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Giờ kết thúc
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-emerald-500" />
                Địa điểm
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="VD: Nhà thờ họ, xã ABC, huyện XYZ"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Related Member */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-emerald-500" />
                Người liên quan
              </label>
              <select
                name="related_member_id"
                value={formData.related_member_id}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- Không chọn --</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name}{" "}
                    {member.generation_level
                      ? `(Đời ${member.generation_level})`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Nhập mô tả, ghi chú về sự kiện..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Options */}
            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_recurring"
                  checked={formData.is_recurring}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                />
                <Repeat size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Lặp lại hàng năm
                </span>
              </label>

              <div className="flex items-center gap-2">
                <Bell size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Nhắc trước
                </span>
                <select
                  name="reminder_days"
                  value={formData.reminder_days}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="1">1 ngày</option>
                  <option value="3">3 ngày</option>
                  <option value="7">7 ngày</option>
                  <option value="14">14 ngày</option>
                  <option value="30">30 ngày</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isEditing ? "Cập nhật" : "Tạo sự kiện"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;

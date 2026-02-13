import { useState } from "react";
import { Mail, Phone, MapPin, User, Edit2, Save, X } from "lucide-react";

const UserInfo = ({
  email,
  phone,
  fullName = "Người dùng",
  address = "",
  dateOfBirth = "",
  gender = "",
  onUpdateInfo = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName,
    email,
    phone,
    address,
    dateOfBirth,
    gender,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (onUpdateInfo) {
      onUpdateInfo(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName,
      email,
      phone,
      address,
      dateOfBirth,
      gender,
    });
    setIsEditing(false);
  };

  const InfoField = ({ icon: Icon, label, value, name, type = "text" }) => (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-b-0">
      <Icon size={20} className="text-amber-700 mt-1 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
            placeholder={`Nhập ${label.toLowerCase()}`}
          />
        ) : (
          <p className="text-gray-800 font-medium break-words">
            {value || "Chưa cập nhật"}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <User size={24} className="text-amber-700" />
          Thông tin cá nhân
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition"
          >
            <Edit2 size={18} />
            Chỉnh sửa
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <InfoField
          icon={User}
          label="Họ tên"
          value={formData.fullName}
          name="fullName"
        />

        <InfoField
          icon={Mail}
          label="Email"
          value={formData.email}
          name="email"
          type="email"
        />

        <InfoField
          icon={Phone}
          label="Số điện thoại"
          value={formData.phone}
          name="phone"
          type="tel"
        />

        <InfoField
          icon={MapPin}
          label="Địa chỉ"
          value={formData.address}
          name="address"
        />

        {isEditing && (
          <>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div
                size={20}
                className="text-blue-600 mt-1 flex-shrink-0 w-5 h-5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Ngày sinh
                </p>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                size={20}
                className="text-blue-600 mt-1 flex-shrink-0 w-5 h-5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Giới tính
                </p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium"
          >
            <Save size={18} />
            Lưu thay đổi
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            <X size={18} />
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

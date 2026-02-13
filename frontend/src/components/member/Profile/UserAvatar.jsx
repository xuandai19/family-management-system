import { useState } from "react";
import { Camera, Upload, X } from "lucide-react";

const UserAvatar = ({
  userImage,
  userName,
  onImageChange,
  isEditable = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(userImage);

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn một file hình ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result);
      };
      reader.readAsDataURL(file);

      if (onImageChange) {
        await onImageChange(file);
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      alert("Lỗi khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar Display */}
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        onMouseEnter={() => isEditable && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt={userName || "User Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-bold text-white">
            {getInitials(userName)}
          </span>
        )}

        {/* Hover Overlay */}
        {isHovering && isEditable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2">
            <label className="cursor-pointer p-2 hover:bg-black hover:bg-opacity-70 rounded-full transition">
              <Camera size={20} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            {previewImage && (
              <button
                onClick={handleRemoveImage}
                className="p-2 hover:bg-black hover:bg-opacity-70 rounded-full transition"
                disabled={isUploading}
              >
                <X size={20} className="text-white" />
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {userName || "Người dùng"}
        </h3>
        {isEditable && (
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <Upload size={14} />
            Nhấp để thay đổi ảnh đại diện
          </p>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;

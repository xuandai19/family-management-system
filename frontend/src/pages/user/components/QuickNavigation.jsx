import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * QuickNavigation - Component để hiển thị các link nhanh giữa các trang liên quan
 */
const QuickNavigation = ({ items = [], title = "Xem thêm", className = "" }) => {
  const navigate = useNavigate();

  if (items.length === 0) return null;

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left group border border-slate-100 hover:border-[#8B6914]/30 hover:shadow-md ${
                item.color || "bg-slate-50 hover:bg-[#ffe2a1]/20"
              }`}
            >
              {Icon && (
                <div
                  className={`p-2 rounded-lg ${
                    item.iconBg || "bg-[#8B6914]/10"
                  }`}
                >
                  <Icon
                    size={20}
                    className={item.iconColor || "text-[#8B6914]"}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 group-hover:text-[#8B6914] truncate">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-slate-500 truncate">
                    {item.description}
                  </p>
                )}
              </div>
              <ArrowRight
                size={16}
                className="text-slate-300 group-hover:text-[#8B6914] transition-colors"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * NavigationCard - Component card nhỏ để chuyển tiếp đến trang khác
 */
export const NavigationCard = ({
  icon: Icon,
  label,
  description,
  path,
  color = "bg-[#8B6914]",
  textColor = "text-white",
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`${color} ${textColor} p-4 rounded-xl hover:opacity-90 transition-all duration-200 text-left group w-full`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon size={24} />}
          <div>
            <p className="font-semibold">{label}</p>
            {description && (
              <p className="text-sm opacity-80">{description}</p>
            )}
          </div>
        </div>
        <ArrowRight
          size={20}
          className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
        />
      </div>
    </button>
  );
};

/**
 * FloatingBackButton - Nút quay lại nổi cố định góc màn hình
 */
export const FloatingBackButton = ({ onClick, label = "Quay lại" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-72 z-40 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-[#8B6914] hover:bg-[#8B6914] hover:text-white transition-all duration-200 border border-[#8B6914]/30"
    >
      <ArrowRight size={18} className="rotate-180" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};

export default QuickNavigation;

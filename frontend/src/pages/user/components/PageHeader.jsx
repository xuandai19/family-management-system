import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Home, ChevronRight } from "lucide-react";

/**
 * PageHeader - Component header chung cho tất cả các trang User
 * Bao gồm: Nút quay lại, Breadcrumb navigation, Tiêu đề trang
 */
const PageHeader = ({
  icon: Icon,
  title,
  description,
  showBackButton = true,
  breadcrumbs = [],
  actions,
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Định nghĩa breadcrumb mặc định dựa trên đường dẫn hiện tại
  const defaultBreadcrumbs = [
    { label: "Trang chủ", path: "/user/dashboard" },
    ...breadcrumbs,
  ];

  const handleBack = () => {
    // Nếu có lịch sử, quay lại trang trước
    // Nếu không, về dashboard
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        {defaultBreadcrumbs.map((crumb, index) => {
          const isLast = index === defaultBreadcrumbs.length - 1;
          const isClickable = !isLast && crumb.path;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight size={14} className="text-slate-400" />
              )}
              {isClickable ? (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="flex items-center gap-1 hover:text-[#8B6914] transition-colors"
                >
                  {index === 0 && <Home size={14} />}
                  <span>{crumb.label}</span>
                </button>
              ) : (
                <span className="text-slate-700 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
              title="Quay lại"
            >
              <ChevronLeft
                size={24}
                className="text-slate-400 group-hover:text-[#8B6914]"
              />
            </button>
          )}

          {/* Title Section */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
              {Icon && <Icon className="text-[#8B6914]" size={32} />}
              {title}
            </h1>
            {description && (
              <p className="text-slate-600 mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;

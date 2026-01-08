import { useState } from 'react';
import { Menu, X, User, Lock, LogOut, Settings, Bell, Shield } from 'lucide-react';

const UserMenu = ({ userName = 'Người dùng', onLogout = null, onNavigate = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: User, label: 'Hồ sơ cá nhân', action: 'profile' },
    { icon: Lock, label: 'Đổi mật khẩu', action: 'change-password' },
    { icon: Bell, label: 'Thông báo', action: 'notifications' },
    { icon: Settings, label: 'Cài đặt', action: 'settings' },
    { icon: Shield, label: 'Bảo mật', action: 'security' },
  ];

  const handleMenuClick = (action) => {
    if (onNavigate) {
      onNavigate(action);
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition"
        title="Menu"
      >
        {isOpen ? (
          <X size={24} className="text-gray-800" />
        ) : (
          <Menu size={24} className="text-gray-800" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {/* User Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">
            <p className="font-semibold">{userName}</p>
            <p className="text-sm text-blue-100">Quản lý tài khoản</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.action}
                  onClick={() => handleMenuClick(item.action)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700 font-medium"
                >
                  <Icon size={18} className="text-blue-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}

      {/* Overlay to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserMenu;

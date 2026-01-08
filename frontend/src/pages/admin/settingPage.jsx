import React, { useState } from "react";
import {
  Settings,
  Bell,
  Globe,
  Lock,
  Save,
  Check,
  ChevronRight,
} from "lucide-react";

const SettingPage = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    familyName: "Họ Nguyễn",
    adminEmail: "admin@example.com",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    emailNotification: true,
    systemNotification: true,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-slate-800" : "bg-slate-200"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Cài đặt</h1>
          <p className="text-gray-500 mt-1">
            Quản lý cấu hình và tùy chọn hệ thống
          </p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <section className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-gray-400" />
                <h2 className="font-medium text-gray-900">Cài đặt chung</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-6 py-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tên dòng họ
                </label>
                <input
                  type="text"
                  value={settings.familyName}
                  onChange={(e) =>
                    setSettings({ ...settings, familyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="px-6 py-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email quản trị viên
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, adminEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </section>

          {/* Localization */}
          <section className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-gray-400" />
                <h2 className="font-medium text-gray-900">
                  Ngôn ngữ & Khu vực
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-6 py-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ngôn ngữ
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="px-6 py-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Múi giờ
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="Asia/Ho_Chi_Minh">
                    (UTC+07:00) Hà Nội, TP. Hồ Chí Minh
                  </option>
                  <option value="Asia/Bangkok">(UTC+07:00) Bangkok</option>
                  <option value="Asia/Singapore">(UTC+08:00) Singapore</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-gray-400" />
                <h2 className="font-medium text-gray-900">Thông báo</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Thông báo qua Email
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Nhận email khi có hoạt động mới
                  </p>
                </div>
                <Toggle
                  enabled={settings.emailNotification}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      emailNotification: !settings.emailNotification,
                    })
                  }
                />
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Thông báo hệ thống
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hiển thị thông báo trong ứng dụng
                  </p>
                </div>
                <Toggle
                  enabled={settings.systemNotification}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      systemNotification: !settings.systemNotification,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-gray-400" />
                <h2 className="font-medium text-gray-900">Bảo mật</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Xác thực hai yếu tố
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tăng cường bảo mật tài khoản
                  </p>
                </div>
                <Toggle
                  enabled={settings.twoFactorAuth}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      twoFactorAuth: !settings.twoFactorAuth,
                    })
                  }
                />
              </div>
              <button className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Đổi mật khẩu
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Cập nhật mật khẩu đăng nhập
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-gray-400">Phiên bản 1.0.0</p>
            <button
              onClick={handleSave}
              disabled={saved}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition ${
                saved
                  ? "bg-green-600 text-white"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Đã lưu
                </>
              ) : (
                <>
                  <Save size={16} />
                  Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;

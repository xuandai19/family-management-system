import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ChangePassword = ({ onSuccess = null }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không trùng khớp';
    }

    if (formData.oldPassword === formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được trùng mật khẩu cũ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Gọi API để đổi mật khẩu
      // const response = await changePasswordAPI(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage('Đổi mật khẩu thành công!');
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Lỗi khi đổi mật khẩu. Vui lòng thử lại.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordInput = ({ label, name, value, placeholder }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswords[name] ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors[name]
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-yellow-500 focus:border-transparent'
          }`}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          {showPasswords[name] ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
          <AlertCircle size={16} />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Info Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-amber-700 via-amber-600 to-red-700 text-white p-8 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_1px,rgba(255,255,255,0.1)_1px)] bg-[length:40px_40px]"></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">GIA PHÁ</h2>
              <p className="text-sm text-amber-100">Hệ thống quản lý gia đình</p>
            </div>
          </div>

          {/* Main Text */}
          <h1 className="text-4xl font-bold mb-4">Bảo vệ tài khoản</h1>
          <p className="text-lg text-amber-100 leading-relaxed">
            Thay đổi mật khẩu thường xuyên giúp bảo vệ tài khoản của bạn. Hãy tạo mật khẩu mạnh và duy nhất cho tài khoản Gia Phá.
          </p>
        </div>

        {/* Footer Info */}
        <div className="relative z-10 text-sm text-amber-100">
          <p>🔒 Mật khẩu của bạn được mã hóa và bảo mật an toàn</p>
        </div>
      </div>

      {/* Right Column - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Lock size={32} className="text-amber-700" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h3>
              <p className="text-sm text-gray-500">Cập nhật mật khẩu của bạn để bảo mật</p>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              {errors.submit}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <PasswordInput
              label="Mật khẩu cũ"
              name="oldPassword"
              value={formData.oldPassword}
              placeholder="Nhập mật khẩu hiện tại"
            />

            <PasswordInput
              label="Mật khẩu mới"
              name="newPassword"
              value={formData.newPassword}
              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
            />

            <PasswordInput
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Nhập lại mật khẩu mới"
            />

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 font-medium mb-2">Độ mạnh mật khẩu:</p>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${
                        formData.newPassword.length >= (i + 1) * 4
                          ? i < 1 ? 'bg-green-500' : i < 2 ? 'bg-yellow-500' : 'bg-red-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Đang xử lý...
                </>
              ) : (
                <>Đổi mật khẩu</>
              )}
            </button>
          </form>

          {/* Helper Text */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Mật khẩu phải chứa chữ cái và số để bảo mật tối đa
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

import { useState } from 'react';
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = ({ onSuccess = null }) => {
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Vui lòng nhập email' }));
      return;
    }

    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Call API to send reset code
      // await sendResetCodeAPI(email);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Mã xác nhận đã được gửi đến email của bạn');
      setStep('code');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        email: 'Không tìm thấy tài khoản với email này'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!code || code.length !== 6) {
      setErrors(prev => ({ ...prev, code: 'Vui lòng nhập mã xác nhận 6 chữ số' }));
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Call API to verify code
      // await verifyCodeAPI(email, code);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Xác nhận thành công');
      setStep('reset');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        code: 'Mã xác nhận không đúng'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!newPassword) {
      setErrors(prev => ({ ...prev, password: 'Vui lòng nhập mật khẩu mới' }));
      return;
    }

    if (newPassword.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Mật khẩu phải có ít nhất 6 ký tự' }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Mật khẩu xác nhận không trùng khớp'
      }));
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Call API to reset password
      // await resetPasswordAPI(email, code, newPassword);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Lỗi khi đặt lại mật khẩu. Vui lòng thử lại.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'code') {
      setStep('email');
      setCode('');
    } else if (step === 'reset') {
      setStep('code');
      setNewPassword('');
      setConfirmPassword('');
    }
    setErrors({});
    setSuccessMessage('');
  };

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
          <h1 className="text-4xl font-bold mb-4">Khôi phục tài khoản</h1>
          <p className="text-lg text-amber-100 leading-relaxed">
            Quên mật khẩu? Đừng lo! Chúng tôi sẽ giúp bạn khôi phục quyền truy cập vào tài khoản Gia Phá của bạn.
          </p>
        </div>

        {/* Footer Info */}
        <div className="relative z-10 text-sm text-amber-100">
          <p>🔒 Quá trình khôi phục được bảo vệ bằng xác minh email</p>
        </div>
      </div>

      {/* Right Column - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Mail size={32} className="text-amber-700" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Quên mật khẩu</h3>
              <p className="text-sm text-gray-500">Chúng tôi sẽ giúp bạn đặt lại</p>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle size={20} />
              {successMessage}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleSendCode}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email của bạn
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
              </button>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === 'code' && (
            <form onSubmit={handleVerifyCode}>
              <p className="text-sm text-gray-600 mb-6">
                Chúng tôi đã gửi mã xác nhận đến <strong>{email}</strong>
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã xác nhận
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    if (errors.code) setErrors(prev => ({ ...prev, code: '' }));
                  }}
                  placeholder="000000"
                  className={`w-full px-4 py-3 border rounded-lg text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 transition ${
                    errors.code
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                  }`}
                  maxLength="6"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.code}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang xác nhận...' : 'Xác nhận'}
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full mt-3 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Quay lại
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder="Nhập lại mật khẩu"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded"
                />
                Hiển thị mật khẩu
              </label>

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={20} />
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full mt-3 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Quay lại
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './components/UserAvatar';
import UserInfo from './components/UserInfo';
import UserStats from './components/UserStats';
import UserMenu from './components/UserMenu';
import { Settings, Bell, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
    phone: '0123456789',
    address: '123 Đường ABC, TP HCM',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    avatar: '',
    posts: 5,
    events: 2,
    followers: 150,
    likes: 320,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // TODO: Replace with actual API call to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // const response = await getUserProfileAPI();
        // setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = async (file) => {
    try {
      // TODO: Upload image to server
      // const response = await uploadAvatarAPI(file);
      // setUser(prev => ({ ...prev, avatar: response.data.url }));
      console.log('Image uploaded:', file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUpdateInfo = async (updatedData) => {
    try {
      // TODO: Send updated info to server
      // const response = await updateUserProfileAPI(updatedData);
      setUser(prev => ({ ...prev, ...updatedData }));
      alert('Đã cập nhật thông tin thành công');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Lỗi khi cập nhật thông tin');
    }
  };

  const handleMenuNavigate = (action) => {
    switch (action) {
      case 'profile':
        setActiveSection('overview');
        break;
      case 'change-password':
        navigate('/user/change-password');
        break;
      case 'notifications':
        setActiveSection('notifications');
        break;
      case 'settings':
        setActiveSection('settings');
        break;
      case 'security':
        setActiveSection('security');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      // TODO: Call logout API
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải hồ sơ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 via-amber-600 to-red-700 text-white border-b border-amber-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Thông tin tài khoản</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-amber-600 rounded-lg transition" title="Notifications">
              <Bell size={24} className="text-white" />
            </button>
            <UserMenu userName={user.name} onNavigate={handleMenuNavigate} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Avatar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <UserAvatar
                  userImage={user.avatar}
                  userName={user.name}
                  onImageChange={handleImageChange}
                  isEditable={true}
                />
              </div>
            </div>

            {/* Right Column: User Info and Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Info Card */}
              <UserInfo
                email={user.email}
                phone={user.phone}
                fullName={user.name}
                address={user.address}
                dateOfBirth={user.dateOfBirth}
                gender={user.gender}
                onUpdateInfo={handleUpdateInfo}
              />

              {/* User Stats */}
              <UserStats
                posts={user.posts}
                events={user.events}
                followers={user.followers}
                likes={user.likes}
              />
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông báo</h2>
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Bạn không có thông báo nào</p>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings size={28} className="text-amber-700" />
              Cài đặt
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span className="text-gray-700">
Nhận email thông báo</span>
              </label>
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span className="text-gray-700">Hiển thị hồ sơ công khai</span>
              </label>
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-gray-700">Bật chế độ tổi (dark mode)</span>
              </label>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bảo mật</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Mật khẩu</p>
                  <p className="text-sm text-gray-500">Cập nhật mật khẩu của bạn</p>
                </div>
                <button
                  onClick={() => navigate('/user/change-password')}
                  className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition"
                >
                  Thay đổi
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Xác thực hai yếu tố</p>
                  <p className="text-sm text-gray-500">Tăng cường bảo mật tài khoản</p>
                </div>
                <button className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition">
                  Bật
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;

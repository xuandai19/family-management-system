import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserAvatar,
  UserInfo,
  UserStats,
  UserMenu,
} from "../../components/member/profile";
import { Settings, Bell, LogOut, AlertCircle } from "lucide-react";
import { getMyProfile, updateMyProfile } from "../../services/member";
import { uploadSingleImage } from "../../services/common/uploadApi";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyProfile();

      if (response.success && response.data) {
        setUser({
          id: response.data.id,
          name: response.data.full_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          dateOfBirth: response.data.date_of_birth || "",
          gender: response.data.gender || "male",
          avatar: response.data.avatar_url || "",
          posts: response.data.posts_count || 0,
          events: response.data.events_count || 0,
          followers: response.data.followers_count || 0,
          likes: response.data.likes_count || 0,
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Không thể tải thông tin. Vui lòng thử lại sau.");

      // Fallback to localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.profile) {
        setUser({
          id: userData.id,
          name: userData.profile.full_name || "",
          email: userData.email || "",
          phone: userData.profile.phone || "",
          address: userData.profile.address || "",
          dateOfBirth: userData.profile.date_of_birth || "",
          gender: userData.profile.gender || "male",
          avatar: userData.profile.avatar_url || "",
          posts: 0,
          events: 0,
          followers: 0,
          likes: 0,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (file) => {
    try {
      const uploadRes = await uploadSingleImage(file, "avatars");
      if (uploadRes.success && uploadRes.url) {
        await updateMyProfile({ avatar_url: uploadRes.url });
        setUser((prev) => ({ ...prev, avatar: uploadRes.url }));
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const handleUpdateInfo = async (updatedData) => {
    try {
      const response = await updateMyProfile({
        full_name: updatedData.name,
        phone: updatedData.phone,
        address: updatedData.address,
        date_of_birth: updatedData.dateOfBirth,
        gender: updatedData.gender,
      });

      if (response.success) {
        setUser((prev) => ({ ...prev, ...updatedData }));
        alert("Đã cập nhật thông tin thành công");
      } else {
        alert(response.message || "Lỗi khi cập nhật thông tin");
      }
    } catch (err) {
      console.error("Error updating user info:", err);
      alert(err.response?.data?.message || "Lỗi khi cập nhật thông tin");
    }
  };

  const handleMenuNavigate = (action) => {
    switch (action) {
      case "profile":
        setActiveSection("overview");
        break;
      case "change-password":
        navigate("/member/change-password");
        break;
      case "notifications":
        setActiveSection("notifications");
        break;
      case "settings":
        setActiveSection("settings");
        break;
      case "security":
        setActiveSection("security");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      // TODO: Call logout API
      navigate("/login");
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

  if (error && !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 via-amber-600 to-red-700 text-white border-b border-amber-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Thông tin tài khoản</h1>
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-amber-600 rounded-lg transition"
              title="Notifications"
            >
              <Bell size={24} className="text-white" />
            </button>
            <UserMenu
              userName={user.name}
              onNavigate={handleMenuNavigate}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "overview" && (
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

        {activeSection === "notifications" && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông báo</h2>
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Bạn không có thông báo nào</p>
            </div>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings size={28} className="text-amber-700" />
              Cài đặt
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span className="text-gray-700">Nhận email thông báo</span>
              </label>
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span className="text-gray-700">Hiển thị hồ sơ công khai</span>
              </label>
              <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-gray-700">
                  Bật chế độ tổi (dark mode)
                </span>
              </label>
            </div>
          </div>
        )}

        {activeSection === "security" && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bảo mật</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Mật khẩu</p>
                  <p className="text-sm text-gray-500">
                    Cập nhật mật khẩu của bạn
                  </p>
                </div>
                <button
                  onClick={() => navigate("/member/change-password")}
                  className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition"
                >
                  Thay đổi
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">
                    Xác thực hai yếu tố
                  </p>
                  <p className="text-sm text-gray-500">
                    Tăng cường bảo mật tài khoản
                  </p>
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

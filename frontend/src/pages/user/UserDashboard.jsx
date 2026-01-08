import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStats from './components/UserStats';
import { Plus, Calendar, FileText, Users, TrendingUp, Clock } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    posts: 10,
    events: 4,
    followers: 200,
    likes: 450,
  });
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'post',
      title: 'Tập hợp gia đình quą Tế Nguyên Đán',
      date: '2 ngày trước',
      icon: FileText,
    },
    {
      id: 2,
      type: 'event',
      title: 'Sự kiện: Kỷ niệm ngày thành lập',
      date: '5 ngày trước',
      icon: Calendar,
    },
    {
      id: 3,
      type: 'follower',
      title: 'Bạn mới đã theo dõi',
      date: '1 tuần trước',
      icon: Users,
    },
  ]);

  const [quickLinks] = useState([
    { icon: Plus, label: 'Viết bài mới', action: 'new-post', color: 'bg-amber-50 text-amber-700' },
    { icon: Calendar, label: 'Tạo sự kiện', action: 'new-event', color: 'bg-green-50 text-green-600' },
    { icon: Users, label: 'Mời thành viên', action: 'invite', color: 'bg-purple-50 text-purple-600' },
    { icon: TrendingUp, label: 'Xem thống kê', action: 'analytics', color: 'bg-orange-50 text-orange-600' },
  ]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-post':
        navigate('/posts/new');
        break;
      case 'new-event':
        navigate('/events/new');
        break;
      case 'invite':
        navigate('/members/invite');
        break;
      case 'analytics':
        navigate('/user/analytics');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 via-amber-600 to-red-700 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Xin chào! 👋</h1>
          <p className="text-amber-100">Chào mừng trở lại với Hệ thống Quản lý Gia Đình</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hành động nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.action}
                  onClick={() => handleQuickAction(link.action)}
                  className={`${link.color} p-4 rounded-lg hover:shadow-md transition text-left group`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={24} />
                    <span className="font-medium group-hover:translate-x-1 transition">{link.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <UserStats
            posts={stats.posts}
            events={stats.events}
            followers={stats.followers}
            likes={stats.likes}
          />
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={24} className="text-amber-700" />
                Hoạt động gần đây
              </h2>

              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                      >
                        <div className="flex-shrink-0 pt-1">
                          <Icon size={20} className="text-amber-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {index < 2 && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Mới</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Chưa có hoạt động nào</p>
                </div>
              )}

              <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium">
                Xem tất cả
              </button>
            </div>
          </section>

          {/* Upcoming Events */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-amber-700" />
                Sự kiện sắp tới
              </h2>

              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <p className="font-medium text-gray-800">Sinh nhật bác</p>
                  <p className="text-sm text-gray-600">15/01/2026</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <p className="font-medium text-gray-800">Tập hợp họng tháo</p>
                  <p className="text-sm text-gray-600">20/01/2026</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <p className="font-medium text-gray-800">Lễ tế tổ tiên</p>
                  <p className="text-sm text-gray-600">10/02/2026</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium">
                Xem lịch
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

import { FileText, Calendar, Users, Heart } from "lucide-react";

const UserStats = ({ posts = 0, events = 0, followers = 0, likes = 0 }) => {
  const stats = [
    {
      icon: FileText,
      label: "Bài viết",
      value: posts,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Calendar,
      label: "Sự kiện",
      value: events,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Users,
      label: "Người theo dõi",
      value: followers,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Heart,
      label: "Lượt thích",
      value: likes,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <div
      className={`${bg} rounded-lg p-4 text-center hover:shadow-md transition`}
    >
      <div className="flex justify-center mb-2">
        <Icon size={32} className={color} />
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Thống kê hoạt động
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            bg={stat.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default UserStats;

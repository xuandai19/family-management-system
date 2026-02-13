import React from "react";
import {
  Users,
  Shield,
  User,
  UserX,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const PendingStatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Chờ duyệt",
      value: stats.pending,
      icon: Clock,
      from: "from-orange-500",
      to: "to-amber-500",
    },
    {
      label: "Tổng tài khoản",
      value: stats.total,
      icon: Users,
      from: "from-blue-500",
      to: "to-cyan-500",
    },
    {
      label: "Đã duyệt",
      value: stats.approved,
      icon: CheckCircle,
      from: "from-green-500",
      to: "to-emerald-500",
    },
    {
      label: "Từ chối",
      value: stats.rejected,
      icon: XCircle,
      from: "from-red-500",
      to: "to-rose-500",
    },
    {
      label: "Admin",
      value: stats.admins,
      icon: Shield,
      from: "from-purple-500",
      to: "to-violet-500",
    },
    {
      label: "Thành viên",
      value: stats.members,
      icon: User,
      from: "from-cyan-500",
      to: "to-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-gradient-to-r ${card.from} ${card.to} rounded-xl p-4 shadow-lg text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PendingStatsCards;

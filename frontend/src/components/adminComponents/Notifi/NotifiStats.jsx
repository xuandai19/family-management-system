import React from "react";
import { Bell, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const NotifiStats = ({ stats = { total: 0, unread: 0, read: 0, requests: 0 } }) => {
  const statItems = [
    {
      label: "Tổng thông báo",
      value: stats.total || 0,
      icon: Bell,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Chưa đọc",
      value: stats.unread || 0,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Đã đọc",
      value: stats.read || 0,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Yêu cầu",
      value: stats.requests || 0,
      icon: AlertTriangle,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotifiStats;

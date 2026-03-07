import React from "react";
import { Calendar, DollarSign, Clock, CheckCircle } from "lucide-react";

const ProposalStats = ({ stats = {} }) => {
  const statItems = [
    {
      label: "Đề xuất sự kiện",
      value: stats.totalEvents || 0,
      sub: `${stats.pendingEvents || 0} chờ duyệt`,
      icon: Calendar,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Đề xuất chi phí",
      value: stats.totalExpenses || 0,
      sub: `${stats.pendingExpenses || 0} chờ duyệt`,
      icon: DollarSign,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Tổng chờ duyệt",
      value: (stats.pendingEvents || 0) + (stats.pendingExpenses || 0),
      sub: "Cần xử lý",
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Đã xử lý",
      value:
        (stats.approvedEvents || 0) +
        (stats.approvedExpenses || 0) +
        (stats.rejectedEvents || 0) +
        (stats.rejectedExpenses || 0),
      sub: "Tổng đã duyệt/từ chối",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalStats;

import React from "react";
import { FileWarning, Clock, CheckCircle, XCircle } from "lucide-react";

const ReportStats = ({
  stats = { total: 0, pending: 0, resolved: 0, dismissed: 0 },
}) => {
  const statItems = [
    {
      label: "Tổng báo cáo",
      value: stats.total || 0,
      icon: FileWarning,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Chờ xử lý",
      value: stats.pending || 0,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Đã giải quyết",
      value: stats.resolved || 0,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Đã bỏ qua",
      value: stats.dismissed || 0,
      icon: XCircle,
      color: "bg-gray-50 text-gray-600",
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportStats;

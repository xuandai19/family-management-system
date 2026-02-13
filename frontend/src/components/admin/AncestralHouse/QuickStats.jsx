// src/components/adminComponents/AncestralHouse/QuickStats.jsx
import React from "react";
import { Wrench, Banknote, Calendar, CheckCircle } from "lucide-react";

const QuickStats = ({ renovations = [], totalCost = 0 }) => {
  const completedCount = renovations.filter((r) => r.completed_date).length;
  const lastRenovation = renovations[0]; // Đã sort theo ngày mới nhất

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + " tỷ";
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(0) + " triệu";
    }
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
    });
  };

  const stats = [
    {
      label: "Lần tu sửa",
      value: renovations.length,
      icon: Wrench,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Hoàn thành",
      value: completedCount,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Tổng chi phí",
      value: formatCurrency(totalCost),
      icon: Banknote,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Lần gần nhất",
      value: lastRenovation
        ? formatDate(lastRenovation.renovation_date)
        : "N/A",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`${stat.bg} rounded-xl p-4 flex items-center gap-3`}
          >
            <div className={`p-2 ${stat.bg} rounded-lg`}>
              <Icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;

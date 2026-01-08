import React from "react";
import { Users, Heart, UserCheck, UserX } from "lucide-react";

const FamilyStatsCards = ({ stats }) => {
  const cards = [
    { label: "Thành viên", value: stats.totalMembers, icon: Users, from: "from-blue-500", to: "to-cyan-500" },
    { label: "Vợ/Chồng", value: stats.totalSpouses, icon: Heart, from: "from-pink-500", to: "to-rose-500" },
    { label: "Còn sống", value: stats.alive, icon: UserCheck, from: "from-green-500", to: "to-emerald-500" },
    { label: "Đã mất", value: stats.deceased, icon: UserX, from: "from-slate-500", to: "to-gray-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`bg-gradient-to-r ${card.from} ${card.to} rounded-xl p-4 shadow-lg text-white`}>
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

export default FamilyStatsCards;
import React from "react";
import { Search } from "lucide-react";

const NOTIFI_TYPES = {
  event: { label: "Sự kiện" },
  request: { label: "Yêu cầu" },
  system: { label: "Hệ thống" },
  reminder: { label: "Nhắc nhở" },
};

const NotifiFilters = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  unreadCount,
  onMarkAllRead,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <div className="flex gap-1">
        <button
          onClick={() => setActiveTab("unread")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
            activeTab === "unread"
              ? "bg-slate-800 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Chưa đọc
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === "all"
              ? "bg-slate-800 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tất cả
        </button>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition ml-2"
          >
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none w-56"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none bg-white"
        >
          <option value="">Tất cả loại</option>
          {Object.entries(NOTIFI_TYPES).map(([key, val]) => (
            <option key={key} value={key}>
              {val.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NotifiFilters;

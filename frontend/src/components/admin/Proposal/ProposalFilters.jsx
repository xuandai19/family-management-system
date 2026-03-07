import React from "react";
import { Search } from "lucide-react";

const ProposalFilters = ({
  activeCategory,
  setActiveCategory,
  activeStatus,
  setActiveStatus,
  searchTerm,
  setSearchTerm,
  pendingCount,
}) => {
  return (
    <div className="px-4 py-3 border-b border-gray-100 space-y-3">
      {/* Category tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveCategory("events")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeCategory === "events"
                ? "bg-slate-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Đề xuất sự kiện
          </button>
          <button
            onClick={() => setActiveCategory("expenses")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeCategory === "expenses"
                ? "bg-slate-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Đề xuất chi phí
          </button>
        </div>
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
      </div>

      {/* Status filters */}
      <div className="flex gap-1">
        <button
          onClick={() => setActiveStatus("pending")}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition flex items-center gap-1 ${
            activeStatus === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Chờ duyệt
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-yellow-400 text-yellow-900 rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveStatus("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
            activeStatus === "all"
              ? "bg-slate-200 text-slate-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setActiveStatus("approved")}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
            activeStatus === "approved"
              ? "bg-green-100 text-green-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Đã duyệt
        </button>
        <button
          onClick={() => setActiveStatus("rejected")}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
            activeStatus === "rejected"
              ? "bg-red-100 text-red-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Đã từ chối
        </button>
      </div>
    </div>
  );
};

export default ProposalFilters;

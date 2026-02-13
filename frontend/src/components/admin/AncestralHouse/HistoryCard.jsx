// src/components/adminComponents/AncestralHouse/HistoryCard.jsx
import React, { useState } from "react";
import { History, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const HistoryCard = ({ history }) => {
  const [expanded, setExpanded] = useState(false);

  if (!history) {
    return null;
  }

  const isLong = history.length > 300;
  const displayText =
    expanded || !isLong ? history : history.slice(0, 300) + "...";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BookOpen size={20} className="text-purple-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          Lịch sử & Truyền thống
        </h3>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
          {displayText}
        </p>
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              Thu gọn
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Xem thêm
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default HistoryCard;

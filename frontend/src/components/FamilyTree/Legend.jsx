import React from "react";

const Legend = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
      <div className="font-semibold mb-2 text-slate-700">Chú thích:</div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 border-2 border-blue-400 rounded bg-white"></div>
          <span className="text-slate-600">Dòng họ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 border-2 border-pink-400 rounded bg-white"></div>
          <span className="text-slate-600">Vợ/Chồng</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0.5 bg-slate-300"></div>
          <span className="text-slate-600">Huyết thống</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            <div className="w-1.5 h-0.5 bg-pink-300"></div>
            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
            <div className="w-1.5 h-0.5 bg-pink-300"></div>
          </div>
          <span className="text-slate-600">Hôn nhân</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;

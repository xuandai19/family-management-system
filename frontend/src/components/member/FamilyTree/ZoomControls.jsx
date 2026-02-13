import React from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const ZoomControls = ({ scale, onZoomIn, onZoomOut, onReset }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
      <button
        onClick={onZoomOut}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
        title="Thu nhỏ"
      >
        <ZoomOut size={20} />
      </button>
      <span className="text-sm font-medium min-w-[60px] text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={onZoomIn}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
        title="Phóng to"
      >
        <ZoomIn size={20} />
      </button>
      <div className="w-px h-5 bg-slate-300 mx-1"></div>
      <button
        onClick={onReset}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
        title="Đặt lại"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};

export default ZoomControls;

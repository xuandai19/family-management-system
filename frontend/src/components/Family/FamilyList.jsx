// src/components/Family/FamilyList.jsx
import React, { useState } from "react";
import { FAMILY_TREES } from "../../constants/mockData";
import {
  Edit,
  Trash2,
  Plus,
  Network,
  List,
  ArrowRight,
  X,
  Save,
} from "lucide-react";

// Nhận setActiveTab từ App.jsx truyền xuống để có thể chuyển trang
const FamilyList = ({ setActiveTab }) => {
  // State quản lý việc ẩn hiện Modal thêm mới
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Danh sách gia phả
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Quản lý và lưu trữ các dòng họ của bạn
          </p>
        </div>

        {/* Nút Thêm mới - Đã gắn onClick */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-xl shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 font-bold"
        >
          <Plus size={20} strokeWidth={3} />
          Thêm gia phả mới
        </button>
      </div>

      {/* --- GRID CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {FAMILY_TREES.map((tree) => (
          <div
            key={tree.id}
            className="group bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
          >
            {/* Background trang trí phía trên */}
            <div className="h-32 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              {/* Biểu tượng cuốn thư nổi */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-10">
                <span className="font-black text-[10px] uppercase text-center leading-tight">
                  Gia
                  <br />
                  Phả
                </span>
              </div>
            </div>

            <div className="p-8 pt-10 text-center relative">
              <h3 className="text-2xl font-black text-slate-800 mb-1 group-hover:text-red-600 transition-colors">
                {tree.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-8">
                Hệ thống ID: {tree.id}
              </p>

              <div className="flex justify-center gap-6 mb-8">
                <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 shadow-inner">
                  <span className="block font-black text-slate-800 text-xl">
                    {tree.members}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Thành viên
                  </span>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 shadow-inner">
                  <span className="block font-black text-slate-800 text-xl">
                    {tree.generations}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Thế hệ
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS - Đã gắn setActiveTab */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setActiveTab("family-tree")} // Chuyển sang tab Phả Đồ
                  className="w-full py-4 rounded-2xl bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
                >
                  <Network size={18} strokeWidth={2.5} /> Xem Phả Đồ
                  <ArrowRight
                    size={16}
                    className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all"
                  />
                </button>

                <button
                  onClick={() => setActiveTab("family-list")} // Ở lại trang hoặc mở chi tiết danh sách
                  className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest hover:border-slate-800 hover:text-slate-800 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                  <List size={18} strokeWidth={2.5} /> Xem Danh Sách
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL THÊM GIA PHẢ MỚI (PHẦN BỔ SUNG) --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 px-10 py-8 flex justify-between items-center text-white text-left">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                ✨ Tạo Gia Phả Mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-8 text-left">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">
                  Tên dòng họ / Gia đình
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-700 transition-all"
                  placeholder="Ví dụ: Họ Nguyễn Việt Nam..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-[0.2em]">
                  Lời giới thiệu ngắn
                </label>
                <textarea
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-teal-500 h-32 font-medium text-slate-600 transition-all"
                  placeholder="Mô tả sơ lược về nguồn gốc dòng họ..."
                ></textarea>
              </div>
            </div>

            <div className="bg-slate-50 px-10 py-8 flex justify-end gap-4 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors text-xs uppercase tracking-widest"
              >
                Hủy bỏ
              </button>
              <button className="px-10 py-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 font-black shadow-lg shadow-teal-600/30 flex items-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
                <Save size={18} /> Khởi tạo cây phả hệ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyList;

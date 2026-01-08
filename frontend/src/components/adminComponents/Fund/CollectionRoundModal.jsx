import React from "react";
import { X, Save, Banknote } from "lucide-react";

const CollectionRoundModal = ({
  isOpen,
  onClose,
  editingRound,
  form,
  setForm,
  funds,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl">
        <div className="p-5 bg-amber-600 rounded-t-2xl flex justify-between items-center text-white">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Banknote size={20} />
            {editingRound ? "Sửa đợt thu" : "Tạo đợt thu tiền mới"}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tiêu đề đợt thu <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="VD: Thu quỹ giỗ tổ năm 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Mô tả / Nội dung thông báo
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={3}
              placeholder="Kính mời bà con đóng góp quỹ..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mức thu <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={form.amount_per_person}
                onChange={(e) =>
                  setForm({ ...form, amount_per_person: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Đơn vị tính
              </label>
              <select
                value={form.unit_type}
                onChange={(e) =>
                  setForm({ ...form, unit_type: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="person">Theo người</option>
                <option value="household">Theo hộ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Thu vào quỹ <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.fund_id}
              onChange={(e) => setForm({ ...form, fund_id: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">-- Chọn quỹ --</option>
              {funds.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.fund_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Hạn chót
              </label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {editingRound && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Trạng thái
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="active">Đang thu</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition font-medium flex items-center gap-2"
          >
            <Save size={16} />
            {editingRound ? "Cập nhật" : "Tạo đợt thu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionRoundModal;

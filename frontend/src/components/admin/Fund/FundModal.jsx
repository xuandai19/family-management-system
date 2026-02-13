import React from "react";
import { X, Save } from "lucide-react";

const FundModal = ({
  isOpen,
  onClose,
  editingFund,
  fundForm,
  setFundForm,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-slate-800">
            {editingFund ? "Sửa thông tin quỹ" : "Tạo quỹ mới"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tên quỹ <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={fundForm.fund_name}
              onChange={(e) =>
                setFundForm({ ...fundForm, fund_name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="VD: Quỹ giỗ tổ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Mô tả / Ghi chú
            </label>
            <textarea
              value={fundForm.description}
              onChange={(e) =>
                setFundForm({ ...fundForm, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
              placeholder="Mô tả ngắn về quỹ..."
            />
          </div>
          {!editingFund && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Số dư ban đầu
              </label>
              <input
                type="number"
                value={fundForm.balance}
                onChange={(e) =>
                  setFundForm({ ...fundForm, balance: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="0"
              />
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
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium flex items-center gap-2"
          >
            <Save size={16} />
            {editingFund ? "Cập nhật" : "Tạo quỹ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundModal;

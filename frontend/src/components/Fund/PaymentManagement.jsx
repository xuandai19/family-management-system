import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  UserCheck,
  Banknote,
  Calendar,
  Search,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const PaymentManagement = ({
  isOpen,
  onClose,
  round,
  payments,
  members,
  formatCurrency,
  formatDate,
  onConfirmPayment,
  onDeletePayment,
  loading,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchMember, setSearchMember] = useState("");
  const [form, setForm] = useState({
    member_id: "",
    payer_name: "",
    amount: "",
    payment_date: new Date().toISOString().split("T")[0],
    note: "",
  });

  // Reset form khi mở
  useEffect(() => {
    if (round) {
      setForm({
        member_id: "",
        payer_name: "",
        amount: round.amount_per_person || "",
        payment_date: new Date().toISOString().split("T")[0],
        note: "",
      });
    }
  }, [round]);

  if (!isOpen || !round) return null;

  // Lọc members đã đóng
  const paidMemberIds = payments.map((p) => p.member_id).filter(Boolean);

  // Lọc members theo search
  const filteredMembers = members.filter((m) => {
    if (paidMemberIds.includes(m.id)) return false;
    if (!searchMember) return true;
    return m.full_name?.toLowerCase().includes(searchMember.toLowerCase());
  });

  const handleSelectMember = (member) => {
    setForm({
      ...form,
      member_id: member.id,
      payer_name: member.full_name,
    });
    setSearchMember("");
  };

  const handleSubmit = () => {
    if (!form.payer_name && !form.member_id) {
      alert("Vui lòng chọn người đóng hoặc nhập tên");
      return;
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }
    onConfirmPayment({
      round_id: round.id,
      ...form,
    });
    setShowAddForm(false);
    setForm({
      member_id: "",
      payer_name: "",
      amount: round.amount_per_person || "",
      payment_date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };

  const totalCollected = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-3xl relative z-10 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-emerald-600 text-white flex justify-between items-start shrink-0">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-emerald-100 hover:text-white text-sm mb-2"
            >
              <ArrowLeft size={16} />
              Quay lại
            </button>
            <h3 className="font-semibold text-lg">{round.title}</h3>
            <p className="text-emerald-100 text-sm mt-1">
              Mức thu: {formatCurrency(round.amount_per_person)} /{" "}
              {round.unit_type === "household" ? "hộ" : "người"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm">Đã thu được</p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalCollected)}
            </p>
            <p className="text-emerald-100 text-sm">
              {payments.length} người đã đóng
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-5">
          {/* Add Payment Form */}
          {showAddForm ? (
            <div className="bg-emerald-50 rounded-xl p-5 mb-5 border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <UserCheck size={18} />
                Xác nhận đã thu tiền
              </h4>

              <div className="space-y-4">
                {/* Tìm thành viên */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Người đóng <span className="text-rose-500">*</span>
                  </label>
                  {form.member_id ? (
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-emerald-200">
                      <CheckCircle size={18} className="text-emerald-600" />
                      <span className="font-medium">{form.payer_name}</span>
                      <button
                        onClick={() =>
                          setForm({ ...form, member_id: "", payer_name: "" })
                        }
                        className="ml-auto text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl">
                        <Search size={16} className="text-slate-400" />
                        <input
                          type="text"
                          value={searchMember}
                          onChange={(e) => setSearchMember(e.target.value)}
                          className="flex-1 outline-none text-sm"
                          placeholder="Tìm thành viên trong dòng họ..."
                        />
                      </div>
                      {searchMember && filteredMembers.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-auto z-10">
                          {filteredMembers.slice(0, 10).map((m) => (
                            <button
                              key={m.id}
                              onClick={() => handleSelectMember(m)}
                              className="w-full px-4 py-2.5 text-left hover:bg-emerald-50 text-sm"
                            >
                              {m.full_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Hoặc nhập tên trực tiếp */}
                  {!form.member_id && (
                    <input
                      type="text"
                      value={form.payer_name}
                      onChange={(e) =>
                        setForm({ ...form, payer_name: e.target.value })
                      }
                      className="w-full mt-2 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      placeholder="Hoặc nhập tên người đóng (nếu không có trong danh sách)"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Số tiền <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Ngày đóng
                    </label>
                    <input
                      type="date"
                      value={form.payment_date}
                      onChange={(e) =>
                        setForm({ ...form, payment_date: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Ghi chú
                  </label>
                  <input
                    type="text"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="VD: Đóng thay cho bố mẹ"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-white rounded-lg transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Xác nhận đã thu
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full p-4 border-2 border-dashed border-emerald-200 rounded-xl text-emerald-600 hover:bg-emerald-50 transition flex items-center justify-center gap-2 font-medium mb-5"
            >
              <Plus size={20} />
              Xác nhận người đã đóng tiền
            </button>
          )}

          {/* Danh sách đã đóng */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">
              Danh sách đã đóng ({payments.length})
            </h4>
            {payments.length > 0 ? (
              <div className="space-y-2">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {p.family_members?.full_name || p.payer_name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar size={12} />
                          {formatDate(p.payment_date)}
                          {p.note && <span>• {p.note}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-emerald-600">
                        {formatCurrency(p.amount)}
                      </span>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Xóa xác nhận này? Số tiền sẽ được hoàn lại vào quỹ."
                            )
                          ) {
                            onDeletePayment(p.id);
                          }
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <UserCheck size={40} className="mx-auto mb-2 opacity-50" />
                <p>Chưa có ai đóng tiền</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;

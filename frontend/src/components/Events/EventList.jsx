import React, { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  X,
  Calendar,
  MapPin,
  Save,
  User,
  DollarSign,
  Paperclip,
  ClipboardList,
} from "lucide-react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../Api/eventApi.js"; // Import từ file API

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    location: "",
    type: "giỗ",
    status: "Chưa công bố",
    budget: "",
    relatedPerson: "",
    note: "",
  });

  // Fetch events khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      let updatedEvents;
      if (isEditing && formData._id) {
        const updated = await updateEvent(formData._id, formData);
        updatedEvents = events.map(e => e._id === formData._id ? updated : e);
      } else {
        const created = await createEvent(formData);
        updatedEvents = [...events, created];
      }

      setEvents(updatedEvents);
      setShowModal(false);
      setFormData({
        name: "",
        time: "",
        location: "",
        type: "giỗ",
        status: "Chưa công bố",
        budget: "",
        relatedPerson: "",
        note: "",
      });
    } catch (err) {
      alert(`Lỗi khi lưu: ${err}`);
    }
  };

  return (
    <div className="p-8 bg-[#f0f7f4] min-h-screen font-sans text-left">
      {/* HEADER - Giữ nguyên như code bạn */}
      <div className="flex justify-between items-center mb-12">
        <div className="relative">
          <h2 className="text-4xl font-black text-emerald-900 tracking-tighter flex items-center gap-4 italic uppercase">
            <div className="p-4 bg-[#10b981] rounded-3xl text-white shadow-[0_15px_35px_-10px_rgba(16,185,129,0.6)] border-b-4 border-emerald-700">
              <Calendar size={36} />
            </div>
            Quản Lý Sự Kiện Tộc Phả
          </h2>
          <div className="absolute -bottom-3 left-20 w-32 h-2 bg-[#10b981] rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.4)]"></div>
        </div>

        <button
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
          className="flex items-center gap-3 bg-[#065f46] text-white px-10 py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(6,95,70,0.3)] hover:bg-[#059669] hover:-translate-y-1 transition-all duration-300 font-black active:scale-90 text-sm uppercase tracking-[0.2em] border-b-4 border-emerald-900"
        >
          <Plus size={22} strokeWidth={4} /> Khai lập sự kiện
        </button>
      </div>

      {/* DANH SÁCH BẢNG - Thêm loading/error */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(6,78,59,0.15)] overflow-hidden border-2 border-emerald-100">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Giữ nguyên thead */}
            <tr className="bg-[#10b981] border-b-4 border-emerald-700 text-white">
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-emerald-50 text-center w-24">
                Thứ tự
              </th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white">
                Sự kiện & Địa điểm
              </th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white w-1/3 text-center">
                Nội dung ghi chú
              </th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">
                Trạng thái
              </th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-emerald-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-20 text-emerald-600 font-black text-xl">
                  Đang tải sự kiện...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center py-20 text-rose-600 font-black">
                  {error}
                </td>
              </tr>
            ) : events.map((item, index) => (
              <tr
                key={item._id} // Sửa id thành _id từ MongoDB
                className="group hover:bg-[#ecfdf5] transition-all duration-200"
              >
                <td className="px-8 py-10 text-center font-black text-emerald-800 italic text-xl border-r border-emerald-50">
                  #{index + 1}
                </td>

                <td className="px-8 py-10">
                  <div className="flex flex-col gap-2">
                    <span className="font-black text-emerald-950 uppercase text-base tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${
                          item.type === "giỗ" ? "bg-rose-500" : "bg-[#10b981]"
                        } text-white`}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-emerald-800 font-black flex items-center gap-1 italic">
                        <MapPin size={16} className="text-[#10b981]" /> 
                        {item.location}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-10">
                  <div className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100 group-hover:border-[#10b981] group-hover:bg-white transition-all shadow-inner">
                    <p className="text-xs text-emerald-900 leading-relaxed font-bold italic text-left">
                      {item.note || "Hệ thống chưa ghi nhận ghi chú."}
                    </p>
                  </div>
                </td>

                <td className="px-8 py-10 text-center">
                  <span
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-4 text-[11px] font-black uppercase tracking-widest shadow-md ${
                      item.status === "Đã công bố"
                        ? "text-emerald-900 bg-emerald-50 border-[#10b981] shadow-emerald-100"
                        : "text-amber-800 bg-amber-50 border-amber-500 shadow-amber-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-8 py-10 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setFormData({
                          _id: item._id, // Sửa id thành _id
                          name: item.name,
                          time: item.time.split('T')[0], // Format cho input date
                          location: item.location,
                          type: item.type,
                          status: item.status,
                          budget: item.budget,
                          relatedPerson: item.relatedPerson,
                          note: item.note,
                        });
                        setShowModal(true);
                      }}
                      className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-800 active:scale-90 transition-all"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Xác nhận xóa sự kiện?')) {
                          await deleteEvent(item._id);
                          setEvents(events.filter(e => e._id !== item._id));
                        }
                      }}
                      className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-800 active:scale-90 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL - Form tạo/sửa sự kiện */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white rounded-3xl p-8 w-[720px] z-10 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {isEditing ? "Chỉnh sửa sự kiện" : "Khai lập sự kiện"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Đóng"
              >
                <X />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-3 border rounded"
                placeholder="Tên sự kiện"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <input
                type="date"
                className="p-3 border rounded"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />

              <input
                className="p-3 border rounded col-span-2"
                placeholder="Địa điểm"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <select
                className="p-3 border rounded"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="giỗ">giỗ</option>
                <option value="họp">họp</option>
                <option value="lễ tết">lễ tết</option>
                <option value="tu bổ">tu bổ</option>
                <option value="khác">khác</option>
              </select>

              <select
                className="p-3 border rounded"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Chưa công bố">Chưa công bố</option>
                <option value="Đã công bố">Đã công bố</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Hủy">Hủy</option>
              </select>

              <input
                className="p-3 border rounded"
                placeholder="Người liên quan"
                value={formData.relatedPerson}
                onChange={(e) => setFormData({ ...formData, relatedPerson: e.target.value })}
              />

              <input
                className="p-3 border rounded"
                placeholder="Ngân sách"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />

              <textarea
                className="p-3 border rounded col-span-2"
                rows="4"
                placeholder="Ghi chú"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-2xl border font-bold"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold flex items-center gap-2"
              >
                <Save /> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
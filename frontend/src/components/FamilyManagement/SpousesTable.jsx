import React from "react";
import { Loader2, Heart, Eye, Edit, Trash2 } from "lucide-react";

const SpousesTable = ({
  spouses,
  loading,
  onView,
  onEdit,
  onDelete,
  searchTerm,
}) => {
  const filteredSpouses = spouses.filter(
    (s) =>
      !searchTerm ||
      s.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <Loader2 className="animate-spin text-pink-500 mb-3" size={32} />
        <p className="text-slate-500">Đang tải...</p>
      </div>
    );
  }

  if (filteredSpouses.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart size={40} className="text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">Không tìm thấy vợ/chồng nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Họ tên
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Ngày sinh
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Nghề nghiệp
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Quê quán
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Trạng thái
            </th>
            <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredSpouses.map((spouse) => (
            <tr key={spouse.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      spouse.gender === "Male" ? "bg-blue-500" : "bg-pink-500"
                    }`}
                  >
                    {spouse.full_name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {spouse.full_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {spouse.gender === "Male"
                        ? "Nam"
                        : spouse.gender === "Female"
                        ? "Nữ"
                        : "-"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 text-sm text-slate-600">
                {formatDate(spouse.birth_date)}
              </td>
              <td className="px-6 py-3 text-sm text-slate-600">
                {spouse.occupation || "-"}
              </td>
              <td className="px-6 py-3 text-sm text-slate-600">
                {spouse.hometown || "-"}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    spouse.is_alive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {spouse.is_alive ? "Còn sống" : "Đã mất"}
                </span>
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onView(spouse, true)}
                    className="p-1.5 hover:bg-pink-100 rounded-lg text-pink-500 transition-colors"
                    title="Xem chi tiết"
                  >
                    <Eye size={16} />
                  </button>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(spouse)}
                      className="p-1.5 hover:bg-amber-100 rounded-lg text-amber-500 transition-colors"
                      title="Sửa"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(spouse)}
                      className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpousesTable;

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Save,
  UserPlus,
  Heart,
  AlertCircle,
  Info,
  Users,
} from "lucide-react";

const MemberFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  member = null,
  isSpouse = false,
  allMembers = [],
  allSpouses = [],
  marriages = [],
  loading = false,
}) => {
  const isEdit = !!member;

  const initialFormData = {
    full_name: "",
    gender: "Male",
    birth_date: "",
    death_date: "",
    is_alive: true,
    phone: "",
    email: "",
    occupation: "",
    birth_place: "",
    hometown: "",
    address: "",
    burial_place: "",
    bio: "",
    generation_level: "",
    father_id: "",
    mother_id: "",
    // Field mới: chọn bố/mẹ chung
    parent_id: "",
    // Cho spouse
    member_id: "",
    marriage_date: "",
    wedding_location: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedParent, setSelectedParent] = useState(null); // Thông tin bố/mẹ được chọn
  const [parentSpouse, setParentSpouse] = useState(null); // Vợ/chồng của bố/mẹ

  // Tạo map để tra cứu nhanh spouse của member
  // marriages đã có sẵn thông tin spouse_name, spouse_gender từ API
  const memberSpouseMap = useMemo(() => {
    const map = {};
    marriages.forEach((marriage) => {
      if (marriage.spouse_id) {
        map[marriage.member_id] = {
          id: marriage.spouse_id,
          full_name: marriage.spouse_name,
          gender: marriage.spouse_gender,
          marriage_date: marriage.marriage_date,
        };
      }
    });
    console.log("memberSpouseMap:", map); // Debug
    return map;
  }, [marriages]);

  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || "",
        gender: member.gender || "Male",
        birth_date: member.birth_date?.split("T")[0] || "",
        death_date: member.death_date?.split("T")[0] || "",
        is_alive: member.is_alive !== false,
        phone: member.phone || "",
        email: member.email || "",
        occupation: member.occupation || "",
        birth_place: member.birth_place || "",
        hometown: member.hometown || "",
        address: member.address || "",
        burial_place: member.burial_place || "",
        bio: member.bio || "",
        generation_level: member.generation_level || "",
        father_id: member.father_id || "",
        mother_id: member.mother_id || "",
        parent_id: member.father_id || "", // Khi edit, lấy father_id làm parent_id
        member_id: "",
        marriage_date: "",
        wedding_location: "",
      });

      // Cập nhật thông tin parent và spouse nếu đang edit
      if (member.father_id) {
        const parent = allMembers.find((m) => m.id === member.father_id);
        setSelectedParent(parent || null);
        setParentSpouse(memberSpouseMap[member.father_id] || null);
      } else {
        setSelectedParent(null);
        setParentSpouse(null);
      }
    } else {
      setFormData(initialFormData);
      setSelectedParent(null);
      setParentSpouse(null);
    }
    setErrors({});
  }, [member, isOpen, memberSpouseMap, allMembers]);

  // Xử lý khi chọn Bố/Mẹ
  const handleParentSelect = (parentId) => {
    console.log("Selected parentId:", parentId, typeof parentId);

    if (!parentId) {
      // Reset khi bỏ chọn
      setFormData((prev) => ({
        ...prev,
        parent_id: "",
        father_id: "",
        generation_level: "",
      }));
      setSelectedParent(null);
      setParentSpouse(null);
      return;
    }

    // Convert parentId sang number vì value từ select là string
    const parentIdNum = parseInt(parentId, 10);

    const parent = allMembers.find((m) => m.id === parentIdNum);
    console.log("Found parent:", parent);

    if (parent) {
      // Tự động tính đời = đời của bố/mẹ + 1
      const newGenerationLevel = parent.generation_level
        ? parent.generation_level + 1
        : 1; // Nếu cha không có đời thì mặc định đời 1

      // Tìm vợ/chồng của người được chọn
      const spouse = memberSpouseMap[parentIdNum];
      console.log("Found spouse:", spouse);

      setFormData((prev) => ({
        ...prev,
        parent_id: parentId,
        father_id: parentIdNum, // Lưu vào father_id để gửi lên backend (số)
        generation_level: newGenerationLevel,
      }));

      setSelectedParent(parent);
      setParentSpouse(spouse || null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Xử lý đặc biệt cho parent_id
    if (name === "parent_id") {
      handleParentSelect(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Họ tên là bắt buộc";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Clean data before submit
    const submitData = { ...formData };

    // Remove parent_id field (chỉ dùng cho UI)
    delete submitData.parent_id;

    // Convert empty strings to null
    Object.keys(submitData).forEach((key) => {
      if (submitData[key] === "") {
        submitData[key] = null;
      }
    });

    // Convert generation_level to number
    if (submitData.generation_level) {
      submitData.generation_level = parseInt(submitData.generation_level, 10);
    }

    onSubmit(submitData);
  };

  if (!isOpen) return null;

  // Lọc members để hiện trong dropdown (loại bỏ member đang edit)
  const availableParents = allMembers.filter((m) => m.id !== member?.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isSpouse
              ? "bg-gradient-to-r from-pink-500 to-rose-500"
              : "bg-gradient-to-r from-blue-500 to-cyan-500"
          }`}
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {isSpouse ? <Heart size={20} /> : <UserPlus size={20} />}
            {isEdit
              ? isSpouse
                ? "Sửa thông tin Vợ/Chồng"
                : "Sửa thông tin Thành viên"
              : isSpouse
              ? "Thêm Vợ/Chồng mới"
              : "Thêm Thành viên mới"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Họ tên */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên..."
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.full_name ? "border-red-500" : "border-slate-300"
                  }`}
                />
              </div>
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.full_name}
                </p>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>

            {/* Đời (chỉ cho member) - LUÔN TỰ ĐỘNG từ đời cha + 1 */}
            {!isSpouse && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Đời (thế hệ)
                  <span className="text-xs text-blue-500 ml-2">
                    (Tự động = đời cha + 1)
                  </span>
                </label>
                <input
                  type="number"
                  name="generation_level"
                  value={formData.generation_level}
                  readOnly
                  placeholder="Chọn Bố/Mẹ để tự động tính đời..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-100 cursor-not-allowed outline-none"
                />
                {!formData.parent_id && (
                  <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                    <Info size={12} /> Vui lòng chọn Bố/Mẹ ở phần bên dưới để tự
                    động tính đời
                  </p>
                )}
              </div>
            )}

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Ngày sinh
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Còn sống */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_alive"
                id="is_alive"
                checked={formData.is_alive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_alive" className="text-sm text-slate-700">
                Còn sống
              </label>
            </div>

            {/* Ngày mất (nếu không còn sống) */}
            {!formData.is_alive && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ngày mất
                </label>
                <input
                  type="date"
                  name="death_date"
                  value={formData.death_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* ================ PHẦN BỐ MẸ (chỉ cho member) ================ */}
            {!isSpouse && (
              <div className="md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-blue-500" />
                  Thông tin Bố Mẹ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dropdown chọn Bố/Mẹ */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Chọn Bố/Mẹ
                    </label>
                    <select
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="">-- Chọn Bố/Mẹ --</option>
                      {availableParents.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.full_name} ({m.gender === "Male" ? "Nam" : "Nữ"})
                          {m.generation_level
                            ? ` - Đời ${m.generation_level}`
                            : ""}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-400 mt-1">
                      Chọn từ bảng family_members
                    </p>
                  </div>

                  {/* Hiển thị Vợ/Chồng tự động */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Vợ/Chồng
                      {parentSpouse && (
                        <span className="text-xs text-pink-500 ml-2">
                          (Tự động)
                        </span>
                      )}
                    </label>
                    {selectedParent ? (
                      parentSpouse ? (
                        // Hiển thị thông tin vợ/chồng từ bảng spouses
                        <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg h-[42px] flex items-center">
                          <div className="flex items-center gap-2">
                            <Heart size={14} className="text-pink-500" />
                            <span className="font-medium text-slate-700 text-sm">
                              {parentSpouse.full_name}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({parentSpouse.gender === "Male" ? "Chồng" : "Vợ"}
                              )
                            </span>
                          </div>
                        </div>
                      ) : (
                        // Không có vợ/chồng
                        <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg h-[42px] flex items-center">
                          <span className="text-sm text-slate-500 italic">
                            Chưa có thông tin vợ/chồng
                          </span>
                        </div>
                      )
                    ) : (
                      // Chưa chọn bố/mẹ
                      <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg h-[42px] flex items-center">
                        <span className="text-sm text-slate-400 italic">
                          Chọn Bố/Mẹ trước
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-1">
                      Tự động từ bảng spouses
                    </p>
                  </div>
                </div>

                {/* Thông tin bổ sung */}
                {selectedParent && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-600 flex items-center gap-1">
                      <Info size={12} />
                      <span>
                        <strong>
                          {formData.full_name || "Thành viên mới"}
                        </strong>{" "}
                        là con của <strong>{selectedParent.full_name}</strong>
                        {parentSpouse && (
                          <>
                            {" "}
                            và <strong>{parentSpouse.full_name}</strong>
                          </>
                        )}
                        {formData.generation_level && (
                          <>
                            , thuộc đời thứ{" "}
                            <strong>{formData.generation_level}</strong>
                          </>
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Liên kết với thành viên (chỉ khi thêm mới spouse) */}
            {isSpouse && !isEdit && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Vợ/Chồng của ai? (tùy chọn)
                  </label>
                  <select
                    name="member_id"
                    value={formData.member_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- Chọn thành viên --</option>
                    {allMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.full_name} ({m.gender === "Male" ? "Nam" : "Nữ"})
                      </option>
                    ))}
                  </select>
                </div>

                {formData.member_id && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày kết hôn
                    </label>
                    <input
                      type="date"
                      name="marriage_date"
                      value={formData.marriage_date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                )}
              </>
            )}

            {/* Điện thoại */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Điện thoại
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0123 456 789"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Nghề nghiệp */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nghề nghiệp
              </label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="VD: Giáo viên, Bác sĩ..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Nơi sinh */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nơi sinh
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="birth_place"
                  value={formData.birth_place}
                  onChange={handleChange}
                  placeholder="Nơi sinh..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Quê quán */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quê quán
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleChange}
                  placeholder="Quê quán..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Địa chỉ hiện tại
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ hiện tại..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Nơi an táng (nếu đã mất, chỉ cho member) */}
            {!isSpouse && !formData.is_alive && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nơi an táng
                </label>
                <input
                  type="text"
                  name="burial_place"
                  value={formData.burial_place}
                  onChange={handleChange}
                  placeholder="Nơi an táng..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* Tiểu sử */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tiểu sử
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Ghi chú về tiểu sử, thành tích..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-medium transition-colors ${
              isSpouse
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-blue-500 hover:bg-blue-600"
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <Save size={16} />
            {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberFormModal;

import api from "../axios";

// ===============================
// QUẢN LÝ THÀNH VIÊN
// ===============================

// Lấy danh sách tài khoản chờ duyệt
export const getPendingMembers = async () => {
  const response = await api.get("/admin/pending-members");
  return response.data;
};

// Lấy tất cả thành viên trong gia phả (cho dropdown)
export const getAllMembers = async () => {
  const response = await api.get("/admin/members");
  return response.data;
};

// Lấy thành viên chưa liên kết tài khoản (cho dropdown duyệt)
export const getUnlinkedMembers = async () => {
  const response = await api.get("/admin/members/unlinked");
  return response.data;
};

// Duyệt tài khoản - liên kết với thành viên
export const approveProfile = async (profileId, memberId) => {
  const response = await api.patch(`/admin/approve-member/${profileId}`, {
    memberId,
  });
  return response.data;
};

// Từ chối tài khoản
export const rejectProfile = async (profileId, reason) => {
  const response = await api.patch(`/admin/reject/${profileId}`, {
    reason,
  });
  return response.data;
};

// Duyệt tài khoản spouse - liên kết với spouse đã có
export const approveSpouseProfile = async (profileId, spouseId) => {
  const response = await api.patch(`/admin/approve-spouse/${profileId}`, {
    spouseId,
  });
  return response.data;
};

// Lấy tất cả spouse (vợ/chồng) cho dropdown
export const getAllSpouses = async () => {
  const response = await api.get("/admin/spouses");
  return response.data;
};

// Lấy spouse chưa liên kết tài khoản (cho dropdown duyệt)
export const getUnlinkedSpouses = async () => {
  const response = await api.get("/admin/spouses/unlinked");
  return response.data;
};

// Lấy danh sách yêu cầu thêm thành viên (ADD_MEMBER)
export const getAddMemberRequests = async (status = "pending") => {
  const response = await api.get("/admin/member-requests", {
    params: { status },
  });
  return response.data;
};

// Duyệt yêu cầu thêm thành viên
export const approveAddMemberRequest = async (requestId, adminNote = "") => {
  const response = await api.patch(
    `/admin/member-requests/${requestId}/approve`,
    { adminNote },
  );
  return response.data;
};

// Từ chối yêu cầu thêm thành viên
export const rejectAddMemberRequest = async (requestId, adminNote = "") => {
  const response = await api.patch(
    `/admin/member-requests/${requestId}/reject`,
    { adminNote },
  );
  return response.data;
};

// ===============================
// QUẢN LÝ NGƯỜI DÙNG
// ===============================

// Lấy tất cả người dùng
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Cập nhật quyền người dùng
export const updateUserRole = async (userId, roleId) => {
  const response = await api.patch(`/admin/users/${userId}/role`, { roleId });
  return response.data;
};

// ===============================
// QUẢN LÝ THÀNH VIÊN GIA PHẢ
// ===============================

// Lấy tất cả thành viên gia phả
export const getAllFamilyMembers = async () => {
  const response = await api.get("/admin/family-members");
  return response.data;
};

// Lấy tất cả thành viên kèm thông tin vợ/chồng
export const getAllMembersWithSpouse = async () => {
  const response = await api.get("/admin/members-with-spouse");
  return response.data;
};

// Lấy tất cả spouse đầy đủ
export const getAllSpousesFull = async () => {
  const response = await api.get("/admin/spouses-full");
  return response.data;
};

// ===============================
// CRUD THÀNH VIÊN GIA PHẢ
// ===============================

// Thêm thành viên gia phả mới
export const createFamilyMember = async (memberData) => {
  const response = await api.post("/admin/family-members", memberData);
  return response.data;
};

// Cập nhật thành viên gia phả
export const updateFamilyMember = async (memberId, memberData) => {
  const response = await api.put(
    `/admin/family-members/${memberId}`,
    memberData,
  );
  return response.data;
};

// Xóa thành viên gia phả
export const deleteFamilyMember = async (memberId) => {
  const response = await api.delete(`/admin/family-members/${memberId}`);
  return response.data;
};

// ===============================
// CRUD VỢ/CHỒNG (SPOUSES)
// ===============================

// Thêm vợ/chồng mới
export const createSpouse = async (spouseData) => {
  const response = await api.post("/admin/spouses", spouseData);
  return response.data;
};

// Cập nhật vợ/chồng
export const updateSpouse = async (spouseId, spouseData) => {
  const response = await api.put(`/admin/spouses/${spouseId}`, spouseData);
  return response.data;
};

// Xóa vợ/chồng
export const deleteSpouse = async (spouseId) => {
  const response = await api.delete(`/admin/spouses/${spouseId}`);
  return response.data;
};

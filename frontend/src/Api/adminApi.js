import api from "./axios";

// Lấy danh sách tài khoản chờ duyệt
export const getPendingMembers = async () => {
  const response = await api.get("/admin/pending-members");
  return response.data;
};

// Kiểm tra tên khớp với ai trong gia phả
export const checkMemberMatch = async (profileId) => {
  const response = await api.get(`/admin/check-match/${profileId}`);
  return response.data;
};

// Lấy tất cả thành viên trong gia phả (cho dropdown)
export const getAllMembers = async () => {
  const response = await api.get("/admin/members");
  return response.data;
};

// Duyệt tài khoản - liên kết với thành viên
export const approveProfile = async (profileId, memberId) => {
  const response = await api.patch(`/admin/approve/${profileId}`, { memberId });
  return response.data;
};

// Từ chối tài khoản
export const rejectProfile = async (profileId, reason) => {
  const response = await api.delete(`/admin/reject/${profileId}`, {
    data: { reason },
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

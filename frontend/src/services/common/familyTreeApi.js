import api from "../axios";

/**
 * Lấy cây gia phả từ một thành viên gốc
 * @param {number|string} rootId - ID của thành viên gốc
 * @returns {Promise} - Dữ liệu cây gia phả
 */
export const getFamilyTree = async (rootId) => {
  const response = await api.get(`/family/tree/${rootId}`);
  return response.data;
};

/**
 * Tìm kiếm thành viên theo tên (chỉ family_members)
 * @param {string} name - Tên cần tìm kiếm
 * @returns {Promise} - Danh sách kết quả tìm kiếm
 */
export const searchMembers = async (name) => {
  const response = await api.get("/family/search", {
    params: { name },
  });
  return response.data;
};

/**
 * Tìm kiếm tất cả (family_members + spouses)
 * @param {string} name - Tên cần tìm kiếm
 * @returns {Promise} - Danh sách kết quả tìm kiếm
 */
export const searchAll = async (name) => {
  const response = await api.get("/family/search-all", {
    params: { name },
  });
  return response.data;
};

/**
 * Lấy danh sách Admin
 * @returns {Promise} - Danh sách admin
 */
export const getAdmins = async () => {
  const response = await api.get("/family/admins");
  return response.data;
};

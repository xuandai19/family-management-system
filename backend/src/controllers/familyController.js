import { supabase } from "../config/supabase.js";

// --- HÀM TỐI ƯU HÓA ĐỂ DỰNG CÂY ---
const buildTree = (allMembers, rootId) => {
  // 1. Tạo một Map để nhóm con theo cha hoặc mẹ
  const childrenMap = new Map();

  allMembers.forEach((member) => {
    // Kiểm tra cha
    if (member.father_id) {
      if (!childrenMap.has(member.father_id))
        childrenMap.set(member.father_id, []);
      childrenMap.get(member.father_id).push(member);
    }
    // Kiểm tra mẹ
    if (member.mother_id) {
      if (!childrenMap.has(member.mother_id))
        childrenMap.set(member.mother_id, []);
      // Tránh push trùng nếu cả cha và mẹ đều trong DB
      const siblings = childrenMap.get(member.mother_id);
      if (!siblings.find((s) => s.id === member.id)) {
        siblings.push(member);
      }
    }
  });

  // 2. Hàm đệ quy sử dụng Map (tránh lặp vô hạn bằng Set để theo dõi ID đã xử lý)
  const visited = new Set();

  const getChildren = (parentId) => {
    if (visited.has(parentId)) return []; // Ngăn chặn vòng lặp vô hạn
    visited.add(parentId);

    const children = childrenMap.get(parentId) || [];
    return children.map((child) => ({
      ...child,
      children: getChildren(child.id),
    }));
  };

  // Tìm thành viên gốc
  const rootMember = allMembers.find((m) => m.id === Number(rootId));
  if (!rootMember) return null;

  return {
    ...rootMember,
    children: getChildren(rootMember.id),
  };
};

// Cập nhật API getFamilyTree
export const getFamilyTree = async (req, res) => {
  try {
    const { rootId } = req.params;

    const { data: allMembers, error } = await supabase
      .from("family_members")
      .select("*");

    if (error) throw error;

    const tree = buildTree(allMembers, rootId);

    if (!tree) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy gốc!" });
    }

    return res.status(200).json({ success: true, data: tree });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
/**
 * Tìm kiếm và trả về cây con cho mỗi kết quả tìm thấy
 */
export const searchMembers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Thiếu tham số tên" });

    // 1. Lấy toàn bộ data (để dựng cây không bị thiếu nhánh)
    const { data: allMembers, error } = await supabase
      .from("family_members")
      .select("*");
    if (error) throw error;

    // 2. Lọc ra những người khớp tên
    const matchedMembers = allMembers.filter((m) =>
      m.full_name.toLowerCase().includes(name.toLowerCase())
    );

    // 3. Với mỗi người khớp tên, dựng cây con bắt đầu từ họ
    const results = matchedMembers.map((member) => ({
      ...member,
      children: buildTree(allMembers, member.id),
    }));

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, roles(role_name), status")
      .eq("role_id", 1);

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

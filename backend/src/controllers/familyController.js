import { supabase } from "../config/supabase.js";

// --- HÀM TỐI ƯU HÓA ĐỂ DỰNG CÂY ---
const buildTree = async (allMembers, allMarriages, allSpouses, rootId) => {
  // 1. Tạo Map nhóm con theo cha
  const childrenMap = new Map();

  allMembers.forEach((member) => {
    if (member.father_id) {
      if (!childrenMap.has(member.father_id)) {
        childrenMap.set(member.father_id, []);
      }
      childrenMap.get(member.father_id).push(member);
    }
  });

  // 2. Tạo Map để lấy spouse từ bảng spouses
  const spouseMap = new Map();
  allMarriages.forEach((marriage) => {
    // Tìm spouse từ bảng spouses
    const spouse = allSpouses.find((s) => s.id === marriage.spouse_id);
    if (spouse) {
      spouseMap.set(marriage.member_id, {
        ...spouse,
        marriage_date: marriage.marriage_date,
        marriage_status: marriage.status,
      });
    }
  });

  // 3. Hàm đệ quy - track visited để tránh vòng lặp
  const visited = new Set();

  const getNodeWithChildren = (memberId) => {
    if (visited.has(memberId)) return null;
    visited.add(memberId);

    const member = allMembers.find((m) => m.id === memberId);
    if (!member) return null;

    const children = childrenMap.get(memberId) || [];
    const spouse = spouseMap.get(memberId);

    return {
      ...member,
      spouse: spouse || null,
      children: children
        .map((child) => getNodeWithChildren(child.id))
        .filter(Boolean),
    };
  };

  return getNodeWithChildren(Number(rootId));
};

// API getFamilyTree
export const getFamilyTree = async (req, res) => {
  try {
    const { rootId } = req.params;

    // Lấy tất cả members (người huyết thống)
    const { data: allMembers, error: membersError } = await supabase
      .from("family_members")
      .select("*");

    if (membersError) throw membersError;

    // Lấy tất cả spouses (vợ/chồng ngoài dòng họ)
    const { data: allSpouses, error: spousesError } = await supabase
      .from("spouses")
      .select("*");

    if (spousesError) throw spousesError;

    // Lấy tất cả marriages (quan hệ hôn nhân)
    const { data: allMarriages, error: marriagesError } = await supabase
      .from("marriages")
      .select("*");

    if (marriagesError) throw marriagesError;

    const tree = await buildTree(
      allMembers,
      allMarriages || [],
      allSpouses || [],
      rootId
    );

    if (!tree) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy thành viên gốc!" });
    }

    return res.status(200).json({ success: true, data: tree });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Tìm kiếm thành viên (chỉ trong family_members - người huyết thống)
 */
export const searchMembers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Thiếu tham số tên" });

    const { data: members, error } = await supabase
      .from("family_members")
      .select("id, full_name, gender, generation_level, avatar_url")
      .ilike("full_name", `%${name}%`);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: members || [],
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Tìm kiếm cả thành viên và vợ/chồng
 */
export const searchAll = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Thiếu tham số tên" });

    // Tìm trong family_members
    const { data: members, error: membersError } = await supabase
      .from("family_members")
      .select("id, full_name, gender, generation_level, avatar_url")
      .ilike("full_name", `%${name}%`);

    if (membersError) throw membersError;

    // Tìm trong spouses
    const { data: spouses, error: spousesError } = await supabase
      .from("spouses")
      .select("id, full_name, gender, avatar_url")
      .ilike("full_name", `%${name}%`);

    if (spousesError) throw spousesError;

    return res.status(200).json({
      success: true,
      data: {
        members: members || [],
        spouses: (spouses || []).map((s) => ({ ...s, is_spouse: true })),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Lấy thông tin chi tiết một thành viên
 */
export const getMemberDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy thông tin member
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("*")
      .eq("id", id)
      .single();

    if (memberError) throw memberError;

    // Lấy thông tin vợ/chồng nếu có
    const { data: marriage, error: marriageError } = await supabase
      .from("marriages")
      .select("*, spouses(*)")
      .eq("member_id", id)
      .single();

    return res.status(200).json({
      success: true,
      data: {
        ...member,
        spouse: marriage?.spouses || null,
        marriage_info: marriage
          ? {
              marriage_date: marriage.marriage_date,
              status: marriage.status,
              wedding_location: marriage.wedding_location,
            }
          : null,
      },
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

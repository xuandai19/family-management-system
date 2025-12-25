import { supabase } from "../config/supabase.js";
export const approveMemberRegistration = async (req, res) => {
  try {
    const { requestId } = req.params; // ID của bản ghi trong update_requests

    // Bước 1: Lấy thông tin yêu cầu hàng chờ
    const { data: request, error: fetchErr } = await supabase
      .from("update_requests")
      .select("*")
      .eq("id", requestId)
      .eq("status", "pending")
      .single();
    if (fetchErr || !request) {
      return res
        .status(404)
        .json({ error: "Yêu cầu không tồn tại hoặc đã được xử lý." });
    }

    const info = request.new_data; // Dữ liệu gia phả từ yêu cầu
    const requesterId = request.requester_id;

    // Bước 2: Tự động tạo bản ghi trong family_members
    const { data: newMember, error: memberErr } = await supabase
      .from("family_members")
      .insert([
        {
          full_name: info.full_name,
          gender: info.gender,
          birth_date: info.birth_date,
          parent_id: info.parent_id,
          address: info.address,
          bio: info.bio,
          is_public: true,
        },
      ])
      .select()
      .select();
    if (memberErr)
      throw new Error("Lỗi khi tạo thành viên gia phả:" + memberErr.message);

    // Bước 3: Đồng bộ Pòile (Gắn member_id và nâng cấp Role lên Member)
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ member_id: newMember.id, role_id: 2, updated_at: new Date() }) // Giả sử role_id 2 là Member
      .eq("id", requesterId);
    if (profileErr)
      throw new Error(
        "Lỗi khi cập nhật hồ sơ người dùng:" + profileErr.message
      );

    // Bước 4: Đáng dấu yêu cầu hoàn tất
    await supabase
      .from("update_requests")
      .update({
        status: "approved",
        admin_id: req.user.id,
        processed_at: new Date(),
      })
      .eq("id", requestId);
    return res.status(200).json({
      success: true,
      message: "Yêu cầu đã được phê duyệt và thành viên gia phả đã được tạo.",
      data: {
        member_id: newMember.id,
        full_name: newMember.full_name,
      },
    });
  } catch (error) {
    console.error("Approve Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
//Admin cần xem có những ai đang xin vào gia phả để còn bấm nút "Duyệt".
export const getPendingMemberRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("update_requests")
      .select(
        `
                id,
                request_type,
                new_data,
                created_at,
                profiles (
                username
                )
            `
      )
      .eq("request_type", "ADD_MEMBER")
      .eq("status", "pending");
    if (error) throw error;
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ===============================
// MEMBER PROFILE CONTROLLER
// Quản lý thông tin cá nhân member
// ===============================

import { supabase } from "../../config/supabase.js";

// Lấy thông tin profile của member
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        `
        *,
        family_member:family_members (
          id,
          full_name,
          birth_date,
          death_date,
          gender,
          phone,
          address,
          occupation,
          generation_level,
          avatar_url,
          is_alive,
          bio
        )
      `,
      )
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật thông tin profile
export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, email, phone, address, bio, avatar_url } = req.body;

    // Chỉ cập nhật những field được gửi lên (không undefined)
    const profileUpdate = { updated_at: new Date().toISOString() };
    if (full_name !== undefined) profileUpdate.full_name = full_name;
    if (email !== undefined) profileUpdate.email = email;
    if (phone !== undefined) profileUpdate.phone = phone;
    if (address !== undefined) profileUpdate.address = address;
    if (bio !== undefined) profileUpdate.bio = bio;
    if (avatar_url !== undefined) profileUpdate.avatar_url = avatar_url;

    // Update profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update(profileUpdate)
      .eq("id", userId)
      .select()
      .single();

    if (profileError) throw profileError;

    // Cập nhật family_member nếu có liên kết
    if (profile.member_id) {
      const memberUpdate = { updated_at: new Date().toISOString() };
      if (full_name !== undefined) memberUpdate.full_name = full_name;
      if (phone !== undefined) memberUpdate.phone = phone;
      if (address !== undefined) memberUpdate.address = address;
      if (avatar_url !== undefined) memberUpdate.avatar_url = avatar_url;

      await supabase
        .from("family_members")
        .update(memberUpdate)
        .eq("id", profile.member_id);
    }

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Đổi mật khẩu
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập mật khẩu hiện tại và mật khẩu mới",
      });
    }

    // Supabase auth update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    res.json({ success: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy thông tin gia phả của member
export const getMyFamilyInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    // Lấy profile và member info
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("member_id")
      .eq("id", userId)
      .single();

    if (error || !profile.member_id) {
      return res.json({ success: true, data: null });
    }

    // Lấy thông tin member với quan hệ gia đình
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select(
        `
        *,
        father:family_members!family_members_father_id_fkey (id, full_name),
        mother:family_members!family_members_mother_id_fkey (id, full_name),
        spouse:family_members!family_members_spouse_id_fkey (id, full_name)
      `,
      )
      .eq("id", profile.member_id)
      .single();

    if (memberError) throw memberError;

    // Lấy con cái
    const { data: children } = await supabase
      .from("family_members")
      .select("id, full_name, birth_date, gender")
      .or(`father_id.eq.${member.id},mother_id.eq.${member.id}`)
      .order("birth_date");

    res.json({
      success: true,
      data: {
        ...member,
        children: children || [],
      },
    });
  } catch (error) {
    console.error("Error getting family info:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { avatar_url } = req.body;

    if (!avatar_url) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp URL avatar",
      });
    }

    // Update profile
    const { data, error } = await supabase
      .from("profiles")
      .update({ avatar_url, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: "Cập nhật avatar thành công",
      data,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy hoạt động gần đây của member
export const getMyActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    // Lấy các bài đăng của user
    const { data: posts } = await supabase
      .from("posts")
      .select("id, title, created_at, status")
      .eq("created_by", userId)
      .order("created_at", { ascending: false })
      .limit(parseInt(limit));

    // Lấy các đề xuất sự kiện
    const { data: eventProposals } = await supabase
      .from("event_proposals")
      .select("id, title, created_at, status")
      .eq("proposed_by", userId)
      .order("created_at", { ascending: false })
      .limit(parseInt(limit));

    // Lấy các đợt thu đã tham gia
    const { data: profile } = await supabase
      .from("profiles")
      .select("member_id")
      .eq("id", userId)
      .single();

    let payments = [];
    if (profile?.member_id) {
      const { data } = await supabase
        .from("collection_payments")
        .select(
          `
          id, 
          amount, 
          payment_date,
          collection_round:collection_rounds (title)
        `,
        )
        .eq("member_id", profile.member_id)
        .order("payment_date", { ascending: false })
        .limit(parseInt(limit));
      payments = data || [];
    }

    // Combine và sort theo thời gian
    const activities = [
      ...(posts || []).map((p) => ({
        type: "post",
        id: p.id,
        title: p.title,
        status: p.status,
        date: p.created_at,
      })),
      ...(eventProposals || []).map((e) => ({
        type: "event_proposal",
        id: e.id,
        title: e.title,
        status: e.status,
        date: e.created_at,
      })),
      ...payments.map((p) => ({
        type: "payment",
        id: p.id,
        title: p.collection_round?.title,
        amount: p.amount,
        date: p.payment_date,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ success: true, data: activities.slice(0, parseInt(limit)) });
  } catch (error) {
    console.error("Error getting activities:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

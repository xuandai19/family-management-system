import { supabase } from "../config/supabase.js";

// ===============================
// QUẢN LÝ ĐỢT THU TIỀN
// ===============================

// Lấy tất cả đợt thu
export const getAllCollectionRounds = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("collection_rounds")
      .select(
        `
        *,
        funds ( fund_name ),
        profiles ( username )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Lấy đợt thu đang active (cho thành viên xem)
export const getActiveCollectionRounds = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("collection_rounds")
      .select(
        `
        *,
        funds ( fund_name )
      `
      )
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Tạo đợt thu mới
export const createCollectionRound = async (req, res) => {
  try {
    const {
      title,
      description,
      fund_id,
      amount_per_person,
      unit_type,
      start_date,
      end_date,
    } = req.body;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("collection_rounds")
      .insert([
        {
          title,
          description,
          fund_id,
          amount_per_person,
          unit_type: unit_type || "person",
          start_date,
          end_date,
          status: "active",
          created_by: userId,
        },
      ])
      .select(
        `
        *,
        funds ( fund_name )
      `
      )
      .single();

    if (error) throw error;
    return res.status(201).json({
      success: true,
      message: "Tạo đợt thu thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Cập nhật đợt thu
export const updateCollectionRound = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      fund_id,
      amount_per_person,
      unit_type,
      start_date,
      end_date,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("collection_rounds")
      .update({
        title,
        description,
        fund_id,
        amount_per_person,
        unit_type,
        start_date,
        end_date,
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json({
      success: true,
      message: "Cập nhật đợt thu thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Xóa đợt thu
export const deleteCollectionRound = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra có payment nào chưa
    const { data: payments } = await supabase
      .from("collection_payments")
      .select("id")
      .eq("round_id", id)
      .limit(1);

    if (payments && payments.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Không thể xóa đợt thu đã có người đóng tiền",
      });
    }

    const { error } = await supabase
      .from("collection_rounds")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return res.status(200).json({
      success: true,
      message: "Xóa đợt thu thành công",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ===============================
// QUẢN LÝ XÁC NHẬN ĐÃ THU (PAYMENTS)
// ===============================

// Lấy danh sách đã đóng của 1 đợt thu
export const getPaymentsByRound = async (req, res) => {
  try {
    const { roundId } = req.params;

    const { data, error } = await supabase
      .from("collection_payments")
      .select(
        `
        *,
        family_members ( full_name ),
        profiles ( username )
      `
      )
      .eq("round_id", roundId)
      .order("payment_date", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Admin xác nhận đã thu tiền từ 1 người
export const confirmPayment = async (req, res) => {
  try {
    const { round_id, member_id, payer_name, amount, payment_date, note } =
      req.body;
    const userId = req.user.id;

    // 1. Lấy thông tin đợt thu để biết fund_id
    const { data: round, error: roundError } = await supabase
      .from("collection_rounds")
      .select("fund_id, title")
      .eq("id", round_id)
      .single();

    if (roundError || !round) {
      return res
        .status(404)
        .json({ success: false, message: "Đợt thu không tồn tại" });
    }

    // 2. Lấy tên người đóng
    let contributorName = payer_name;
    if (member_id) {
      const { data: member } = await supabase
        .from("family_members")
        .select("full_name")
        .eq("id", member_id)
        .single();
      if (member) contributorName = member.full_name;
    }

    // 3. Tạo giao dịch thu vào quỹ
    const { data: fund } = await supabase
      .from("funds")
      .select("balance")
      .eq("id", round.fund_id)
      .single();

    const { data: transaction, error: transError } = await supabase
      .from("transactions")
      .insert([
        {
          fund_id: round.fund_id,
          amount: parseFloat(amount),
          type: "income",
          description: `[${round.title}] Thu từ ${contributorName}${
            note ? ` - ${note}` : ""
          }`,
          contributor_id: member_id || null,
          created_by: userId,
        },
      ])
      .select()
      .single();

    if (transError) throw transError;

    // 4. Cập nhật số dư quỹ
    await supabase
      .from("funds")
      .update({ balance: parseFloat(fund.balance) + parseFloat(amount) })
      .eq("id", round.fund_id);

    // 5. Ghi nhận payment
    const { data: payment, error: payError } = await supabase
      .from("collection_payments")
      .insert([
        {
          round_id,
          member_id: member_id || null,
          payer_name: contributorName,
          amount: parseFloat(amount),
          payment_date: payment_date || new Date().toISOString().split("T")[0],
          note,
          transaction_id: transaction.id,
          created_by: userId,
        },
      ])
      .select(
        `
        *,
        family_members ( full_name )
      `
      )
      .single();

    if (payError) throw payError;

    return res.status(201).json({
      success: true,
      message: `Đã xác nhận thu ${amount.toLocaleString()}đ từ ${contributorName}`,
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Xóa payment (hoàn tiền về quỹ)
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy thông tin payment
    const { data: payment, error: payError } = await supabase
      .from("collection_payments")
      .select("*, collection_rounds(fund_id)")
      .eq("id", id)
      .single();

    if (payError || !payment) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bản ghi" });
    }

    // Xóa transaction liên quan nếu có
    if (payment.transaction_id) {
      // Lấy số dư hiện tại
      const { data: fund } = await supabase
        .from("funds")
        .select("balance")
        .eq("id", payment.collection_rounds.fund_id)
        .single();

      // Trừ lại số tiền
      await supabase
        .from("funds")
        .update({
          balance: parseFloat(fund.balance) - parseFloat(payment.amount),
        })
        .eq("id", payment.collection_rounds.fund_id);

      // Xóa transaction
      await supabase
        .from("transactions")
        .delete()
        .eq("id", payment.transaction_id);
    }

    // Xóa payment
    await supabase.from("collection_payments").delete().eq("id", id);

    return res.status(200).json({
      success: true,
      message: "Đã xóa và hoàn trả số dư quỹ",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Thống kê đợt thu
export const getCollectionStats = async (req, res) => {
  try {
    const { roundId } = req.params;

    // Lấy thông tin đợt thu
    const { data: round } = await supabase
      .from("collection_rounds")
      .select("*")
      .eq("id", roundId)
      .single();

    // Lấy tổng số đã thu
    const { data: payments } = await supabase
      .from("collection_payments")
      .select("amount")
      .eq("round_id", roundId);

    const totalCollected =
      payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
    const totalPayers = payments?.length || 0;

    return res.status(200).json({
      success: true,
      data: {
        round,
        totalCollected,
        totalPayers,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

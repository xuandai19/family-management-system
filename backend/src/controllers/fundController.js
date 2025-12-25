import { supabase } from "../config/supabase.js";

export const getAllFunds = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("funds")
      .select("*")
      .order("fund_name", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// --- 2. TẠO GIAO DỊCH & CẬP NHẬT SỐ DƯ (QUAN TRỌNG) ---
export const createTransaction = async (req, res) => {
  try {
    const { fund_id, amount, type, description } = req.body;
    const userId = req.user.id; // ID người thực hiện (từ middleware auth)
    // A. Kiểm tra quỹ có tồn tại không
    const { data: fund, error: fundError } = await supabase
      .from("funds")
      .select("balance")
      .eq("id", fund_id)
      .single();
    if (fundError || !fund) {
      return res
        .status(404)
        .json({ success: false, message: "Quỹ không tồn tại." });
    }
    // B. Thêm giao dịch mới
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert([
        {
          fund_id,
          amount,
          type,
          description,
          created_by: userId,
        },
      ])
      .select()
      .single();
    if (transactionError) throw transactionError;
    // C. Tính toán số dư mới
    const currentBalance = parseFloat(fund.balance);
    const newBalance =
      type === "income"
        ? currentBalance + parseFloat(amount)
        : currentBalance - parseFloat(amount);
    // D. Cập nhật số dư quỹ
    const { error: updateError } = await supabase
      .from("funds")
      .update({ balance: newBalance })
      .eq("id", fund_id);
    if (updateError) throw updateError;
    return res.status(201).json({
      success: true,
      message: "Giao dịch tạo thành công và số dư quỹ đã được cập nhật.",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// 2. Xóa giao dịch (Và hoàn trả số dư)
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy thông tin giao dịch trước khi xóa để biết số tiền cần hoàn trả
    const { data: transaction } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (!transaction)
      return res.status(404).json({ message: "Giao dịch không tồn tại" });

    // Lấy số dư quỹ hiện tại
    const { data: fund } = await supabase
      .from("funds")
      .select("balance")
      .eq("id", transaction.fund_id)
      .single();

    // Tính toán lại số dư (Đảo ngược logic của giao dịch cũ)
    // Nếu cũ là Thu (income) -> Xóa đi phải Trừ tiền
    // Nếu cũ là Chi (expense) -> Xóa đi phải Cộng tiền lại
    const reverseAdjustment =
      transaction.type === "income" ? -transaction.amount : transaction.amount;

    // Thực hiện xóa và cập nhật song song
    await supabase.from("transactions").delete().eq("id", id);
    await supabase
      .from("funds")
      .update({
        balance: parseFloat(fund.balance) + parseFloat(reverseAdjustment),
      })
      .eq("id", transaction.fund_id);

    return res.status(200).json({
      success: true,
      message: "Đã xóa giao dịch và cập nhật lại số dư quỹ",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// --- 3. XEM LỊCH SỬ GIAO DỊCH CỦA MỘT QUỸ ---
export const getTransactionHistory = async (req, res) => {
  try {
    const { fundId } = req.params;
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        id, amount, type, description, transaction_date,
        profiles ( username )
      `
      )
      .eq("fund_id", fundId)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

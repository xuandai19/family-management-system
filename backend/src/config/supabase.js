import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Khởi tạo dotenv để đọc file .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Thiếu cấu hình Supabase trong file .env");
}

/**
 * 1. Supabase Client thông thường
 * Dùng khi muốn thực hiện các thao tác bị giới hạn bởi RLS
 * (ví dụ: người dùng bình thường chỉ xem được thành viên public)
 */

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 2. Supabase Admin Client (Privileged)
 * Dùng cho các tác vụ Backend như: tạo user auth,
 * ghi đè quyền truy cập để quản lý quỹ hoặc duyệt yêu cầu.
 */

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

console.log("Supabase Config: Đã khởi tạo thành công.");

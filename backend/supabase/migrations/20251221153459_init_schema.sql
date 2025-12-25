-- ==========================================
-- 1. LÀM SẠCH DATABASE (DỌN DẸP CŨ)
-- ==========================================
DROP TABLE IF EXISTS renovation_logs CASCADE;
DROP TABLE IF EXISTS ancestral_house CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS funds CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS member_photos CASCADE;
DROP TABLE IF EXISTS update_requests CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- ==========================================
-- 2. TẠO CÁC BẢNG CƠ SỞ
-- ==========================================

-- Bảng Quyền
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name TEXT UNIQUE NOT NULL
);
INSERT INTO roles (role_name) VALUES ('admin'), ('member'), ('guest');

-- Bảng Thành viên gia phả
CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    birth_date DATE,
    death_date DATE,
    is_alive BOOLEAN DEFAULT true,
    parent_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    spouse_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    generation_level INTEGER,
    avatar_url TEXT,
    bio TEXT,
    address TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Hồ sơ người dùng (Profiles)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    role_id INTEGER REFERENCES roles(id) DEFAULT 3,
    member_id INTEGER REFERENCES family_members(id) UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Hệ thống duyệt (Sửa target_member_id cho phép NULL)
CREATE TABLE update_requests (
    id SERIAL PRIMARY KEY,
    requester_id UUID REFERENCES auth.users(id) NOT NULL,
    target_member_id INTEGER REFERENCES family_members(id), 
    request_type TEXT CHECK (request_type IN ('INFO_UPDATE', 'PHOTO_UPLOAD', 'ADD_MEMBER')),
    old_data JSONB,
    new_data JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'canceled')),
    admin_id UUID REFERENCES auth.users(id),
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Nhà thờ tổ & Trùng tu
CREATE TABLE ancestral_house (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    history TEXT,
    main_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE renovation_logs (
    id SERIAL PRIMARY KEY,
    house_id INTEGER REFERENCES ancestral_house(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cost DECIMAL(15, 2),
    start_date DATE,
    end_date DATE,
    images JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Tài chính & Sự kiện
CREATE TABLE funds (
    id SERIAL PRIMARY KEY,
    fund_name VARCHAR(255) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    amount DECIMAL(15, 2) NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')),
    content TEXT,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 8. HÀM HỖ TRỢ (CÂY GIA PHẢ & KIỂM TRA QUYỀN)
-- ==========================================
-- (Giữ lại hàm get_family_tree_recursive cũ của bạn ở đây)

-- THÊM HÀM MỚI: Kiểm tra Admin không gây đệ quy
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role_id = 1
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 9. THIẾT LẬP BẢO MẬT RLS (ĐÃ SỬA LỖI ĐỆ QUY)
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ancestral_house ENABLE ROW LEVEL SECURITY;
ALTER TABLE funds ENABLE ROW LEVEL SECURITY;

-- 9.1 PROFILES: Tách biệt Insert và Admin Manage
CREATE POLICY "Profiles_Insert_Self" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Profiles_Select_Self" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles_Admin_Manage" ON profiles FOR ALL TO authenticated USING (is_admin());

-- 9.2 UPDATE_REQUESTS: User tạo, Admin duyệt
CREATE POLICY "Requests_Insert_User" ON update_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Requests_Select_User" ON update_requests FOR SELECT TO authenticated USING (auth.uid() = requester_id);
CREATE POLICY "Requests_Admin_Manage" ON update_requests FOR ALL TO authenticated USING (is_admin());

-- 9.3 FAMILY_MEMBERS: Mọi người xem, Admin sửa
CREATE POLICY "Members_Select_All" ON family_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Members_Admin_Manage" ON family_members FOR ALL TO authenticated USING (is_admin());

-- 9.4 NHÀ THỜ & TÀI CHÍNH
CREATE POLICY "House_Select_All" ON ancestral_house FOR SELECT TO authenticated USING (true);
CREATE POLICY "Funds_Select_All" ON funds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin_Manage_House" ON ancestral_house FOR ALL TO authenticated USING (is_admin());
-- ==========================================
-- 4. HỆ THỐNG DUYỆT (UPDATE REQUESTS)
-- ==========================================
DROP TABLE IF EXISTS update_requests CASCADE;
CREATE TABLE update_requests (
    id SERIAL PRIMARY KEY,
    -- QUAN TRỌNG: Trỏ trực tiếp về profiles(id) thay vì auth.users
    requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, 
    target_member_id INTEGER REFERENCES family_members(id), 
    request_type TEXT CHECK (request_type IN ('INFO_UPDATE', 'PHOTO_UPLOAD', 'ADD_MEMBER')),
    old_data JSONB,
    new_data JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'canceled')),
    admin_id UUID REFERENCES profiles(id), -- Admin cũng nên trỏ về profiles
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
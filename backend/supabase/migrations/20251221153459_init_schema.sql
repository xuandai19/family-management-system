-- ==========================================
-- 1. RESET TOÀN BỘ
-- ==========================================
DROP TABLE IF EXISTS renovation_logs CASCADE;
DROP TABLE IF EXISTS ancestral_house CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS funds CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS member_photos CASCADE;
DROP TABLE IF EXISTS update_requests CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS marriages CASCADE;
DROP TABLE IF EXISTS spouses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- ==========================================
-- 2. ROLES
-- ==========================================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name TEXT UNIQUE NOT NULL
);

INSERT INTO roles (role_name)
VALUES ('admin'), ('member'), ('guest');

-- ==========================================
-- 3. FAMILY MEMBERS (CHỈ NGƯỜI HUYẾT THỐNG)
-- ==========================================
CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    birth_date DATE,
    death_date DATE,
    is_alive BOOLEAN DEFAULT true,

    father_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    mother_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,

    generation_level INTEGER,

    phone VARCHAR(20),
    email VARCHAR(255),
    occupation VARCHAR(255),
    birth_place TEXT,
    hometown TEXT,
    address TEXT,
    burial_place TEXT,

    avatar_url TEXT,
    bio TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_family_members_father ON family_members(father_id);
CREATE INDEX idx_family_members_mother ON family_members(mother_id);

-- ==========================================
-- 4. SPOUSES (VỢ/CHỒNG - KHÔNG HUYẾT THỐNG)
-- ==========================================
CREATE TABLE spouses (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    birth_date DATE,
    death_date DATE,
    is_alive BOOLEAN DEFAULT true,

    phone VARCHAR(20),
    email VARCHAR(255),
    occupation VARCHAR(255),
    birth_place TEXT,
    hometown TEXT,
    address TEXT,

    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 5. MARRIAGES (QUAN HỆ HÔN NHÂN)
-- ==========================================
CREATE TABLE marriages (
    id SERIAL PRIMARY KEY,
    
    -- Người trong dòng họ (bắt buộc)
    member_id INTEGER NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
    
    -- Vợ/chồng ngoài dòng họ (bắt buộc)
    spouse_id INTEGER NOT NULL REFERENCES spouses(id) ON DELETE CASCADE,
    
    marriage_date DATE,
    divorce_date DATE,
    wedding_location TEXT,
    notes TEXT,
    
    status TEXT NOT NULL DEFAULT 'married'
        CHECK (status IN ('married', 'divorced', 'widowed')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Mỗi người chỉ có 1 hôn nhân đang active
    CONSTRAINT unique_member_active_marriage 
        UNIQUE (member_id) 
        -- Nếu muốn cho phép nhiều hôn nhân (đã ly dị), bỏ constraint này
);

CREATE INDEX idx_marriages_member ON marriages(member_id);
CREATE INDEX idx_marriages_spouse ON marriages(spouse_id);

-- ==========================================
-- 6. PROFILES (AUTH)
-- ==========================================
-- ==============================
-- DROP nếu cần reset
-- ==============================
DROP TABLE IF EXISTS profiles CASCADE;

-- ==============================
-- PROFILES
-- ==============================
CREATE TABLE profiles (
    -- Khóa chính = auth.users.id
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    -- Thông tin hiển thị
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT,
    type VARCHAR(20)
        CHECK (type IN ('member', 'spouse')),
    -- Phân quyền
    role_id INTEGER NOT NULL
        REFERENCES roles(id)
        DEFAULT 3, -- guest

    -- Liên kết khi đã được duyệt & map vào gia phả
    member_id INTEGER
        REFERENCES family_members(id)
        ON DELETE SET NULL,
    spouse_id INTEGER
        REFERENCES spouses(id)
        ON DELETE SET NULL,

    -- ===== THÔNG TIN CÁ NHÂN (DÙNG KHI ĐĂNG KÝ) =====
    gender VARCHAR(10)
        CHECK (gender IN ('Male', 'Female', 'Other')),

    birth_date DATE,
    phone VARCHAR(20),
    spouse_name VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    hometown VARCHAR(255),

    registration_note TEXT,

    -- ===== TRẠNG THÁI DUYỆT =====
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),

    -- ===== TIMESTAMP =====
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- NÊN LÀ
UNIQUE (email),
CONSTRAINT profile_link_check CHECK (
  (type = 'member' AND member_id IS NOT NULL AND spouse_id IS NULL)
  OR
  (type = 'spouse' AND spouse_id IS NOT NULL AND member_id IS NULL)
  OR
  (status = 'pending' AND member_id IS NULL AND spouse_id IS NULL)
)

);



-- Tạo index để tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_profiles_father_name ON profiles(father_name);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- ==========================================
-- 7. UPDATE REQUESTS
-- ==========================================
CREATE TABLE update_requests (
    id SERIAL PRIMARY KEY,
    requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    target_member_id INTEGER REFERENCES family_members(id),
    request_type TEXT CHECK (
        request_type IN ('INFO_UPDATE', 'PHOTO_UPLOAD', 'ADD_MEMBER', 'DELETE_MEMBER')
    ),
    old_data JSONB,
    new_data JSONB,
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_id UUID REFERENCES profiles(id),
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 8. MEMBER PHOTOS
-- ==========================================
CREATE TABLE member_photos (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    description TEXT,
    photo_date DATE,
    is_featured BOOLEAN DEFAULT false,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 9. DOCUMENTS (Tài liệu gia phả)
-- ==========================================
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    document_type TEXT CHECK (
        document_type IN ('genealogy_book', 'certificate', 'letter', 'history', 'photo_album', 'other')
    ),
    file_url TEXT,
    content TEXT,
    related_member_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 10. EVENTS (Sự kiện)
-- ==========================================
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type TEXT DEFAULT 'other' CHECK (
        event_type IN ('wedding', 'funeral', 'anniversary', 'reunion', 'worship', 'birthday', 'other')
    ),
    event_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    related_member_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    is_recurring BOOLEAN DEFAULT false,
    reminder_days INTEGER DEFAULT 7,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 11. NOTIFICATIONS
-- ==========================================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    type TEXT CHECK (type IN ('event', 'request', 'system', 'reminder')),
    related_id INTEGER,
    related_type TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- ==========================================
-- 12. FUNDS (Quỹ)
-- ==========================================
CREATE TABLE funds (
    id SERIAL PRIMARY KEY,
    fund_name VARCHAR(255) NOT NULL,
    description TEXT,
    balance DECIMAL(15,2) DEFAULT 0,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 13. TRANSACTIONS (Giao dịch)
-- ==========================================
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT,
    description TEXT,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contributor_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_fund ON transactions(fund_id);

-- ==========================================
-- 14. ANCESTRAL HOUSE (Nhà thờ tổ)
-- ==========================================
CREATE TABLE ancestral_house (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    history TEXT,
    established_date DATE,
    images JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 15. RENOVATION LOGS (Lịch sử tu sửa)
-- ==========================================
CREATE TABLE renovation_logs (
    id SERIAL PRIMARY KEY,
    house_id INTEGER REFERENCES ancestral_house(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    cost DECIMAL(15,2),
    renovation_date DATE,
    completed_date DATE,
    images JSONB DEFAULT '[]',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Xóa constraint hoàn toàn (đơn giản nhất)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profile_link_check;
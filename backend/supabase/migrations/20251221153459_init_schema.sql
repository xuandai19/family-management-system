-- ==========================================
-- 1. RESET TOÀN BỘ
-- ==========================================
DROP FUNCTION IF EXISTS get_family_tree_recursive(integer, integer[]);
DROP FUNCTION IF EXISTS set_generation_level();
DROP FUNCTION IF EXISTS is_admin();

DROP TABLE IF EXISTS renovation_logs CASCADE;
DROP TABLE IF EXISTS ancestral_house CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS funds CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS member_photos CASCADE;
DROP TABLE IF EXISTS update_requests CASCADE;
DROP TABLE IF EXISTS marriages CASCADE;
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
-- 3. FAMILY MEMBERS (HUYẾT THỐNG)
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

    avatar_url TEXT,
    bio TEXT,
    address TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 4. MARRIAGES (VỢ - CHỒNG)
-- ==========================================
CREATE TABLE marriages (
    id SERIAL PRIMARY KEY,
    husband_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
    wife_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
    marriage_date DATE,
    status TEXT CHECK (status IN ('married', 'divorced', 'deceased'))
           DEFAULT 'married',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_marriage UNIQUE (husband_id, wife_id)
);

-- ==========================================
-- 5. PROFILES (AUTH)
-- ==========================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    role_id INTEGER REFERENCES roles(id) DEFAULT 3,
    member_id INTEGER REFERENCES family_members(id),
    status VARCHAR(50) DEFAULT 'active',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 6. UPDATE REQUESTS
-- ==========================================
CREATE TABLE update_requests (
    id SERIAL PRIMARY KEY,
    requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    target_member_id INTEGER REFERENCES family_members(id),
    request_type TEXT CHECK (
        request_type IN ('INFO_UPDATE', 'PHOTO_UPLOAD', 'ADD_MEMBER')
    ),
    old_data JSONB,
    new_data JSONB,
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_id UUID REFERENCES profiles(id),
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 7. MEDIA - EVENTS - FUNDS (GIỮ NGUYÊN)
-- ==========================================
CREATE TABLE member_photos (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE funds (
    id SERIAL PRIMARY KEY,
    fund_name VARCHAR(255),
    balance DECIMAL(15,2) DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,
    amount DECIMAL(15,2),
    type TEXT CHECK (type IN ('income','expense')),
    description TEXT,
    created_by UUID REFERENCES profiles(id),
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ancestral_house (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    history TEXT
);

CREATE TABLE renovation_logs (
    id SERIAL PRIMARY KEY,
    house_id INTEGER REFERENCES ancestral_house(id) ON DELETE CASCADE,
    description TEXT,
    cost DECIMAL(15,2),
    renovation_date DATE
);


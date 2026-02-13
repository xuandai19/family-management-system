-- =========================================
-- MEMBER PROPOSALS & ACTIVITIES MIGRATION
-- Tables cho đề xuất và hoạt động member
-- Chỉ tạo các bảng MỚI chưa có trong init_schema
-- =========================================

-- Bảng đề xuất sự kiện (MỚI)
CREATE TABLE IF NOT EXISTS event_proposals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    proposed_date DATE,
    proposed_time TIME,
    location VARCHAR(500),
    estimated_budget DECIMAL(15,2),
    purpose TEXT,
    expected_attendees INTEGER,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    proposed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng đề xuất chi phí (MỚI)
CREATE TABLE IF NOT EXISTS expense_proposals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    purpose TEXT,
    urgency VARCHAR(50) DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high', 'urgent')),
    attachments JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    proposed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng đề xuất tu bổ từ đường - TẠM BỎ
-- CREATE TABLE IF NOT EXISTS renovation_proposals (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     location VARCHAR(500),
--     renovation_type VARCHAR(100),
--     estimated_cost DECIMAL(15,2),
--     estimated_duration VARCHAR(100),
--     reason TEXT,
--     priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
--     attachments JSONB DEFAULT '[]',
--     status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_progress', 'completed')),
--     proposed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
--     reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
--     review_notes TEXT,
--     reviewed_at TIMESTAMPTZ,
--     started_at TIMESTAMPTZ,
--     completed_at TIMESTAMPTZ,
--     created_at TIMESTAMPTZ DEFAULT NOW(),
--     updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- Bảng đăng ký tham gia sự kiện (MỚI)
CREATE TABLE IF NOT EXISTS event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    member_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'absent', 'cancelled')),
    notes TEXT,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Bảng like bài viết (MỚI)
CREATE TABLE IF NOT EXISTS post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Bảng renovation_history KHÔNG CẦN vì đã có renovation_logs trong init_schema

-- Indexes
CREATE INDEX IF NOT EXISTS idx_event_proposals_proposed_by ON event_proposals(proposed_by);
CREATE INDEX IF NOT EXISTS idx_event_proposals_status ON event_proposals(status);
CREATE INDEX IF NOT EXISTS idx_expense_proposals_proposed_by ON expense_proposals(proposed_by);
CREATE INDEX IF NOT EXISTS idx_expense_proposals_status ON expense_proposals(status);
-- CREATE INDEX IF NOT EXISTS idx_renovation_proposals_proposed_by ON renovation_proposals(proposed_by);
-- CREATE INDEX IF NOT EXISTS idx_renovation_proposals_status ON renovation_proposals(status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);

-- Add like_count to posts if not exists
ALTER TABLE posts ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;

-- Trigger to update like_count
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_post_like_count ON post_likes;
CREATE TRIGGER trigger_update_post_like_count
    AFTER INSERT OR DELETE ON post_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_post_like_count();

-- Timestamps triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_event_proposals_updated_at ON event_proposals;
CREATE TRIGGER update_event_proposals_updated_at
    BEFORE UPDATE ON event_proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_expense_proposals_updated_at ON expense_proposals;
CREATE TRIGGER update_expense_proposals_updated_at
    BEFORE UPDATE ON expense_proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- DROP TRIGGER IF EXISTS update_renovation_proposals_updated_at ON renovation_proposals;
-- CREATE TRIGGER update_renovation_proposals_updated_at
--     BEFORE UPDATE ON renovation_proposals
--     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_event_registrations_updated_at ON event_registrations;
CREATE TRIGGER update_event_registrations_updated_at
    BEFORE UPDATE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE event_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Policies for event_proposals
CREATE POLICY "Users can view their own proposals" ON event_proposals
    FOR SELECT USING (auth.uid() = proposed_by);

CREATE POLICY "Admins can view all proposals" ON event_proposals
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can create proposals" ON event_proposals
    FOR INSERT WITH CHECK (auth.uid() = proposed_by);

CREATE POLICY "Users can update their pending proposals" ON event_proposals
    FOR UPDATE USING (auth.uid() = proposed_by AND status = 'pending');

CREATE POLICY "Users can delete their pending proposals" ON event_proposals
    FOR DELETE USING (auth.uid() = proposed_by AND status = 'pending');

-- Similar policies for expense_proposals
CREATE POLICY "Users can view their own expense proposals" ON expense_proposals
    FOR SELECT USING (auth.uid() = proposed_by);

CREATE POLICY "Admins can view all expense proposals" ON expense_proposals
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can create expense proposals" ON expense_proposals
    FOR INSERT WITH CHECK (auth.uid() = proposed_by);

-- Similar policies for renovation_proposals - TẠM BỎ
-- CREATE POLICY "Users can view their own renovation proposals" ON renovation_proposals
--     FOR SELECT USING (auth.uid() = proposed_by);

-- CREATE POLICY "Admins can view all renovation proposals" ON renovation_proposals
--     FOR SELECT USING (
--         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
--     );

-- CREATE POLICY "Users can create renovation proposals" ON renovation_proposals
--     FOR INSERT WITH CHECK (auth.uid() = proposed_by);

-- Policies for event_registrations
CREATE POLICY "Users can view their registrations" ON event_registrations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations" ON event_registrations
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for post_likes
CREATE POLICY "Anyone can view likes" ON post_likes
    FOR SELECT USING (true);

CREATE POLICY "Users can like posts" ON post_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts" ON post_likes
    FOR DELETE USING (auth.uid() = user_id);

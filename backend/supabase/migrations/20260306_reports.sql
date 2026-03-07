-- ==========================================
-- REPORTS (Báo cáo/Phản hồi từ người dùng)
-- ==========================================
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('bug', 'suggestion', 'complaint', 'other')),
    content TEXT NOT NULL,
    target_id INTEGER,
    target_type VARCHAR(50),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    resolution_note TEXT,
    resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reporter ON reports(reporter_id);

-- ==========================================
-- COLLECTION ROUNDS (Đợt thu tiền)
-- ==========================================
CREATE TABLE IF NOT EXISTS collection_rounds (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,           -- Tên đợt thu: "Quỹ giỗ tổ 2026"
    description TEXT,                       -- Mô tả chi tiết
    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,  -- Thu vào quỹ nào
    amount_per_person DECIMAL(15,2) NOT NULL,  -- Mức thu/người hoặc /hộ
    unit_type VARCHAR(50) DEFAULT 'person', -- 'person' hoặc 'household'
    start_date DATE,                        -- Ngày bắt đầu thu
    end_date DATE,                          -- Hạn chót
    status VARCHAR(20) DEFAULT 'active'     -- active, completed, cancelled
        CHECK (status IN ('active', 'completed', 'cancelled')),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- COLLECTION PAYMENTS (Chi tiết người đã đóng)
-- ==========================================
CREATE TABLE IF NOT EXISTS collection_payments (
    id SERIAL PRIMARY KEY,
    round_id INTEGER NOT NULL REFERENCES collection_rounds(id) ON DELETE CASCADE,
    member_id INTEGER REFERENCES family_members(id) ON DELETE SET NULL,  -- Người đóng (có thể null nếu đóng hộ)
    payer_name VARCHAR(255),                -- Tên người đóng (nếu không có trong hệ thống)
    amount DECIMAL(15,2) NOT NULL,          -- Số tiền thực đóng
    payment_date DATE DEFAULT CURRENT_DATE, -- Ngày đóng
    note TEXT,                              -- Ghi chú
    transaction_id INTEGER REFERENCES transactions(id) ON DELETE SET NULL, -- Liên kết giao dịch
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_collection_payments_round ON collection_payments(round_id);
CREATE INDEX idx_collection_payments_member ON collection_payments(member_id);

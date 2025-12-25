-- ==========================================
-- DỮ LIỆU MẪU CHO HỆ THỐNG GIA PHẢ (CHUẨN)
-- ==========================================

-- ==========================================
-- THẾ HỆ 2: CON CỦA ÔNG TỔ (ID = 1)
-- generation_level = 2 (do trigger)
-- ==========================================
INSERT INTO family_members (
    full_name,
    gender,
    birth_date,
    father_id,
    generation_level,
    is_public,
    bio
)
VALUES (
    'Nguyễn Văn Hùng',
    'Male',
    '1950-01-01',
    1,
    2,
    true,
    'Trưởng tộc đời thứ 2'
);

-- ==========================================
-- THẾ HỆ 3: CON CỦA ÔNG HÙNG
-- Giả sử ông Hùng có id = 2
-- generation_level = 3
-- ==========================================
INSERT INTO family_members (
    full_name,
    gender,
    birth_date,
    father_id,
    generation_level,
    is_public
)
VALUES
('Nguyễn Văn Tuấn', 'Male', '1975-05-10', 2, 3, true),
('Nguyễn Thị Mai', 'Female', '1980-08-15', 2, 3, true);

-- =====================
INSERT INTO family_members (
    full_name, gender, birth_date, father_id, generation_level, is_public
)
VALUES
('Nguyễn Văn Nam', 'Male', '2000-01-20', 3, 4, true),
('Nguyễn Phương Linh', 'Female', '2005-03-12', 3, 4, true);
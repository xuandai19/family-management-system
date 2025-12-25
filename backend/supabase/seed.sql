-- ==========================================
-- DỮ LIỆU MẪU CHO HỆ THỐNG GIA PHẢ
-- ==========================================

-- Lưu ý: Migration đã tạo sẵn "Ông Tổ Dòng Họ" với id=1
-- Nên ta chỉ thêm các thế hệ con cháu

-- Thế hệ 2 (Con của Ông Tổ - ID: 1)
INSERT INTO family_members (full_name, gender, birth_date, parent_id, generation_level, is_public, bio)
VALUES 
('Nguyễn Văn Hùng', 'Male', '1950-01-01', 1, 2, true, 'Trưởng tộc đời thứ 5');

-- Thế hệ 3 (Con của ông Hùng)
INSERT INTO family_members (full_name, gender, birth_date, parent_id, generation_level, is_public)
VALUES 
('Nguyễn Văn Tuấn', 'Male', '1975-05-10', 2, 3, true),
('Nguyễn Thị Mai', 'Female', '1980-08-15', 2, 3, true);

-- Thế hệ 4 (Con của ông Tuấn)
INSERT INTO family_members (full_name, gender, birth_date, parent_id, generation_level, is_public)
VALUES 
('Nguyễn Văn Nam', 'Male', '2000-01-20', 3, 4, true),
('Nguyễn Phương Linh', 'Female', '2005-03-12', 3, 4, true);

-- Quỹ gia tộc
INSERT INTO funds (fund_name, balance)
VALUES ('Quỹ Họ Nguyễn', 10000000);

-- Cập nhật sequence
SELECT setval('family_members_id_seq', (SELECT MAX(id) FROM family_members));

-- LƯU Ý: profiles, events, update_requests cần user thật từ auth.users
-- Sau khi đăng ký user qua Supabase Auth, mới INSERT được vào các bảng này
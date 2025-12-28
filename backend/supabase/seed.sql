-- ==========================================
-- SEED DATA: 25 FAMILY MEMBERS + 10 SPOUSES + 10 MARRIAGES
-- ==========================================

-- Xóa dữ liệu cũ (theo thứ tự để tránh lỗi FK)
DELETE FROM marriages;
DELETE FROM spouses;
DELETE FROM family_members;

-- ==========================================
-- ĐỜI 1: Ông Tổ
-- ==========================================
INSERT INTO family_members (id, full_name, gender, birth_date, death_date, is_alive, father_id, mother_id, generation_level, occupation, hometown)
VALUES 
(1, 'Nguyễn Văn Tổ', 'Male', '1920-05-10', '1995-03-20', false, NULL, NULL, 1, 'Nông dân', 'Hà Nam');

-- ==========================================
-- ĐỜI 2: Con của Ông Tổ (3 người)
-- ==========================================
INSERT INTO family_members (id, full_name, gender, birth_date, death_date, is_alive, father_id, mother_id, generation_level, occupation, hometown)
VALUES 
(2, 'Nguyễn Văn Cả', 'Male', '1945-02-15', '2020-08-10', false, 1, NULL, 2, 'Giáo viên', 'Hà Nam'),
(3, 'Nguyễn Văn Hai', 'Male', '1948-07-22', NULL, true, 1, NULL, 2, 'Bác sĩ', 'Hà Nội'),
(4, 'Nguyễn Thị Ba', 'Female', '1952-11-30', NULL, true, 1, NULL, 2, 'Nội trợ', 'Hà Nam');

-- ==========================================
-- ĐỜI 3: Cháu của Ông Tổ (8 người)
-- ==========================================
INSERT INTO family_members (id, full_name, gender, birth_date, death_date, is_alive, father_id, mother_id, generation_level, occupation, hometown)
VALUES 
-- Con của Nguyễn Văn Cả (id=2)
(5, 'Nguyễn Văn Đức', 'Male', '1970-03-12', NULL, true, 2, NULL, 3, 'Kỹ sư', 'Hà Nội'),
(6, 'Nguyễn Thị Hoa', 'Female', '1972-06-25', NULL, true, 2, NULL, 3, 'Kế toán', 'Hà Nội'),
(7, 'Nguyễn Văn Hùng', 'Male', '1975-09-08', NULL, true, 2, NULL, 3, 'Doanh nhân', 'TP.HCM'),

-- Con của Nguyễn Văn Hai (id=3)
(8, 'Nguyễn Thị Lan', 'Female', '1973-01-18', NULL, true, 3, NULL, 3, 'Bác sĩ', 'Hà Nội'),
(9, 'Nguyễn Văn Minh', 'Male', '1976-04-05', NULL, true, 3, NULL, 3, 'Luật sư', 'Đà Nẵng'),
(10, 'Nguyễn Văn Nam', 'Male', '1980-12-20', NULL, true, 3, NULL, 3, 'Kiến trúc sư', 'Hà Nội'),

-- Con của Nguyễn Thị Ba (id=4) - mang họ chồng
(11, 'Trần Văn Tâm', 'Male', '1975-08-14', NULL, true, NULL, 4, 3, 'Giáo viên', 'Hà Nam'),
(12, 'Trần Thị Nga', 'Female', '1978-02-28', NULL, true, NULL, 4, 3, 'Y tá', 'Hà Nam');

-- ==========================================
-- ĐỜI 4: Chắt của Ông Tổ (10 người)
-- ==========================================
INSERT INTO family_members (id, full_name, gender, birth_date, death_date, is_alive, father_id, mother_id, generation_level, occupation, hometown)
VALUES 
-- Con của Nguyễn Văn Đức (id=5)
(13, 'Nguyễn Văn An', 'Male', '1995-05-20', NULL, true, 5, NULL, 4, 'Lập trình viên', 'Hà Nội'),
(14, 'Nguyễn Thị Bình', 'Female', '1998-08-15', NULL, true, 5, NULL, 4, 'Nhân viên văn phòng', 'Hà Nội'),

-- Con của Nguyễn Văn Hùng (id=7)
(15, 'Nguyễn Văn Cường', 'Male', '2000-01-10', NULL, true, 7, NULL, 4, 'Sinh viên', 'TP.HCM'),
(16, 'Nguyễn Thị Dung', 'Female', '2003-04-22', NULL, true, 7, NULL, 4, 'Học sinh', 'TP.HCM'),

-- Con của Nguyễn Văn Minh (id=9)
(17, 'Nguyễn Văn Phong', 'Male', '2001-07-30', NULL, true, 9, NULL, 4, 'Sinh viên', 'Đà Nẵng'),
(18, 'Nguyễn Thị Quỳnh', 'Female', '2004-11-12', NULL, true, 9, NULL, 4, 'Học sinh', 'Đà Nẵng'),

-- Con của Nguyễn Văn Nam (id=10)
(19, 'Nguyễn Văn Sơn', 'Male', '2005-03-08', NULL, true, 10, NULL, 4, 'Học sinh', 'Hà Nội'),
(20, 'Nguyễn Thị Thanh', 'Female', '2008-09-25', NULL, true, 10, NULL, 4, 'Học sinh', 'Hà Nội'),

-- Con của Trần Văn Tâm (id=11)
(21, 'Trần Văn Kiên', 'Male', '2002-06-18', NULL, true, 11, NULL, 4, 'Sinh viên', 'Hà Nam'),
(22, 'Trần Thị Linh', 'Female', '2006-12-05', NULL, true, 11, NULL, 4, 'Học sinh', 'Hà Nam');

-- ==========================================
-- ĐỜI 5: Chút của Ông Tổ (3 người)
-- ==========================================
INSERT INTO family_members (id, full_name, gender, birth_date, death_date, is_alive, father_id, mother_id, generation_level, occupation, hometown)
VALUES 
-- Con của Nguyễn Văn An (id=13)
(23, 'Nguyễn Gia Bảo', 'Male', '2022-02-14', NULL, true, 13, NULL, 5, NULL, 'Hà Nội'),
(24, 'Nguyễn Gia Hân', 'Female', '2024-05-20', NULL, true, 13, NULL, 5, NULL, 'Hà Nội'),

-- Con của Nguyễn Văn Cường (id=15)
(25, 'Nguyễn Minh Khôi', 'Male', '2023-08-30', NULL, true, 15, NULL, 5, NULL, 'TP.HCM');

-- Reset sequence
SELECT setval('family_members_id_seq', 25);

-- ==========================================
-- SPOUSES (10 vợ/chồng - NGOÀI DÒNG HỌ)
-- ==========================================
INSERT INTO spouses (id, full_name, gender, birth_date, death_date, is_alive, occupation, hometown, phone)
VALUES 
(1, 'Trần Thị Tổ Mẫu', 'Female', '1925-08-15', '1998-12-10', false, 'Nông dân', 'Hà Nam', NULL),
(2, 'Phạm Thị Hiền', 'Female', '1948-04-20', '2018-06-15', false, 'Giáo viên', 'Nam Định', NULL),
(3, 'Lê Thị Mai', 'Female', '1950-10-05', NULL, true, 'Bác sĩ', 'Hải Phòng', '0912345678'),
(4, 'Hoàng Thị Ngọc', 'Female', '1972-12-08', NULL, true, 'Giáo viên', 'Hà Nội', '0923456789'),
(5, 'Vũ Văn Thành', 'Male', '1970-05-15', NULL, true, 'Bác sĩ', 'Hải Dương', '0934567890'),
(6, 'Đỗ Thị Hương', 'Female', '1978-03-22', NULL, true, 'Doanh nhân', 'TP.HCM', '0945678901'),
(7, 'Bùi Văn Long', 'Male', '1971-09-30', NULL, true, 'Kỹ sư', 'Hà Nội', '0956789012'),
(8, 'Ngô Thị Thủy', 'Female', '1979-07-18', NULL, true, 'Kế toán', 'Đà Nẵng', '0967890123'),
(9, 'Đinh Thị Vân', 'Female', '1982-01-25', NULL, true, 'Nhà thiết kế', 'Hà Nội', '0978901234'),
(10, 'Phan Thị Yến', 'Female', '1997-11-08', NULL, true, 'Lập trình viên', 'Hà Nội', '0989012345');

-- Reset sequence
SELECT setval('spouses_id_seq', 10);

-- ==========================================
-- MARRIAGES (10 cặp hôn nhân)
-- ==========================================
INSERT INTO marriages (member_id, spouse_id, marriage_date, wedding_location, status)
VALUES 
(1, 1, '1944-01-15', 'Hà Nam', 'widowed'),        -- Ông Tổ + Bà Tổ Mẫu
(2, 2, '1968-05-20', 'Hà Nam', 'widowed'),        -- Văn Cả + Phạm Thị Hiền
(3, 3, '1971-08-10', 'Hà Nội', 'married'),        -- Văn Hai + Lê Thị Mai
(5, 4, '1994-12-25', 'Hà Nội', 'married'),        -- Văn Đức + Hoàng Thị Ngọc
(6, 5, '1995-06-15', 'Hà Nội', 'married'),        -- Thị Hoa + Vũ Văn Thành
(7, 6, '1999-09-09', 'TP.HCM', 'married'),        -- Văn Hùng + Đỗ Thị Hương
(8, 7, '1996-03-20', 'Hà Nội', 'married'),        -- Thị Lan + Bùi Văn Long
(9, 8, '2000-07-07', 'Đà Nẵng', 'married'),       -- Văn Minh + Ngô Thị Thủy
(10, 9, '2003-11-11', 'Hà Nội', 'married'),       -- Văn Nam + Đinh Thị Vân
(13, 10, '2020-02-14', 'Hà Nội', 'married');      -- Văn An + Phan Thị Yến
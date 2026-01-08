# 🏠 Family Management System (Hệ Thống Quản Lý Gia Phả)

Hệ thống quản lý gia phả dòng họ toàn diện, giúp lưu trữ, quản lý thông tin thành viên, sự kiện, quỹ gia đình và nhiều tính năng khác.

## 📋 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
- [Các Chức Năng Chính](#các-chức-năng-chính)
- [Cấu Trúc Database](#cấu-trúc-database)
- [Cài Đặt & Chạy](#cài-đặt--chạy)

---

## 🎯 Tổng Quan

Dự án bao gồm 3 phần chính:

| Thành phần   | Công nghệ                  | Mô tả                             |
| ------------ | -------------------------- | --------------------------------- |
| **Frontend** | React + Vite + TailwindCSS | Giao diện người dùng chính        |
| **Backend**  | Node.js + Express          | API Server                        |
| **Database** | Supabase (PostgreSQL)      | Lưu trữ dữ liệu                   |
| **Auth UI**  | React + Vite               | Giao diện đăng nhập/đăng ký riêng |

---

## 🏗️ Kiến Trúc Hệ Thống

```
family-management-system/
├── auth-ui/          # Giao diện xác thực (Login/Register)
├── backend/          # API Server (Express.js)
│   ├── src/
│   │   ├── controllers/    # Xử lý logic nghiệp vụ
│   │   ├── routes/         # Định tuyến API
│   │   ├── middlewares/    # Xác thực & phân quyền
│   │   └── config/         # Cấu hình Supabase
│   └── supabase/
│       └── migrations/     # Database migrations
└── frontend/         # Giao diện chính (React + Vite)
    └── src/
        ├── components/     # Components tái sử dụng
        ├── pages/          # Các trang (admin/user)
        └── Api/            # Gọi API
```

---

## ⚙️ Các Chức Năng Chính

### 1. 🔐 Xác Thực & Phân Quyền (Authentication & Authorization)

| Chức năng | Mô tả                                    | Endpoint                  |
| --------- | ---------------------------------------- | ------------------------- |
| Đăng ký   | Người dùng đăng ký tài khoản (chờ duyệt) | `POST /api/auth/register` |
| Đăng nhập | Xác thực và nhận JWT token               | `POST /api/auth/login`    |

**Phân quyền (Roles):**

- `admin` - Quản trị viên (toàn quyền)
- `member` - Thành viên gia đình (đã được duyệt)
- `guest` - Khách (mặc định khi đăng ký)

---

### 2. 👥 Quản Lý Thành Viên Gia Phả (Family Members)

| Chức năng               | Mô tả                            | Quyền  |
| ----------------------- | -------------------------------- | ------ |
| Xem cây gia phả         | Hiển thị cây gia phả trực quan   | Public |
| Tìm kiếm thành viên     | Tìm theo tên, thông tin          | Public |
| Xem chi tiết thành viên | Thông tin đầy đủ của thành viên  | Public |
| Thêm thành viên         | Tạo thành viên mới trong gia phả | Admin  |
| Sửa thông tin           | Cập nhật thông tin thành viên    | Admin  |
| Xóa thành viên          | Xóa khỏi gia phả                 | Admin  |

**Thông tin thành viên bao gồm:**

- Họ tên, giới tính, ngày sinh/mất
- Quan hệ cha/mẹ (father_id, mother_id)
- Thế hệ (generation_level)
- Liên hệ: SĐT, email, địa chỉ
- Nghề nghiệp, quê quán, nơi sinh
- Ảnh đại diện, tiểu sử

---

### 3. 💑 Quản Lý Vợ/Chồng (Spouses)

| Chức năng              | Mô tả                         | Quyền |
| ---------------------- | ----------------------------- | ----- |
| Xem danh sách vợ/chồng | Danh sách người ngoài dòng họ | Admin |
| Thêm vợ/chồng          | Thêm vợ/chồng cho thành viên  | Admin |
| Cập nhật thông tin     | Sửa thông tin vợ/chồng        | Admin |
| Xóa vợ/chồng           | Xóa khỏi hệ thống             | Admin |

**Quan hệ hôn nhân (Marriages):**

- Liên kết member với spouse
- Trạng thái: `married`, `divorced`, `widowed`
- Ngày cưới, nơi cưới, ghi chú

---

### 4. ✅ Quản Lý Yêu Cầu Đăng Ký (Pending Requests)

| Chức năng               | Mô tả                              | Quyền |
| ----------------------- | ---------------------------------- | ----- |
| Xem danh sách chờ duyệt | Các tài khoản pending              | Admin |
| Duyệt đăng ký Member    | Liên kết profile với family_member | Admin |
| Duyệt đăng ký Spouse    | Liên kết profile với spouse        | Admin |
| Từ chối đăng ký         | Reject yêu cầu với lý do           | Admin |

**Quy trình đăng ký:**

1. User đăng ký → `status = 'pending'`
2. Admin duyệt → liên kết với `member_id` hoặc `spouse_id`
3. User có quyền `member` sau khi được duyệt

---

### 5. 📅 Quản Lý Sự Kiện (Events)

| Chức năng             | Mô tả              | Quyền   |
| --------------------- | ------------------ | ------- |
| Xem danh sách sự kiện | Tất cả sự kiện     | Member+ |
| Xem sự kiện sắp tới   | Upcoming events    | Member+ |
| Xem chi tiết sự kiện  | Thông tin chi tiết | Member+ |
| Tạo sự kiện           | Thêm sự kiện mới   | Admin   |
| Sửa sự kiện           | Cập nhật thông tin | Admin   |
| Xóa sự kiện           | Xóa sự kiện        | Admin   |

**Loại sự kiện (event_type):**

- `wedding` - Đám cưới
- `funeral` - Tang lễ
- `anniversary` - Kỷ niệm
- `reunion` - Họp mặt
- `worship` - Giỗ/Cúng
- `birthday` - Sinh nhật
- `other` - Khác

---

### 6. 💰 Quản Lý Quỹ Gia Đình (Funds)

| Chức năng         | Mô tả             | Quyền   |
| ----------------- | ----------------- | ------- |
| Xem danh sách quỹ | Tất cả các quỹ    | Member+ |
| Tạo quỹ mới       | Lập quỹ mới       | Admin   |
| Cập nhật quỹ      | Sửa thông tin quỹ | Admin   |
| Xóa quỹ           | Xóa quỹ           | Admin   |

**Giao dịch (Transactions):**
| Chức năng | Mô tả | Quyền |
|-----------|-------|-------|
| Xem lịch sử giao dịch | Theo quỹ hoặc tất cả | Member+ |
| Tạo giao dịch | Thu/Chi tiền | Admin |
| Xóa giao dịch | Xóa giao dịch | Admin |

**Loại giao dịch:**

- `income` - Thu (đóng góp, quyên góp)
- `expense` - Chi (tu sửa, sự kiện, ...)

---

### 7. 📋 Quản Lý Đợt Thu Tiền (Collection Rounds)

| Chức năng                  | Mô tả                     | Quyền   |
| -------------------------- | ------------------------- | ------- |
| Xem các đợt thu            | Danh sách đợt thu         | Member+ |
| Xem đợt thu đang hoạt động | Active rounds             | Member+ |
| Thống kê đợt thu           | Số người đã đóng, còn lại | Member+ |
| Tạo đợt thu                | Lập đợt thu mới           | Admin   |
| Cập nhật đợt thu           | Sửa thông tin             | Admin   |
| Xóa đợt thu                | Xóa đợt thu               | Admin   |
| Xác nhận thanh toán        | Ghi nhận người đã đóng    | Admin   |
| Xóa thanh toán             | Xóa ghi nhận              | Admin   |

**Thông tin đợt thu:**

- Tên đợt thu, mô tả
- Quỹ liên kết (fund_id)
- Mức thu/người hoặc /hộ
- Thời gian bắt đầu - kết thúc
- Trạng thái: `active`, `completed`, `cancelled`

---

### 8. 🏛️ Quản Lý Nhà Thờ Tổ (Ancestral House)

| Chức năng                | Mô tả                | Quyền   |
| ------------------------ | -------------------- | ------- |
| Xem thông tin nhà thờ tổ | Thông tin chung      | Public  |
| Tạo/Cập nhật nhà thờ tổ  | Sửa thông tin        | Member+ |
| Xem lịch sử tu sửa       | Danh sách renovation | Public  |
| Thêm lịch sử tu sửa      | Ghi nhận tu sửa      | Member+ |
| Sửa lịch sử tu sửa       | Cập nhật thông tin   | Member+ |
| Xóa lịch sử tu sửa       | Xóa ghi nhận         | Member+ |

**Thông tin nhà thờ tổ:**

- Tên, địa chỉ, lịch sử
- Ngày thành lập
- Hình ảnh (JSONB array)

---

### 9. 📝 Quản Lý Bài Viết/Tin Tức (Posts)

| Chức năng                | Mô tả                    | Quyền   |
| ------------------------ | ------------------------ | ------- |
| Xem bài viết đã xuất bản | Tin tức công khai        | Public  |
| Xem chi tiết bài viết    | Nội dung đầy đủ          | Public  |
| Tạo bài viết             | Viết bài mới (chờ duyệt) | Member+ |
| Xem tất cả bài viết      | Kể cả draft, pending     | Admin   |
| Xem bài chờ duyệt        | Pending posts            | Admin   |
| Sửa bài viết             | Cập nhật nội dung        | Admin   |
| Xóa bài viết             | Xóa bài                  | Admin   |
| Duyệt bài viết           | Approve để xuất bản      | Admin   |
| Từ chối bài viết         | Reject với lý do         | Admin   |

**Trạng thái bài viết:**

- `draft` - Nháp
- `pending` - Chờ duyệt
- `published` - Đã xuất bản
- `rejected` - Bị từ chối

**Danh mục (category):**

- `news` - Tin tức
- `history` - Lịch sử
- `announcement` - Thông báo
- `story` - Câu chuyện
- `other` - Khác

---

### 10. 🔔 Quản Lý Thông Báo (Notifications)

| Chức năng              | Mô tả                | Quyền   |
| ---------------------- | -------------------- | ------- |
| Tạo thông báo          | Gửi thông báo        | Member+ |
| Xem tất cả thông báo   | Danh sách thông báo  | Admin   |
| Xem thông báo chưa đọc | Unread notifications | Admin   |
| Đếm thông báo chưa đọc | Count unread         | Admin   |
| Đánh dấu đã đọc        | Mark as read         | Admin   |
| Đánh dấu tất cả đã đọc | Mark all as read     | Admin   |
| Xóa thông báo          | Delete notification  | Admin   |

**Loại thông báo:**

- `event` - Sự kiện
- `request` - Yêu cầu
- `system` - Hệ thống
- `reminder` - Nhắc nhở

---

### 11. 🖼️ Upload Ảnh (Image Upload)

| Chức năng        | Mô tả              | Quyền   |
| ---------------- | ------------------ | ------- |
| Upload 1 ảnh     | Tải lên 1 file ảnh | Member+ |
| Upload nhiều ảnh | Tối đa 10 ảnh      | Member+ |
| Xóa ảnh          | Xóa từ storage     | Member+ |

**Giới hạn:**

- Kích thước tối đa: 5MB/ảnh
- Chỉ chấp nhận file ảnh (image/\*)

---

### 12. 📊 Dashboard Admin

| Chức năng                 | Mô tả                       | Quyền |
| ------------------------- | --------------------------- | ----- |
| Thống kê tổng quan        | Số thành viên, quỹ, sự kiện | Admin |
| Yêu cầu chờ duyệt gần đây | Recent pending requests     | Admin |
| Sự kiện sắp tới           | Upcoming events             | Admin |
| Hoạt động gần đây         | Recent activities           | Admin |

---

### 13. 🚨 Báo Cáo/Phản Hồi (Reports)

| Chức năng           | Mô tả                | Quyền   |
| ------------------- | -------------------- | ------- |
| Tạo báo cáo         | Gửi phản hồi/báo lỗi | Member+ |
| Xem tất cả báo cáo  | Danh sách báo cáo    | Admin   |
| Xem báo cáo pending | Chưa xử lý           | Admin   |
| Đếm báo cáo         | Count reports        | Admin   |
| Giải quyết báo cáo  | Mark as resolved     | Admin   |
| Bỏ qua báo cáo      | Dismiss report       | Admin   |
| Xóa báo cáo         | Delete report        | Admin   |

---

## 🗄️ Cấu Trúc Database

### Các bảng chính:

| Bảng                  | Mô tả                                      |
| --------------------- | ------------------------------------------ |
| `roles`               | Phân quyền (admin, member, guest)          |
| `family_members`      | Thành viên huyết thống                     |
| `spouses`             | Vợ/chồng (ngoài dòng họ)                   |
| `marriages`           | Quan hệ hôn nhân                           |
| `profiles`            | Tài khoản người dùng (liên kết auth.users) |
| `events`              | Sự kiện gia đình                           |
| `funds`               | Quỹ gia đình                               |
| `transactions`        | Giao dịch thu/chi                          |
| `collection_rounds`   | Đợt thu tiền                               |
| `collection_payments` | Chi tiết người đã đóng                     |
| `ancestral_house`     | Nhà thờ tổ                                 |
| `renovation_logs`     | Lịch sử tu sửa                             |
| `posts`               | Bài viết/tin tức                           |
| `notifications`       | Thông báo                                  |
| `documents`           | Tài liệu gia phả                           |
| `update_requests`     | Yêu cầu cập nhật thông tin                 |

---

## 🚀 Cài Đặt & Chạy

### Yêu cầu:

- Node.js >= 18
- npm hoặc yarn
- Supabase account

### Backend:

```bash
cd backend
npm install
npm run dev
```

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Auth UI:

```bash
cd auth-ui
npm install
npm run dev
```

---

## 📱 Giao Diện

### Admin Pages:

- `/admin/dashboard` - Tổng quan
- `/admin/family-tree` - Cây gia phả
- `/admin/pending-members` - Duyệt thành viên
- `/admin/events` - Quản lý sự kiện
- `/admin/members` - Quản lý người dùng
- `/admin/funds` - Quản lý quỹ
- `/admin/ancestral-house` - Nhà thờ tổ
- `/admin/posts` - Bài viết
- `/admin/notifications` - Thông báo
- `/admin/settings` - Cài đặt

### User Pages:

- `/UserDashboard` - Trang chủ người dùng
- `/login` - Đăng nhập
- `/register` - Đăng ký

---

## 🛠️ Công Nghệ Sử Dụng

| Frontend     | Backend         | Database   |
| ------------ | --------------- | ---------- |
| React 18     | Node.js         | Supabase   |
| Vite         | Express.js      | PostgreSQL |
| TailwindCSS  | JWT Auth        |            |
| React Router | Multer (upload) |            |
| Lucide Icons |                 |            |

---

## 📄 License

MIT License - Dự án mã nguồn mở cho cộng đồng.

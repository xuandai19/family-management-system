# 🏠 Hệ Thống Quản Lý Gia Phả (Family Management System)

Hệ thống quản lý gia phả trực tuyến, hỗ trợ quản lý thông tin dòng họ, cây gia phả, quỹ dòng họ, sự kiện và nhiều chức năng khác.

## 📋 Mục Lục

- [Tổng Quan](#-tổng-quan)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Chức Năng Hệ Thống](#-chức-năng-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [API Endpoints](#-api-endpoints)

---

## 🎯 Tổng Quan

Hệ thống được thiết kế với 2 vai trò chính:

- **Admin**: Quản trị viên dòng họ - có toàn quyền quản lý
- **Member**: Thành viên dòng họ - xem thông tin và đề xuất

---

## 🛠 Công Nghệ Sử Dụng

### Frontend

- **React 18** + **Vite** - Framework & Build tool
- **React Router v6** - Điều hướng
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Flow** - Hiển thị cây gia phả

### Backend

- **Node.js** + **Express.js** - Server
- **Supabase** - Database (PostgreSQL) & Authentication
- **JWT** - Xác thực token

---

## 📁 Cấu Trúc Dự Án

```
family-management-system/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Components tái sử dụng
│   │   │   ├── adminComponents/   # Components cho Admin
│   │   │   └── member/            # Components cho Member
│   │   ├── pages/
│   │   │   ├── admin/        # Trang Admin
│   │   │   ├── member/       # Trang Member
│   │   │   └── Auth/         # Trang đăng nhập/đăng ký
│   │   └── services/         # API services
│   └── ...
│
├── backend/                  # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── admin/        # Controllers cho Admin
│   │   │   ├── member/       # Controllers cho Member
│   │   │   └── common/       # Controllers dùng chung
│   │   ├── routes/
│   │   │   ├── admin/        # Routes Admin
│   │   │   ├── member/       # Routes Member
│   │   │   └── common/       # Routes dùng chung
│   │   ├── middlewares/      # Auth & Role middlewares
│   │   └── config/           # Supabase config
│   └── supabase/
│       └── migrations/       # Database migrations
│
└── auth-ui/                  # Auth UI riêng (nếu cần)
```

---

## ⚙️ Chức Năng Hệ Thống

### 🔐 1. Xác Thực (Authentication)

| Chức năng         | Mô tả                                          |
| ----------------- | ---------------------------------------------- |
| Đăng ký tài khoản | Đăng ký với thông tin cá nhân, chờ Admin duyệt |
| Đăng nhập         | Đăng nhập bằng email/password                  |
| Phân quyền        | Admin / Member / Guest                         |
| Đổi mật khẩu      | Thay đổi mật khẩu tài khoản                    |

---

### 👨‍💼 2. Chức Năng ADMIN

#### 📊 2.1. Dashboard

- Thống kê tổng quan: số thành viên, sự kiện, quỹ
- Biểu đồ thu chi
- Sự kiện sắp tới
- Thành viên mới đăng ký

#### 👥 2.2. Quản Lý Thành Viên Gia Phả

| Chức năng         | Mô tả                                    |
| ----------------- | ---------------------------------------- |
| Xem danh sách     | Hiển thị tất cả thành viên trong dòng họ |
| Thêm thành viên   | Thêm người mới vào gia phả (huyết thống) |
| Sửa thông tin     | Cập nhật thông tin cá nhân               |
| Xóa thành viên    | Xóa khỏi gia phả                         |
| Quản lý vợ/chồng  | Thêm/sửa/xóa thông tin vợ/chồng          |
| Thiết lập quan hệ | Cha-mẹ-con, vợ-chồng                     |

#### 🌳 2.3. Cây Gia Phả

- Hiển thị cây gia phả đồ họa (React Flow)
- Zoom, pan, navigate
- Xem chi tiết từng thành viên
- Tìm kiếm trong cây

#### ✅ 2.4. Duyệt Thành Viên Đăng Ký

| Chức năng         | Mô tả                             |
| ----------------- | --------------------------------- |
| Xem danh sách chờ | Các đơn đăng ký pending           |
| Duyệt đơn         | Phê duyệt và liên kết với gia phả |
| Từ chối đơn       | Từ chối với lý do                 |
| Xem lịch sử       | Đơn đã xử lý                      |

#### 📅 2.5. Quản Lý Sự Kiện

| Chức năng       | Mô tả                                |
| --------------- | ------------------------------------ |
| Tạo sự kiện     | Đám cưới, giỗ, họp mặt, sinh nhật... |
| Sửa/Xóa sự kiện | Cập nhật hoặc hủy bỏ                 |
| Lịch sự kiện    | Xem theo tháng/năm                   |
| Nhắc nhở        | Cài đặt ngày nhắc trước sự kiện      |

#### 💰 2.6. Quản Lý Quỹ

| Chức năng | Mô tả                           |
| --------- | ------------------------------- |
| Tạo quỹ   | Quỹ xây dựng, quỹ từ thiện...   |
| Ghi thu   | Ghi nhận đóng góp               |
| Ghi chi   | Ghi nhận chi tiêu               |
| Báo cáo   | Thống kê thu chi theo thời gian |

#### 💵 2.7. Quản Lý Đợt Thu Quỹ

| Chức năng   | Mô tả                      |
| ----------- | -------------------------- |
| Tạo đợt thu | Thông báo đóng quỹ định kỳ |
| Theo dõi    | Xem ai đã đóng/chưa đóng   |
| Ghi nhận    | Cập nhật trạng thái đóng   |
| Đóng đợt    | Kết thúc đợt thu           |

#### 🏛 2.8. Quản Lý Từ Đường

| Chức năng          | Mô tả                     |
| ------------------ | ------------------------- |
| Thông tin từ đường | Tên, địa chỉ, lịch sử     |
| Hình ảnh           | Upload ảnh từ đường       |
| Lịch sử tu bổ      | Ghi nhận các lần sửa chữa |

#### 📝 2.9. Quản Lý Bài Viết

| Chức năng    | Mô tả                       |
| ------------ | --------------------------- |
| Tạo bài viết | Tin tức, lịch sử, thông báo |
| Duyệt bài    | Phê duyệt bài từ member     |
| Xuất bản     | Đăng bài lên hệ thống       |
| Ghim bài     | Đánh dấu bài nổi bật        |

#### 🔔 2.10. Quản Lý Thông Báo

| Chức năng      | Mô tả                       |
| -------------- | --------------------------- |
| Gửi thông báo  | Gửi đến tất cả hoặc cá nhân |
| Loại thông báo | Sự kiện, hệ thống, nhắc nhở |

#### 👤 2.11. Quản Lý Người Dùng

| Chức năng      | Mô tả                           |
| -------------- | ------------------------------- |
| Xem danh sách  | Tất cả tài khoản trong hệ thống |
| Phân quyền     | Nâng/hạ quyền admin             |
| Khóa tài khoản | Vô hiệu hóa tài khoản           |

---

### 👤 3. Chức Năng MEMBER

#### 🏠 3.1. Dashboard

- Thông tin cá nhân
- Sự kiện sắp tới
- Thông báo mới
- Quick links

#### 🌳 3.2. Xem Cây Gia Phả

- Xem cây gia phả đầy đủ
- Tìm kiếm thành viên
- Xem chi tiết từng người

#### 📅 3.3. Sự Kiện

| Chức năng           | Mô tả                           |
| ------------------- | ------------------------------- |
| Xem danh sách       | Các sự kiện của dòng họ         |
| Xem chi tiết        | Thông tin sự kiện               |
| Đăng ký tham gia    | Đăng ký/hủy đăng ký             |
| **Đề xuất sự kiện** | Gửi đề xuất tổ chức sự kiện mới |

#### 💰 3.4. Quỹ Dòng Họ

| Chức năng              | Mô tả                       |
| ---------------------- | --------------------------- |
| Xem thông báo đóng quỹ | Các đợt thu đang mở         |
| Xem lịch sử đóng       | Lịch sử đóng góp cá nhân    |
| Xem báo cáo thu chi    | Báo cáo tài chính công khai |
| **Đề xuất chi phí**    | Đề xuất khoản chi mới       |

#### 🏛 3.5. Từ Đường

- Xem thông tin từ đường
- Xem hình ảnh
- Xem lịch sử tu bổ

#### 📰 3.6. Bài Viết

| Chức năng            | Mô tả                        |
| -------------------- | ---------------------------- |
| Xem bài viết         | Đọc tin tức, lịch sử dòng họ |
| Like bài viết        | Thích bài viết               |
| **Đề xuất bài viết** | Gửi bài viết để admin duyệt  |

#### 👤 3.7. Thông Tin Cá Nhân

| Chức năng             | Mô tả                 |
| --------------------- | --------------------- |
| Xem profile           | Thông tin tài khoản   |
| Cập nhật profile      | Sửa thông tin cá nhân |
| Đổi mật khẩu          | Thay đổi mật khẩu     |
| Xem thông tin gia phả | Quan hệ trong dòng họ |

#### 👶 3.8. Đề Xuất Thêm Thành Viên

- Yêu cầu thêm con/cháu vào gia phả
- Chờ admin duyệt

---

## 🚀 Cài Đặt

### Yêu Cầu

- Node.js 18+
- npm hoặc yarn
- Supabase account

### Backend

```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Điền SUPABASE_URL và SUPABASE_ANON_KEY

npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register     # Đăng ký
POST   /api/auth/login        # Đăng nhập
```

### Admin Routes (`/api/admin/`)

```
# Dashboard
GET    /dashboard/stats       # Thống kê

# Family Members
GET    /family-members        # Danh sách
POST   /family-members        # Thêm mới
PUT    /family-members/:id    # Cập nhật
DELETE /family-members/:id    # Xóa

# Spouses
GET    /spouses               # Danh sách vợ/chồng
POST   /spouses               # Thêm mới
PUT    /spouses/:id           # Cập nhật

# Registration (Duyệt đơn)
GET    /registrations/pending # Đơn chờ duyệt
POST   /registrations/:id/approve
POST   /registrations/:id/reject

# Events
GET    /events                # Danh sách sự kiện
POST   /events                # Tạo sự kiện
PUT    /events/:id            # Cập nhật
DELETE /events/:id            # Xóa

# Funds
GET    /funds                 # Danh sách quỹ
POST   /funds                 # Tạo quỹ
POST   /funds/transaction     # Ghi thu/chi

# Collections (Đợt thu)
GET    /collections           # Danh sách đợt thu
POST   /collections           # Tạo đợt thu
PUT    /collections/:id       # Cập nhật

# Ancestral House
GET    /ancestral-house       # Thông tin từ đường
PUT    /ancestral-house       # Cập nhật
POST   /ancestral-house/renovation  # Thêm lịch sử tu bổ

# Posts
GET    /posts                 # Danh sách bài viết
POST   /posts                 # Tạo bài
PUT    /posts/:id             # Cập nhật
POST   /posts/:id/approve     # Duyệt bài

# Notifications
GET    /notifications         # Danh sách
POST   /notifications         # Gửi thông báo

# Users
GET    /users                 # Danh sách người dùng
PUT    /users/:id/role        # Phân quyền
```

### Member Routes (`/api/member/`)

```
# Family
GET    /family/tree           # Cây gia phả
GET    /family/search         # Tìm kiếm

# Events
GET    /events                # Danh sách sự kiện
GET    /events/upcoming       # Sự kiện sắp tới
POST   /events/propose        # Đề xuất sự kiện
POST   /events/:id/register   # Đăng ký tham gia

# Funds
GET    /funds/report          # Báo cáo thu chi
GET    /funds/collections     # Thông báo đóng quỹ
GET    /funds/my-payments     # Lịch sử đóng góp

# Expenses
POST   /expenses/propose      # Đề xuất chi phí
GET    /expenses/my-proposals # Đề xuất của tôi

# Posts
GET    /posts                 # Bài viết đã xuất bản
POST   /posts/propose         # Đề xuất bài viết
POST   /posts/:id/like        # Like bài viết

# Profile
GET    /profile               # Thông tin cá nhân
PUT    /profile               # Cập nhật
PUT    /profile/password      # Đổi mật khẩu
```

---

## 📊 Database Schema

### Bảng Chính

| Bảng              | Mô tả                             |
| ----------------- | --------------------------------- |
| `roles`           | Phân quyền (admin, member, guest) |
| `family_members`  | Thành viên huyết thống            |
| `spouses`         | Vợ/chồng (không huyết thống)      |
| `marriages`       | Quan hệ hôn nhân                  |
| `profiles`        | Tài khoản người dùng              |
| `events`          | Sự kiện                           |
| `funds`           | Quỹ                               |
| `transactions`    | Giao dịch thu chi                 |
| `ancestral_house` | Thông tin từ đường                |
| `renovation_logs` | Lịch sử tu bổ                     |
| `posts`           | Bài viết                          |
| `notifications`   | Thông báo                         |
| `documents`       | Tài liệu                          |

### Bảng Bổ Sung (Member Proposals)

| Bảng                  | Mô tả                    |
| --------------------- | ------------------------ |
| `event_proposals`     | Đề xuất sự kiện          |
| `expense_proposals`   | Đề xuất chi phí          |
| `event_registrations` | Đăng ký tham gia sự kiện |
| `post_likes`          | Like bài viết            |

---

## 📝 License

MIT License

---

## 👥 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

// src/constants/mockData.js

export const FAMILY_DATA = [
  {
    id: 1,
    name: "Nguyễn Văn Tổ",
    generation: 1, // Đời thứ 1
    role: "Ông Tổ",
    birthYear: 1920,
    status: "Đã mất",
    gender: "male",
    desc: "Người khai sinh ra dòng họ tại vùng đất này."
  },
  {
    id: 2,
    name: "Nguyễn Văn Cha",
    generation: 2,
    role: "Trưởng Tộc",
    birthYear: 1950,
    status: "Còn sống",
    gender: "male",
    spouse: "Trần Thị Mẹ"
  },
  {
    id: 3,
    name: "Nguyễn Thị Cô",
    generation: 2,
    role: "Thành viên",
    birthYear: 1955,
    status: "Còn sống",
    gender: "female",
    spouse: "Lê Văn Chú"
  },
  {
    id: 4,
    name: "Nguyễn Văn Cháu (Đích Tôn)",
    generation: 3,
    role: "Cháu Đích Tôn",
    birthYear: 1980,
    status: "Còn sống",
    gender: "male",
    spouse: "Phạm Thị Vợ"
  },
  {
    id: 5,
    name: "Nguyễn Thị Chắt",
    generation: 4,
    role: "Thành viên nhỏ",
    birthYear: 2010,
    status: "Còn sống",
    gender: "female",
    spouse: null
  }
];



// src/constants/mockData.js

// ... (Giữ nguyên các dữ liệu cũ nếu muốn)
// src/constants/mockData.js

// Dữ liệu cho danh sách Gia phả (Dashboard)
export const FAMILY_TREES = [
  {
    id: 1,
    name: "Họ Nguyễn",
    members: 60,
    generations: 5,
    image: "https://i.imgur.com/8Q5k5tW.png", 
  },
  {
    id: 2,
    name: "Họ Phạm",
    members: 0,
    generations: 0,
    image: "https://i.imgur.com/8Q5k5tW.png",
  },
  {
    id: 3,
    name: "Gia đình nhỏ",
    members: 4,
    generations: 2,
    image: "https://i.imgur.com/8Q5k5tW.png",
  }
];

// Dữ liệu cho Thư viện (Library)
export const LIBRARY_ITEMS = [
  { 
    id: 1, 
    title: "Gia Phả Họ Nguyễn (Bản gốc)", 
    type: "pdf", 
    category: "Gia Phả", 
    date: "20/12/2023", 
    size: "15 MB",
    author: "Nguyễn Văn A" 
  },
  { 
    id: 2, 
    title: "Lịch sử hình thành dòng họ (1900-2000)", 
    type: "doc", 
    category: "Tài liệu", 
    date: "15/10/2023", 
    size: "2.5 MB",
    author: "Ban biên soạn"
  },
  { 
    id: 3, 
    title: "Ảnh chụp Nhà Thờ Tổ năm 2023", 
    type: "image", 
    category: "Hình ảnh", 
    date: "05/09/2023", 
    size: "10 MB",
    author: "Admin"
  },
  { 
    id: 4, 
    title: "Sổ tay quy ước dòng tộc", 
    type: "pdf", 
    category: "Quy ước", 
    date: "01/01/2024", 
    size: "5 MB",
    author: "Hội đồng gia tộc"
  },
];



// src/constants/mockData.js
// ... (Giữ nguyên các mảng cũ)

export const POSTS_DATA = [
  { id: 1, title: "Lời ngỏ", category: "Phả ký", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 2, title: "Phả ký dòng họ Nguyễn", category: "Phả ký", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 3, title: "Những hình ảnh của nhà thờ họ Nguyễn", category: "Thư viện", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 4, title: "DANH SÁCH CÔNG ĐỨC XÂY DỰNG NHÀ THỜ HỌ NGUYỄN VIỆT NAM", category: "Tin tức", author: "Thanh Thủy", status: "Chưa đăng" },
  { id: 5, title: "Họ Nguyễn có nguồn gốc từ đâu?", category: "Tin tức", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 6, title: "Về dòng họ Nguyễn Phú ở làng Lại Đà", category: "Tin tức", author: "Thanh Thủy", status: "Chưa đăng" },
  { id: 7, title: "Di tích lịch sử nhà thờ họ Nguyễn", category: "Tin tức", author: "Thanh Thủy", status: "Chưa đăng" },
  { id: 8, title: "Văn khấn ngày giỗ, bài cúng giỗ ông bà, cha mẹ", category: "Tin tức", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 9, title: "Văn khấn cúng gia tiên, thần linh ngày thường, hàng tháng", category: "Tin tức", author: "Thanh Thủy", status: "Đã đăng" },
  { id: 10, title: "Các dòng họ ở Việt Nam", category: "Tin tức", author: "Thanh Thủy", status: "Chưa đăng" },
];

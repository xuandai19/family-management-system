// import React, { useState } from 'react';
// import { 
//   BookOpen, Users, DollarSign, Settings, ShieldCheck, 
//   HelpCircle, FileText, UserCheck, Share2, ChevronRight, 
//   PlayCircle, Download, AlertCircle, Info, Bookmark
// } from 'lucide-react';

// const GuidePage = () => {
//   const [activeMenu, setActiveMenu] = useState('gia-pha');

//   // Dữ liệu nội dung hướng dẫn cho 8 mục
//   const guideContent = {
//     'gia-pha': {
//       title: "1. Quản lý Gia phả (Cốt lõi)",
//       icon: <Users size={32} />,
//       desc: "Hướng dẫn xây dựng và duy trì cây phả hệ dòng tộc kỹ thuật số.",
//       steps: [
//         { name: "Thêm thành viên", detail: "Vào mục 'Danh sách gia phả' > 'Thêm mới'. Nhập đầy đủ: Họ tên, Ngày sinh/mất, Tiểu sử và tải ảnh chân dung (Tỉ lệ 3:4 để hiển thị đẹp nhất)." },
//         { name: "Thiết lập quan hệ", detail: "Sử dụng mã định danh để kết nối Cha với Con. Đối với trường hợp nhiều vợ/chồng, hãy thêm các đời vợ tại mục 'Thông tin hôn nhân' để cây hiển thị đúng nhánh." },
//         { name: "Quản lý Mộ phần", detail: "Nhập tọa độ từ Google Maps và chụp ảnh thực tế mộ phần. Hệ thống sẽ tự động hiển thị sơ đồ vị trí mộ khi con cháu tra cứu." }
//       ]
//     },
//     'tai-chinh': {
//       title: "2. Tài chính & Thu chi",
//       icon: <DollarSign size={32} />,
//       desc: "Quy trình quản lý ngân quỹ dòng họ minh bạch, rõ ràng.",
//       steps: [
//         { name: "Lập phiếu thu/chi", detail: "Chọn đúng hạng mục: Khuyến học, Giỗ tổ, Tu bổ... Điều này giúp hệ thống tự động xuất biểu đồ báo cáo cuối năm." },
//         { name: "Xác nhận 2 bước", detail: "Bước 1: Biên tập viên nhập liệu. Bước 2: Thủ quỹ hoặc Tộc trưởng nhấn 'Duyệt' để tiền thực tế được cộng/trừ vào quỹ chung." },
//         { name: "Quản lý Sổ nợ", detail: "Sử dụng tính năng 'Cảnh báo nợ quỹ' để lọc danh sách hộ chưa đóng niên liễm và gửi tin nhắn nhắc nhở tự động." }
//       ]
//     },
//     'cau-hinh': {
//       title: "3. Cấu hình & Giao diện",
//       icon: <Settings size={32} />,
//       desc: "Tùy chỉnh diện mạo website theo bản sắc riêng của dòng họ.",
//       steps: [
//         { name: "Thay đổi Banner/Logo", detail: "Banner nên có kích thước 1920x400px. Logo nên là file PNG tách nền để không bị đè màu hiển thị." },
//         { name: "Cài đặt Email", detail: "Bật mật khẩu ứng dụng (App Password) trong tài khoản Google để hệ thống gửi được thông báo giỗ chạp tự động." },
//         { name: "Bảo mật", detail: "Mã PIN xem phả đồ giúp bảo vệ thông tin riêng tư của dòng họ khỏi người ngoài. Nên đổi mã PIN định kỳ 6 tháng." }
//       ]
//     },
//     'sao-luu': {
//       title: "4. Sao lưu & Phục hồi",
//       icon: <ShieldCheck size={32} />,
//       desc: "Bảo vệ dữ liệu gia phả an toàn tuyệt đối trước mọi sự cố.",
//       steps: [
//         { name: "Sao lưu định kỳ", detail: "Nhấn 'Sao lưu (Backup)' mỗi cuối tháng. Tải file về và lưu trữ tại ít nhất 2 nơi (Máy tính cá nhân & Google Drive)." },
//         { name: "Phục hồi dữ liệu", detail: "Trong trường hợp lỗi, hãy gửi file sao lưu gần nhất cho đội ngũ hỗ trợ kỹ thuật để tiến hành 'Restore' hệ thống." }
//       ]
//     },
//     'faq': {
//       title: "5. Câu hỏi thường gặp (FAQ)",
//       icon: <HelpCircle size={32} />,
//       desc: "Giải đáp các thắc mắc phổ biến khi vận hành hệ thống.",
//       steps: [
//         { name: "Tìm người nhanh", detail: "Sử dụng ô tìm kiếm ở Header hoặc bộ lọc 'Đời thứ x' trên sơ đồ phả hệ để định vị nhanh thành viên." },
//         { name: "Lỗi không xóa được", detail: "Hệ thống chặn xóa thành viên đã có con cháu để tránh làm đứt gãy sơ đồ. Bạn phải xóa/chuyển con cháu trước khi xóa gốc." }
//       ]
//     },
//     'noi-dung': {
//       title: "6. Quản lý Nội dung & Tin tức",
//       icon: <FileText size={32} />,
//       desc: "Nơi lưu giữ truyền thống và thông báo các sự kiện quan trọng.",
//       steps: [
//         { name: "Viết bài truyền thống", detail: "Sử dụng trình soạn thảo để đăng lịch sử dòng họ, gương sáng con cháu thành đạt làm tấm gương cho đời sau." },
//         { name: "Đăng tin sự kiện", detail: "Tạo sự kiện giỗ Tổ, họp họ. Hệ thống sẽ tự động nhắc lịch trên trang chủ và gửi Email cho toàn bộ thành viên." },
//         { name: "Thư viện tư liệu", detail: "Tạo các Album ảnh theo từng năm (Lễ giỗ 2024, 2025...) để lưu giữ những khoảnh khắc sum vầy của dòng họ." }
//       ]
//     },
//     'con-chau': {
//       title: "7. Hướng dẫn dành cho Con cháu",
//       icon: <UserCheck size={32} />,
//       desc: "Hướng dẫn dành cho thành viên phổ thông tương tác với website.",
//       steps: [
//         { name: "Tra cứu phả hệ", detail: "Con cháu có thể xem sơ đồ tương tác, nhấn vào từng thành viên để xem tiểu sử và quan hệ huyết thống." },
//         { name: "Gửi yêu cầu sửa đổi", detail: "Khi thấy thông tin chưa chính xác hoặc muốn thêm con mới sinh, hãy nhấn 'Đề xuất sửa' để gửi thông tin cho Admin." },
//         { name: "Công đức trực tuyến", detail: "Xem số tài khoản nhà thờ họ tại mục 'Đóng góp' và tải ảnh biên lai chuyển khoản để được ghi danh vào Sổ Vàng." }
//       ]
//     },
//     'ke-thua': {
//       title: "8. Quy trình Bàn giao (Kế thừa)",
//       icon: <Share2 size={32} />,
//       desc: "Đảm bảo tính tiếp nối của gia phả qua nhiều thế hệ.",
//       steps: [
//         { name: "Bàn giao Super Admin", detail: "Khi thay đổi người quản trị chính, phải bàn giao email gốc và mật khẩu quản trị cấp cao nhất." },
//         { name: "Lịch kiểm tra tên miền", detail: "Tên miền (.vn/.com) cần gia hạn hàng năm. Người kế nhiệm cần lưu ý ngày hết hạn để tránh mất tên miền dòng họ." }
//       ]
//     }
//   };

//   return (
//     <div className="p-8 bg-[#f0f4f0] min-h-screen font-sans text-left">
//       <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        
//         {/* SIDEBAR ĐIỀU HƯỚNG TRÁI */}
//         <div className="lg:w-80 space-y-3">
//           <div className="bg-[#10b981] p-6 rounded-[2rem] text-white shadow-xl mb-6 relative overflow-hidden group">
//             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
//                <BookOpen size={120} />
//             </div>
//             <h2 className="font-black text-xl uppercase italic tracking-tighter">HDSD Hệ Thống</h2>
//             <p className="text-[10px] font-bold uppercase opacity-80 mt-1">Phiên bản quản trị v2.0.1</p>
//           </div>

//           <div className="bg-white rounded-[2rem] p-4 shadow-xl border-2 border-white space-y-1">
//             {Object.keys(guideContent).map((key) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveMenu(key)}
//                 className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all ${
//                   activeMenu === key 
//                     ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' 
//                     : 'text-slate-400 hover:bg-slate-50'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <span className={activeMenu === key ? 'text-emerald-500' : 'text-slate-300'}>
//                     {React.cloneElement(guideContent[key].icon, { size: 18 })}
//                   </span>
//                   {guideContent[key].title.split('. ')[1]}
//                 </div>
//                 {activeMenu === key && <ChevronRight size={14} />}
//               </button>
//             ))}
//           </div>
          
//           <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl mt-6 border-b-8 border-emerald-600">
//             <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-2">Hỗ trợ khẩn cấp</h4>
//             <p className="text-xs font-medium text-slate-300 leading-relaxed italic">Gặp sự cố dữ liệu? Liên hệ ngay Hotline kỹ thuật:</p>
//             <p className="text-lg font-black mt-2 text-[#10b981]">0905.XXX.XXX</p>
//           </div>
//         </div>

//         {/* NỘI DUNG CHI TIẾT BÊN PHẢI */}
//         <div className="flex-1">
//           <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border-2 border-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
//             {/* Header Content */}
//             <div className="bg-emerald-50/50 p-10 border-b-2 border-emerald-100 flex items-center gap-8">
//                <div className="p-6 bg-white rounded-[2rem] text-emerald-500 shadow-xl border-2 border-emerald-50">
//                   {guideContent[activeMenu].icon}
//                </div>
//                <div>
//                   <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">
//                     {guideContent[activeMenu].title}
//                   </h1>
//                   <p className="text-slate-500 font-bold mt-2 text-sm italic">{guideContent[activeMenu].desc}</p>
//                </div>
//             </div>

//             {/* Chi tiết từng bước */}
//             <div className="p-10 space-y-10">
//               {guideContent[activeMenu].steps.map((step, index) => (
//                 <div key={index} className="relative pl-12 group">
//                   {/* Đường kẻ dọc nối các bước */}
//                   {index !== guideContent[activeMenu].steps.length - 1 && (
//                     <div className="absolute left-[19px] top-10 w-0.5 h-full bg-slate-100"></div>
//                   )}
                  
//                   {/* Số thứ tự bước */}
//                   <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 font-black shadow-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
//                     {index + 1}
//                   </div>

//                   <div className="bg-slate-50/50 p-6 rounded-[2rem] border-2 border-transparent group-hover:border-emerald-100 group-hover:bg-white transition-all duration-300 shadow-inner group-hover:shadow-xl">
//                     <h3 className="font-black text-slate-700 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
//                        <Bookmark size={14} className="text-emerald-500" /> {step.name}
//                     </h3>
//                     <p className="text-slate-500 text-sm leading-relaxed font-medium">
//                       {step.detail}
//                     </p>
                    
//                     {/* Nút Video minh họa giả lập */}
//                     <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors">
//                       <PlayCircle size={16} /> Xem Video hướng dẫn
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Box Lưu ý quan trọng */}
//               <div className="mt-12 bg-amber-50 rounded-[2rem] p-8 border-2 border-amber-100 relative overflow-hidden">
//                 <div className="absolute right-0 top-0 p-4 opacity-10 rotate-12 text-amber-500">
//                   <AlertCircle size={80} />
//                 </div>
//                 <h4 className="flex items-center gap-2 font-black text-amber-700 uppercase text-xs tracking-widest mb-3">
//                   <Info size={16} /> Lưu ý quan trọng
//                 </h4>
//                 <p className="text-amber-600/80 text-sm font-bold italic leading-relaxed">
//                   Dữ liệu gia phả là tài sản tinh thần vô giá của dòng tộc. Hãy luôn kiểm tra kỹ thông tin trước khi nhấn nút "Lưu" để tránh làm sai lệch lịch sử đời sau.
//                 </p>
//               </div>

//               {/* Footer hành động */}
//               <div className="pt-6 flex flex-wrap gap-4 border-t border-slate-100">
//                 <button className="flex items-center gap-2 bg-[#10b981] text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-emerald-200 hover:bg-[#059669] transition-all active:scale-95">
//                   <Download size={16} /> Tải tài liệu PDF
//                 </button>
//                 <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-black transition-all active:scale-95">
//                   <Share2 size={16} /> Chia sẻ cho Biên tập viên khác
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default GuidePage;








import React, { useState } from 'react';
import { 
  BookOpen, Users, DollarSign, Settings, ShieldCheck, 
  HelpCircle, FileText, UserCheck, Share2, ChevronRight, 
  PlayCircle, Download, AlertCircle, Info, Bookmark, CheckCircle
} from 'lucide-react';

const GuidePage = () => {
  // SỬA LỖI TẠI ĐÂY: Khai báo activeMenu (hoặc activeTab tùy bạn đặt tên trong code)
  const [activeMenu, setActiveMenu] = useState('gia-pha');

  // Dữ liệu nội dung cho 8 mục hướng dẫn
  const guideContent = {
    'gia-pha': {
      title: "1. Quản lý Gia phả (Cốt lõi)",
      icon: <Users size={32} />,
      desc: "Xây dựng và duy trì cây phả hệ dòng tộc kỹ thuật số.",
      steps: [
        { name: "Thêm thành viên", detail: "Mục 'Gia phả' > 'Thêm mới'. Nhập Họ tên, Ngày sinh/mất, và tải ảnh chân dung chân thực." },
        { name: "Thiết lập quan hệ", detail: "Kết nối Cha - Con và Vợ - Chồng. Hệ thống tự động tính toán đời thứ mấy trong họ." },
        { name: "Quản lý Mộ phần", detail: "Nhập tọa độ GPS và hình ảnh thực tế để con cháu dễ dàng tìm kiếm khi về quê." }
      ]
    },
    'tai-chinh': {
      title: "2. Tài chính & Thu chi",
      icon: <DollarSign size={32} />,
      desc: "Quản lý ngân quỹ dòng họ minh bạch và công khai.",
      steps: [
        { name: "Lập phiếu thu/chi", detail: "Phân loại theo mục đích: Giỗ tổ, Khuyến học, Tu bổ lăng mộ..." },
        { name: "Xác nhận 2 bước", detail: "Quy trình Thư ký nhập liệu và Thủ quỹ phê duyệt để đảm bảo tính chính xác." },
        { name: "Quản lý Sổ nợ", detail: "Theo dõi các hộ gia đình chưa hoàn thành đóng góp quỹ niên liễm hàng năm." }
      ]
    },
    'cau-hinh': {
      title: "3. Cấu hình & Giao diện",
      icon: <Settings size={32} />,
      desc: "Tùy chỉnh diện mạo website theo bản sắc dòng tộc.",
      steps: [
        { name: "Thay đổi Banner/Logo", detail: "Tải ảnh đại diện nhà thờ tổ và logo riêng của dòng họ (nếu có)." },
        { name: "Cài đặt Email", detail: "Cấu hình SMTP để gửi thông báo nhắc lịch giỗ tự động cho toàn bộ con cháu." },
        { name: "Bảo mật", detail: "Quản lý mã PIN bảo vệ phả đồ và phân quyền cho các biên tập viên khác." }
      ]
    },
    'sao-luu': {
      title: "4. Sao lưu & Phục hồi",
      icon: <ShieldCheck size={32} />,
      desc: "Bảo vệ kho tàng dữ liệu gia phả an toàn tuyệt đối.",
      steps: [
        { name: "Sao lưu định kỳ", detail: "Sử dụng nút 'Backup' để tải file dữ liệu về máy tính mỗi khi có thay đổi lớn." },
        { name: "Phục hồi", detail: "Nhập lại file sao lưu cũ trong trường hợp xảy ra sự cố mất dữ liệu." }
      ]
    },
    'faq': {
      title: "5. Câu hỏi thường gặp (FAQ)",
      icon: <HelpCircle size={32} />,
      desc: "Giải đáp các thắc mắc nhanh khi vận hành hệ thống.",
      steps: [
        { name: "Tìm người nhanh", detail: "Sử dụng công cụ tìm kiếm theo tên hoặc đời ở phía trên đầu trang." },
        { name: "Lỗi không xóa được", detail: "Bạn không thể xóa thành viên nếu người đó đang có con cháu bên dưới." }
      ]
    },
    'noi-dung': {
      title: "6. Quản lý Nội dung & Tin tức",
      icon: <FileText size={32} />,
      desc: "Lưu giữ những bài viết về truyền thống và sự kiện.",
      steps: [
        { name: "Viết bài truyền thống", detail: "Đăng tải các bài viết về tiểu sử các cụ hoặc gương sáng con cháu đạt giải cao." },
        { name: "Đăng tin sự kiện", detail: "Thông báo lịch giỗ tổ, ngày hội làng để mọi người chủ động sắp xếp thời gian." },
        { name: "Thư viện ảnh", detail: "Tạo các album ảnh lưu niệm sau mỗi kỳ đại hội hoặc lễ lạt của dòng họ." }
      ]
    },
    'con-chau': {
      title: "7. Dành cho con cháu (User)",
      icon: <UserCheck size={32} />,
      desc: "Hướng dẫn dành cho thành viên phổ thông vào tra cứu.",
      steps: [
        { name: "Tra cứu phả hệ", detail: "Con cháu có thể phóng to/thu nhỏ sơ đồ và nhấn vào từng người để xem tiểu sử." },
        { name: "Gửi yêu cầu sửa", detail: "Nút gửi phản hồi nếu thấy thông tin cá nhân chưa chính xác." },
        { name: "Đóng góp trực tuyến", detail: "Xem thông tin số tài khoản dòng họ và gửi ảnh minh chứng công đức." }
      ]
    },
    'ke-thua': {
      title: "8. Quy trình Bàn giao",
      icon: <Share2 size={32} />,
      desc: "Đảm bảo sự kế thừa bền vững qua nhiều thế hệ quản trị.",
      steps: [
        { name: "Bàn giao tài khoản", detail: "Quy trình chuyển giao quyền Super Admin cho người quản trị tiếp theo." },
        { name: "Gia hạn tên miền", detail: "Kiểm tra và đóng phí duy trì website hàng năm để không bị mất địa chỉ web." }
      ]
    }
  };

  return (
    <div className="p-8 bg-[#f0f4f0] min-h-screen font-sans text-left">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        
        {/* SIDEBAR BÊN TRÁI */}
        <div className="lg:w-80 space-y-3">
          <div className="bg-[#10b981] p-6 rounded-[2rem] text-white shadow-xl mb-6 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
               <BookOpen size={120} />
            </div>
            <h2 className="font-black text-xl uppercase italic tracking-tighter">Hướng Dẫn</h2>
            <p className="text-[10px] font-bold uppercase opacity-80 mt-1">Hệ thống quản trị v2.0.1</p>
          </div>

          <div className="bg-white rounded-[2rem] p-4 shadow-xl border-2 border-white space-y-1">
            {Object.keys(guideContent).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMenu(key)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all ${
                  activeMenu === key 
                    ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' 
                    : 'text-slate-400 hover:bg-slate-50 active:scale-95'
                }`}
              >
                <div className="flex items-center gap-3">
                  {guideContent[key].title.split('. ')[1]}
                </div>
                {activeMenu === key && <ChevronRight size={14} />}
              </button>
            ))}
          </div>
          
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl mt-6 border-b-8 border-emerald-600">
            <h4 className="font-black text-[10px] uppercase text-emerald-400 mb-2">Hỗ trợ kỹ thuật</h4>
            <p className="text-[18px] font-black mt-2 text-[#10b981]">0905.XXX.XXX</p>
          </div>
        </div>

        {/* NỘI DUNG CHI TIẾT BÊN PHẢI */}
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-white overflow-hidden min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Content */}
            <div className="bg-emerald-50/50 p-10 border-b-2 border-emerald-100 flex items-center gap-8">
               <div className="p-6 bg-white rounded-[2rem] text-emerald-500 shadow-xl border-2 border-emerald-50">
                  {guideContent[activeMenu].icon}
               </div>
               <div>
                  <h1 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">
                    {guideContent[activeMenu].title}
                  </h1>
                  <p className="text-slate-500 font-bold mt-2 text-sm italic">{guideContent[activeMenu].desc}</p>
               </div>
            </div>

            {/* Chi tiết từng bước */}
            <div className="p-10 space-y-10">
              {guideContent[activeMenu].steps.map((step, index) => (
                <div key={index} className="relative pl-12 group">
                  {index !== guideContent[activeMenu].steps.length - 1 && (
                    <div className="absolute left-[19px] top-10 w-0.5 h-full bg-slate-100"></div>
                  )}
                  
                  <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 font-black shadow-lg group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {index + 1}
                  </div>

                  <div className="bg-slate-50/50 p-6 rounded-[2rem] border-2 border-transparent group-hover:border-emerald-100 group-hover:bg-white transition-all shadow-inner hover:shadow-xl">
                    <h3 className="font-black text-slate-700 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                       <Bookmark size={14} className="text-emerald-500" /> {step.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                      {step.detail}
                    </p>
                    <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all">
                      <PlayCircle size={16} /> Xem Video hướng dẫn
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-12 bg-amber-50 rounded-[2rem] p-8 border-2 border-amber-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 p-4 opacity-10 rotate-12 text-amber-500">
                  <AlertCircle size={80} />
                </div>
                <h4 className="flex items-center gap-2 font-black text-amber-700 uppercase text-xs tracking-widest mb-3">
                  <Info size={16} /> Lưu ý quan trọng
                </h4>
                <p className="text-amber-600/80 text-sm font-bold italic leading-relaxed">
                  Luôn nhấn "Lưu cấu hình" sau khi thực hiện các thay đổi để dữ liệu được cập nhật lên máy chủ.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-4 border-t border-slate-100">
                <button className="flex items-center gap-2 bg-[#10b981] text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-emerald-200 hover:bg-[#059669] transition-all active:scale-95">
                  <Download size={16} /> Tải tài liệu PDF
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuidePage;










// // src/components/Layout/Sidebar.jsx
// import React from 'react';
// import { 
//   Network, List, Library, FileText, Calendar, 
//   Settings, HelpCircle, Menu, Mail, User, 
//   BookOpen, ChevronRight, Palette, ShieldCheck, 
//   Coins, LayoutDashboard 
// } from 'lucide-react';

// const Sidebar = ({ activeTab, setActiveTab }) => {
  
//   // Danh sách menu chính (Dòng họ)
//   const mainMenuItems = [
//     { id: 'family-tree', label: 'Phả đồ trực tuyến', icon: <Network size={20} /> },
//     { id: 'family-list', label: 'Danh sách gia phả', icon: <List size={20} /> },
//     { id: 'library', label: 'Thư viện', icon: <Library size={20} /> },
//   ];

//   // Hàm helper để render button giúp code gọn gàng và đồng bộ màu sắc
//   const renderNavButton = (id, label, icon) => {
//     const isActive = activeTab === id;
//     return (
//       <li key={id}>
//         <button
//           onClick={() => setActiveTab(id)}
//           className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group ${
//             isActive
//               ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
//               : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600' 
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <span className={isActive ? 'text-white' : 'text-emerald-500/60 group-hover:text-emerald-600'}>
//               {icon}
//             </span>
//             {label}
//           </div>
//           {isActive && <ChevronRight size={14} />}
//         </button>
//       </li>
//     );
//   };

//   return (
//     <div className="bg-white h-full border-r border-emerald-100 flex flex-col w-64 fixed left-0 top-0 overflow-y-auto z-50 shadow-lg text-left">
      
//       {/* --- LOGO AREA --- */}
//       <div className="h-24 flex flex-col items-center justify-center border-b border-emerald-50 mb-4 bg-white">
//         <div className="flex items-center gap-2">
//             <div className="p-2 bg-emerald-600 rounded-lg shadow-emerald-200 shadow-md text-white">
//                 <BookOpen size={20} />
//             </div>
//             <div className="text-left">
//                 <h1 className="text-emerald-800 font-black text-lg uppercase tracking-tighter leading-none">Gia Phả</h1>
//                 <h2 className="text-emerald-500 font-bold text-base uppercase leading-none mt-1">Đại Việt</h2>
//             </div>
//         </div>
//       </div>

//       {/* --- MENU ITEMS --- */}
//       <div className="flex-1 px-4 py-2">
        
//         {/* Nhóm 1: DÒNG HỌ */}
//         <div className="mb-8">
//           <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest">Dòng họ</p>
//           <ul className="space-y-1.5">
//             {mainMenuItems.map((item) => renderNavButton(item.id, item.label, item.icon))}
//           </ul>
//         </div>

//         {/* Nhóm 2: TIN TỨC */}
//         <div className="mb-8">
//           <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest">Tin tức</p>
//           <ul className="space-y-1.5">
//             {renderNavButton('posts', 'Bài viết', <FileText size={18} />)}
//             {renderNavButton('categories', 'Chuyên mục', <Menu size={18} />)}
//             {renderNavButton('events', 'Sự kiện', <Calendar size={18} />)}
//           </ul>
//         </div>

//         {/* Nhóm 3: WEBSITE - TÔNG XANH ĐỒNG BỘ */}
//         <div className="mb-6">
//           <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest">Website</p>
//           <ul className="space-y-1.5">
//             {renderNavButton('config', 'Cấu hình chung', <Settings size={18} />)}
//             {renderNavButton('menu-mgmt', ' Menu', <LayoutDashboard size={18} />)}
//             {renderNavButton('theme-mgmt', 'Giao diện', <Palette size={18} />)}
//             {renderNavButton('email', 'Email Dòng Họ', <Mail size={18} />)}
//             {renderNavButton('admins', 'Quản trị viên', <ShieldCheck size={18} />)}
//             {renderNavButton('expenses', 'Quản lý Chi tiêu', <Coins size={18} />)}
//             {renderNavButton('guide', 'Hướng dẫn', <HelpCircle size={18} />)}
//           </ul>
//         </div>

//       </div>
      
//       {/* --- FOOTER --- */}
//       <div className="p-6 text-center">
//         <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 shadow-inner">
//             <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Gia Phả Đại Việt</p>
//             <p className="text-[9px] text-emerald-600 mt-1 font-bold">Phiên bản v2.0.1</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

















// src/components/Layout/Sidebar.jsx
import React from 'react';
import { 
  Network, List, Library, FileText, Calendar, 
  Settings, HelpCircle, Menu, Mail, 
  BookOpen, ChevronRight, Palette, ShieldCheck, 
  Coins, LayoutDashboard 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  
  // Danh sách menu chính (Dòng họ) - Đảm bảo ID khớp với renderContent trong App.jsx
  const mainMenuItems = [
    { id: 'family-tree', label: 'Phả đồ trực tuyến', icon: <Network size={20} /> },
    { id: 'family-list', label: 'Danh sách gia phả', icon: <List size={20} /> },
    { id: 'library', label: 'Thư viện', icon: <Library size={20} /> },
  ];

  // Hàm helper để render button giúp code gọn gàng và đồng bộ màu sắc
  const renderNavButton = (id, label, icon) => {
    const isActive = activeTab === id;
    return (
      <li key={id}>
        <button
          onClick={() => setActiveTab(id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group ${
            isActive
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
              : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600' 
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={isActive ? 'text-white' : 'text-emerald-500/60 group-hover:text-emerald-600'}>
              {icon}
            </span>
            {label}
          </div>
          {isActive && <ChevronRight size={14} />}
        </button>
      </li>
    );
  };

  return (
    <div className="bg-white h-full border-r border-emerald-100 flex flex-col w-64 fixed left-0 top-0 overflow-y-auto z-50 shadow-lg text-left">
      
      {/* --- LOGO AREA --- */}
      <div className="h-24 flex flex-col items-center justify-center border-b border-emerald-50 mb-4 bg-white">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 rounded-lg shadow-emerald-200 shadow-md text-white">
                <BookOpen size={20} />
            </div>
            <div className="text-left">
                <h1 className="text-emerald-800 font-black text-lg uppercase tracking-tighter leading-none">Gia Phả</h1>
                <h2 className="text-emerald-500 font-bold text-base uppercase leading-none mt-1">Đại Việt</h2>
            </div>
        </div>
      </div>

      {/* --- MENU ITEMS --- */}
      <div className="flex-1 px-4 py-2">
        
        {/* Nhóm 1: DÒNG HỌ */}
        <div className="mb-8">
          <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest text-left">Dòng họ</p>
          <ul className="space-y-1.5">
            {mainMenuItems.map((item) => renderNavButton(item.id, item.label, item.icon))}
          </ul>
        </div>

        {/* Nhóm 2: TIN TỨC */}
        <div className="mb-8">
          <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest text-left">Tin tức</p>
          <ul className="space-y-1.5">
            {renderNavButton('posts', 'Bài viết', <FileText size={18} />)}
            {renderNavButton('categories', 'Chuyên mục', <Menu size={18} />)}
            {renderNavButton('events', 'Sự kiện', <Calendar size={18} />)}
          </ul>
        </div>

        {/* Nhóm 3: WEBSITE - TÔNG XANH ĐỒNG BỘ */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-emerald-800/40 mb-3 px-3 uppercase tracking-widest text-left">Website</p>
          <ul className="space-y-1.5">
            {renderNavButton('config', 'Cấu hình chung', <Settings size={18} />)}
            {renderNavButton('menu-mgmt', 'Quản lý Menu', <LayoutDashboard size={18} />)}
            {renderNavButton('theme-mgmt', 'Giao diện', <Palette size={18} />)}
            {renderNavButton('email', 'Email Dòng Họ', <Mail size={18} />)}
            {renderNavButton('admin-users', 'Quản trị viên', <ShieldCheck size={18} />)}
            {renderNavButton('expenses', 'Quản lý Chi tiêu', <Coins size={18} />)}
            {renderNavButton('guide', 'Hướng dẫn', <HelpCircle size={18} />)}
          </ul>
        </div>

      </div>
      
      {/* --- FOOTER --- */}
      <div className="p-6 text-center">
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 shadow-inner">
            <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Gia Phả Đại Việt</p>
            <p className="text-[9px] text-emerald-600 mt-1 font-bold">Phiên bản v2.0.1</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



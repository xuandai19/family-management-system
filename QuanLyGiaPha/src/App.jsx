

// // src/App.jsx
// import React, { useState } from 'react';
// import Sidebar from './components/Layout/Sidebar';
// import FamilyList from './components/Family/FamilyList';
// import Library from './components/Library/Library';
// import Category from './components/Category/Category';
// import FamilyTreePage from './components/Family/FamilyTreePage'; 
// import EventList from './components/Events/EventList'; 
// import PostList from './components/Content/PostList';
// import ConfigPage from './components/Config/ConfigPage';
// import EmailManagement from "./components/Config/EmailManagement";
// import MenuManagement from './components/Config/MenuManagement';
// import ExpenseManagement from './components/Config/ExpenseManagement';
// import AdminManagement from './components/Config/AdminManagement';
// import GuidePage from './components/Guide/GuidePage'; 
// import AuthPage from './components/Auth/AuthPage'; 

// import { Menu, Settings, Mail } from 'lucide-react';

// function App() {
//   const [activeTab, setActiveTab] = useState('family-list');

//   // 1. Logic thông minh xác định danh sách nút trên Header
//   const getHeaderNav = () => {
//     // Nhóm 1: Các tab thuộc phần WEBSITE & CẤU HÌNH
//     const configTabs = ['config', 'menu-mgmt', 'theme-mgmt', 'email', 'admin-users', 'expenses', 'guide'];
    
//     // Nhóm 2: Các tab thuộc phần TIN TỨC
//     const newsTabs = ['posts', 'categories', 'events'];

//     // Điều kiện hiển thị cho Nhóm Website/Cấu hình
//     if (configTabs.includes(activeTab)) {
//       return [
//         { id: 'config', label: 'Cấu hình chung' },
//         { id: 'menu-mgmt', label: 'Quản lý Menu' },
//         { id: 'theme-mgmt', label: 'Giao diện' },
//         { id: 'email', label: 'Email dòng họ' },
//         { id: 'admin-users', label: 'Quản trị viên' },
//         { id: 'expenses', label: 'Quản lý chi tiêu' },
//         { id: 'guide', label: 'Hướng dẫn' }
//       ];
//     }

//     // Điều kiện hiển thị cho Nhóm Tin tức
//     if (newsTabs.includes(activeTab)) {
//       return [
//         { id: 'posts', label: 'Bài viết' },
//         { id: 'categories', label: 'Chuyên mục' },
//         { id: 'events', label: 'Sự kiện' }
//       ];
//     }

//     // Mặc định hiển thị cho Nhóm Dòng họ
//     return [
//       { id: 'family-list', label: 'Danh sách gia phả' },
//       { id: 'library', label: 'Thư viện' },
//       { id: 'family-tree', label: 'Phả Đồ' },
//       { id: 'events', label: 'Sự kiện' }
//     ];
//   };

//   // 2. Hàm Render nội dung trang chính
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'family-list': return <FamilyList />;
//       case 'library': return <Library />;
//       case 'family-tree': return <FamilyTreePage />;
//       case 'posts': return <PostList />;
//       case 'categories': return <Category />;
//       case 'events': return <EventList />;
//       case 'config': return <ConfigPage />;
//       case 'email': return <EmailManagement />;
//       case 'menu-mgmt': return <MenuManagement />;
//       case 'expenses': return <ExpenseManagement />;
//       case 'guide': return <GuidePage />;
//       case 'admin-users': return <AdminManagement />;
//       case 'theme-mgmt': 
//         return (
//           <div className="p-10 text-2xl font-bold text-emerald-800 uppercase italic">
//             Giao diện Quản lý Giao diện (Banner, Logo, Màu sắc) đang phát triển...
//           </div>
//         );
//       default: return <FamilyList />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f0f4f0]">
//       {/* SIDEBAR CỐ ĐỊNH BÊN TRÁI */}
//       <div className="fixed left-0 top-0 h-full w-64 z-50 shadow-xl">
//         <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//       </div>

//       {/* KHU VỰC NỘI DUNG BÊN PHẢI */}
//       <div className="flex-1 ml-64">
        
//         {/* HEADER LINH HOẠT - TỰ ĐỘNG CẬP NHẬT CÁC MỤC THIẾU */}
//         <header className="bg-white border-b border-emerald-100 h-16 flex justify-between items-center px-6 sticky top-0 z-20 shadow-sm text-left">
//           <div className="flex items-center gap-6 text-gray-600">
//             <Menu className="cursor-pointer hover:text-emerald-600 transition-colors" />
            
//             <nav className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar max-w-[70vw]">
//               {getHeaderNav().map((tab) => (
//                 <button 
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`text-[10px] lg:text-sm font-black transition-all px-3 py-1.5 rounded-xl whitespace-nowrap uppercase tracking-tighter ${
//                     activeTab === tab.id 
//                       ? 'text-emerald-700 bg-emerald-50 shadow-sm border border-emerald-100' 
//                       : 'hover:text-emerald-600 text-slate-400'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
          
//           {/* USER & QUICK ACTIONS */}
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setActiveTab('email')}
//               className={`p-2 rounded-xl transition-all ${
//                 activeTab === 'email' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50'
//               }`}
//               title="Quản lý Email"
//             >
//               <Mail size={20} />
//             </button>

//             <button 
//               onClick={() => setActiveTab('config')}
//               className={`p-2 rounded-xl transition-all ${
//                 activeTab === 'config' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50'
//               }`}
//               title="Cấu hình hệ thống"
//             >
//               <Settings size={20} />
//             </button>

//             <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

//             <div className="flex items-center gap-3 pl-2 text-left">
//               <div className="text-right">
//                 <p className="text-xs font-black text-slate-700 uppercase leading-none">Cao Tổ</p>
//                 <p className="text-[10px] font-bold text-emerald-600 uppercase italic">Admin</p>
//               </div>
//               <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-emerald-700 font-black shadow-sm">
//                 CT
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* NỘI DUNG TRANG CHÍNH */}
//         <main className="min-h-[calc(100vh-64px)] animate-in fade-in duration-500"> 
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;















// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import FamilyList from './components/Family/FamilyList';
import Library from './components/Library/Library';
import Category from './components/Category/Category';
import FamilyTreePage from './components/Family/FamilyTreePage'; 
import EventList from './components/Events/EventList'; 
import PostList from './components/Content/PostList';
import ConfigPage from './components/Config/ConfigPage';
import EmailManagement from "./components/Config/EmailManagement";
import MenuManagement from './components/Config/MenuManagement';
import ExpenseManagement from './components/Config/ExpenseManagement';
import AdminManagement from './components/Config/AdminManagement';
import GuidePage from './components/Guide/GuidePage'; 
import AuthPage from './components/Auth/AuthPage'; 

import { Menu, Settings, Mail, LogOut } from 'lucide-react';

function App() {
  // 1. Quản lý trạng thái đăng nhập (Từ Code 2)
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [activeTab, setActiveTab] = useState('family-list');

  // 2. Logic xác định danh sách nút trên Header (Từ Code 1)
  const getHeaderNav = () => {
    const configTabs = ['config', 'menu-mgmt', 'theme-mgmt', 'email', 'admin-users', 'expenses', 'guide'];
    const newsTabs = ['posts', 'categories', 'events'];

    if (configTabs.includes(activeTab)) {
      return [
        { id: 'config', label: 'Cấu hình chung' },
        { id: 'menu-mgmt', label: 'Quản lý Menu' },
        { id: 'theme-mgmt', label: 'Giao diện' },
        { id: 'email', label: 'Email dòng họ' },
        { id: 'admin-users', label: 'Quản trị viên' },
        { id: 'expenses', label: 'Quản lý chi tiêu' },
        { id: 'guide', label: 'Hướng dẫn' }
      ];
    }

    if (newsTabs.includes(activeTab)) {
      return [
        { id: 'posts', label: 'Bài viết' },
        { id: 'categories', label: 'Chuyên mục' },
        { id: 'events', label: 'Sự kiện' }
      ];
    }

    return [
      { id: 'family-list', label: 'Danh sách gia phả' },
      { id: 'library', label: 'Thư viện' },
      { id: 'family-tree', label: 'Phả Đồ' },
      { id: 'events', label: 'Sự kiện' }
    ];
  };

  // 3. Hàm Render nội dung trang chính
  const renderContent = () => {
    switch (activeTab) {
      case 'family-list': return <FamilyList />;
      case 'library': return <Library />;
      case 'family-tree': return <FamilyTreePage />;
      case 'posts': return <PostList />;
      case 'categories': return <Category />;
      case 'events': return <EventList />;
      case 'config': return <ConfigPage />;
      case 'email': return <EmailManagement />;
      case 'menu-mgmt': return <MenuManagement />;
      case 'expenses': return <ExpenseManagement />;
      case 'guide': return <GuidePage />;
      case 'admin-users': return <AdminManagement />;
      case 'theme-mgmt': 
        return (
          <div className="p-10 text-2xl font-bold text-emerald-800 uppercase italic">
            Giao diện Quản lý Giao diện (Banner, Logo, Màu sắc) đang phát triển...
          </div>
        );
      default: return <FamilyList />;
    }
  };

  // --- KIỂM TRA ĐĂNG NHẬP (Từ Code 2) ---
  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // --- GIAO DIỆN SAU KHI ĐĂNG NHẬP THÀNH CÔNG ---
  return (
    <div className="flex min-h-screen bg-[#f0f4f0]">
      {/* SIDEBAR CỐ ĐỊNH BÊN TRÁI */}
      <div className="fixed left-0 top-0 h-full w-64 z-50 shadow-xl">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* KHU VỰC NỘI DUNG BÊN PHẢI */}
      <div className="flex-1 ml-64">
        
        {/* HEADER LINH HOẠT */}
        <header className="bg-white border-b border-emerald-100 h-16 flex justify-between items-center px-6 sticky top-0 z-20 shadow-sm text-left">
          <div className="flex items-center gap-6 text-gray-600">
            <Menu className="cursor-pointer hover:text-emerald-600 transition-colors" />
            
            <nav className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar max-w-[50vw]">
              {getHeaderNav().map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10px] lg:text-sm font-black transition-all px-3 py-1.5 rounded-xl whitespace-nowrap uppercase tracking-tighter ${
                    activeTab === tab.id 
                      ? 'text-emerald-700 bg-emerald-50 shadow-sm border border-emerald-100' 
                      : 'hover:text-emerald-600 text-slate-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* USER & QUICK ACTIONS */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('email')}
              className={`p-2 rounded-xl transition-all ${
                activeTab === 'email' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50'
              }`}
              title="Quản lý Email"
            >
              <Mail size={20} />
            </button>

            <button 
              onClick={() => setActiveTab('config')}
              className={`p-2 rounded-xl transition-all ${
                activeTab === 'config' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50'
              }`}
              title="Cấu hình hệ thống"
            >
              <Settings size={20} />
            </button>

            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3 pl-2 text-left">
              <div className="text-right">
                <p className="text-xs font-black text-slate-700 uppercase leading-none">Cao Tổ</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase italic">Admin</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-emerald-700 font-black shadow-sm">
                CT
              </div>
            </div>

            {/* Nút Đăng xuất nhanh */}
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* NỘI DUNG TRANG CHÍNH */}
        <main className="min-h-[calc(100vh-64px)] animate-in fade-in duration-500"> 
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;



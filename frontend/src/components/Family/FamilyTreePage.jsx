








import React from 'react';
import { 
  ArrowLeft, RotateCcw, Home, HelpCircle, Download, 
  Eye, Globe, Search, Info, Calendar, User
} from 'lucide-react';

// --- DỮ LIỆU CỦA BẠN (Cập nhật 5 đời) ---
const initialData = {
  name: "Nguyễn Văn Tổ", gender: "male", role: "Thủy Tổ", birthDate: "1850", deathDate: "1920",
  children: [
    {
      name: "Nguyễn Văn A", gender: "male", birthDate: "1875", deathDate: "1945",
      spouse: { name: "Trần Thị B", gender: "female", birthDate: "1878" },
      children: [
        {
          name: "Nguyễn Văn C", gender: "male", birthDate: "1905",
          children: [
            { 
              name: "Nguyễn Văn E", gender: "male", birthDate: "1930",
              spouse: { name: "Lê Thị M", gender: "female" },
              children: [
                { 
                  name: "Nguyễn Văn G", gender: "male", birthDate: "1955",
                  children: [
                    { name: "Nguyễn Văn Mỗ", gender: "male", birthDate: "2015" },
                    { name: "Nguyễn Thị Chi", gender: "female", birthDate: "2018" }
                  ]
                },
                { name: "Nguyễn Văn An", gender: "male", birthDate: "1980" }
              ] 
            },
            { name: "Nguyễn Thị F", gender: "female", birthDate: "1935" }
          ]
        },
        { 
          name: "Nguyễn Văn D", gender: "male", birthDate: "1910",
          spouse: { name: "Hoàng Thị N", gender: "female", birthDate: "1915" },
          children: [{ name: "Nguyễn Văn Bình", gender: "male", birthDate: "1940" }]
        }
      ]
    },
    {
      name: "Nguyễn Văn H", gender: "male", birthDate: "1880",
      spouse: { name: "Phạm Thị I", gender: "female", birthDate: "1885" },
      children: [
        { 
          name: "Nguyễn Văn J", gender: "male", birthDate: "1915",
          children: [
            { 
              name: "Nguyễn Văn K", gender: "male", birthDate: "1945",
              children: [
                { name: "Nguyễn Văn Hùng", gender: "male", birthDate: "1975" },
                { name: "Nguyễn Văn Dũng", gender: "male", birthDate: "1980" }
              ]
            }
          ] 
        },
        { name: "Nguyễn Thị L", gender: "female", birthDate: "1920", spouse: { name: "Vũ Văn X", gender: "male" } }
      ]
    }
  ]
};

// --- LOGIC LẤY ẢNH RIÊNG BIỆT KHÔNG TRÙNG LẶP (CODE 2) ---
const getUniqueAvatar = (gender, personName) => {
  const seed = personName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 70;
  const type = gender === 'male' ? 'male' : 'female';
  return `https://xsgames.co/randomusers/assets/avatars/${type}/${seed}.jpg`;
};

const AgeAvatar = ({ gender, name }) => {
  const avatarUrl = getUniqueAvatar(gender, name);
  const isMale = gender === 'male';

  return (
    <div className={`
      w-16 h-16 md:w-20 md:h-20 rounded-full border-4 overflow-hidden mb-3 shadow-2xl transition-all duration-500 
      group-hover:scale-110 group-hover:rotate-3
      ${isMale ? 'border-blue-400 ring-4 ring-blue-100' : 'border-rose-400 ring-4 ring-rose-100'}
    `}>
      <img 
        src={avatarUrl} 
        alt={name} 
        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all"
      />
    </div>
  );
};

// --- COMPONENT THẺ THÀNH VIÊN NỔI KHỐI (CODE 2) ---
const PersonCard = ({ person }) => {
  if (!person) return null;
  const isMale = person.gender === 'male';

  return (
    <div className={`
      relative min-w-[120px] md:min-w-[140px] p-4 flex flex-col items-center rounded-[2rem] 
      border-2 transition-all duration-500 group hover:-translate-y-3 shadow-2xl
      ${isMale 
        ? 'bg-white border-blue-100 shadow-blue-200/50 hover:border-blue-400' 
        : 'bg-white border-rose-100 shadow-rose-200/50 hover:border-rose-400'}
    `}>
      <AgeAvatar gender={person.gender} name={person.name} />
      
      <div className="text-center z-10">
        <span className="text-xs md:text-sm font-black text-slate-800 uppercase tracking-tighter block mb-1 leading-tight">
          {person.name}
        </span>
        <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 italic">
          <span>{person.birthDate}</span>
          {person.deathDate && <span>- {person.deathDate}</span>}
        </div>
      </div>

      {person.role && (
        <span className="absolute -top-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[9px] px-4 py-1 rounded-full font-black shadow-lg uppercase tracking-widest border-2 border-white">
          {person.role}
        </span>
      )}
    </div>
  );
};

// --- LOGIC VẼ CÂY ĐỆ QUY (CODE 1) ---
const FamilyNode = ({ member }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 items-center z-10 relative">
        <PersonCard person={member} />
        {member.spouse && (
          <>
            <div className="w-6 h-[2px] bg-slate-200 relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-pink-400 after:rounded-full"></div>
            <PersonCard person={member.spouse} />
          </>
        )}
      </div>

      {member.children && member.children.length > 0 && (
        <div className="flex flex-col items-center w-full">
          <div className="w-px h-12 bg-slate-300"></div>
          <div className="relative flex justify-center w-full">
            {member.children.length > 1 && (
              <div className="absolute top-0 h-px bg-slate-300" 
                   style={{ width: `calc(100% - ${100 / member.children.length}%)` }}>
              </div>
            )}
            <div className="flex gap-6 md:gap-12 pt-0">
              {member.children.map((child, index) => (
                <div key={index} className="flex flex-col items-center relative">
                   <div className="w-px h-8 bg-slate-300"></div>
                   <FamilyNode member={child} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TRANG CHÍNH PHẢ ĐỒ (CODE 1) ---
const FamilyTreePage = () => {
  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6 font-sans text-left">
      {/* TIÊU ĐỀ TRANG */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Phả đồ trực tuyến</h2>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Trang chủ / Phả đồ</div>
      </div>

      {/* THANH CÔNG CỤ (TOOLBAR) */}
      <div className="bg-white p-4 rounded-xl shadow-xl shadow-slate-200/50 border border-white mb-8 flex flex-wrap gap-2 items-center relative">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#34495e] text-white text-[11px] font-bold rounded-md hover:bg-slate-800 transition shadow-md">
          <ArrowLeft size={14} strokeWidth={3} /> Về danh sách
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#34495e] text-white text-[11px] font-bold rounded-md hover:bg-slate-800 transition shadow-md">
          <RotateCcw size={14} strokeWidth={3} /> Reset Phả đồ
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#34495e] text-white text-[11px] font-bold rounded-md hover:bg-slate-800 transition shadow-md">
          <Home size={14} strokeWidth={3} /> Trở về gốc
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#16a085] text-white text-[11px] font-bold rounded-md hover:bg-teal-700 transition shadow-md">
          <HelpCircle size={14} strokeWidth={3} /> Hướng dẫn
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#16a085] text-white text-[11px] font-bold rounded-md hover:bg-teal-700 transition shadow-md">
          <Download size={14} strokeWidth={3} /> Xuất ảnh Phả đồ
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#16a085] text-white text-[11px] font-bold rounded-md hover:bg-teal-700 transition shadow-md">
          <Eye size={14} strokeWidth={3} /> Hiển thị: Công khai
        </button>
        <button className="relative flex items-center gap-1.5 px-4 py-2 bg-[#16a085] text-white text-[11px] font-bold rounded-md hover:bg-teal-700 transition shadow-md">
          <Globe size={14} strokeWidth={3} /> Phả đồ trực tuyến
          <span className="absolute -top-3 -right-3 bg-red-600 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-lg animate-bounce">HOT</span>
        </button>

        <div className="flex items-center border-2 border-slate-100 rounded-lg ml-auto bg-slate-50 p-1 group focus-within:border-teal-400 transition-all">
          <input type="text" placeholder="Tìm kiếm người thân..." className="px-3 py-1 bg-transparent text-xs outline-none w-44 font-bold" />
          <button className="p-1.5 bg-[#16a085] text-white rounded-md shadow-sm"><Search size={14}/></button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* VÙNG VẼ CÂY PHẢ HỆ */}
        <div className="flex-1 bg-white border-2 border-slate-50 rounded-[2.5rem] p-16 shadow-2xl shadow-slate-200/50 overflow-auto min-h-[900px] flex justify-center items-start">
          <div className="inline-block pt-10">
             <FamilyNode member={initialData} />
          </div>
        </div>

        {/* BẢNG THÔNG TIN BÊN PHẢI */}
        <div className="w-full xl:w-80 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 border border-white text-left">
            <h3 className="font-black text-slate-800 text-lg border-b border-slate-50 pb-4 mb-4 flex items-center gap-2 italic uppercase">
               <Info size={20} className="text-teal-500" /> Hồ sơ Dòng họ
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-white shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Tộc trưởng</p>
                <p className="text-sm font-bold text-slate-700 mt-2 uppercase italic leading-none">{initialData.name}</p>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-white shadow-sm">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Nam giới</p>
                <p className="text-2xl font-black text-blue-600 mt-2 leading-none">42 <span className="text-xs font-bold text-blue-400 uppercase">người</span></p>
              </div>
              <div className="p-4 bg-rose-50/50 rounded-2xl border border-white shadow-sm">
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-none">Nữ giới</p>
                <p className="text-2xl font-black text-rose-600 mt-2 leading-none">18 <span className="text-xs font-bold text-rose-400 uppercase">người</span></p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-white shadow-sm">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none">Quy mô</p>
                <p className="text-2xl font-black text-amber-700 mt-2 leading-none">05 <span className="text-xs font-bold text-amber-500 uppercase">Thế hệ</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTreePage;














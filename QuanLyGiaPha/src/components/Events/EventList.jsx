


// import React, { useState } from 'react';
// import { 
//   Search, RefreshCw, Plus, Edit, Trash2, X, 
//   Calendar, MapPin, Save, User, DollarSign, 
//   Paperclip, ClipboardList 
// } from 'lucide-react';

// const INITIAL_EVENTS = [
//   { 
//     id: 1, 
//     name: 'Đám giỗ Cụ Nguyễn Khánh An', 
//     time: '2025-07-03', 
//     location: 'Hòa Hải, Đà Nẵng', 
//     type: 'giỗ', 
//     status: 'Đã công bố',
//     budget: '5.000.000',
//     relatedPerson: 'Nguyễn Khánh An',
//     note: 'Chuẩn bị 5 mâm cỗ mặn, mời chi họ 2 và đại diện hội đồng gia tộc.'
//   },
//   { 
//     id: 2, 
//     name: 'Lễ Thanh Minh - Tảo mộ đầu xuân', 
//     time: '2025-03-05', 
//     location: 'Nghĩa trang dòng họ Nguyễn', 
//     type: 'lễ tết', 
//     status: 'Chưa công bố',
//     budget: '10.000.000',
//     relatedPerson: 'Tất cả con cháu',
//     note: 'Tổ chức phát quang, sơn sửa lại các mộ phần trong khu vực của tộc.'
//   }
// ];

// const EventList = () => {
//   const [events, setEvents] = useState(INITIAL_EVENTS);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '', time: '', location: '', type: 'giỗ', 
//     status: 'Chưa công bố', budget: '', relatedPerson: '', note: ''
//   });

//   const handleSave = () => {
//     if (!formData.name) return;
//     if (isEditing) {
//       setEvents(events.map(e => e.id === formData.id ? { ...formData } : e));
//     } else {
//       setEvents([...events, { ...formData, id: Date.now() }]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="p-8 bg-[#f0f4f0] min-h-screen font-sans text-left">
      
//       {/* HEADER - Xanh lá hài hòa với Shadow Emerald mạnh */}
//       <div className="flex justify-between items-center mb-12">
//         <div className="relative">
//           <h2 className="text-4xl font-black text-emerald-900 tracking-tighter flex items-center gap-4 italic uppercase">
//              <div className="p-4 bg-emerald-700 rounded-3xl text-white shadow-[0_15px_40px_-10px_rgba(5,150,105,0.7)] border-b-4 border-emerald-900">
//                 <Calendar size={36} />
//              </div>
//              Quản Lý Sự Kiện Tộc Phả
//           </h2>
//           <div className="absolute -bottom-3 left-20 w-32 h-2 bg-emerald-700 rounded-full shadow-[0_5px_15px_rgba(5,150,105,0.5)]"></div>
//         </div>
        
//         <button 
//           onClick={() => { setIsEditing(false); setShowModal(true); }} 
//           className="flex items-center gap-3 bg-emerald-800 text-white px-10 py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(6,78,59,0.4)] hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300 font-black active:scale-90 text-sm uppercase tracking-[0.2em] border-b-4 border-emerald-950"
//         >
//           <Plus size={22} strokeWidth={4} /> Khai lập sự kiện
//         </button>
//       </div>

//       {/* DANH SÁCH BẢNG - Hiệu ứng xanh hài hòa */}
//       <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(6,78,59,0.15)] overflow-hidden border-2 border-emerald-100">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             {/* Header bảng màu Xanh Rêu Đậm */}
//             <tr className="bg-emerald-900 border-b-4 border-emerald-600">
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-emerald-300 text-center w-24">Thứ tự</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white">Sự kiện & Địa điểm</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white w-1/3">Nội dung ghi chú</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">Trạng thái</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">Hành động</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y-4 divide-emerald-50">
//             {events.map((item, index) => (
//               <tr key={item.id} className="group hover:bg-emerald-50/80 transition-all duration-200">
//                 <td className="px-8 py-10 text-center font-black text-emerald-800 italic text-xl border-r border-emerald-50">#{index + 1}</td>
                
//                 <td className="px-8 py-10">
//                   <div className="flex flex-col gap-2">
//                     <span className="font-black text-emerald-950 uppercase text-base tracking-tight leading-none">{item.name}</span>
//                     <div className="flex items-center gap-3">
//                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-[0_4px_10px_rgba(0,0,0,0.1)] ${item.type === 'giỗ' ? 'bg-red-700' : 'bg-emerald-600'} text-white`}>
//                           {item.type}
//                        </span>
//                        <span className="text-xs text-emerald-800 font-black flex items-center gap-1 italic"><MapPin size={16} className="text-emerald-600"/> {item.location}</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-8 py-10">
//                   <div className="bg-emerald-50/30 p-6 rounded-3xl border-2 border-emerald-100 group-hover:border-emerald-600 group-hover:bg-white transition-all shadow-inner">
//                     <p className="text-xs text-emerald-900 leading-relaxed font-bold italic">
//                       {item.note || "Hệ thống chưa ghi nhận ghi chú."}
//                     </p>
//                   </div>
//                 </td>

//                 <td className="px-8 py-10 text-center">
//                   <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-4 text-[11px] font-black uppercase tracking-widest shadow-md ${
//                     item.status === 'Đã công bố' 
//                     ? 'text-emerald-950 bg-emerald-100 border-emerald-700 shadow-emerald-100' 
//                     : 'text-amber-950 bg-amber-100 border-amber-700 shadow-amber-100'
//                   }`}>
//                     {item.status}
//                   </span>
//                 </td>

//                 <td className="px-8 py-10 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110">
//                     <button onClick={() => { setIsEditing(true); setFormData(item); setShowModal(true); }} className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg hover:bg-emerald-800 active:scale-90"><Edit size={20}/></button>
//                     <button onClick={() => setEvents(events.filter(e => e.id !== item.id))} className="p-4 bg-rose-700 text-white rounded-2xl shadow-lg hover:bg-rose-900 active:scale-90"><Trash2 size={20}/></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL - Xanh Emerald hài hòa, Shadow nổi mạnh */}
//       {showModal && (
//         <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-2xl flex items-center justify-center z-[100] p-4">
//           <div className="bg-white rounded-[4.5rem] shadow-[0_60px_150px_-30px_rgba(6,78,59,0.5)] w-full max-w-2xl overflow-hidden border-[15px] border-emerald-900/20 animate-in zoom-in-90 duration-300">
            
//             {/* Header Modal - Màu Xanh Đậm uy nghiêm */}
//             <div className="p-12 border-b-8 border-emerald-900 bg-emerald-50/50 flex justify-between items-center relative">
//               <div className="flex items-center gap-6">
//                 <div className="p-5 bg-emerald-800 text-white rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.3)] -rotate-3 border-b-4 border-emerald-500">
//                    <Plus size={32} strokeWidth={4}/>
//                 </div>
//                 <div>
//                     <h3 className="font-black text-4xl text-emerald-950 tracking-tighter uppercase italic leading-none">
//                         {isEditing ? 'Cập Nhật Bản Ghi' : 'Khai Lập Sự Kiện'}
//                     </h3>
//                     <div className="h-2 w-32 bg-emerald-600 mt-2 rounded-full"></div>
//                 </div>
//               </div>
//               <button onClick={() => setShowModal(false)} className="p-4 bg-emerald-100 hover:bg-rose-600 hover:text-white rounded-full transition-all text-emerald-900 shadow-lg active:scale-75"><X size={36} strokeWidth={4} /></button>
//             </div>

//             {/* Body Modal - Khối Xanh hài hòa */}
//             <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto custom-scrollbar text-left">
              
//               <section className="space-y-6">
//                 <div className="inline-flex items-center gap-3 bg-emerald-900 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">1. Phân loại định danh</p>
//                 </div>
//                 <div className="grid grid-cols-3 gap-8">
//                   <div className="col-span-2">
//                     <label className="block text-xs font-black uppercase text-emerald-900 mb-3 ml-2 tracking-widest">Tên sự kiện quan trọng *</label>
//                     <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-700 font-black text-emerald-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] transition-all text-xl" placeholder="VD: GIỖ TỔ..." />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-black uppercase text-emerald-900 mb-3 ml-2 tracking-widest">Loại hình</label>
//                     <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-6 py-6 outline-none focus:border-emerald-700 font-black text-emerald-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] cursor-pointer appearance-none text-center">
//                         <option value="giỗ">GIỖ</option>
//                         <option value="họp">HỌP</option>
//                         <option value="lễ tết">LỄ</option>
//                     </select>
//                   </div>
//                 </div>
//               </section>

//               <section className="space-y-6">
//                 <div className="inline-flex items-center gap-3 bg-emerald-700 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">2. Không gian & Thời gian</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-10">
//                   <input type="date" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-700 font-black text-emerald-900 text-xl shadow-md" />
//                   <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-700 font-black text-emerald-900 shadow-md" placeholder="Địa chỉ chi tiết..." />
//                 </div>
//               </section>

//               <section className="space-y-6 pt-6 border-t-4 border-emerald-50">
//                 <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">3. Ghi chép nội bộ</p>
//                 </div>
//                 <textarea 
//                     value={formData.note} 
//                     onChange={(e) => setFormData({...formData, note: e.target.value})} 
//                     className="w-full bg-emerald-50/30 border-4 border-emerald-100 rounded-[3rem] px-10 py-8 outline-none focus:border-emerald-700 font-bold text-emerald-900 shadow-inner h-52 italic resize-none transition-all text-lg" 
//                     placeholder="Mô tả nội dung, danh sách lễ vật..." 
//                 />
//               </section>

//             </div>

//             {/* Footer Modal - Nút xanh Emerald nổi đậm */}
//             <div className="p-12 bg-emerald-950 flex justify-end gap-8 relative text-left">
//                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>
//                <button onClick={() => setShowModal(false)} className="px-10 py-5 font-black text-emerald-300 hover:text-white transition-colors uppercase text-sm tracking-widest border-b-2 border-transparent hover:border-white">Hủy bỏ</button>
//                <button onClick={handleSave} className="px-16 py-6 bg-emerald-500 text-emerald-950 rounded-3xl font-black shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] hover:bg-white hover:scale-105 active:scale-95 transition-all text-base uppercase tracking-[0.2em] flex items-center gap-4 border-b-8 border-emerald-800">
//                  <Save size={26} strokeWidth={3}/> Lưu Vào Tộc Phả
//                </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventList;














// import React, { useState } from 'react';
// import { 
//   Search, RefreshCw, Plus, Edit, Trash2, X, 
//   Calendar, MapPin, Save, User, DollarSign, 
//   Paperclip, ClipboardList 
// } from 'lucide-react';

// const INITIAL_EVENTS = [
//   { 
//     id: 1, 
//     name: 'Đám giỗ Cụ Nguyễn Khánh An', 
//     time: '2025-07-03', 
//     location: 'Hòa Hải, Đà Nẵng', 
//     type: 'giỗ', 
//     status: 'Đã công bố',
//     budget: '5.000.000',
//     relatedPerson: 'Nguyễn Khánh An',
//     note: 'Chuẩn bị 5 mâm cỗ mặn, mời chi họ 2 và đại diện hội đồng gia tộc.'
//   },
//   { 
//     id: 2, 
//     name: 'Lễ Thanh Minh - Tảo mộ đầu xuân', 
//     time: '2025-03-05', 
//     location: 'Nghĩa trang dòng họ Nguyễn', 
//     type: 'lễ tết', 
//     status: 'Chưa công bố',
//     budget: '10.000.000',
//     relatedPerson: 'Tất cả con cháu',
//     note: 'Tổ chức phát quang, sơn sửa lại các mộ phần trong khu vực của tộc.'
//   }
// ];

// const EventList = () => {
//   const [events, setEvents] = useState(INITIAL_EVENTS);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '', time: '', location: '', type: 'giỗ', 
//     status: 'Chưa công bố', budget: '', relatedPerson: '', note: ''
//   });

//   const handleSave = () => {
//     if (!formData.name) return;
//     if (isEditing) {
//       setEvents(events.map(e => e.id === formData.id ? { ...formData } : e));
//     } else {
//       setEvents([...events, { ...formData, id: Date.now() }]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <div className="p-8 bg-[#f0f9f4] min-h-screen font-sans text-left">
      
//       {/* HEADER - Tông Xanh Emerald chủ đạo */}
//       <div className="flex justify-between items-center mb-12">
//         <div className="relative">
//           <h2 className="text-4xl font-black text-emerald-900 tracking-tighter flex items-center gap-4 italic uppercase">
//              <div className="p-4 bg-emerald-600 rounded-3xl text-white shadow-[0_15px_35px_-10px_rgba(16,185,129,0.6)] border-b-4 border-emerald-800">
//                 <Calendar size={36} />
//              </div>
//              Quản Lý Sự Kiện Tộc Phả
//           </h2>
//           <div className="absolute -bottom-3 left-20 w-32 h-2 bg-emerald-500 rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.4)]"></div>
//         </div>
        
//         <button 
//           onClick={() => { setIsEditing(false); setShowModal(true); }} 
//           className="flex items-center gap-3 bg-emerald-700 text-white px-10 py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(6,78,59,0.3)] hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 font-black active:scale-90 text-sm uppercase tracking-[0.2em] border-b-4 border-emerald-900"
//         >
//           <Plus size={22} strokeWidth={4} /> Khai lập sự kiện
//         </button>
//       </div>

//       {/* DANH SÁCH BẢNG - Emerald nịnh mắt */}
//       <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(6,78,59,0.1)] overflow-hidden border-2 border-emerald-100">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-emerald-800 border-b-4 border-emerald-600 text-white">
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-emerald-200 text-center w-24">Thứ tự</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest">Sự kiện & Địa điểm</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest w-1/3 text-center">Nội dung ghi chú</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-center">Trạng thái</th>
//               <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-center">Hành động</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y-4 divide-emerald-50">
//             {events.map((item, index) => (
//               <tr key={item.id} className="group hover:bg-emerald-50 transition-all duration-200">
//                 <td className="px-8 py-10 text-center font-black text-emerald-900 italic text-xl border-r border-emerald-50">#{index + 1}</td>
                
//                 <td className="px-8 py-10">
//                   <div className="flex flex-col gap-2">
//                     <span className="font-black text-emerald-950 uppercase text-base tracking-tight leading-none group-hover:text-emerald-700 transition-colors">{item.name}</span>
//                     <div className="flex items-center gap-3">
//                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${item.type === 'giỗ' ? 'bg-rose-500' : 'bg-emerald-500'} text-white`}>
//                           {item.type}
//                        </span>
//                        <span className="text-xs text-emerald-800 font-black flex items-center gap-1 italic"><MapPin size={16} className="text-emerald-500"/> {item.location}</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-8 py-10">
//                   <div className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100 group-hover:border-emerald-500 group-hover:bg-white transition-all shadow-inner">
//                     <p className="text-xs text-emerald-900 leading-relaxed font-bold italic">
//                       {item.note || "Hệ thống chưa ghi nhận ghi chú."}
//                     </p>
//                   </div>
//                 </td>

//                 <td className="px-8 py-10 text-center">
//                   <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-4 text-[11px] font-black uppercase tracking-widest shadow-md ${
//                     item.status === 'Đã công bố' 
//                     ? 'text-emerald-900 bg-emerald-50 border-emerald-600 shadow-emerald-100' 
//                     : 'text-amber-800 bg-amber-50 border-amber-500 shadow-amber-100'
//                   }`}>
//                     {item.status}
//                   </span>
//                 </td>

//                 <td className="px-8 py-10 text-center">
//                   <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110">
//                     <button onClick={() => { setIsEditing(true); setFormData(item); setShowModal(true); }} className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-800 active:scale-90 transition-all"><Edit size={20}/></button>
//                     <button onClick={() => setEvents(events.filter(e => e.id !== item.id))} className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-800 active:scale-90 transition-all"><Trash2 size={20}/></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL - Tông Emerald hài hòa, Shadow nổi khối 3D */}
//       {showModal && (
//         <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 text-left">
//           <div className="bg-white rounded-[4.5rem] shadow-[0_60px_150px_-30px_rgba(6,78,59,1)] w-full max-w-2xl overflow-hidden border-[15px] border-emerald-100 animate-in zoom-in-90 duration-300">
            
//             {/* Header Modal - Emerald sang trọng */}
//             <div className="p-12 border-b-8 border-emerald-800 bg-emerald-50 flex justify-between items-center relative">
//               <div className="flex items-center gap-6 text-left">
//                 <div className="p-5 bg-emerald-700 text-white rounded-[2rem] shadow-[0_15px_30px_rgba(16,185,129,0.4)] -rotate-3 border-b-4 border-emerald-900">
//                    <Plus size={32} strokeWidth={4}/>
//                 </div>
//                 <div>
//                     <h3 className="font-black text-4xl text-emerald-950 tracking-tighter uppercase italic leading-none">
//                         {isEditing ? 'Cập Nhật Bản Ghi' : 'Khai Lập Sự Kiện'}
//                     </h3>
//                     <div className="h-2 w-32 bg-emerald-500 mt-2 rounded-full"></div>
//                 </div>
//               </div>
//               <button onClick={() => setShowModal(false)} className="p-4 bg-white hover:bg-rose-500 hover:text-white rounded-full transition-all text-emerald-900 shadow-lg border border-emerald-100 active:scale-75"><X size={36} strokeWidth={4} /></button>
//             </div>

//             {/* Body Modal - Khối Emerald hiện đại */}
//             <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
              
//               <section className="space-y-6">
//                 <div className="inline-flex items-center gap-3 bg-emerald-900 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">1. Phân loại sự kiện</p>
//                 </div>
//                 <div className="grid grid-cols-3 gap-8">
//                   <div className="col-span-2">
//                     <label className="block text-xs font-black uppercase text-emerald-800 mb-3 ml-2 tracking-widest">Tên sự kiện quan trọng *</label>
//                     <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-emerald-50/30 border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-600 font-black text-emerald-950 shadow-inner transition-all text-xl" placeholder="VD: GIỖ TỔ..." />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-black uppercase text-emerald-800 mb-3 ml-2 tracking-widest">Loại hình</label>
//                     <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-emerald-50/30 border-4 border-emerald-100 rounded-3xl px-6 py-6 outline-none focus:border-emerald-600 font-black text-emerald-950 cursor-pointer appearance-none text-center shadow-inner">
//                         <option value="giỗ">GIỖ</option>
//                         <option value="họp">HỌP</option>
//                         <option value="lễ tết">LỄ</option>
//                     </select>
//                   </div>
//                 </div>
//               </section>

//               <section className="space-y-6">
//                 <div className="inline-flex items-center gap-3 bg-emerald-800 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">2. Địa điểm & Thời gian</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-10">
//                   <input type="date" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-emerald-50/30 border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-500 font-black text-emerald-950 text-xl shadow-md transition-all" />
//                   <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-emerald-50/30 border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-emerald-500 font-black text-emerald-950 shadow-md transition-all" placeholder="Địa chỉ chi tiết..." />
//                 </div>
//               </section>

//               <section className="space-y-6 pt-6 border-t-4 border-emerald-50">
//                 <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-5 py-2 rounded-xl shadow-lg">
//                    <p className="text-xs font-black uppercase tracking-[0.3em]">3. Ghi chép gia tộc</p>
//                 </div>
//                 <textarea 
//                     value={formData.note} 
//                     onChange={(e) => setFormData({...formData, note: e.target.value})} 
//                     className="w-full bg-[#f9fdfb] border-4 border-emerald-100 rounded-[3rem] px-10 py-8 outline-none focus:border-emerald-700 font-bold text-emerald-950 shadow-inner h-52 italic resize-none transition-all text-lg" 
//                     placeholder="Mô tả nội dung, kịch bản chương trình..." 
//                 />
//               </section>

//             </div>

//             {/* Footer Modal - Emerald Button Nổi Đậm */}
//             <div className="p-12 bg-emerald-950 flex justify-end gap-8 relative overflow-hidden text-left">
//                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700"></div>
//                <button onClick={() => setShowModal(false)} className="px-10 py-5 font-black text-emerald-200 hover:text-white transition-colors uppercase text-sm tracking-widest border-b-2 border-transparent hover:border-emerald-200 underline underline-offset-8 decoration-2">Hủy bỏ</button>
//                <button onClick={handleSave} className="px-16 py-6 bg-emerald-500 text-emerald-950 rounded-3xl font-black shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6)] hover:bg-white hover:scale-105 active:scale-95 transition-all text-base uppercase tracking-[0.2em] flex items-center gap-4 border-b-8 border-emerald-700">
//                  <Save size={26} strokeWidth={3}/> Lưu Vào Tộc Phả
//                </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventList;






import React, { useState } from 'react';
import { 
  Search, RefreshCw, Plus, Edit, Trash2, X, 
  Calendar, MapPin, Save, User, DollarSign, 
  Paperclip, ClipboardList 
} from 'lucide-react';

const INITIAL_EVENTS = [
  { 
    id: 1, 
    name: 'Đám giỗ Cụ Nguyễn Khánh An', 
    time: '2025-07-03', 
    location: 'Hòa Hải, Đà Nẵng', 
    type: 'giỗ', 
    status: 'Đã công bố',
    budget: '5.000.000',
    relatedPerson: 'Nguyễn Khánh An',
    note: 'Chuẩn bị 5 mâm cỗ mặn, mời chi họ 2 và đại diện hội đồng gia tộc.'
  },
  { 
    id: 2, 
    name: 'Lễ Thanh Minh - Tảo mộ đầu xuân', 
    time: '2025-03-05', 
    location: 'Nghĩa trang dòng họ Nguyễn', 
    type: 'lễ tết', 
    status: 'Chưa công bố',
    budget: '10.000.000',
    relatedPerson: 'Tất cả con cháu',
    note: 'Tổ chức phát quang, sơn sửa lại các mộ phần trong khu vực của tộc.'
  }
];

const EventList = () => {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', time: '', location: '', type: 'giỗ', 
    status: 'Chưa công bố', budget: '', relatedPerson: '', note: ''
  });

  const handleSave = () => {
    if (!formData.name) return;
    if (isEditing) {
      setEvents(events.map(e => e.id === formData.id ? { ...formData } : e));
    } else {
      setEvents([...events, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-[#f0f7f4] min-h-screen font-sans text-left">
      
      {/* HEADER - Xanh Emerald tươi sáng như hình 1 */}
      <div className="flex justify-between items-center mb-12">
        <div className="relative">
          <h2 className="text-4xl font-black text-emerald-900 tracking-tighter flex items-center gap-4 italic uppercase">
             <div className="p-4 bg-[#10b981] rounded-3xl text-white shadow-[0_15px_35px_-10px_rgba(16,185,129,0.6)] border-b-4 border-emerald-700">
                <Calendar size={36} />
             </div>
             Quản Lý Sự Kiện Tộc Phả
          </h2>
          <div className="absolute -bottom-3 left-20 w-32 h-2 bg-[#10b981] rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.4)]"></div>
        </div>
        
        <button 
          onClick={() => { setIsEditing(false); setShowModal(true); }} 
          className="flex items-center gap-3 bg-[#065f46] text-white px-10 py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(6,95,70,0.3)] hover:bg-[#059669] hover:-translate-y-1 transition-all duration-300 font-black active:scale-90 text-sm uppercase tracking-[0.2em] border-b-4 border-emerald-900"
        >
          <Plus size={22} strokeWidth={4} /> Khai lập sự kiện
        </button>
      </div>

      {/* DANH SÁCH BẢNG - Thanh chính màu Xanh Emerald đậm */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(6,78,59,0.15)] overflow-hidden border-2 border-emerald-100">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Thanh chính màu Xanh Emerald đặc trưng */}
            <tr className="bg-[#10b981] border-b-4 border-emerald-700 text-white">
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-emerald-50 text-center w-24">Thứ tự</th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white">Sự kiện & Địa điểm</th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white w-1/3 text-center">Nội dung ghi chú</th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">Trạng thái</th>
              <th className="px-8 py-8 text-[12px] font-black uppercase tracking-widest text-white text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-emerald-50">
            {events.map((item, index) => (
              <tr key={item.id} className="group hover:bg-[#ecfdf5] transition-all duration-200">
                <td className="px-8 py-10 text-center font-black text-emerald-800 italic text-xl border-r border-emerald-50">#{index + 1}</td>
                
                <td className="px-8 py-10">
                  <div className="flex flex-col gap-2">
                    <span className="font-black text-emerald-950 uppercase text-base tracking-tight leading-none group-hover:text-emerald-600 transition-colors">{item.name}</span>
                    <div className="flex items-center gap-3">
                       <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${item.type === 'giỗ' ? 'bg-rose-500' : 'bg-[#10b981]'} text-white`}>
                          {item.type}
                       </span>
                       <span className="text-xs text-emerald-800 font-black flex items-center gap-1 italic"><MapPin size={16} className="text-[#10b981]"/> {item.location}</span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-10">
                  <div className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100 group-hover:border-[#10b981] group-hover:bg-white transition-all shadow-inner">
                    <p className="text-xs text-emerald-900 leading-relaxed font-bold italic text-left">
                      {item.note || "Hệ thống chưa ghi nhận ghi chú."}
                    </p>
                  </div>
                </td>

                <td className="px-8 py-10 text-center">
                  <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-4 text-[11px] font-black uppercase tracking-widest shadow-md ${
                    item.status === 'Đã công bố' 
                    ? 'text-emerald-900 bg-emerald-50 border-[#10b981] shadow-emerald-100' 
                    : 'text-amber-800 bg-amber-50 border-amber-500 shadow-amber-100'
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td className="px-8 py-10 text-center">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110">
                    <button onClick={() => { setIsEditing(true); setFormData(item); setShowModal(true); }} className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-800 active:scale-90 transition-all"><Edit size={20}/></button>
                    <button onClick={() => setEvents(events.filter(e => e.id !== item.id))} className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-800 active:scale-90 transition-all"><Trash2 size={20}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL - Áp dụng màu Xanh Emerald hài hòa */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 text-left">
          <div className="bg-white rounded-[4.5rem] shadow-[0_60px_150px_-30px_rgba(6,78,59,0.5)] w-full max-w-2xl overflow-hidden border-[15px] border-emerald-100 animate-in zoom-in-90 duration-300">
            
            {/* Header Modal - Xanh Emerald tươi sáng */}
            <div className="p-12 border-b-8 border-emerald-600 bg-emerald-50 flex justify-between items-center relative">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-[#10b981] text-white rounded-[2rem] shadow-[0_15px_30px_rgba(16,185,129,0.4)] -rotate-3 border-b-4 border-emerald-700">
                   <Plus size={32} strokeWidth={4}/>
                </div>
                <div>
                    <h3 className="font-black text-4xl text-emerald-950 tracking-tighter uppercase italic leading-none">
                        {isEditing ? 'Cập Nhật Bản Ghi' : 'Khai Lập Sự Kiện'}
                    </h3>
                    <div className="h-2 w-32 bg-[#10b981] mt-2 rounded-full"></div>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-4 bg-white hover:bg-rose-600 hover:text-white rounded-full transition-all text-emerald-900 shadow-lg border border-emerald-100 active:scale-75"><X size={36} strokeWidth={4} /></button>
            </div>

            {/* Body Modal */}
            <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
              
              <section className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-emerald-800 text-white px-5 py-2 rounded-xl shadow-lg">
                   <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                   <p className="text-xs font-black uppercase tracking-[0.3em]">1. Phân loại định danh</p>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 text-left">
                    <label className="block text-xs font-black uppercase text-emerald-900 mb-3 ml-2 tracking-widest">Tên sự kiện quan trọng *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-[#10b981] font-black text-emerald-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] transition-all text-xl" placeholder="VD: GIỖ TỔ..." />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-black uppercase text-emerald-900 mb-3 ml-2 tracking-widest">Loại hình</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-6 py-6 outline-none focus:border-[#10b981] font-black text-emerald-950 cursor-pointer appearance-none text-center shadow-inner">
                        <option value="giỗ">GIỖ</option>
                        <option value="họp">HỌP</option>
                        <option value="lễ tết">LỄ</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-[#059669] text-white px-5 py-2 rounded-xl shadow-lg">
                   <p className="text-xs font-black uppercase tracking-[0.3em]">2. Địa điểm & Thời gian</p>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <input type="date" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-[#10b981] font-black text-emerald-900 text-xl shadow-md transition-all" />
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-white border-4 border-emerald-100 rounded-3xl px-8 py-6 outline-none focus:border-[#10b981] font-black text-emerald-900 shadow-md transition-all" placeholder="Địa chỉ chi tiết..." />
                </div>
              </section>

              <section className="space-y-6 pt-6 border-t-4 border-emerald-50">
                <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-5 py-2 rounded-xl shadow-lg">
                   <p className="text-xs font-black uppercase tracking-[0.3em]">3. Ghi chép gia tộc</p>
                </div>
                <textarea 
                    value={formData.note} 
                    onChange={(e) => setFormData({...formData, note: e.target.value})} 
                    className="w-full bg-emerald-50/20 border-4 border-emerald-100 rounded-[3rem] px-10 py-8 outline-none focus:border-emerald-600 font-bold text-emerald-900 shadow-inner h-52 italic resize-none transition-all text-lg" 
                    placeholder="Mô tả nội dung, danh sách lễ vật..." 
                />
              </section>

            </div>

            {/* Footer Modal - Nút xanh Emerald nổi đậm 3D */}
            <div className="p-12 bg-emerald-950 flex justify-end gap-8 relative text-left overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-[#10b981] to-emerald-700"></div>
               <button onClick={() => setShowModal(false)} className="px-10 py-5 font-black text-emerald-300 hover:text-white transition-colors uppercase text-sm tracking-widest border-b-2 border-transparent hover:border-emerald-200 underline underline-offset-8 decoration-2">Hủy bỏ</button>
               <button onClick={handleSave} className="px-16 py-6 bg-[#10b981] text-emerald-950 rounded-3xl font-black shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6)] hover:bg-white hover:scale-105 active:scale-95 transition-all text-base uppercase tracking-[0.2em] flex items-center gap-4 border-b-8 border-emerald-800">
                 <Save size={26} strokeWidth={3}/> Lưu Vào Tộc Phả
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
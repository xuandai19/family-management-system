import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Landmark,
  MapPin,
  Calendar,
  User,
  FileText,
  Image,
  Clock,
  Hammer,
  TreePine,
  Wallet,
  Plus,
} from "lucide-react";
import { getAncestralHouse, getRenovationLogs } from "../../services/member";
import { PageHeader, QuickNavigation } from "../../components/member/common";

const UserAncestralHousePage = () => {
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [renovations, setRenovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");

  // Các link liên quan
  const relatedLinks = [
    {
      icon: TreePine,
      label: "Cây gia phả",
      description: "Xem cây gia phả dòng họ",
      path: "/member/family-tree",
    },
    {
      icon: Wallet,
      label: "Thu chi quỹ",
      description: "Xem báo cáo tài chính",
      path: "/member/fund-report",
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [houseRes, renovationsRes] = await Promise.all([
        getAncestralHouse(),
        getRenovationLogs(),
      ]);

      if (houseRes.success) {
        setHouse(houseRes.data);
      }
      if (renovationsRes.success) {
        setRenovations(renovationsRes.data || []);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Không rõ";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6914]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
      {/* Header với Breadcrumb */}
      <PageHeader
        icon={Landmark}
        title="Từ Đường"
        description="Thông tin nhà thờ tổ dòng họ"
        breadcrumbs={[{ label: "Từ đường" }]}
      />

      {house ? (
        <>
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {house.main_photo ? (
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={house.main_photo}
                  alt={house.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {house.name || "Từ đường họ"}
                  </h2>
                  <div className="flex items-center gap-2 text-amber-200">
                    <MapPin size={18} />
                    <span>{house.address || "Chưa cập nhật địa chỉ"}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 sm:h-80 bg-gradient-to-br from-[#8B6914] to-[#6B5210] flex items-center justify-center">
                <div className="text-center text-white">
                  <Landmark size={64} className="mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-bold">
                    {house.name || "Từ đường họ"}
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-6">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === "info"
                    ? "text-[#8B6914] border-b-2 border-[#8B6914]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Thông tin
                </div>
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === "gallery"
                    ? "text-[#8B6914] border-b-2 border-[#8B6914]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Image size={18} />
                  Hình ảnh
                </div>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === "history"
                    ? "text-[#8B6914] border-b-2 border-[#8B6914]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Hammer size={18} />
                  Lịch sử tu sửa
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "info" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Thông tin cơ bản */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-[#8B6914]" />
                  Thông tin cơ bản
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500">Địa chỉ</p>
                      <p className="text-slate-800">
                        {house.address || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500">Năm xây dựng</p>
                      <p className="text-slate-800">
                        {house.built_year || "Chưa rõ"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500">Người trông coi</p>
                      <p className="text-slate-800">
                        {house.caretaker_name || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lịch sử */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-[#8B6914]" />
                  Lịch sử
                </h3>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 whitespace-pre-wrap">
                    {house.history || "Chưa có thông tin lịch sử"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Hình ảnh từ đường
              </h3>
              {house.photo_gallery && house.photo_gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {house.photo_gallery.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={photo}
                        alt={`Ảnh ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image size={64} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">Chưa có hình ảnh</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Lịch sử tu sửa
              </h3>
              {renovations.length > 0 ? (
                <div className="space-y-4">
                  {renovations.map((renovation) => (
                    <div
                      key={renovation.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-slate-800">
                          {renovation.title}
                        </h4>
                        <span className="text-[#8B6914] font-medium">
                          {formatCurrency(renovation.cost)}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">
                        {renovation.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(renovation.date)}
                        </span>
                        {renovation.contractor && (
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {renovation.contractor}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Hammer size={64} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">Chưa có lịch sử tu sửa</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Landmark size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Chưa có thông tin từ đường</p>
          <p className="text-slate-400 text-sm mt-2">
            Liên hệ admin để cập nhật thông tin
          </p>
        </div>
      )}

      {/* Quick Navigation */}
      <QuickNavigation
        title="Khám phá thêm"
        items={relatedLinks}
        className="mt-8"
      />
    </div>
  );
};

export default UserAncestralHousePage;

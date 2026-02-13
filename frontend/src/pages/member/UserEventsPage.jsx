import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  CalendarDays,
  Filter,
  Plus,
  Search,
  Info,
} from "lucide-react";
import { PageHeader, QuickNavigation } from "../../components/member/common";
import { getMemberEvents } from "../../services/member";

const UserEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, upcoming, past
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMemberEvents();
      if (response.success) {
        setEvents(response.data || []);
      } else {
        setError(response.message || "Không thể tải danh sách sự kiện");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Không thể kết nối đến server");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeLabel = (type) => {
    const types = {
      ceremony: { label: "Lễ hội", color: "bg-amber-100 text-amber-700" },
      meeting: { label: "Họp mặt", color: "bg-blue-100 text-blue-700" },
      festival: { label: "Hội làng", color: "bg-green-100 text-green-700" },
      memorial: { label: "Giỗ chạp", color: "bg-purple-100 text-purple-700" },
      other: { label: "Khác", color: "bg-gray-100 text-gray-700" },
    };
    return types[type] || types.other;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date();
  };

  const filteredEvents = events.filter((event) => {
    // Filter by status
    if (filter === "upcoming" && !isUpcoming(event.event_date)) return false;
    if (filter === "past" && isUpcoming(event.event_date)) return false;

    // Filter by search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        event.title?.toLowerCase().includes(search) ||
        event.description?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Sort events: upcoming first, then by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aUpcoming = isUpcoming(a.event_date);
    const bUpcoming = isUpcoming(b.event_date);
    if (aUpcoming && !bUpcoming) return -1;
    if (!aUpcoming && bUpcoming) return 1;
    return new Date(a.event_date) - new Date(b.event_date);
  });

  const quickNavItems = [
    { label: "Trang chủ", path: "/member/dashboard" },
    { label: "Cây gia phả", path: "/member/family-tree" },
    { label: "Từ đường", path: "/member/ancestral-house" },
    { label: "Bài viết", path: "/member/posts" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Đang tải sự kiện...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <PageHeader
        title="Sự kiện dòng họ"
        subtitle="Xem và theo dõi các sự kiện sắp diễn ra"
        icon={Calendar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <QuickNavigation items={quickNavItems} />

        {/* Filters & Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              {[
                { key: "all", label: "Tất cả" },
                { key: "upcoming", label: "Sắp diễn ra" },
                { key: "past", label: "Đã qua" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === tab.key
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Propose Event Button */}
            <button
              onClick={() => navigate("/member/propose-event")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25"
            >
              <Plus size={20} />
              <span className="font-medium">Đề xuất sự kiện</span>
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Chưa có sự kiện nào
            </h3>
            <p className="text-gray-500 mb-4">
              {filter === "upcoming"
                ? "Không có sự kiện sắp diễn ra"
                : filter === "past"
                  ? "Không có sự kiện đã qua"
                  : "Hãy đề xuất sự kiện mới cho dòng họ"}
            </p>
            <button
              onClick={() => navigate("/member/propose-event")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              <Plus size={18} />
              Đề xuất sự kiện
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {sortedEvents.map((event) => {
              const typeInfo = getEventTypeLabel(event.event_type);
              const upcoming = isUpcoming(event.event_date);

              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all group ${
                    !upcoming ? "opacity-75" : ""
                  }`}
                >
                  {/* Header with date */}
                  <div
                    className={`p-4 ${
                      upcoming
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-gray-400"
                    } text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <p className="text-sm opacity-90">
                            {formatDate(event.event_date)}
                          </p>
                          <p className="text-lg font-bold">
                            {event.event_time || "08:00"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          upcoming ? "bg-white/20" : "bg-gray-500"
                        }`}
                      >
                        {upcoming ? "Sắp diễn ra" : "Đã qua"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                        {event.title}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${typeInfo.color}`}
                      >
                        {typeInfo.label}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} className="text-amber-500" />
                        <span>{event.location}</span>
                      </div>
                      {event.max_participants && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users size={16} className="text-amber-500" />
                          <span>
                            {event.current_participants || 0}/
                            {event.max_participants} người tham gia
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Progress bar for participants */}
                    {event.max_participants && upcoming && (
                      <div className="mt-4">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
                            style={{
                              width: `${((event.current_participants || 0) / event.max_participants) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Xem chi tiết</span>
                    <ChevronRight
                      size={18}
                      className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                        getEventTypeLabel(selectedEvent.event_type).color
                      }`}
                    >
                      {getEventTypeLabel(selectedEvent.event_type).label}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedEvent.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <Calendar className="text-amber-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(selectedEvent.event_date)} -{" "}
                        {selectedEvent.event_time || "08:00"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <MapPin className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Địa điểm</p>
                      <p className="font-medium text-gray-800">
                        {selectedEvent.location}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.max_participants && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <Users className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">
                          Số người tham gia
                        </p>
                        <p className="font-medium text-gray-800">
                          {selectedEvent.current_participants || 0} /{" "}
                          {selectedEvent.max_participants} người
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Info size={18} />
                    Mô tả
                  </h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Đóng
                  </button>
                  {isUpcoming(selectedEvent.event_date) && (
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-medium">
                      Đăng ký tham gia
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;

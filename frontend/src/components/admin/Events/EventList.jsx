import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Calendar,
  Filter,
  RefreshCw,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Bell,
  CalendarDays,
  Loader2,
} from "lucide-react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  EVENT_TYPES,
} from "../../../services/eventApi";
import EventCard from "./EventCard";
import EventFormModal from "./EventFormModal";
import EventDetailModal from "./EventDetailModal";

const EventList = () => {
  // State
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid | list | calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(data || []);
    } catch (err) {
      setError(
        typeof err === "string" ? err : "Không thể tải danh sách sự kiện"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by type
    if (selectedType !== "all") {
      result = result.filter((e) => e.event_type === selectedType);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(term) ||
          e.description?.toLowerCase().includes(term) ||
          e.location?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [events, selectedType, searchTerm]);

  // Categorize events
  const categorizedEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];
    const thisMonth = [];

    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate < now) {
        past.push(event);
      } else {
        upcoming.push(event);
        // Check if this month
        if (
          eventDate.getMonth() === now.getMonth() &&
          eventDate.getFullYear() === now.getFullYear()
        ) {
          thisMonth.push(event);
        }
      }
    });

    // Sort upcoming by date (nearest first)
    upcoming.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    // Sort past by date (most recent first)
    past.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

    return { upcoming, past, thisMonth };
  }, [filteredEvents]);

  // Handlers
  const handleCreate = () => {
    setSelectedEvent(null);
    setShowFormModal(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowFormModal(true);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const handleDelete = async (event) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sự kiện "${event.title}"?`)) {
      return;
    }

    try {
      await deleteEvent(event.id);
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    } catch (err) {
      alert("Lỗi khi xóa sự kiện: " + err);
    }
  };

  const handleSave = async (data) => {
    try {
      setSaving(true);
      if (selectedEvent) {
        // Update
        const updated = await updateEvent(selectedEvent.id, data);
        setEvents((prev) =>
          prev.map((e) => (e.id === selectedEvent.id ? updated : e))
        );
      } else {
        // Create
        const created = await createEvent(data);
        setEvents((prev) => [created, ...prev]);
      }
      setShowFormModal(false);
      setSelectedEvent(null);
    } catch (err) {
      alert("Lỗi: " + err);
    } finally {
      setSaving(false);
    }
  };

  // Calendar helpers
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startPadding = firstDay.getDay(); // 0 = Sunday

    // Previous month padding
    for (let i = 0; i < startPadding; i++) {
      const date = new Date(year, month, -startPadding + i + 1);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date) => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.event_date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const calendarDays = getCalendarDays();

  // Stats
  const stats = {
    total: events.length,
    upcoming: categorizedEvents.upcoming.length,
    thisMonth: categorizedEvents.thisMonth.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl text-white shadow-lg">
                <Calendar size={28} />
              </div>
              Quản lý Sự kiện
            </h1>
            <p className="text-gray-500 mt-2">
              Theo dõi và quản lý các sự kiện của dòng họ
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
          >
            <Plus size={20} />
            Tạo sự kiện mới
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <CalendarDays className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng sự kiện</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Calendar className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.upcoming}
              </p>
              <p className="text-sm text-gray-500">Sắp diễn ra</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Bell className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.thisMonth}
              </p>
              <p className="text-sm text-gray-500">Trong tháng này</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 bg-white min-w-[160px]"
            >
              <option value="all">Tất cả loại</option>
              {Object.entries(EVENT_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.icon} {value.label}
                </option>
              ))}
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white shadow text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white shadow text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "calendar"
                  ? "bg-white shadow text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CalendarDays size={20} />
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Type tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedType === "all"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tất cả ({events.length})
          </button>
          {Object.entries(EVENT_TYPES).map(([key, value]) => {
            const count = events.filter((e) => e.event_type === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedType === key
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{value.icon}</span>
                {value.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <p className="text-gray-500">Đang tải sự kiện...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
          >
            Thử lại
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Chưa có sự kiện nào
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedType !== "all"
              ? "Không tìm thấy sự kiện phù hợp với bộ lọc"
              : "Bắt đầu tạo sự kiện đầu tiên cho dòng họ"}
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            Tạo sự kiện mới
          </button>
        </div>
      ) : viewMode === "calendar" ? (
        /* Calendar View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              Tháng {currentMonth.getMonth() + 1}, {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
              <div
                key={day}
                className="text-center py-3 text-sm font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isToday =
                day.date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-xl transition-colors ${
                    day.isCurrentMonth
                      ? "bg-white border-gray-100"
                      : "bg-gray-50 border-transparent"
                  } ${isToday ? "ring-2 ring-emerald-500" : ""}`}
                >
                  <p
                    className={`text-sm font-medium mb-1 ${
                      day.isCurrentMonth ? "text-gray-800" : "text-gray-400"
                    } ${isToday ? "text-emerald-600" : ""}`}
                  >
                    {day.date.getDate()}
                  </p>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => {
                      const eventType =
                        EVENT_TYPES[event.event_type] || EVENT_TYPES.other;
                      return (
                        <button
                          key={event.id}
                          onClick={() => handleView(event)}
                          className={`w-full text-left px-2 py-1 rounded text-xs truncate hover:opacity-80 transition-opacity ${
                            eventType.color === "pink"
                              ? "bg-pink-100 text-pink-700"
                              : eventType.color === "purple"
                              ? "bg-purple-100 text-purple-700"
                              : eventType.color === "blue"
                              ? "bg-blue-100 text-blue-700"
                              : eventType.color === "amber"
                              ? "bg-amber-100 text-amber-700"
                              : eventType.color === "green"
                              ? "bg-green-100 text-green-700"
                              : eventType.color === "gray"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {eventType.icon} {event.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{dayEvents.length - 2} sự kiện
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Grid/List View */
        <div className="space-y-8">
          {/* Upcoming Events */}
          {categorizedEvents.upcoming.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                Sắp diễn ra ({categorizedEvents.upcoming.length})
              </h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {categorizedEvents.upcoming.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {categorizedEvents.past.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full" />
                Đã qua ({categorizedEvents.past.length})
              </h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {categorizedEvents.past.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <EventFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setSelectedEvent(null);
        }}
        onSave={handleSave}
        event={selectedEvent}
        loading={saving}
      />

      <EventDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EventList;

import { supabase } from "../config/supabase.js";
import mongoose from "mongoose"; 

// Định nghĩa schema Event ngay trong file controller
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['giỗ', 'họp', 'lễ tết', 'tu bổ', 'khác'],
    default: 'giỗ'
  },
  status: {
    type: String,
    enum: ['Chưa công bố', 'Đã công bố', 'Đã hoàn thành', 'Hủy'],
    default: 'Chưa công bố'
  },
  budget: {
    type: String, // lưu dạng chuỗi để dễ format frontend
    default: '0'
  },
  relatedPerson: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo model từ schema (nếu chưa tồn tại)
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// ==================== CONTROLLERS ====================

// Lấy danh sách sự kiện (Member+ xem được)
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ time: -1 })
      .select('-__v');
    
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy sự kiện' });
  }
};

// Tạo sự kiện mới (Admin only)
const createEvent = async (req, res) => {
  try {
    const {
      name, time, location, type, status,
      budget, relatedPerson, note
    } = req.body;

    if (!name || !time || !location) {
      return res.status(400).json({ message: 'Vui lòng nhập tên, ngày và địa điểm' });
    }

    const event = await Event.create({
      name,
      time,
      location,
      type: type || 'giỗ',
      status: status || 'Chưa công bố',
      budget: budget || '0',
      relatedPerson: relatedPerson || '',
      note: note || '',
      createdBy: req.user.id
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo sự kiện' });
  }
};

// Cập nhật sự kiện (Admin only)
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    }

    // Cập nhật các field có trong body
    Object.keys(req.body).forEach(key => {
      event[key] = req.body[key];
    });

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi cập nhật sự kiện' });
  }
};

// Xóa sự kiện (Admin only)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    }

    await event.deleteOne();
    res.json({ message: 'Xóa sự kiện thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi xóa sự kiện' });
  }
};

// Export tất cả (ESM)
export { getEvents, createEvent, updateEvent, deleteEvent };
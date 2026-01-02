// src/api/eventApi.js
import axios from 'axios';

// Base URL từ .env (VITE_API_URL = http://localhost:5000)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Hàm lấy token từ localStorage (hoặc AuthContext)
const getToken = () => localStorage.getItem('token');

// Get all events
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sự kiện:', error);
    throw error.response?.data?.message || 'Lỗi server';
  }
};

// Create new event
export const createEvent = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/events`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo sự kiện:', error);
    throw error.response?.data?.message || 'Lỗi server';
  }
};

// Update event
export const updateEvent = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/api/events/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật sự kiện:', error);
    throw error.response?.data?.message || 'Lỗi server';
  }
};

// Delete event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa sự kiện:', error);
    throw error.response?.data?.message || 'Lỗi server';
  }
};
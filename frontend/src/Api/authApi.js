
import api from './axios';

// 1. Call API Đăng ký
export const registerUser = async (data) => {
    // data bao gồm: email, password, username, full_name, gender, father_id, v.v.
    const response = await api.post('/auth/register', data);
    return response.data;
};

// 2. Call API Đăng nhập
export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; 
    // Trả về: { success: true, access_token: "...", user: { profile: {...} } }
};
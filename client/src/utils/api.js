import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 👈 Important — allow cookies to be sent automatically
});

// Optional: attach Authorization header from cookie (if backend still expects it)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('adminToken'); // 👈 read from cookies instead of localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('adminToken');
      Cookies.remove('adminData');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export default api;
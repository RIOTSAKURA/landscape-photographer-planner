import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 token（可选，第一版本地部署不需要）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 第一版本地部署模式：401 不再跳转登录页
    // 后续版本启用用户系统时可恢复此逻辑
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // 不再跳转登录页，第一版无需登录
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

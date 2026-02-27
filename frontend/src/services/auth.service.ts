import api from './api';
import { LoginResponse, RegisterResponse, User } from '../types/auth';

export const authService = {
  async register(email: string, password: string, nickname?: string): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', {
      email,
      password,
      nickname,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<{ id: string; email: string; nickname: string; level: 'beginner' | 'intermediate' | 'professional' }>(
      '/auth/profile'
    );
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

export default authService;

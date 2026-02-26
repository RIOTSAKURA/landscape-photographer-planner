export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  level: 'beginner' | 'intermediate' | 'professional';
  equipment?: string[];
}

export interface LoginResponse {
  message: string;
  user: User;
  access_token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

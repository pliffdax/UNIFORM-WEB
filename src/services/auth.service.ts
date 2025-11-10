import { apiClient } from '@/lib/api/client';
import { LoginDto, RegisterDto, AuthResponse, CurrentUser } from '@/types/auth.types';

export async function login(credentials: LoginDto): Promise<AuthResponse> {
  const response = await apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
    requiresAuth: false,
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
}

export async function register(userData: RegisterDto): Promise<AuthResponse> {
  const response = await apiClient<AuthResponse>('/auth/register', {
    method: 'POST',
    body: userData,
    requiresAuth: false,
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
}

export async function logout(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  try {
    await apiClient('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Failed to logout:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return apiClient<CurrentUser>('/auth/me');
}

// === ОБНОВИТЬ ТОКЕН ===
export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await apiClient<{ accessToken: string }>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    requiresAuth: false,
  });

  localStorage.setItem('accessToken', response.accessToken);
  return response.accessToken;
}

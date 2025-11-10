'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrentUser } from '@/types/auth.types';
import { getCurrentUser, logout as logoutService } from '@/services/auth.service';

// Тип контекста
interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (user: CurrentUser) => void;
  logout: () => Promise<void>;
}

// Создаём контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер (обёртка для app)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // При загрузке проверяем есть ли токен
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // Если токен есть - загружаем данные пользователя
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Если токен невалиден - удаляем
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Установить пользователя после логина
  const login = (userData: CurrentUser) => {
    setUser(userData);
  };

  // Выйти
  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования в компонентах
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

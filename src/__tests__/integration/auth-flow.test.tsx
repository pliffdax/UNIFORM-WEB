import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/app/login/page';
import RegistrationPage from '@/app/registration/page';

// Мокируем next/navigation один раз для всех тестов
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Хук для тестирования контекста
function TestAuthComponent() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span data-testid="username">{user?.username}</span>
          <span data-testid="auth-status">Authenticated</span>
        </div>
      ) : (
        <span data-testid="auth-status">Not authenticated</span>
      )}
    </div>
  );
}

// Мокируем переменную окружения
const API_GATEWAY_URL = 'https://uniform-api-6nnh.onrender.com';

describe('Auth Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    (global.fetch as jest.Mock).mockClear();
    mockPush.mockClear();
    // Устанавливаем переменную окружения для тестов
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = API_GATEWAY_URL;
  });

  describe('Login Flow', () => {
    it('should successfully login with valid credentials', async () => {
      // Мокируем успешный ответ от API
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/auth/login')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              user: {
                id: '1',
                username: 'testuser',
                email: 'test@test.com',
                isStaff: false,
                profile: null,
              },
            }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });

      render(
        <AuthProvider>
          <LoginPage />
        </AuthProvider>,
      );

      // Заполнить форму
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' },
      });

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      // Проверить что токены сохранены
      await waitFor(() => {
        expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
        expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
      });
    });

    it('should handle login error with invalid credentials', async () => {
      // Мокируем ошибку от API
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/auth/login')) {
          return Promise.resolve({
            ok: false,
            status: 401,
            json: async () => ({
              message: 'Invalid credentials',
            }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });

      render(
        <AuthProvider>
          <LoginPage />
        </AuthProvider>,
      );

      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'wrong@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'wrongpass' },
      });

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      // Токены НЕ должны быть сохранены
      await waitFor(() => {
        expect(localStorage.getItem('accessToken')).toBeNull();
      });
    });
  });

  describe('Registration Flow', () => {
    it('should successfully register new user', async () => {
      // Мокируем успешный ответ от API
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/auth/register')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              user: {
                id: '2',
                username: 'newuser',
                email: 'new@test.com',
                isStaff: false,
                profile: null,
              },
            }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });

      render(
        <AuthProvider>
          <RegistrationPage />
        </AuthProvider>,
      );

      // Заполнить форму регистрации
      fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: 'newuser' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'new@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' },
      });

      fireEvent.click(screen.getByRole('button', { name: /register/i }));

      // Проверить что токены сохранены
      await waitFor(() => {
        expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
        expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
      });
    });
  });

  describe('AuthContext Integration', () => {
    it('should provide authentication state through context', async () => {
      // Мокируем успешный ответ от /auth/me
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/auth/me')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              id: '1',
              username: 'testuser',
              email: 'test@test.com',
              isStaff: false,
              profile: null,
            }),
          } as Response);
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });

      // Установить токен в localStorage
      localStorage.setItem('accessToken', 'mock-token');

      render(
        <AuthProvider>
          <TestAuthComponent />
        </AuthProvider>,
      );

      // Сначала loading
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // После загрузки - authenticated
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
        expect(screen.getByTestId('username')).toHaveTextContent('testuser');
      });
    });

    it('should show not authenticated when no token', async () => {
      render(
        <AuthProvider>
          <TestAuthComponent />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
      });
    });
  });
});

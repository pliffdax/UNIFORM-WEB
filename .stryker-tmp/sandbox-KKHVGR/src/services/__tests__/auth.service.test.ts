// @ts-nocheck
import { login, register, logout, getCurrentUser } from '../auth.service';
import { apiClient } from '@/lib/api/client';

jest.mock('@/lib/api/client');

const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should save tokens to localStorage on success', async () => {
      const mockResponse = {
        accessToken: 'token123',
        refreshToken: 'refresh123',
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@test.com',
          isStaff: false,
          profile: null,
        },
      };

      mockApiClient.mockResolvedValue(mockResponse);

      await login({ email: 'test@test.com', password: '123456' });

      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'token123');
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh123');
    });

    it('should call apiClient with correct parameters', async () => {
      const credentials = { email: 'test@test.com', password: '123456' };

      mockApiClient.mockResolvedValue({
        accessToken: 'token',
        refreshToken: 'refresh',
        user: {} as any,
      });

      await login(credentials);

      expect(mockApiClient).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: credentials,
        requiresAuth: false,
      });
    });

    it('should throw error on failed login', async () => {
      mockApiClient.mockRejectedValue(new Error('Invalid credentials'));

      await expect(login({ email: 'wrong@test.com', password: 'wrong' })).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('should save tokens after successful registration', async () => {
      const mockResponse = {
        accessToken: 'token123',
        refreshToken: 'refresh123',
        user: {
          id: '1',
          username: 'newuser',
          email: 'new@test.com',
          isStaff: false,
          profile: null,
        },
      };

      mockApiClient.mockResolvedValue(mockResponse);

      await register({
        username: 'newuser',
        email: 'new@test.com',
        password: '123456',
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'token123');
    });
  });

  describe('logout', () => {
    it('should remove tokens from localStorage', async () => {
      mockApiClient.mockResolvedValue(undefined);

      await logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    });

    it('should call logout endpoint', async () => {
      mockApiClient.mockResolvedValue(undefined);

      await logout();

      expect(mockApiClient).toHaveBeenCalledWith('/auth/logout', {
        method: 'POST',
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user data', async () => {
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'test@test.com',
        isStaff: false,
        profile: null,
      };

      mockApiClient.mockResolvedValue(mockUser);

      const result = await getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(mockApiClient).toHaveBeenCalledWith('/auth/me');
    });
  });
});

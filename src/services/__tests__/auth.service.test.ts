import { login, register, logout, getCurrentUser, refreshAccessToken } from '../auth.service';
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
        accessToken: 'access',
        refreshToken: 'refresh',
        user: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
          isStaff: false,
          profile: null,
        },
      };

      mockApiClient.mockResolvedValue(mockResponse as any);

      const result = await login({
        email: 'test@test.com',
        password: 'password123',
      });

      expect(mockApiClient).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: {
          email: 'test@test.com',
          password: 'password123',
        },
        requiresAuth: false,
      });

      expect(localStorage.getItem('accessToken')).toBe('access');
      expect(localStorage.getItem('refreshToken')).toBe('refresh');
      expect(result).toEqual(mockResponse);
    });

    it('should propagate error from apiClient', async () => {
      const error = new Error('Login failed');
      mockApiClient.mockRejectedValue(error);

      await expect(
        login({
          email: 'test@test.com',
          password: 'password123',
        }),
      ).rejects.toThrow('Login failed');
    });
  });

  describe('register', () => {
    it('should save tokens to localStorage after successful registration', async () => {
      const mockResponse = {
        accessToken: 'access',
        refreshToken: 'refresh',
        user: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
          isStaff: false,
          profile: null,
        },
      };

      mockApiClient.mockResolvedValue(mockResponse as any);

      const result = await register({
        username: 'test',
        email: 'test@test.com',
        password: 'password123',
      });

      expect(mockApiClient).toHaveBeenCalledWith('/auth/register', {
        method: 'POST',
        body: {
          username: 'test',
          email: 'test@test.com',
          password: 'password123',
        },
        requiresAuth: false,
      });

      expect(localStorage.getItem('accessToken')).toBe('access');
      expect(localStorage.getItem('refreshToken')).toBe('refresh');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logout', () => {
    it('should remove tokens and call logout endpoint', async () => {
      localStorage.setItem('accessToken', 'access');
      localStorage.setItem('refreshToken', 'refresh');

      mockApiClient.mockResolvedValue({} as any);

      await logout();

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(mockApiClient).toHaveBeenCalledWith('/auth/logout', {
        method: 'POST',
      });
    });

    it('should log error and rethrow if logout request fails', async () => {
      const error = new Error('Network error');
      localStorage.setItem('accessToken', 'access');
      localStorage.setItem('refreshToken', 'refresh');

      mockApiClient.mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(logout()).rejects.toThrow('Network error');

      expect(consoleSpy).toHaveBeenCalledWith('Failed to logout:', error);

      consoleSpy.mockRestore();
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user data', async () => {
      const mockUser = {
        id: '1',
        username: 'test',
        email: 'test@test.com',
        isStaff: false,
        profile: null,
      };

      mockApiClient.mockResolvedValue(mockUser as any);

      const result = await getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(mockApiClient).toHaveBeenCalledWith('/auth/me');
    });
  });

  describe('refreshAccessToken', () => {
    it('should throw if no refresh token found', async () => {
      await expect(refreshAccessToken()).rejects.toThrow('No refresh token found');
    });

    it('should call /auth/refresh and save new access token', async () => {
      localStorage.setItem('refreshToken', 'refresh-token');

      mockApiClient.mockResolvedValue({ accessToken: 'new-access' } as any);

      const result = await refreshAccessToken();

      expect(mockApiClient).toHaveBeenCalledWith('/auth/refresh', {
        method: 'POST',
        body: { refreshToken: 'refresh-token' },
        requiresAuth: false,
      });

      expect(localStorage.getItem('accessToken')).toBe('new-access');
      expect(result).toBe('new-access');
    });
  });
});

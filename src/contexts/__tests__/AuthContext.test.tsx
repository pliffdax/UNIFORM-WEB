import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { getCurrentUser } from '@/services/auth.service';

jest.mock('@/services/auth.service');

const mockGetCurrentUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>;

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should provide auth context', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
  });

  it('should load user on mount if token exists', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      isStaff: false,
      profile: null,
    };

    localStorage.setItem('accessToken', 'test-token');
    mockGetCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should not load user if no token', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should set user on login', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      isStaff: false,
      profile: null,
    };

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should clear user on logout', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      isStaff: false,
      profile: null,
    };

    act(() => {
      result.current.login(mockUser);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});

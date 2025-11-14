import { apiClient } from '../../lib/api/client';

global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should make GET request with default method', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    await apiClient('/test');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'GET',
      }),
    );
  });

  it('should add Authorization header when requiresAuth is true', async () => {
    localStorage.setItem('accessToken', 'test-token');

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    await apiClient('/test', { requiresAuth: true });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });

  it('should not add Authorization header when requiresAuth is false', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    await apiClient('/test', { requiresAuth: false });

    const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
    expect(callArgs.headers.Authorization).toBeUndefined();
  });

  it('should include body in POST request', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const body = { email: 'test@test.com', password: '123' };

    await apiClient('/test', {
      method: 'POST',
      body,
      requiresAuth: false,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
      }),
    );
  });

  it('should throw error on 401 response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    await expect(apiClient('/test')).rejects.toThrow('Unauthorized');
  });

  it('should throw error on failed response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });

    await expect(apiClient('/test')).rejects.toThrow();
  });
});

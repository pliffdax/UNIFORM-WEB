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

  it('should include body for POST request', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const body = { name: 'test' };

    await apiClient('/test', {
      method: 'POST',
      body,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
      }),
    );
  });

  it('should clear tokens and throw Unauthorized on 401 response', async () => {
    localStorage.setItem('accessToken', 'test-token');

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    await expect(apiClient('/test')).rejects.toThrow('Unauthorized');
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should throw error with server message on failed response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });

    await expect(apiClient('/test')).rejects.toThrow('Server error');
  });

  it('should fallback to "Unknown error" when response json fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('parse error');
      },
    });

    await expect(apiClient('/test')).rejects.toThrow('Unknown error');
  });
});

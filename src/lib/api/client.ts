const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export async function apiClient<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, requiresAuth = true } = config;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const fetchConfig: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    fetchConfig.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_GATEWAY_URL}${endpoint}`, fetchConfig);

    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}

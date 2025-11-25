import { ApiClient, BrowserTokenStorage, FetchHttpClient, type RequestConfig } from '@uniform/api-client';

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || '';

const tokenStorage = new BrowserTokenStorage();
const httpClient = new FetchHttpClient();

const apiClientInstance = new ApiClient({
  baseUrl: API_GATEWAY_URL,
  tokenStorage,
  httpClient,
  authHandler: {
    onUnauthorized: () => {
      if (typeof window !== 'undefined') {
        tokenStorage.removeAccessToken();
        tokenStorage.removeRefreshToken();
        window.location.href = '/login';
      }
    },
  },
});

export async function apiClient<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  return apiClientInstance.request<T>(endpoint, config);
}

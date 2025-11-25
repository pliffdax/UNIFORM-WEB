import { TokenStorage } from './interfaces/TokenStorage';
import { HttpClient, HttpResponse } from './interfaces/HttpClient';
import { AuthHandler } from './interfaces/AuthHandler';

export interface ApiClientConfig {
  baseUrl: string;
  tokenStorage: TokenStorage;
  httpClient: HttpClient;
  authHandler?: AuthHandler;
  defaultHeaders?: Record<string, string>;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

export class ApiClient {
  private baseUrl: string;
  private tokenStorage: TokenStorage;
  private httpClient: HttpClient;
  private authHandler?: AuthHandler;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.tokenStorage = config.tokenStorage;
    this.httpClient = config.httpClient;
    this.authHandler = config.authHandler;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders,
    };
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const {
      method = 'GET',
      body,
      headers = {},
      requiresAuth = true,
    } = config;

    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (requiresAuth) {
      const token = this.tokenStorage.getAccessToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const httpConfig = {
      method,
      headers: requestHeaders,
      body: body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
        ? JSON.stringify(body)
        : undefined,
    };

    try {
      const response = await this.httpClient.request<T>(
        `${this.baseUrl}${endpoint}`,
        httpConfig
      );

      if (response.status === 401) {
        if (this.authHandler?.onUnauthorized) {
          await this.authHandler.onUnauthorized();
        }
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        const error = await this.parseError(response);
        if (this.authHandler?.onError) {
          this.authHandler.onError(error);
        }
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (this.authHandler?.onError && error instanceof Error) {
        this.authHandler.onError(error);
      }
      throw error;
    }
  }

  private async parseError(response: HttpResponse): Promise<Error> {
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        return new Error(String(errorData.message));
      }
    } catch {
    }
    return new Error(`HTTP Error: ${response.status}`);
  }
}


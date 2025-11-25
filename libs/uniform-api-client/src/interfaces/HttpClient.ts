export interface HttpResponse<T = unknown> {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<T>;
  text(): Promise<string>;
}

export interface HttpRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string;
}

export interface HttpClient {
  request<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}


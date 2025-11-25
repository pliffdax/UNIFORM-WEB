import { HttpClient, HttpRequestConfig, HttpResponse } from '../interfaces/HttpClient';

export class FetchHttpClient implements HttpClient {
  async request<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: config?.method || 'GET',
      headers: config?.headers,
      body: config?.body,
    });

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      async json(): Promise<T> {
        return response.json() as Promise<T>;
      },
      async text(): Promise<string> {
        return response.text();
      },
    };
  }
}


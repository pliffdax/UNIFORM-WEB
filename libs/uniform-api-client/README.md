# Uniform API Client

Universal API client library with dependency injection support.

## Features

- Dependency injection for token storage and HTTP client
- TypeScript support
- Framework agnostic
- Extensible architecture

## Usage

```typescript
import { ApiClient, BrowserTokenStorage, FetchHttpClient } from '@uniform/api-client';

const client = new ApiClient({
  baseUrl: 'https://api.example.com',
  tokenStorage: new BrowserTokenStorage(),
  httpClient: new FetchHttpClient(),
  authHandler: {
    onUnauthorized: () => {
      window.location.href = '/login';
    },
  },
});

const data = await client.request<User>('/users/1');
```


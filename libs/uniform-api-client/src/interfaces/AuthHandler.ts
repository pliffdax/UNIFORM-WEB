export interface AuthHandler {
  onUnauthorized?(): void | Promise<void>;
  onError?(error: Error): void;
}


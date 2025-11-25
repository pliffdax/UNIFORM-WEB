import { TokenStorage } from '../interfaces/TokenStorage';

export class BrowserTokenStorage implements TokenStorage {
  private accessTokenKey: string;
  private refreshTokenKey: string;

  constructor(accessTokenKey = 'accessToken', refreshTokenKey = 'refreshToken') {
    this.accessTokenKey = accessTokenKey;
    this.refreshTokenKey = refreshTokenKey;
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.accessTokenKey, token);
  }

  removeAccessToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.refreshTokenKey, token);
  }

  removeRefreshToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.refreshTokenKey);
  }
}


import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://uniform-api-6nnh.onrender.com/auth/login', () => {
    return HttpResponse.json({
      accessToken: 'mock-token',
      refreshToken: 'mock-refresh',
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@test.com',
        isStaff: false,
        profile: null,
      },
    });
  }),

  http.post('https://uniform-api-6nnh.onrender.com/auth/register', () => {
    return HttpResponse.json({
      accessToken: 'mock-token',
      refreshToken: 'mock-refresh',
      user: {
        id: '2',
        username: 'newuser',
        email: 'new@test.com',
        isStaff: false,
        profile: null,
      },
    });
  }),
];

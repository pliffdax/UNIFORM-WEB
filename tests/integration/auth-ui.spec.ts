import { test, expect } from '@playwright/test';

type TestCurrentUser = {
  id: string;
  username: string;
  email: string;
};

test.describe('Auth UI Integration', () => {
  let currentUser: TestCurrentUser | null;

  test.beforeEach(async ({ context }) => {
    currentUser = null;

    // Mock /auth/register: use data from request body
    await context.route('**/auth/register', async route => {
      const request = route.request();
      const body = request.postDataJSON() as {
        username: string;
        email: string;
        password: string;
      };

      currentUser = {
        id: '1',
        username: body.username,
        email: body.email,
      };

      const now = new Date().toISOString();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          accessToken: 'fake-access',
          refreshToken: 'fake-refresh',
          user: {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            isStaff: false,
            createdAt: now,
            updatedAt: now,
            profile: null,
          },
        }),
      });
    });

    // Mock /auth/login: derive username from email
    await context.route('**/auth/login', async route => {
      const request = route.request();
      const body = request.postDataJSON() as {
        email: string;
        password: string;
      };

      const email = body.email;
      const username = email.split('@')[0];

      currentUser = {
        id: '1',
        username,
        email,
      };

      const now = new Date().toISOString();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          accessToken: 'fake-access',
          refreshToken: 'fake-refresh',
          user: {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            isStaff: false,
            createdAt: now,
            updatedAt: now,
            profile: null,
          },
        }),
      });
    });

    // Mock /auth/me: return current user if exists
    await context.route('**/auth/me', async route => {
      if (!currentUser) {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Unauthorized' }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          isStaff: false,
          profile: null,
        }),
      });
    });

    // Optional: mock /auth/logout so it never fails on network level
    await context.route('**/auth/logout', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok' }),
      });
    });
  });

  test('should handle full user journey', async ({ page }) => {
    await page.goto('http://localhost:3000/registration');

    const timestamp = Date.now();

    // Registration
    await page.fill('[placeholder*="Username"]', `user${timestamp}`);
    await page.fill('[placeholder*="Email"]', `user${timestamp}@test.com`);
    await page.fill('[placeholder*="Password"]', 'testpass123');
    await page.click('button[type="submit"]');

    // After successful registration user should be on /main
    await expect(page).toHaveURL('/main');

    // Username should be visible somewhere in the UI (for example in navbar)
    await expect(page.locator(`text=user${timestamp}`)).toBeVisible();

    // Logout (app may or may not redirect automatically — do not rely on it)
    await page.click('button:has-text("Вийти")');

    // Go to login page explicitly and continue the flow
    await page.goto('http://localhost:3000/login');

    // Login with the same user
    await page.fill('[placeholder*="Email"]', `user${timestamp}@test.com`);
    await page.fill('[placeholder*="Password"]', 'testpass123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/main');

    // State should persist after reload
    await page.reload();
    await expect(page.locator(`text=user${timestamp}`)).toBeVisible();
  });

  test('should persist auth state across tabs', async ({ page, context }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('[placeholder*="Email"]', 'admin@gmail.com');
    await page.fill('[placeholder*="Password"]', 'oooo');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/main');

    const newPage = await context.newPage();
    await newPage.goto('http://localhost:3000/main');

    // Navbar (or other UI) should show username "admin"
    await expect(newPage.locator('text=admin')).toBeVisible();
  });

  test('should handle token expiration gracefully', async () => {
    // to be implemented when token refresh logic appears in the app
  });
});

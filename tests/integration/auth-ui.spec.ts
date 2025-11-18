import { test, expect } from '@playwright/test';

test.describe('Auth UI Integration', () => {
  test('should handle full user journey', async ({ page, context }) => {
    await page.goto('http://localhost:3000/registration');

    const timestamp = Date.now();
    await page.fill('[placeholder*="Username"]', `user${timestamp}`);
    await page.fill('[placeholder*="Email"]', `user${timestamp}@test.com`);
    await page.fill('[placeholder*="Password"]', 'testpass123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/main');

    await expect(page.locator(`text=user${timestamp}`)).toBeVisible();

    await page.click('button:has-text("Выйти")');
    await expect(page).toHaveURL('/login');

    await page.fill('[placeholder*="Email"]', `user${timestamp}@test.com`);
    await page.fill('[placeholder*="Password"]', 'testpass123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/main');

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

    await expect(newPage.locator('text=admin')).toBeVisible();
  });

  test('should handle token expiration gracefully', async ({ page }) => {
    // TODO: realize after configuring mock for expired tokens
  });
});

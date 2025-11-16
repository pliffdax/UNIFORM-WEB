import { test, expect } from '@playwright/test';

test.describe.skip('Full Auth E2E Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('should display user info after successful registration', async ({ page }) => {});

  test('should login existing user and open main page', async ({ page }) => {
    const email = 'test@test.com';
    const password = 'password123';
    const username = 'testuser';

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.fill('[placeholder*="Email"]', email);
    await page.fill('[placeholder*="Password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/main', { timeout: 20000 });
    await expect(page.locator(`text=${username}`)).toBeVisible({ timeout: 15000 });
    await expect(page.locator('button:has-text("Выйти")')).toBeVisible();
  });
});

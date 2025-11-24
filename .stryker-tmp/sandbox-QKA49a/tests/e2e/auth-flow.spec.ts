// @ts-nocheck
import { test, expect } from '@playwright/test';

test.describe('Full Auth E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should register new user successfully', async ({ page }) => {
    const timestamp = Date.now();
    const username = `user${timestamp}`;
    const email = `test${timestamp}@test.com`;

    await page.goto('/registration');

    await page.fill('[placeholder*="Username"]', username);
    await page.fill('[placeholder*="Email"]', email);
    await page.fill('[placeholder*="Password"]', 'password123');

    await page.click('button[type="submit"]');

    await page.waitForURL('**/main', { timeout: 20000 });

    await expect(page.locator(`text=${username}`)).toBeVisible({ timeout: 15000 });
  });

  test('should display user info after successful registration', async ({ page }) => {
    const timestamp = Date.now();
    const username = `user${timestamp}`;
    const email = `test${timestamp}@test.com`;

    await page.goto('/registration');
    await page.fill('[placeholder*="Username"]', username);
    await page.fill('[placeholder*="Email"]', email);
    await page.fill('[placeholder*="Password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/main', { timeout: 20000 });

    await expect(page.locator(`text=${username}`)).toBeVisible({ timeout: 15000 });

    await expect(page.locator('button:has-text("Выйти")')).toBeVisible();
  });
});

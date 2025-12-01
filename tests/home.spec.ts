import { test, expect } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
  await page.goto('http://localhost:3000/protected/home');
});

test('Server View loads when logged in', async ({ page }) => {
  const serverViewContainer = page.locator('#server-view-container');
  await expect(serverViewContainer).toBeVisible({ timeout: 30000 });
});

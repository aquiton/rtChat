import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authentication', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[name="email"]', process.env.FIREBASE_USERNAME!);
  await page.fill('input[name="password"]', process.env.FIREBASE_PASSWORD!);

  // Click the login button!
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  const serverViewContainer = page.locator('#server-view-container');
  await expect(serverViewContainer).toBeVisible({ timeout: 30000 });

  // Save the authenticated session
  await page.context().storageState({ path: authFile, indexedDB: true });
});

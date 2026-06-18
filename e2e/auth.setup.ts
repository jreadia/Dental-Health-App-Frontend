import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform a REAL login to generate the session state
  await page.goto('/');
  await page.getByPlaceholder('Email').fill(process.env.TEST_USER_EMAIL as string);
  await page.getByPlaceholder('Password').fill(process.env.TEST_USER_PASSWORD as string);
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for the login to succeed and navigate to homepage
  // Increased timeout to 30s because Render free tier might be waking up
  await expect(page).toHaveURL(/.*homepage/, { timeout: 30000 });

  // Save the authentication state (cookies, localStorage, etc.)
  await page.context().storageState({ path: authFile });
});

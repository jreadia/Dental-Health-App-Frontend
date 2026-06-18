import { test as setup, expect } from '@playwright/test';

const adminAuthFile = 'playwright/.auth/admin.json';

setup('authenticate admin', async ({ page }) => {
  // Perform a REAL login to generate the admin session state
  await page.goto('/admin-login');
  
  await page.getByPlaceholder('Enter admin email').fill(process.env.ADMIN_USER_EMAIL as string);
  await page.getByPlaceholder('Enter admin password').fill(process.env.ADMIN_USER_PASSWORD as string);
  
  await page.getByRole('button', { name: 'ENTER ADMIN' }).click();

  // Wait for the login to succeed and navigate to the admin dashboard
  await expect(page).toHaveURL(/.*\/admin$/, { timeout: 30000 });

  // Save the authentication state (localStorage, etc.)
  await page.context().storageState({ path: adminAuthFile });
});

import { test, expect } from '@playwright/test';

// Instruct Playwright to use the admin session for all tests in this file
test.use({ storageState: 'playwright/.auth/admin.json' });

test.describe('Admin Flow (Real API)', () => {
  test('admin can view dashboard and navigate to data dashboard', async ({ page }) => {
    await page.goto('/admin');
    
    // Check that we are on the Admin Dashboard
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Access Data')).toBeVisible();

    // Click on Access Data
    await page.getByText('Access Data').click();

    // Verify transition to Data Dashboard
    await expect(page.getByText('Data Dashboard', { exact: true })).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Back')).toBeVisible();
  });

  test('admin can click a user in the data dashboard and see user scan data', async ({ page }) => {
    await page.goto('/admin');
    await page.getByText('Access Data').click();
    
    // Wait for the users to load
    await expect(page.locator('text=/Loading users/i')).toBeHidden({ timeout: 30000 });
    
    // Click the first valid user row in the table, specifically on the email cell to avoid stopPropagation buttons
    const userRow = page.locator('tbody tr.cursor-pointer').first();
    await userRow.waitFor({ state: 'visible', timeout: 30000 });
    await userRow.locator('td').nth(1).click();
    
    // Check that we transitioned to the User Scans page
    await expect(page.getByRole('heading', { name: 'User Scans' })).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Recent Scans (Last 3)')).toBeVisible();
    
    // Wait for the loading text to disappear
    await expect(page.locator('text=/Loading scans/i')).toBeHidden({ timeout: 30000 });
  });

  test('admin can log out', async ({ page }) => {
    await page.goto('/admin');
    
    // Log out
    await page.getByText('Logout').click();

    // Verify redirection to login page
    await expect(page).toHaveURL(/.*login/, { timeout: 30000 });
  });

  test.describe('Unauthenticated Admin Access', () => {
    // Clear the storage state specifically for these tests
    test.use({ storageState: { cookies: [], origins: [] } });

    test('shows error on invalid admin credentials', async ({ page }) => {
      await page.goto('/admin-login');
      
      await page.getByPlaceholder('Enter admin email').fill('invalid-admin@example.com');
      await page.getByPlaceholder('Enter admin password').fill('wrongpass');
      await page.getByRole('button', { name: 'ENTER ADMIN' }).click();

      // Look for the error message
      await expect(page.locator('text=/⚠/i')).toBeVisible({ timeout: 30000 });
    });

    test('redirects unauthenticated user away from admin dashboard', async ({ page }) => {
      // Trying to access the admin portal directly
      await page.goto('/admin');

      // It should redirect to login if not authenticated
      await expect(page).toHaveURL(/.*login/, { timeout: 30000 });
    });
  });
});

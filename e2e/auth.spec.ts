import { test, expect } from '@playwright/test';

test.describe('Authentication Flow (Real API)', () => {
  // Clear any authenticated state since these tests explicitly test the login/signup flow
  test.use({ storageState: { cookies: [], origins: [] } });

  test('user can log in with valid credentials', async ({ page }) => {
    // IMPORTANT: For this test to pass, you must manually register an account
    // with email 'e2e-tester@example.com' and password 'password123' in your production app!
    await page.goto('/login'); // Assuming /login works, or just /

    await page.getByPlaceholder('Email').fill('e2e-tester@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful navigation to homepage
    // Note: If the test user doesn't exist, this will fail. That is expected!
    await expect(page).toHaveURL(/.*homepage/, { timeout: 30000 });
  });

  test('shows error on invalid credentials', async ({ page }) => {
    // This hits the real API and expects a 401/error response
    await page.goto('/');
    
    await page.getByPlaceholder('Email').fill('wrong@example.com');
    await page.getByPlaceholder('Password').fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify error is displayed on screen (we look for the red error box class instead of exact text)
    // Increased timeout to 30s because Render free tier might be waking up
    await expect(page.locator('.text-red-200')).toBeVisible({ timeout: 30000 });
  });
  
  test('validates registration form without submitting', async ({ page }) => {
    await page.goto('/signup');
    
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Phone Number').fill('1234567890');
    await page.getByPlaceholder('Address').fill('123 Test St');
    
    // Fill the date input (Birthday)
    await page.locator('input[type="date"]').fill('2000-01-01');

    await page.getByPlaceholder('Email').fill('newuser@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByPlaceholder('Confirm').fill('password123');
    
    // Just testing the UI state, not clicking submit to avoid DB bloat!
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeEnabled();
  });
});

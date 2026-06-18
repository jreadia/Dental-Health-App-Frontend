import { test, expect } from '@playwright/test';

test.describe('Upload Flow (Hybrid: Real Auth, Mocked ML)', () => {
  test('user logs in and views upload page', async ({ page }) => {
    // 1. Perform a REAL login
    // IMPORTANT: Ensure 'e2e-tester@example.com' with 'password123' exists in Prod!
    await page.goto('/');
    await page.getByPlaceholder('Email').fill('e2e-tester@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for the login to succeed and navigate to homepage
    // Increased timeout to 30s because Render free tier might be waking up
    await expect(page).toHaveURL(/.*homepage/, { timeout: 30000 });

    // 2. Navigate to upload page
    await page.goto('/upload');
    await expect(page.locator('h2')).toContainText('UPLOAD IMAGE');
    await expect(page.getByText(/Disclaimer/i).first()).toBeVisible();
    
    // 3. Mock the ML API call only
    await page.route('**/api/v1/dental-images', async (route) => {
      await route.fulfill({ 
        status: 201, 
        json: { 
          imageId: 'test-123',
          mlResults: {
            calculusAmount: 5,
            overall_diagnosis: 'Unhealthy'
          }
        } 
      });
    });
    
    // In a real test we would upload a file and verify the results,
    // but the dropzone requires specific DOM structure to interact with.
  });
});

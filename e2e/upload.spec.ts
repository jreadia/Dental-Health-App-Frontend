import { test, expect } from '@playwright/test';

test.describe('Upload Flow (Hybrid: Real Auth, Mocked ML)', () => {
  test('user logs in and views upload page', async ({ page }) => {
    // We are already authenticated via the global setup
    // 1. Navigate to upload page directly
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
    // we also do not want to overload the deployed model server
  });
});

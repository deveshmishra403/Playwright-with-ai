import { test, expect } from '@playwright/test';

test.skip('Navigate to QuadHQ Pilot and verify dashboard and chat', async ({ page }) => {
  // Step 1: Open the URL
  await page.goto('https://quadhq.ai/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Step 2: Navigate to Start Pilot - click on the "Start Pilot" link
  await page.getByRole('link', { name: /start pilot/i }).first().click();
  await page.waitForTimeout(3000);

  // Step 3: If login required, use credentials
  if (page.url().includes('/login')) {
    console.log('On login page, logging in with credentials...');
    
    // Fill email field
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill('mishra.devesh@edvanta.com');
    console.log('Email filled: mishra.devesh@edvanta.com');
    await page.waitForTimeout(1000);

    // Click Sign In button
    const signInBtn = page.locator('button:has-text("Sign In")').first();
    await signInBtn.click();
    console.log('Sign In button clicked');
    await page.waitForTimeout(3000);

    // Fill password field if visible
    const passwordInputs = page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();
    if (passwordCount > 0) {
      await passwordInputs.first().fill('Pass@123');
      console.log('Password filled');
      await page.waitForTimeout(1000);

      // Click Sign In button again for password submission
      const passwordSignInBtn = page.locator('button:has-text("Sign In")').first();
      await passwordSignInBtn.click();
      console.log('Password Sign In button clicked');
      await page.waitForTimeout(5000);
    }
  }

  // Step 4: Verify that the URL has /dashboard
  console.log('Current URL:', page.url());
  await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 15000 });

  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Step 5: Navigate to Chat page directly via URL
  await page.goto('https://quadhq.ai/chat', { waitUntil: 'domcontentloaded' });
  console.log('Navigated to chat page');
  await page.waitForTimeout(3000);

  // Step 6: Verify that chat page is successfully open and loaded
  console.log('Final URL:', page.url());
  await expect(page).toHaveURL(/.*chat/, { timeout: 15000 });
});

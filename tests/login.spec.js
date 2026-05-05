import { test, expect } from '@playwright/test';

test('Login and navigate to My Courses page', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://indisec.edvantalabs.com/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');git 

  // Step 1: Fill in the email field and click CONTINUE
  await page.getByLabel('your email address').fill('mishra.devesh@edvanta.com');
  await page.getByRole('button', { name: 'CONTINUE' }).click();

  // Wait for password page to load
  await page.waitForLoadState('networkidle');

  // Step 2: Fill in the password field and click CONTINUE
  await page.getByLabel('Enter Password').fill('Pass@123');
  await page.getByRole('button', { name: 'CONTINUE' }).click();

  // Wait for welcome page to load
  await page.waitForLoadState('networkidle');

  // Verify that the welcome screen is visible
  await expect(page).toHaveURL(/.*welcome\.php/);
  await expect(page.locator('text=WELCOME')).toBeVisible();

  // Click on the "Enter" button to go to My Courses page
  await page.locator('a[href*="courses.php"]').click();

  // Wait for navigation to My Courses page
  await page.waitForLoadState('networkidle');

  // Verify that the user is redirected to My Courses page
  await expect(page).toHaveURL(/.*my\/courses\.php/);
});

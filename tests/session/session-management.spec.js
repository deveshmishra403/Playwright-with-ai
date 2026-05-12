// spec: specs/INDISEC-test-plan.md
// seed: tests/seed.spec.js

import { test, expect } from '@playwright/test';

test.describe('Session Management and Edge Cases', () => {
  // Helper function to login
  async function loginUser(page) {
    await page.goto('https://indisec.edvantalabs.com/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox', { name: 'your email address' }).fill('mishra.devesh@edvanta.com');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('Pass@123');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.waitForLoadState('networkidle');
    // Click the link to go to My Courses
    const enterLink = page.getByRole('link').nth(3);
    await enterLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*my\/courses\.php/);
  }

  test('Logout and Session Termination', async ({ page }) => {
    // Complete successful login and navigate to My Courses page
    await loginUser(page);
    await expect(page.getByRole('heading', { name: /Hi, Dev/ })).toBeVisible();

    // Access user menu and click logout
    const userMenuButton = await page.locator('#user-menu-toggle');
    await expect(userMenuButton).toBeVisible();
    await userMenuButton.click();
    // Wait for the dropdown to open and menu item to be visible
    await page.getByRole('menuitem', { name: 'Log out' }).waitFor({ state: 'visible', timeout: 5000 });
    // Click logout
    await page.getByRole('menuitem', { name: 'Log out' }).click();
    // Verify session is terminated and user is logged out
    await expect(page).toHaveURL(/.*login\/index\.php/);
    await expect(page.getByRole('heading', { name: /Log in to INDISEC/ })).toBeVisible();
  });

  test('Already Logged In - Redirect Behavior', async ({ page }) => {
    // Complete successful login as user 'Dev Test'
    await loginUser(page);
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();

    // Navigate to login page while logged in
    await page.goto('https://indisec.edvantalabs.com/login/index.php');
    await page.waitForLoadState('networkidle');

    // Wait for and verify confirmation dialog appears
    await page.getByRole('alertdialog').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.getByRole('alertdialog')).toBeVisible();
    
    // Verify dialog content
    const dialogText = page.locator('[role="alertdialog"]');
    await expect(dialogText).toContainText(/You are already logged in/);
    
    // Verify buttons exist
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();

    // Click Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.waitForLoadState('networkidle');

    // Verify user is redirected to dashboard
    await expect(page).toHaveURL(/.*my\/courses\.php/);
    // Verify user menu is still present and clickable, confirming we're logged in
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
  });

  test('Session Timeout Handling', async ({ page }) => {
    // Complete successful login and navigate to My Courses page
    await loginUser(page);
    await expect(page.getByRole('heading', { name: /Hi, Dev/ })).toBeVisible();

    // Clear session cookies and storage to simulate session timeout
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Attempt to navigate or interact on the page
    await page.goto('https://indisec.edvantalabs.com/my/courses.php');

    // Verify user is redirected to login page or session has been terminated
    await expect(page).toHaveURL(/.*login\/index\.php/);
  });

  test('Browser Back Button After Login', async ({ page }) => {
    // Complete successful login and proceed through welcome screen to My Courses page
    await page.goto('https://indisec.edvantalabs.com/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox', { name: 'your email address' }).fill('mishra.devesh@edvanta.com');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('Pass@123');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.waitForLoadState('networkidle');
    
    // Verify on welcome page
    await expect(page).toHaveURL(/.*welcome\.php/);
    
    // Click browser back button to go back to password page
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*password\.php/);
    
    // Click browser back button again to go back to email page
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*login\/index\.php/);
    
    // Verify the session is still active by navigating to courses page
    // This will show the already logged in dialog
    await page.goto('https://indisec.edvantalabs.com/login/index.php');
    await page.waitForLoadState('networkidle');
    await page.getByRole('alertdialog').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.getByRole('alertdialog')).toBeVisible();
  });

  test('Logout and Session Termination - Verify No Cached Data', async ({ page }) => {
    // Login
    await loginUser(page);
    
    // Logout
    const userMenuButton = await page.locator('#user-menu-toggle');
    await expect(userMenuButton).toBeVisible();
    await userMenuButton.click();
    // Wait for the dropdown to open and menu item to be visible
    await page.getByRole('menuitem', { name: 'Log out' }).waitFor({ state: 'visible', timeout: 5000 });
    // Click logout using role-based selector
    await page.getByRole('menuitem', { name: 'Log out' }).click();
    await page.waitForLoadState('networkidle');
    
    // Verify we're on login page
    await expect(page).toHaveURL(/.*login\/index\.php/);
    
    // Try to access courses page directly - should redirect to login
    await page.goto('https://indisec.edvantalabs.com/my/courses.php');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*login\/index\.php/);
  });

  test('Already Logged In - Log Out from Dialog', async ({ page }) => {
    // Complete successful login
    await loginUser(page);
    
    // Navigate to login page while logged in
    await page.goto('https://indisec.edvantalabs.com/login/index.php');
    await page.waitForLoadState('networkidle');
    
    // Wait for and verify confirmation dialog appears
    await page.getByRole('alertdialog').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.getByRole('alertdialog')).toBeVisible();
    
    // Click Log out button from dialog
    const logoutButton = page.getByRole('button', { name: 'Log out' });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await page.waitForLoadState('networkidle');
    
    // Verify user is logged out and on login page
    await expect(page).toHaveURL(/.*login\/index\.php/);
    await expect(page.getByRole('heading', { name: /Log in to INDISEC/ })).toBeVisible();
  });

  test('User Menu Visible and Accessible While Logged In', async ({ page }) => {
    // Login
    await loginUser(page);
    
    // Verify user menu is visible
    const userMenuButton = page.getByRole('button', { name: 'User menu' });
    await expect(userMenuButton).toBeVisible();
    
    // Click user menu to verify it can be clicked
    await userMenuButton.click();
    
    // Wait a moment for dropdown to animate
    await page.waitForTimeout(300);
    
    // Verify logout link in dropdown menu exists and can be clicked
    const logoutLink = page.getByRole('menuitem', { name: 'Log out' });
    await expect(logoutLink).toHaveCount(1);
  });
});
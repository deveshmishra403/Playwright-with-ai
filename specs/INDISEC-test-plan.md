# INDISEC Application Test Plan

## Application Overview

INDISEC (https://indisec.edvantalabs.com/) is a learning management platform offering DPDP (Digital Personal Data Protection) Act compliance training courses. The application features a multi-step authentication system with email and password verification, followed by a welcome screen, and access to course enrollment and management features.

## Test Scenarios

### 1. Authentication and Login

**Seed:** `tests/seed.spec.js`

#### 1.1. Successful Login with Valid Credentials

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://indisec.edvantalabs.com/
    - expect: Login page displays with email input field
    - expect: WELCOME heading and Log in to INDISEC heading are visible
    - expect: CONTINUE button is present and enabled
  2. Enter valid email address (mishra.devesh@edvanta.com) in the email field
    - expect: Email is filled in correctly
    - expect: CONTINUE button remains enabled
  3. Click the CONTINUE button
    - expect: Page navigates to password screen
    - expect: URL changes to /local/customlogin/password.php
    - expect: Password input field is displayed
  4. Enter valid password (Pass@123)
    - expect: Password field is filled
    - expect: CONTINUE button is visible and enabled
  5. Click the CONTINUE button
    - expect: User is logged in successfully
    - expect: Page navigates to welcome screen
    - expect: URL contains /local/customlogin/welcome.php
    - expect: WELCOME message is displayed
  6. Click the ENTER button on welcome screen
    - expect: Page navigates to My Courses page
    - expect: URL contains /my/courses.php
    - expect: Course list is displayed

#### 1.2. Login with Invalid Password

**File:** `tests/authentication/invalid-password.spec.ts`

**Steps:**
  1. Navigate to login page and enter valid email address
    - expect: Email entry is successful
    - expect: User is on password screen
  2. Enter incorrect password (wrongpassword123)
    - expect: Password field accepts the input
  3. Click the CONTINUE button
    - expect: Error message displays: 'Invalid login, please try again'
    - expect: Alert box appears with error message
    - expect: User remains on password screen
    - expect: Email field is not cleared

#### 1.3. Email Field Validation - Empty Submission

**File:** `tests/authentication/empty-email-validation.spec.ts`

**Steps:**
  1. Navigate to https://indisec.edvantalabs.com/
    - expect: Login page is displayed with empty email field
  2. Leave email field empty and click CONTINUE button
    - expect: Error message or validation message appears
    - expect: User remains on login page
    - expect: Page does not navigate to password screen

#### 1.4. Email Field Validation - Invalid Email Format

**File:** `tests/authentication/invalid-email-format.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter invalid email format (e.g., 'notanemail' without @ symbol)
    - expect: Email field accepts the input
  3. Click the CONTINUE button
    - expect: Browser validation error appears or application handles the invalid format
    - expect: Page navigates to password screen or shows validation error

#### 1.5. Password Field - Empty Submission

**File:** `tests/authentication/empty-password-validation.spec.ts`

**Steps:**
  1. Navigate to login page and proceed to password screen with valid email
    - expect: Password screen is displayed with empty password field
  2. Leave password field empty and click CONTINUE button
    - expect: Validation error message appears or page shows error
    - expect: User remains on password screen

#### 1.6. Password Field - Special Characters

**File:** `tests/authentication/password-special-characters.spec.ts`

**Steps:**
  1. Proceed to password screen after entering valid email
    - expect: Password screen is ready for input
  2. Enter password with special characters (!@#$%^&*())
    - expect: Password field accepts special characters
  3. Click CONTINUE button
    - expect: Application attempts authentication
    - expect: Error message appears if invalid credentials

#### 1.7. Navigate Back from Password Screen to Email Screen

**File:** `tests/authentication/back-navigation.spec.ts`

**Steps:**
  1. Navigate to login page and enter valid email to reach password screen
    - expect: Password screen is displayed
  2. Click the BACK link
    - expect: Page navigates back to email screen
    - expect: URL changes to /login/index.php
    - expect: Email field is cleared

### 2. Forgot Password Functionality

**Seed:** `tests/seed.spec.js`

#### 2.1. Access Forgot Password Page

**File:** `tests/forgot-password/access-page.spec.ts`

**Steps:**
  1. Navigate to login page and proceed to password screen
    - expect: Password screen is displayed
    - expect: 'Forgot Password?' link is visible
  2. Click the 'Forgot Password?' link
    - expect: Page navigates to forgot password page
    - expect: URL is /login/forgot_password.php
    - expect: Page title is 'Forgotten password | INDISEC'

#### 2.2. Forgot Password - Search by Username

**File:** `tests/forgot-password/search-by-username.spec.ts`

**Steps:**
  1. Navigate to forgot password page
    - expect: Forgot password page displays
    - expect: 'Search by username' section is visible
    - expect: Username input field and Search button are present
  2. Enter username in the username field
    - expect: Username field accepts input
  3. Click the Search button
    - expect: Application processes the search request
    - expect: Success or error message is displayed

#### 2.3. Forgot Password - Search by Email Address

**File:** `tests/forgot-password/search-by-email.spec.ts`

**Steps:**
  1. Navigate to forgot password page
    - expect: Forgot password page displays
    - expect: 'Search by email address' section is visible
    - expect: Email address input field and Search button are present
  2. Enter valid email address (mishra.devesh@edvanta.com) in email field
    - expect: Email field accepts input
  3. Click the Search button
    - expect: Application processes the request
    - expect: Confirmation message appears indicating email will be sent
    - expect: Success or error message is displayed

#### 2.4. Forgot Password - Invalid Email Search

**File:** `tests/forgot-password/invalid-email-search.spec.ts`

**Steps:**
  1. Navigate to forgot password page
    - expect: Forgot password page is displayed
  2. Enter non-existent email address in search field
    - expect: Email field accepts the input
  3. Click the Search button
    - expect: Error message appears or information message indicating email not found
    - expect: Page remains on forgot password page

### 3. Welcome Screen and Navigation

**Seed:** `tests/seed.spec.js`

#### 3.1. Welcome Screen Display and Content Verification

**File:** `tests/welcome/welcome-screen-display.spec.ts`

**Steps:**
  1. Complete successful login with valid credentials
    - expect: User is redirected to welcome screen
    - expect: URL contains /local/customlogin/welcome.php
  2. Verify welcome screen content
    - expect: 'WELCOME TO' heading is displayed
    - expect: DPDP Act Training Course information is visible
    - expect: Course description mentions Digital Personal Data Protection Act, 2023
    - expect: 'EXIT' button is present
    - expect: 'HELP' button is present
    - expect: 'ENTER' button/link is present

#### 3.2. Welcome Screen - Enter Button Navigation

**File:** `tests/welcome/enter-navigation.spec.ts`

**Steps:**
  1. Complete successful login and reach welcome screen
    - expect: Welcome screen is displayed with all components visible
  2. Click the ENTER button
    - expect: Page navigates to My Courses page
    - expect: URL changes to /my/courses.php
    - expect: Course list is displayed

#### 3.3. Welcome Screen - EXIT Button (Logout)

**File:** `tests/welcome/exit-logout.spec.ts`

**Steps:**
  1. Complete successful login and reach welcome screen
    - expect: Welcome screen is displayed
  2. Click the EXIT button
    - expect: User session is terminated
    - expect: Page navigates to login page
    - expect: User is logged out

#### 3.4. Welcome Screen - HELP Link

**File:** `tests/welcome/help-link.spec.ts`

**Steps:**
  1. Complete successful login and reach welcome screen
    - expect: Welcome screen is displayed with HELP button
  2. Click the HELP button
    - expect: Link opens (new tab or same window)
    - expect: URL is https://indisec.com/contactus
    - expect: Contact page or help information is displayed

### 4. My Courses Page and Course Management

**Seed:** `tests/seed.spec.js`

#### 4.1. My Courses Page Display and Layout

**File:** `tests/courses/courses-page-display.spec.ts`

**Steps:**
  1. Complete login and navigate to My Courses page
    - expect: My Courses page is displayed
    - expect: INDISEC logo and branding are visible
    - expect: Navigation menu shows 'My courses' option
    - expect: Page title is 'My courses | INDISEC'
  2. Verify course overview section
    - expect: Course list is displayed
    - expect: Multiple courses are visible (at least 2 courses)
    - expect: Each course shows course name and progress bar
    - expect: Progress percentages are displayed

#### 4.2. My Courses Page - Header and Navigation Elements

**File:** `tests/courses/navigation-elements.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Header navigation bar is displayed
    - expect: INDISEC logo is clickable
    - expect: 'My courses' menu item is present
    - expect: 'Site administration' menu item is present
  2. Verify user interface elements in header
    - expect: Notification button is present
    - expect: Messaging drawer button is present with unread conversation count
    - expect: User menu button shows user name and avatar
    - expect: Edit mode checkbox is visible

#### 4.3. My Courses Page - User Greeting

**File:** `tests/courses/user-greeting.spec.ts`

**Steps:**
  1. Navigate to My Courses page after successful login
    - expect: User greeting is displayed (e.g., 'Hi, Dev! 👋')
    - expect: User name is shown in the greeting
    - expect: Manage courses button is visible
    - expect: Create course button is visible

#### 4.4. My Courses Page - Course Card Information

**File:** `tests/courses/course-card-info.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Course cards are displayed for each course
  2. Examine a course card
    - expect: Course name is displayed
    - expect: Course thumbnail/image is shown
    - expect: Progress bar shows completion percentage
    - expect: Course is clickable

#### 4.5. My Courses Page - Click on Course

**File:** `tests/courses/click-course.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Course list is displayed
  2. Click on a course (e.g., 'Indisec Demo Course1')
    - expect: Page navigates to course view page
    - expect: URL contains /course/view.php with course ID
    - expect: Course content page is displayed

#### 4.6. My Courses Page - Edit Mode Toggle

**File:** `tests/courses/edit-mode-toggle.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Edit mode checkbox is visible in the header
  2. Check the Edit mode checkbox
    - expect: Edit mode is enabled
    - expect: Interface may show additional edit controls or options
  3. Uncheck the Edit mode checkbox
    - expect: Edit mode is disabled
    - expect: Interface returns to normal view

### 5. Footer Links and Policies

**Seed:** `tests/seed.spec.js`

#### 5.1. Privacy Policy Link Accessibility

**File:** `tests/footer/privacy-policy.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
    - expect: PRIVACY POLICY link is visible in footer
  2. Click on PRIVACY POLICY link
    - expect: Link opens to https://indisec.com/privacypolicy
    - expect: Privacy policy page is displayed (in new tab or same window)

#### 5.2. Terms of Use Link Accessibility

**File:** `tests/footer/terms-of-use.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
    - expect: TERM OF USE link is visible in footer
  2. Click on TERM OF USE link
    - expect: Link opens to https://indisec.com/termsandconditions
    - expect: Terms of use page is displayed

#### 5.3. Cookies Policy Link Accessibility

**File:** `tests/footer/cookies-policy.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
    - expect: COOKIES POLICY link is visible in footer
  2. Click on COOKIES POLICY link
    - expect: Link opens to https://indisec.com/cookiepolicy
    - expect: Cookies policy page is displayed

### 6. Session Management and Edge Cases

**Seed:** `tests/seed.spec.js`

#### 6.1. Logout and Session Termination

**File:** `tests/session/logout.spec.ts`

**Steps:**
  1. Complete successful login and navigate to My Courses page
    - expect: User is logged in and on My Courses page
  2. Access user menu and click logout
    - expect: Session is terminated
    - expect: User is logged out
    - expect: Page redirects to login page

#### 6.2. Already Logged In - Redirect Behavior

**File:** `tests/session/already-logged-in.spec.ts`

**Steps:**
  1. Complete successful login as user 'Dev Test'
    - expect: User is logged in successfully
  2. Navigate to login page (https://indisec.edvantalabs.com/login/index.php) while logged in
    - expect: Confirmation dialog appears
    - expect: Message states: 'You are already logged in as Dev Test, you need to log out before logging in as different user'
    - expect: Cancel and Log out buttons are present
  3. Click Cancel button
    - expect: Dialog is closed
    - expect: User remains on login page or is redirected to dashboard

#### 6.3. Session Timeout Handling

**File:** `tests/session/timeout-handling.spec.ts`

**Steps:**
  1. Complete successful login and navigate to My Courses page
    - expect: User is logged in
  2. Wait for session timeout period (if applicable) or manually clear session storage
    - expect: Session expires or is cleared
  3. Attempt to navigate or interact on the page
    - expect: User is redirected to login page
    - expect: Session has been terminated
    - expect: Appropriate message may display

#### 6.4. Browser Back Button After Login

**File:** `tests/session/browser-back-button.spec.ts`

**Steps:**
  1. Complete successful login and proceed through welcome screen to My Courses page
    - expect: User is on My Courses page
  2. Click browser back button multiple times
    - expect: Navigation goes back through welcome page and password page
    - expect: Session remains active or user is logged out appropriately

### 7. User Interface and Accessibility

**Seed:** `tests/seed.spec.js`

#### 7.1. Logo Click Navigation

**File:** `tests/ui/logo-navigation.spec.ts`

**Steps:**
  1. Navigate to My Courses page after successful login
    - expect: INDISEC logo is visible in the header
  2. Click on the INDISEC logo
    - expect: User is redirected to the courses page
    - expect: URL is https://indisec.edvantalabs.com/my/courses.php

#### 7.2. Skip to Main Content Link

**File:** `tests/ui/skip-link.spec.ts`

**Steps:**
  1. Navigate to any page on the application
    - expect: 'Skip to main content' link is available (may be hidden but accessible via keyboard)
  2. Activate 'Skip to main content' link using keyboard
    - expect: Focus is moved to main content area
    - expect: Accessibility is improved for screen readers

#### 7.3. Notifications Button Functionality

**File:** `tests/ui/notifications-button.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Notification bell icon is visible in header
    - expect: Notification button shows no new notifications status
  2. Click on Notification button
    - expect: Notification panel or dropdown appears
    - expect: Shows notification status and any pending notifications

#### 7.4. Messaging Drawer Functionality

**File:** `tests/ui/messaging-drawer.spec.ts`

**Steps:**
  1. Navigate to My Courses page
    - expect: Messaging button is visible with unread conversation count badge showing '1'
  2. Click on Messaging button
    - expect: Messaging drawer opens or expands
    - expect: List of conversations or messages is displayed
    - expect: Unread messages are indicated

#### 7.5. User Menu Functionality

**File:** `tests/ui/user-menu.spec.ts`

**Steps:**
  1. Navigate to My Courses page after login
    - expect: User menu button displays user avatar with initials 'DT'
    - expect: User name 'Dev Test' is shown
  2. Click on user menu button
    - expect: Dropdown menu appears with user options
    - expect: Logout or other user options are available

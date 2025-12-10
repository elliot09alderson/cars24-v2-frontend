import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:8080';
const timestamp = Date.now();

// Generate unique phone numbers (last 6 digits from timestamp)
const phoneBase = String(timestamp).slice(-6);

// Test credentials for all roles
const testUsers = {
  customer: {
    name: 'Test Customer',
    email: `customer${timestamp}@test.com`,
    password: 'Customer@123',  // 12 chars - passes 8 char min
    phone: `9876${phoneBase}`,  // Unique phone number
    loginUrl: '/login',
    registerUrl: '/register'
  },
  agent: {
    name: 'Test Agent',
    email: `agent${timestamp}@test.com`,
    password: 'TestAgent@123',  // 13 chars
    phone: `9877${phoneBase}`,  // Different unique phone number
    loginUrl: '/agent/login',
    registerUrl: '/agent/register'
  },
  admin: {
    email: 'admin@karlo.com',
    password: 'Admin@123',
    loginUrl: '/admin/login'
  }
};

// Store successful registrations
const createdUsers = [];

test.describe('Cars24 - All Roles Authentication', () => {

  test('1. Customer Registration and Login', async ({ page }) => {
    const user = testUsers.customer;

    // Listen for API responses
    let registerResponse = null;
    let loginResponse = null;

    page.on('response', async (response) => {
      const url = response.url();
      const method = response.request().method();

      // Registration endpoint is POST /api/v1/customer
      if ((url.includes('/customer') && method === 'POST' && !url.includes('login'))) {
        registerResponse = {
          status: response.status(),
          body: await response.json().catch(() => null)
        };
        console.log('Registration API Response:', JSON.stringify(registerResponse, null, 2));
      }
      // Login endpoint is POST /api/v1/auth/customer/login
      if (url.includes('/login') && method === 'POST') {
        loginResponse = {
          status: response.status(),
          body: await response.json().catch(() => null)
        };
        console.log('Login API Response:', JSON.stringify(loginResponse, null, 2));
      }
    });

    // === CUSTOMER REGISTRATION ===
    console.log('\n=== CUSTOMER REGISTRATION ===');
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);

    await page.goto(`${BASE_URL}${user.registerUrl}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=KARLO Register')).toBeVisible({ timeout: 10000 });

    await page.fill('#name', user.name);
    await page.waitForTimeout(300);

    await page.fill('#email', user.email);
    await page.waitForTimeout(300);

    await page.fill('#password', user.password);
    await page.waitForTimeout(300);

    await page.fill('#confirmPassword', user.password);
    await page.waitForTimeout(300);

    await page.fill('#phoneNumber', user.phone);
    await page.waitForTimeout(300);

    // Submit and wait for response
    await page.click('button[type="submit"]');

    // Wait for registration to complete and redirect to login
    try {
      await page.waitForURL(/\/login$/, { timeout: 15000 });
      console.log('Registration successful - redirected to login page');
    } catch (e) {
      console.log('Registration may have failed - did not redirect to login');
    }

    if (registerResponse) {
      console.log('Registration API Response:', JSON.stringify(registerResponse, null, 2));
      if (registerResponse.status !== 201 && registerResponse.status !== 200) {
        console.log('REGISTRATION FAILED:', registerResponse.body);
      }
    } else {
      console.log('No registration response captured');
    }

    // Wait a bit for the user to be fully created in the database
    await page.waitForTimeout(2000);

    // === CUSTOMER LOGIN ===
    console.log('\n=== CUSTOMER LOGIN ===');
    await page.goto(`${BASE_URL}${user.loginUrl}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=KARLO LOGIN')).toBeVisible({ timeout: 10000 });

    await page.fill('#email', user.email);
    await page.waitForTimeout(300);

    await page.fill('#password', user.password);
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');

    // Wait for navigation to /ads or timeout
    try {
      await page.waitForURL(/\/ads$/, { timeout: 10000 });
    } catch (e) {
      console.log('Navigation to /ads did not occur within timeout');
    }

    if (loginResponse) {
      console.log('Login completed with status:', loginResponse.status);
      if (loginResponse.status !== 200) {
        console.log('LOGIN FAILED:', loginResponse.body);
      }
    }

    const currentUrl = page.url();
    console.log(`Final URL: ${currentUrl}`);

    const isAtAds = currentUrl === `${BASE_URL}/ads` || currentUrl.endsWith('/ads');

    createdUsers.push({
      role: 'Customer',
      email: user.email,
      password: user.password,
      loginUrl: user.loginUrl,
      status: isAtAds ? 'PASSED' : `FAILED - at ${currentUrl}`
    });

    // Assert redirect to /ads after customer login
    await expect(page).toHaveURL(/\/ads$/);
  });

  test('2. Agent Registration and Login', async ({ page }) => {
    const user = testUsers.agent;

    let registerResponse = null;
    let loginResponse = null;

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/api/agent/register') || url.includes('/api/agent/create')) {
        registerResponse = {
          status: response.status(),
          body: await response.json().catch(() => null)
        };
        console.log('Agent Registration API Response:', JSON.stringify(registerResponse, null, 2));
      }
      if (url.includes('/api/auth/agent/login') || url.includes('/api/agent/login')) {
        loginResponse = {
          status: response.status(),
          body: await response.json().catch(() => null)
        };
        console.log('Agent Login API Response:', JSON.stringify(loginResponse, null, 2));
      }
    });

    // === AGENT REGISTRATION ===
    console.log('\n=== AGENT REGISTRATION ===');
    console.log(`Email: ${user.email}`);

    await page.goto(`${BASE_URL}${user.registerUrl}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Register Karlo')).toBeVisible({ timeout: 10000 });

    // Upload image for agent (required)
    const fileInput = page.locator('input[type="file"]#image');
    const imageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mNk+M9QzwAEjDAGNzSoKAMAJCkDCfiEfK4AAAAASUVORK5CYII=', 'base64');

    await fileInput.setInputFiles({
      name: 'test-avatar.png',
      mimeType: 'image/png',
      buffer: imageBuffer
    });
    await page.waitForTimeout(500);

    await page.fill('#name', user.name);
    await page.waitForTimeout(300);

    await page.fill('#email', user.email);
    await page.waitForTimeout(300);

    await page.fill('#password', user.password);
    await page.waitForTimeout(300);

    await page.fill('#confirmPassword', user.password);
    await page.waitForTimeout(300);

    await page.fill('#phoneNumber', user.phone);
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);

    // === AGENT LOGIN ===
    console.log('\n=== AGENT LOGIN ===');
    await page.goto(`${BASE_URL}${user.loginUrl}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Agent Login')).toBeVisible({ timeout: 10000 });

    await page.fill('#email', user.email);
    await page.waitForTimeout(300);

    await page.fill('#password', user.password);
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);

    const currentUrl = page.url();
    console.log(`Agent Final URL: ${currentUrl}`);

    createdUsers.push({
      role: 'Agent',
      email: user.email,
      password: user.password,
      loginUrl: user.loginUrl,
      status: loginResponse?.status === 200 ? 'PASSED' : 'FAILED'
    });
  });

  test('3. Admin Login (No Registration)', async ({ page }) => {
    const user = testUsers.admin;

    let loginResponse = null;

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/api/auth/admin/login') || url.includes('/api/admin/login')) {
        loginResponse = {
          status: response.status(),
          body: await response.json().catch(() => null)
        };
        console.log('Admin Login API Response:', JSON.stringify(loginResponse, null, 2));
      }
    });

    // === ADMIN LOGIN ===
    console.log('\n=== ADMIN LOGIN ===');
    await page.goto(`${BASE_URL}${user.loginUrl}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Admin Access Only')).toBeVisible({ timeout: 10000 });

    await page.fill('#email', user.email);
    await page.waitForTimeout(300);

    await page.fill('#password', user.password);
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);

    const currentUrl = page.url();
    console.log(`Admin Final URL: ${currentUrl}`);

    createdUsers.push({
      role: 'Admin',
      email: user.email,
      password: user.password,
      loginUrl: user.loginUrl,
      status: loginResponse?.status === 200 ? 'PASSED' : 'FAILED'
    });
  });

  test.afterAll(async () => {
    // Append credentials to users.txt
    const usersFilePath = '/Users/erpratik/Desktop/cars24/users.txt';

    let content = '\n\n--- NEW TEST USERS (Created: ' + new Date().toLocaleString() + ') ---\n';
    content += '| Role     | Email              | Password     | Login URL    | Status  |\n';

    for (const user of createdUsers) {
      content += `| ${user.role.padEnd(8)} | ${user.email.padEnd(18)} | ${user.password.padEnd(12)} | ${user.loginUrl.padEnd(12)} | ${user.status} |\n`;
    }

    fs.appendFileSync(usersFilePath, content);
    console.log('\nCredentials appended to users.txt');
    console.log('Created users:', JSON.stringify(createdUsers, null, 2));
  });
});

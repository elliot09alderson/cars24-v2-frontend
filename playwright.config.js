import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:8080',
    headless: false,  // Show browser
    slowMo: 500,      // Slow down actions by 500ms
    viewport: { width: 1280, height: 720 },
    channel: 'chrome', // Use system Chrome
  },
});

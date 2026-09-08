import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173/Portfolio_V2/',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e/specs",
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:8081",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --no-open",
    url: "http://127.0.0.1:8081",
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

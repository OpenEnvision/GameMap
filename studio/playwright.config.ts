import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
export default defineConfig({
  testDir: "../tests/studio",
  outputDir: "../.build/test-results/studio",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  use: {
    baseURL: "http://127.0.0.1:4196",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: "npm run studio:build && node tests/helpers/studio-server.mjs",
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    env: { NODE_ENV: "test", STUDIO_TEST_PORT: "4196" },
    url: "http://127.0.0.1:4196/api/session",
    timeout: 60000,
    reuseExistingServer: false,
  },
});

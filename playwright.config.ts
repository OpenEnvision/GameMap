import { defineConfig, devices } from "@playwright/test";
import { readFileSync } from "node:fs";

const { base } = JSON.parse(
  readFileSync("dist/site-manifest.json", "utf8"),
) as { base: string };
const origin = "http://127.0.0.1:4176";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  reporter: "list",
  use: {
    baseURL: origin + base,
    channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined,
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
    command: "node scripts/build/preview.mjs --port 4176",
    url: origin + base,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});

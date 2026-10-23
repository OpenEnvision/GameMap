import { defineConfig, devices } from "@playwright/test";
import { readFileSync } from "node:fs";
const site = JSON.parse(readFileSync("dist/site-manifest.json", "utf8"));
const port = Number(process.env.CATALOG_PREVIEW_PORT || 4178);
const origin = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: "./tests/release",
  outputDir: ".build/test-results/release",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  forbidOnly: Boolean(process.env.CI),
  reporter: "list",
  use: {
    baseURL: origin + site.base,
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
    command: `node scripts/preview.mjs --port ${port}`,
    url: origin + site.base,
    reuseExistingServer: false,
    timeout: 15000,
  },
});

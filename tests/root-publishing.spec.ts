import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('the repository index is served as the full homepage without a redirect', async ({ request }) => {
  const response = await request.get('index.html', { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toBe(await readFile('index.html', 'utf8'));
  expect(html).toContain('home-page');
  expect(html).toContain('Build your next world');
  expect(html).not.toMatch(/Opening the GameMap homepage|window\.location\.replace|127\.0\.0\.1:5177/);
});

test('the root homepage renders its real content even before JavaScript runs', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    const response = await page.goto(baseURL!);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Build your next world.');
    await expect(page.getByRole('region', { name: 'GameMap project showreel', exact: true })).toBeVisible();
    expect(page.url()).toBe(baseURL);
  } finally { await context.close(); }
});

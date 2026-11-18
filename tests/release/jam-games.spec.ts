import { test, expect } from '@playwright/test';
import { loadContent } from '../../scripts/lib/content.mjs';

const content = await loadContent();
const game = content.registry.all('example').find((entry) => entry.data.category === 'community')!;
const screenshot = content.sources.learningMedia[game.id];
const pageCover = content.sources.pageCovers[game.key];

test('ordinary source-reviewed games are searchable without invented AI attribution or screenshot pixels', async ({ page }) => {
  await page.goto('examples/');
  await page.getByRole('textbox', { name: 'Search game examples', exact: true }).fill(game.data.title);
  const card = page.locator(`[data-content-ref="${game.key}"]`);
  await expect(card).toBeVisible();
  if (screenshot) {
    await expect(card.locator('img')).toHaveCount(1);
    await expect(card.locator('img')).toHaveAttribute('alt', screenshot.alt);
    await expect(card.locator('.game-preview-unavailable')).toHaveCount(0);
  } else if (pageCover) {
    await expect(card.locator('img')).toHaveAttribute('alt', pageCover.alt);
    await expect(card.locator('.page-cover-label')).toHaveText(pageCover.origin === 'catalog-page-capture' ? 'GameMap record · not upstream or gameplay' : 'Project page · not gameplay');
  } else {
    await expect(card.locator('.game-preview-unavailable')).toHaveText('No reviewed screenshot');
    await expect(card.locator('img')).toHaveCount(0);
  }
  await expect(card.locator('.example-image')).toHaveAttribute('href', game.data.demo.url);
  await expect(card.getByRole('link', { name: 'Project source', exact: true })).toHaveAttribute('href', game.data.source.url);
  await page.getByRole('combobox', { name: 'Client or model', exact: true }).selectOption('claude-code');
  await expect(card).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Client or model', exact: true }).selectOption('all');
  await expect(card).toBeVisible();
  await card.getByRole('link', { name: 'Complete record', exact: true }).click();
  await expect(page.locator('[data-content-field="category"]')).toContainText('Community game — no AI-authorship claim');
  await expect(page.locator('[data-content-field="aiUse"]')).toContainText('not independently verified');
});

test('Chinese game introductions remain localized and the public evidence ledger is accessible', async ({ page, request }) => {
  await page.goto('zh/examples/');
  await page.locator('input').first().fill(game.data.title);
  const card = page.locator(`[data-content-ref="${game.key}"]`);
  await expect(card).toBeVisible();
  await expect(card.locator('.example-body > p')).toContainText(/[\p{Script=Han}]/u);
  if (screenshot) {
    await expect(card.locator('img')).toHaveCount(1);
    await expect(card.locator('.game-preview-unavailable')).toHaveCount(0);
  } else if (pageCover) {
    await expect(card.locator('img')).toHaveCount(1);
    await expect(card.locator('.page-cover-label')).toContainText('非游戏截图');
  } else {
    await expect(card.locator('.game-preview-unavailable')).toHaveText('暂无已核实的游戏截图');
  }
  await expect(page.locator('.page-heading .heading-links')).toHaveCount(0);
  const response = await request.get('jam-discovery.json');
  expect(response.ok()).toBe(true);
  const ledger = await response.json();
  expect(ledger.accepted.some((entry: { id: string }) => entry.id === game.id)).toBe(true);
  expect(ledger.verification).toContain('not independently verified');
});

import { test, expect } from "@playwright/test";
import { gameAccessFilterIds, hasCompleteProjectSource } from "../website/content/game-platforms";

test("entry and source scope filters distinguish archives, builds and explicit editions", () => {
  expect(gameAccessFilterIds({
    demo: { label: "Get source", url: "https://github.com/example/game/archive/refs/heads/main.zip", kind: "download", note: "Source archive" },
    distribution: [
      { platform: "Browser", url: "https://example.itch.io/game", kind: "playable", note: "Author browser build" },
      { platform: "Windows", url: "https://github.com/example/game/releases/tag/v1", kind: "download", note: "Prepared build" },
      { platform: "Steam", url: "https://store.steampowered.com/app/123/", kind: "store", note: "Store edition" },
    ],
  })).toEqual(["source", "browser", "download", "store"]);
  expect(gameAccessFilterIds({
    demo: { label: "Setup guide", url: "https://github.com/example/game#setup", kind: "download", note: "Build locally" },
  })).toEqual(["setup"]);
  expect(hasCompleteProjectSource({ scope: "complete-project" })).toBe(true);
  expect(hasCompleteProjectSource({ scope: "game-code-greybox" })).toBe(false);
  expect(hasCompleteProjectSource({})).toBe(false);
});

test("access, complete source, engine, track and query compose and survive reload", async ({ page }) => {
  await page.goto("examples/?q=Vibe%20Racer");
  const access = page.getByRole("combobox", { name: "Play or run access", exact: true });
  const scope = page.getByRole("combobox", { name: "Source scope", exact: true });
  await expect(page.getByRole("textbox", { name: "Search game examples" })).toHaveValue("Vibe Racer");
  await access.selectOption("source");
  await scope.selectOption("complete-project");
  await page.getByRole("combobox", { name: "Game engine or renderer" }).selectOption("pygame");
  await page.getByRole("button", { name: "2D", exact: true }).click();
  await expect(page.locator(".example-grid .example-card")).toHaveCount(1);
  const racer = page.locator("#vibe-racer-opencode");
  await expect(racer).toHaveAttribute("data-game-access", "source");
  await expect(racer).toHaveAttribute("data-source-scope", "complete-project");
  await expect(racer.locator(".image-action")).toContainText("Get source & run");
  await expect.poll(() => {
    const params = new URL(page.url()).searchParams;
    return [params.get("q"), params.get("engine"), params.get("track"), params.get("access"), params.get("source")];
  }).toEqual(["Vibe Racer", "pygame", "2d", "source", "complete-project"]);
  await page.reload();
  await expect(access).toHaveValue("source");
  await expect(scope).toHaveValue("complete-project");
  await expect(racer).toBeVisible();
  await access.selectOption("browser");
  await expect(page.locator(".example-grid .example-card")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "No games found.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(access).toHaveValue("all");
  await expect(scope).toHaveValue("all");
  await expect(page.getByRole("combobox", { name: "Game engine or renderer" })).toHaveValue("all");
  await expect(page.getByRole("textbox", { name: "Search game examples" })).toHaveValue("");
  await expect.poll(() => new URL(page.url()).search).toBe("");
});

test("download access includes creator-linked builds alongside a browser edition", async ({ page }) => {
  await page.goto("examples/?q=Word%20Rain&access=download");
  const rain = page.locator("#word-rain-chatgpt");
  await expect(rain).toBeVisible();
  await expect(rain).toHaveAttribute("data-game-access", /\bbrowser\b/);
  await expect(rain).toHaveAttribute("data-game-access", /\bdownload\b/);
  await expect(rain.locator(".example-platform-label")).toHaveText("itch.io");
  await expect(rain.getByRole("link", { name: "GitHub Releases", exact: true })).toBeVisible();
  await page.getByRole("combobox", { name: "Play or run access", exact: true }).selectOption("source");
  await expect(rain).toHaveCount(0);
});

test("recorded review notes expose bounded verification and source differences", async ({ page }) => {
  await page.goto("examples/?q=Katana");
  const katana = page.locator("#katana-kitsune-godot");
  await expect(katana.locator(".example-verification")).toHaveText("Setup screen checked");
  const notes = katana.locator(".example-review-notes");
  await expect(notes).not.toHaveAttribute("open", "");
  await notes.locator("summary").click();
  await expect(notes).toContainText("Code license not found");
  await expect(notes).toContainText("Source newer than demo");
  await expect(notes).toContainText("Combat and a complete dungeon run were not exercised");

  await page.goto("examples/?q=Butch");
  await expect(page.locator("#butch-graves-j2me .example-verification"))
    .toHaveText("Binary inspected; not run");
  await page.goto("examples/?q=Minimal%20Rogue");
  const rogue = page.locator("#minimal-rogue-claude .example-review-notes");
  await rogue.locator("summary").click();
  await expect(rogue).toContainText("Source and demo versions differ");
  await expect(rogue).toContainText("549");
  await expect(rogue).toContainText("581");
});

test("trimmed author previews are excerpts and retain their original recording links", async ({ page }) => {
  await page.goto("showcase/?q=Moonlight");
  const moonlight = page.locator('[data-content-ref="demo:recording-moonlight-mayhem"]');
  await expect(moonlight.locator(".small-label")).toContainText("CURATED EXCERPT");
  await expect(moonlight.getByRole("link", { name: "Original recording", exact: true }))
    .toHaveAttribute("href", "https://static.simonwillison.net/static/2026/raccoon-heist-codex-720p.mp4");
  await page.goto("showcase/?q=Sakura");
  await expect(page.locator('[data-content-ref="demo:recording-sakura-crossing"] .small-label'))
    .toContainText("SOURCE RECORDING");
});

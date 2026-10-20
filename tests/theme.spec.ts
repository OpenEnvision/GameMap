import { expect, test, type Locator, type Page } from "@playwright/test";

type DisplayMode = "game" | "general";
const modes = {
  game: { className: "dark", paper: "#0b101b", title: "Game mode" },
  general: { className: "light", paper: "#fffcfb", title: "General mode" },
} as const;

function luminance(channels: readonly number[]) {
  const linear = channels.slice(0, 3).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(foreground: readonly number[], background: readonly number[]) {
  const alpha = foreground[3] / 255;
  const painted = foreground.slice(0, 3).map(
    (channel, index) => channel * alpha + background[index] * (1 - alpha),
  );
  const [low, high] = [luminance(painted), luminance(background)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}
const visibleToggle = (page: Page, name = "Switch display mode") =>
  page.getByRole("button", { name, exact: true }).filter({ visible: true });

async function expectMode(page: Page, mode: DisplayMode) {
  await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${modes[mode].className}\\b`));
  await expect(page.locator("html")).not.toHaveClass(
    new RegExp(`\\b${mode === "game" ? "light" : "dark"}\\b`),
  );
  const themeColor = page.locator('meta[name="theme-color"]');
  await expect(themeColor).toHaveCount(1);
  await expect(themeColor).toHaveAttribute("content", modes[mode].paper);
}
async function expectToggle(toggle: Locator, mode: DisplayMode, title: string = modes[mode].title) {
  await expect(toggle).toBeVisible();
  await expect(toggle).toBeEnabled();
  await expect(toggle).toHaveAttribute("aria-pressed", String(mode === "game"));
  await expect(toggle).toHaveAttribute("data-mode", mode);
  await expect(toggle).toHaveAttribute("title", title);
  await expect(toggle).toHaveText("");
  await expect(toggle.locator(".display-mode-game-icon"))[mode === "game" ? "toBeVisible" : "toBeHidden"]();
  await expect(toggle.locator(".display-mode-general-icon"))[mode === "general" ? "toBeVisible" : "toBeHidden"]();
}
async function expectNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
}

test("Game and General palettes keep text, actions and search readable", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  for (const mode of ["game", "general"] as const) {
    await page.goto("");
    const toggle = visibleToggle(page);
    await expect(toggle).toBeEnabled();
    if (mode === "general") await toggle.click();
    await expectMode(page, mode);
    await expectToggle(toggle, mode);
    const palette = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d")!;
      const rgba = (color: string) => {
        const hex = color.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)?.[1];
        if (hex) {
          const expanded = hex.length <= 4 ? [...hex].map((part) => part + part).join("") : hex;
          const channels = expanded.match(/../g)!.map((part) => parseInt(part, 16));
          return channels.length === 3 ? [...channels, 255] : channels;
        }
        if (/^rgba?\(/.test(color)) {
          const channels = (color.match(/[\d.]+/g) || []).map(Number);
          return [...channels.slice(0, 3), channels.length === 4 ? channels[3] * 255 : 255];
        }
        // Let the browser resolve newer CSS color spaces when a palette uses one.
        if (!CSS.supports("color", color)) throw new Error(`Unresolved palette color: ${color}`);
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        return Array.from(context.getImageData(0, 0, 1, 1).data);
      };
      const token = (name: string) => rgba(root.getPropertyValue(`--${name}`).trim());
      const button = getComputedStyle(document.querySelector(".button-primary")!);
      const result = {
        paperValue: root.getPropertyValue("--paper").trim(),
        paper: token("paper"), panel: token("panel"),
        ink: token("ink"), body: token("body"), muted: token("muted"), accent: token("accent"),
        onAction: token("on-action"), action: token("action"), actionHover: token("action-hover"),
        buttonText: rgba(button.color), buttonBackground: rgba(button.backgroundColor),
      };
      return result;
    });
    expect(palette.paperValue).toBe(modes[mode].paper);
    for (const surface of ["paper", "panel"] as const) {
      expect(palette[surface][3], `${mode} ${surface} is an opaque reading surface`).toBe(255);
      for (const foreground of ["ink", "body", "muted", "accent"] as const)
        expect(contrast(palette[foreground], palette[surface]), `${mode}: ${foreground} on ${surface}`).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(palette.buttonText, palette.buttonBackground), `${mode}: primary action`).toBeGreaterThanOrEqual(4.5);
    expect(contrast(palette.onAction, palette.action), `${mode}: action text`).toBeGreaterThanOrEqual(4.5);
    expect(contrast(palette.onAction, palette.actionHover), `${mode}: hovered action text`).toBeGreaterThanOrEqual(4.5);
    await expectNoOverflow(page);

    await page.getByRole("button", { name: "Search all content", exact: true }).click();
    const search = page.getByRole("dialog");
    await expect(search).toBeVisible();
    await expect(search.getByRole("combobox")).toBeFocused();
    const popover = await search.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return { actual: root.getPropertyValue("--color-fd-popover").trim(), panel: root.getPropertyValue("--panel").trim() };
    });
    expect(popover.actual).toBe(popover.panel);
    await page.keyboard.press("Shift+Tab");
    expect(await search.evaluate((dialog) => dialog.contains(document.activeElement))).toBeTruthy();
    await page.keyboard.press("Tab");
    expect(await search.evaluate((dialog) => dialog.contains(document.activeElement))).toBeTruthy();
    await page.keyboard.press("Escape");
    await expect(search).toHaveCount(0);

    await page.goto("docs/practical-guide/");
    await expectMode(page, mode);
    await expect(page.locator("#nd-page .prose")).toBeVisible();
    const documentation = await page.locator("#nd-docs-layout").evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const navigation = document.querySelector("#nd-sidebar") || document.querySelector("#nd-subnav")!;
      const styles = getComputedStyle(navigation);
      return {
        foreground: styles.getPropertyValue("--color-fd-muted-foreground").trim(),
        muted: root.getPropertyValue("--muted").trim(),
        background: styles.getPropertyValue("--color-fd-background").trim(),
        paper: root.getPropertyValue("--paper").trim(),
      };
    });
    expect(documentation.foreground).toBe(documentation.muted);
    expect(documentation.background).toBe(documentation.paper);
    await expectNoOverflow(page);
  }
});

test("one keyboard-accessible display switch persists across routes, reloads and documentation", async ({ page, isMobile }) => {
  await page.goto("");
  const toggle = visibleToggle(page);
  await expectMode(page, "game");
  await expectToggle(toggle, "game");
  for (let step = 0; step < 15 && !(await toggle.evaluate((node) => node === document.activeElement)); step++)
    await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expectMode(page, "general");
  await expectToggle(toggle, "general");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("gamemap-display-mode"))).toBe("general");

  await page.getByRole("link", { name: "Explore the resources", exact: true }).click();
  await expect(page).toHaveURL(/\/resources\/$/);
  await expectMode(page, "general");
  await expectToggle(visibleToggle(page), "general");
  await page.reload();
  await expectMode(page, "general");
  await expectToggle(visibleToggle(page), "general");

  await page.goto("docs/practical-guide/");
  if (isMobile) await page.getByRole("button", { name: "Open Sidebar", exact: true }).click();
  const docsToggle = visibleToggle(page);
  await expectToggle(docsToggle, "general");
  await docsToggle.click();
  await expectMode(page, "game");
  await expectToggle(docsToggle, "game");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("gamemap-display-mode"))).toBe("game");
  if (isMobile) await page.keyboard.press("Escape");
  await expectNoOverflow(page);

  await page.goto("zh/");
  const chineseToggle = visibleToggle(page, "切换浏览模式");
  await expectToggle(chineseToggle, "game", "Game 模式");
  await chineseToggle.focus();
  await page.keyboard.press("Space");
  await expectMode(page, "general");
  await expectToggle(chineseToggle, "general", "General 模式");
  await page.reload();
  await expectMode(page, "general");
  await expectToggle(visibleToggle(page, "切换浏览模式"), "general", "General 模式");
  await expectNoOverflow(page);
});

test("saved modes and legacy preferences paint correctly before hydration", async ({ browser, baseURL, page }) => {
  const scenarios: { name: string; saved?: DisplayMode; legacy?: string; expected: DisplayMode }[] = [
    { name: "fresh visit ignores a light OS preference", expected: "game" },
    { name: "legacy light", legacy: "light", expected: "general" },
    { name: "legacy dark", legacy: "dark", expected: "game" },
    { name: "legacy system", legacy: "system", expected: "game" },
    { name: "saved General overrides old dark", saved: "general", legacy: "dark", expected: "general" },
    { name: "saved Game overrides old light", saved: "game", legacy: "light", expected: "game" },
  ];
  for (const scenario of scenarios) await test.step(scenario.name, async () => {
    const entries = [];
    if (scenario.saved) entries.push({ name: "gamemap-display-mode", value: scenario.saved });
    if (scenario.legacy) entries.push({ name: "theme", value: scenario.legacy });
    const context = await browser.newContext({
      viewport: page.viewportSize(), colorScheme: "light",
      storageState: { cookies: [], origins: [{ origin: new URL(baseURL!).origin, localStorage: entries }] },
    });
    try {
      const unhydrated = await context.newPage();
      // Inline bootstrapping still runs; external application bundles cannot hydrate.
      await unhydrated.route("**/*", (route) => route.request().resourceType() === "script" ? route.abort() : route.continue());
      await unhydrated.goto(baseURL + "docs/practical-guide/", { waitUntil: "load" });
      await expectMode(unhydrated, scenario.expected);
      const paint = await unhydrated.evaluate(() => ({
        paper: getComputedStyle(document.documentElement).getPropertyValue("--paper").trim(),
        saved: localStorage.getItem("gamemap-display-mode"),
      }));
      expect(paint.paper).toBe(modes[scenario.expected].paper);
      expect(paint.saved).toBe(scenario.expected);
      await expect(unhydrated.locator("#nd-page .prose")).toBeVisible();
    } finally {
      await context.close();
    }
  });
});

import { chromium } from "@playwright/test";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import {
  assertPublicMediaHost,
  workspaceOutputPath,
} from "../lib/example-media.mjs";
const args = process.argv.slice(2),
  option = (key, fallback) =>
    args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const intake = JSON.parse(
  await readFile(
    resolve(option("--intake", ".build/example-media/intake.json")),
    "utf8",
  ),
);
const id = option("--id"),
  job = intake.jobs.find((row) => row.id === id);
assert.ok(job, "Unknown intake game");
assert.equal(job.demoKind, "playable", "Desktop-only games are not executed");
await assertPublicMediaHost(job.gameUrl);
const out = await workspaceOutputPath(
  option("--out", join(process.cwd(), ".build/example-media/captures", id)),
);
assert.ok(
  !/\/(website|data|docs)\//.test(out),
  "Do not write publication/source directories",
);
await mkdir(out, { recursive: true });
const actions = JSON.parse(
  option(
    "--actions",
    '[{"type":"press","key":"Enter"},{"type":"press","key":"Space"},{"type":"hold","key":"ArrowRight","ms":350},{"type":"wait","ms":1000}]',
  ),
);
assert.ok(
  Array.isArray(actions) && actions.length <= 12,
  "Bounded input actions only",
);
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
  args: ["--mute-audio"],
});
const context = await browser.newContext({
  viewport: { width: 1600, height: 1200 },
  acceptDownloads: false,
  permissions: [],
  serviceWorkers: "block",
  reducedMotion: "reduce",
});
const blocked = [],
  frames = [],
  errors = [];
let declaredBytes = 0;
await context.route("**/*", async (route) => {
  const request = route.request();
  let url;
  try {
    url = new URL(request.url());
  } catch {
    return route.abort();
  }
  if (["blob:", "data:"].includes(url.protocol)) return route.continue();
  try {
    await assertPublicMediaHost(url.href);
    assert.ok(
      !/\.(exe|msi|dmg|apk|app|dll|so|zip|tar\.gz)(?:$|[?#])/i.test(url.href),
      "Native/download artifacts are not executed or acquired",
    );
    if (/google-analytics|googletagmanager|doubleclick/.test(url.hostname))
      return route.abort();
  } catch (error) {
    blocked.push({ url: url.href, reason: error.message });
    return route.abort();
  }
  return route.continue();
});
if (context.routeWebSocket)
  await context.routeWebSocket(/.*/, (socket) =>
    socket.close({
      reason: "Screenshot capture does not join multiplayer services",
    }),
  );
context.on("page", (page) => {
  if (context.pages().length > 1) void page.close().catch(() => {});
});
context.on("response", (response) => {
  const bytes = Number(response.headers()["content-length"] || 0);
  declaredBytes += Number.isFinite(bytes) ? bytes : 0;
  if (bytes > 100_000_000 || declaredBytes > 180_000_000) {
    errors.push("Browser resource transfer budget exceeded");
    void context.close().catch(() => {});
  }
});
let result, launch;
const deadline = setTimeout(() => {
  errors.push("Browser screenshot deadline exceeded");
  void context.close().catch(() => {});
}, 60000);
try {
  const page = await context.newPage();
  page.on("dialog", (dialog) => dialog.dismiss());
  page.on("download", (download) => download.cancel());
  const response = await page.goto(job.gameUrl, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  if (response?.status() === 429) {
    const header = response.headers()["retry-after"],
      seconds = Number(header);
    const until =
      header && Number.isFinite(seconds)
        ? Date.now() + seconds * 1000
        : Date.parse(header || "");
    throw Object.assign(
      new Error("HTTP 429 at author page; no immediate retry"),
      {
        retryNotBefore: new Date(
          Number.isFinite(until)
            ? Math.max(Date.now() + 1000, until)
            : Date.now() + 300000,
        ).toISOString(),
      },
    );
  }
  assert.ok(
    !response || response.ok(),
    `Author page HTTP ${response?.status()}`,
  );
  if (/(^|\.)js13kgames\.com$/.test(new URL(page.url()).hostname)) {
    const play = page
      .getByRole("link", { name: /^Play(?: js13k version)?$/i })
      .first();
    if (
      await play.waitFor({ state: "visible", timeout: 6000 }).then(
        () => true,
        () => false,
      )
    ) {
      const href = await play.getAttribute("href"),
        target = await assertPublicMediaHost(new URL(href, page.url()).href);
      assert.equal(
        target.hostname,
        "play.js13kgames.com",
        "Only the competition page’s actual public game link is followed",
      );
      launch = {
        sourcePage: page.url(),
        href: target.href,
        label: await play.innerText(),
      };
      const opened = await page.goto(target.href, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      assert.ok(opened?.ok(), "Linked game did not return HTTP 200");
    }
  }
  const run = page
    .locator("button.load_iframe_btn")
    .or(page.getByRole("button", { name: /^Run game$/i }))
    .first();
  if (
    await run.waitFor({ state: "visible", timeout: 6000 }).then(
      () => true,
      () => false,
    )
  )
    await run.click({ timeout: 5000 });
  let surface,
    gameFrame,
    bestArea = 0;
  const readyUntil = Date.now() + 20000;
  while (!surface && Date.now() < readyUntil) {
    for (const frame of page.frames()) {
      if (
        /youtube|vimeo|doubleclick|googleads|captcha|challenge|turnstile/i.test(
          frame.url(),
        )
      )
        continue;
      for (const canvas of await frame.locator("canvas").all()) {
        if (!(await canvas.isVisible().catch(() => false))) continue;
        const box = await canvas.boundingBox();
        if (
          box &&
          box.width >= 160 &&
          box.height >= 90 &&
          box.width * box.height >= bestArea
        ) {
          const uncovered = await canvas.evaluate((c) => {
            const r = c.getBoundingClientRect();
            return (
              document.elementFromPoint(
                r.left + r.width / 2,
                r.top + r.height / 2,
              )?.tagName === "CANVAS"
            );
          });
          if (uncovered) {
            surface = canvas;
            gameFrame = frame;
            bestArea = box.width * box.height;
          }
        }
      }
    }
    if (!surface) await page.waitForTimeout(350);
  }
  if (surface) await page.waitForTimeout(2500);
  assert.ok(
    surface,
    "No visible gameplay canvas; do not screenshot the publisher page or a loading/error page",
  );
  await surface.scrollIntoViewIfNeeded();
  const snapshot = async (suffix) => {
    const file = join(out, `${id}-${suffix}.png`);
    await surface.screenshot({ path: file, timeout: 15000 });
    frames.push({ file, index: frames.length, canvasURL: gameFrame.url() });
  };
  await snapshot("initial");
  // Click the actual topmost game canvas, not a non-interactive background layer.
  const clickCanvas = async (position, double = false) => {
    const hit = await surface.evaluate((canvas, position) => {
      const r = canvas.getBoundingClientRect(),
        x = position?.x ?? r.width / 2,
        y = position?.y ?? r.height / 2;
      const target = document.elementFromPoint(r.left + x, r.top + y);
      return target?.tagName === "CANVAS" ? { x, y } : null;
    }, position);
    assert.ok(
      hit,
      "Canvas input is covered by a non-canvas overlay; no forced click",
    );
    const box = await surface.boundingBox();
    if (double)
      await page.mouse.dblclick(box.x + hit.x, box.y + hit.y, { delay: 80 });
    else await page.mouse.click(box.x + hit.x, box.y + hit.y, { delay: 80 });
  };
  if (!args.includes("--no-initial-click")) await clickCanvas();
  for (const action of actions) {
    if (action.type === "press" || action.type === "hold") {
      assert.match(
        action.key,
        /^(Enter|Space|Escape|Shift|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|[a-z0-9])$/,
        "Plain game keys only; no Ctrl, Alt, Meta or browser/OS shortcuts",
      );
      if (action.type === "hold") {
        await page.keyboard.down(action.key);
        await page.waitForTimeout(
          Math.min(2000, Math.max(0, Number(action.ms) || 300)),
        );
        await page.keyboard.up(action.key);
      } else await page.keyboard.press(action.key);
    } else if (action.type === "click" || action.type === "double-click") {
      const box = await surface.boundingBox();
      assert.ok(
        Number.isFinite(action.x) &&
          Number.isFinite(action.y) &&
          action.x >= 0 &&
          action.y >= 0 &&
          action.x <= box.width &&
          action.y <= box.height,
      );
      await clickCanvas(
        { x: action.x, y: action.y },
        action.type === "double-click",
      );
    } else if (action.type === "drag") {
      const box = await surface.boundingBox();
      for (const point of [action.from, action.to])
        assert.ok(
          point &&
            Number.isFinite(point.x) &&
            Number.isFinite(point.y) &&
            point.x >= 0 &&
            point.y >= 0 &&
            point.x <= box.width &&
            point.y <= box.height,
          "Drag stays inside the game canvas",
        );
      await clickCanvas(action.from);
      await page.mouse.move(box.x + action.from.x, box.y + action.from.y);
      await page.mouse.down();
      for (let step = 1; step <= 5; step++) {
        await page.mouse.move(
          box.x + action.from.x + ((action.to.x - action.from.x) * step) / 5,
          box.y + action.from.y + ((action.to.y - action.from.y) * step) / 5,
        );
        await page.waitForTimeout(50);
      }
      await page.mouse.up();
    } else if (action.type === "wait")
      await page.waitForTimeout(
        Math.min(5000, Math.max(0, Number(action.ms) || 500)),
      );
    else throw Error("Unsupported capture action");
    if (args.includes("--trace-frames"))
      await snapshot("action-" + frames.length);
  }
  await snapshot("after-input");
  assert.equal(errors.length, 0, errors.join("; "));
  result = {
    status: "captured-needs-visual-review",
    id,
    origin: "browser-capture",
    sourceUrl: job.gameUrl,
    capturedAt: new Date().toISOString(),
    frames,
    browserSandbox: true,
    ...(launch ? { launch } : {}),
    blockedRequests: blocked,
    declaredBytes,
    errors,
    limitations: [
      "Capture of public browser game only; no native software, account, payment, permission grant or public multiplayer session. Not L1/L2/L3 certification.",
    ],
  };
} catch (error) {
  result = {
    status: "blocked",
    id,
    sourceUrl: job.gameUrl,
    error: error.message,
    retryNotBefore: error.retryNotBefore || null,
    frames,
    blockedRequests: blocked,
    declaredBytes,
    errors,
  };
} finally {
  clearTimeout(deadline);
  await context.close().catch(() => {});
  await browser.close();
}
await writeFile(
  join(out, `${id}-capture.json`),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result, null, 2));

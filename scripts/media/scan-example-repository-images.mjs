import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { assertPublicMediaHost } from "../lib/example-media.mjs";
const args = process.argv.slice(2),
  option = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const intake = JSON.parse(
    await readFile(
      resolve(option("--intake", ".build/example-media/round2/intake.json")),
      "utf8",
    ),
  ),
  out = resolve(
    option("--out", ".build/example-media/round2/repository-images"),
  );
await mkdir(out, { recursive: true });
const rows = [];
let cooldown = null;
const jobs = [...intake.jobs].sort(
  (a, b) =>
    Number(b.demoKind === "download") - Number(a.demoKind === "download") ||
    a.id.localeCompare(b.id),
);
for (const job of jobs) {
  if (args.includes("--only-native") && job.demoKind !== "download") continue;
  const row = {
    id: job.id,
    repository: job.repository,
    images: [],
    videos: [],
  };
  rows.push(row);
  if (cooldown) {
    row.blocked = "GitHub API rate-limit cooldown";
    row.retryNotBefore = cooldown;
    continue;
  }
  const repo = new URL(job.repository).pathname
    .split("/")
    .filter(Boolean)
    .slice(0, 2)
    .join("/");
  const url = await assertPublicMediaHost(
    "https://api.github.com/repos/" + repo + "/git/trees/HEAD?recursive=1",
  );
  const body = join(out, job.id + ".json"),
    headers = join(out, job.id + ".headers");
  try {
    let text = await readFile(body, "utf8").catch(() => null);
    if (!text) {
      const { stdout } = await promisify(execFile)(
        "curl",
        [
          "-q",
          "--proto",
          "=https",
          "--max-redirs",
          "0",
          "--connect-timeout",
          "10",
          "--max-time",
          "25",
          "--max-filesize",
          "2000000",
          "-H",
          "Accept: application/vnd.github+json",
          "-A",
          "GameMapSourceReview",
          "-sS",
          "-D",
          headers,
          "-o",
          body,
          "-w",
          "%{http_code}",
          url.href,
        ],
        { maxBuffer: 100000 },
      );
      row.status = Number(stdout.trim());
      const h = await readFile(headers, "utf8");
      const remaining = h.match(/^x-ratelimit-remaining:\s*(\d+)/im)?.[1],
        reset = Number(h.match(/^x-ratelimit-reset:\s*(\d+)/im)?.[1]);
      if (row.status === 429 || (row.status === 403 && remaining === "0")) {
        cooldown = new Date(
          reset ? reset * 1000 : Date.now() + 3600000,
        ).toISOString();
        row.retryNotBefore = cooldown;
        throw Error("Rate limited; remaining API reads stopped");
      }
      assert.equal(row.status, 200, "GitHub tree HTTP " + row.status);
      text = await readFile(body, "utf8");
    }
    const data = JSON.parse(text);
    assert.ok(Array.isArray(data.tree), "No public source tree");
    row.truncated = Boolean(data.truncated);
    row.sourceUrl = url.href;
    for (const file of data.tree) {
      if (file.type !== "blob") continue;
      const linked =
        "https://raw.githubusercontent.com/" +
        repo +
        "/HEAD/" +
        file.path.split("/").map(encodeURIComponent).join("/");
      if (
        /\.(png|jpe?g|webp|gif)$/i.test(file.path) &&
        /screen|gameplay|preview|capture|demo|readme|docs\/|\.github\//i.test(
          file.path,
        )
      )
        row.images.push({
          path: file.path,
          url: linked,
          size: file.size,
          blob: file.sha,
        });
      if (
        /\.(mp4|webm|mov)$/i.test(file.path) &&
        /gameplay|demo|preview|record|screen/i.test(file.path)
      )
        row.videos.push({ path: file.path, url: linked, size: file.size });
    }
    row.images.sort(
      (a, b) =>
        Number(/screenshot|gameplay|screen/i.test(b.path)) -
          Number(/screenshot|gameplay|screen/i.test(a.path)) ||
        a.path.localeCompare(b.path),
    );
  } catch (e) {
    row.error = e.message;
  }
  await writeFile(
    join(out, "index.json"),
    JSON.stringify(
      { reviewedAt: new Date().toISOString(), jobs: rows, cooldown },
      null,
      2,
    ) + "\n",
  );
  await new Promise((r) => setTimeout(r, 500));
}
console.log(
  JSON.stringify(
    {
      jobs: rows.length,
      withImages: rows.filter((r) => r.images.length).length,
      images: rows.reduce((n, r) => n + r.images.length, 0),
      videos: rows.reduce((n, r) => n + r.videos.length, 0),
      cooldown,
      index: join(out, "index.json"),
    },
    null,
    2,
  ),
);

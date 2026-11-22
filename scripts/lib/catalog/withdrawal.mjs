import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { z } from "zod";
import { parseReleaseRealm, assertReleaseRealm } from "./release-realm.mjs";

const safePathPattern = /^\/(?:[A-Za-z0-9._~:@!$&'()*+,;=-]+\/)*$/;
const entryKeyPattern = /^[a-z0-9-]+:[^[:space:]\r\n\0]+$/;

export const withdrawalEntrySchema = z.strictObject({
  key: z
    .string()
    .min(3)
    .max(240)
    .refine(
      (value) => !/[\s\r\n\0]/.test(value) && value.includes(":"),
      "Invalid content key",
    ),
  canonicalPath: z
    .string()
    .min(2)
    .max(300)
    .refine(
      (value) =>
        value.startsWith("/") &&
        value.endsWith("/") &&
        !value.includes("..") &&
        safePathPattern.test(value),
      "Use a canonical slash-terminated path",
    ),
  reason: z.string().trim().min(5).max(2000),
  publicNotice: z.string().trim().min(5).max(1000),
  withdrawnAt: z
    .string()
    .refine(
      (value) => Number.isFinite(Date.parse(value)),
      "Invalid withdrawal timestamp",
    ),
});

export const withdrawalPolicySchema = z.strictObject({
  format: z.literal("gamemap.withdrawal-policy"),
  version: z.literal(1),
  realm: z.record(z.string(), z.unknown()),
  entries: z.array(withdrawalEntrySchema).max(500),
});

export const withdrawalDenylistSchema = z.strictObject({
  format: z.literal("gamemap.withdrawal-denylist"),
  version: z.literal(1),
  realm: z.record(z.string(), z.unknown()).optional(),
  paths: z
    .array(
      z.strictObject({
        canonicalPath: withdrawalEntrySchema.shape.canonicalPath,
        publicNotice: withdrawalEntrySchema.shape.publicNotice,
        withdrawnAt: withdrawalEntrySchema.shape.withdrawnAt,
      }),
    )
    .max(500),
});

export function parseWithdrawalPolicy(value, expectedRealm) {
  const parsed = withdrawalPolicySchema.safeParse(value);
  assert.ok(parsed.success, "Invalid emergency withdrawal policy");
  const realm = parseReleaseRealm(parsed.data.realm);
  if (expectedRealm) assertReleaseRealm(realm, expectedRealm);
  const keys = new Set();
  const paths = new Set();
  for (const entry of parsed.data.entries) {
    assert.ok(!keys.has(entry.key), `Duplicate withdrawn key: ${entry.key}`);
    assert.ok(
      !paths.has(entry.canonicalPath),
      `Duplicate withdrawn path: ${entry.canonicalPath}`,
    );
    keys.add(entry.key);
    paths.add(entry.canonicalPath);
  }
  return { ...parsed.data, realm };
}

export async function readWithdrawalPolicyFile(path, expectedRealm) {
  let raw;
  try {
    raw = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw Object.assign(
      new Error(
        "Unable to read withdrawal policy file; raw contents were not printed",
      ),
      { code: error.code },
    );
  }
  return parseWithdrawalPolicy(raw, expectedRealm);
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/** Stable-URL static tombstone for an explicitly withdrawn record. Never exposes internal notes. */
export function renderTombstoneHtml({
  canonicalPath,
  publicNotice,
  withdrawnAt,
  locale = "en",
  base = "/",
}) {
  const normalizedBase = base.endsWith("/") ? base : base + "/";
  const home = locale === "zh" ? normalizedBase + "zh/" : normalizedBase;
  const title =
    locale === "zh" ? "该条目已下架 — GameMap" : "Record withdrawn — GameMap";
  const heading =
    locale === "zh" ? "该条目已下架" : "This record was withdrawn";
  const backLabel = locale === "zh" ? "返回 GameMap 首页" : "Return to GameMap";
  const dateLabel = locale === "zh" ? "撤回时间：" : "Withdrawn:";
  const lang = locale === "zh" ? "zh-CN" : "en";
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${escapeHtml(title)}</title>
  <style>
    body{font-family:system-ui,-apple-system,sans-serif;max-width:42rem;margin:4rem auto;padding:0 1.5rem;line-height:1.6;color:#111827;background:#fafafa}
    main{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:2rem}
    h1{margin-top:0;font-size:1.5rem}
    .meta{color:#6b7280;font-size:.9rem}
    a{color:#2563eb;text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <main data-gamemap-withdrawn="true" data-canonical-path="${escapeHtml(canonicalPath)}">
    <h1>${escapeHtml(heading)}</h1>
    <p>${escapeHtml(publicNotice)}</p>
    <p class="meta">${escapeHtml(dateLabel)} ${escapeHtml(withdrawnAt)}</p>
    <p><a href="${escapeHtml(home)}">${escapeHtml(backLabel)}</a></p>
  </main>
</body>
</html>
`;
}

/** Online emergency denylist checker for Node-hosted delivery (returns HTTP 410 Gone immediately). */
export function createDenylistChecker(denylistPath, { expectedRealm } = {}) {
  let cachedMtime = -1;
  let cachedMap = new Map();

  async function refresh() {
    if (!denylistPath) return cachedMap;
    let info;
    try {
      info = await stat(denylistPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        cachedMtime = -1;
        cachedMap = new Map();
        return cachedMap;
      }
      throw error;
    }
    if (info.mtimeMs === cachedMtime) return cachedMap;
    const raw = JSON.parse(await readFile(denylistPath, "utf8"));
    const parsed = withdrawalDenylistSchema.parse(raw);
    if (expectedRealm && parsed.realm)
      assertReleaseRealm(parsed.realm, expectedRealm);
    const next = new Map();
    for (const item of parsed.paths) {
      const normalized = item.canonicalPath;
      next.set(normalized, item);
      if (!normalized.startsWith("/zh/")) next.set("/zh" + normalized, item);
    }
    cachedMtime = info.mtimeMs;
    cachedMap = next;
    return cachedMap;
  }

  return {
    async match(requestPath, base = "/") {
      const map = await refresh();
      if (!map.size) return null;
      const normalizedBase = base.endsWith("/") ? base : base + "/";
      if (!requestPath.startsWith(normalizedBase)) return null;
      let rel = "/" + requestPath.slice(normalizedBase.length);
      if (!rel.endsWith("/")) rel = rel.replace(/\/index\.html$/, "") + "/";
      const hit = map.get(rel);
      if (!hit) return null;
      return {
        ...hit,
        locale: rel.startsWith("/zh/") ? "zh" : "en",
      };
    },
  };
}

export { entryKeyPattern };

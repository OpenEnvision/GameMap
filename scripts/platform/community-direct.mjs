#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadContent } from "../lib/content.mjs";
import { root } from "../lib/documents.mjs";

const help = `BlogrXiv-style zero-server Supabase Direct Mode SQL generator
  npm run community:direct-sql -- [--admin-email EMAIL] [--with-games] [--out SQL_FILE]

Options:
  --admin-email EMAIL   Include SQL granting moderator/admin role to this Supabase Auth email
  --with-games          Include SQL syncing all current Git catalog games into community.games
  --out SQL_FILE        Write the generated SQL to a file instead of stdout
`;

const ratableKinds = new Set([
  "example",
  "foundation",
  "threejs-game",
  "repository-research",
]);

export async function collectGitCatalogGames() {
  const context = await loadContent();
  return context.registry.entries
    .filter((entry) => ratableKinds.has(entry.kind))
    .map((entry) => ({
      key: entry.key,
      payload: {
        title: entry.title,
        url: entry.url,
      },
    }));
}

export async function renderDirectModeSQL({
  adminEmail = null,
  withGames = false,
} = {}) {
  const baseSQL = await readFile(
    resolve(root, "supabase/direct-mode/enable-supabase-direct.sql"),
    "utf8",
  );
  const parts = [baseSQL.trim()];
  if (adminEmail) {
    assert.match(
      adminEmail,
      /^[^\s@'"]+@[^\s@'"]+\.[^\s@'"]+$/,
      "Invalid admin email address",
    );
    const escaped = adminEmail.replaceAll("'", "''");
    parts.push(
      [
        "-- Grant BlogrXiv-style admin app_metadata and catalog reviewer/admin membership.",
        "begin;",
        `update auth.users`,
        `set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb`,
        `where lower(email) = lower('${escaped}');`,
        `insert into catalog.memberships (user_id, role)`,
        `select id, 'admin' from auth.users where lower(email) = lower('${escaped}')`,
        `on conflict (user_id) do update set role = 'admin';`,
        "commit;",
      ].join("\n"),
    );
  }
  if (withGames) {
    const games = await collectGitCatalogGames();
    const jsonLiteral = JSON.stringify(games).replaceAll("'", "''");
    parts.push(
      [
        `-- Sync ${games.length} ratable catalog games from Git into community.games.`,
        "begin;",
        `select public.community_sync_games('${jsonLiteral}'::jsonb);`,
        "commit;",
      ].join("\n"),
    );
  }
  return parts.join("\n\n") + "\n";
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) return console.log(help);
  let adminEmail = null;
  let withGames = false;
  let out = null;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--with-games") {
      withGames = true;
      continue;
    }
    if (arg === "--admin-email") {
      adminEmail = args[++i];
      assert.ok(adminEmail && !adminEmail.startsWith("--"), help);
      continue;
    }
    if (arg === "--out") {
      out = args[++i];
      assert.ok(out && !out.startsWith("--"), help);
      continue;
    }
    throw new Error(help);
  }
  const sql = await renderDirectModeSQL({ adminEmail, withGames });
  if (out) {
    const dest = resolve(out);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, sql, "utf8");
    console.log(
      JSON.stringify(
        {
          written: dest,
          adminEmail,
          withGames,
        },
        null,
        2,
      ),
    );
  } else {
    process.stdout.write(sql);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });

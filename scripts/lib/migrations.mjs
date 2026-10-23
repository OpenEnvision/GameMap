import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { root } from "./documents.mjs";

/** Ordered schema versions, not calendar dates. Supabase accepts numeric migration prefixes. */
export function migrationNames(files) {
  const names = files.filter((file) => file.endsWith(".sql")).sort();
  assert.ok(names.length, "No catalog migrations found");
  for (const [index, name] of names.entries()) {
    const match = /^(\d{4})_([a-z][a-z0-9]*(?:_[a-z0-9]+)*)\.sql$/.exec(name);
    assert.ok(
      match,
      `Use an ordered four-digit version and semantic migration name: ${name}`,
    );
    assert.equal(
      Number(match[1]),
      index + 1,
      `Migration versions must be unique and contiguous: ${name}`,
    );
  }
  return names;
}

export async function loadMigrations() {
  const directory = resolve(root, "supabase/migrations");
  return Promise.all(
    migrationNames(await readdir(directory)).map(async (name) => {
      const path = `supabase/migrations/${name}`;
      return { path, sql: await readFile(resolve(root, path), "utf8") };
    }),
  );
}

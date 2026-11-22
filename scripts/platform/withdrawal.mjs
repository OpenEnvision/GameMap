#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdir, writeFile, chmod } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { connectDatabase } from "../lib/catalog/database.mjs";
import {
  readReleaseRealmFile,
  assertReleaseRealm,
} from "../lib/catalog/release-realm.mjs";
import { parseWithdrawalPolicy } from "../lib/catalog/withdrawal.mjs";

const help = `Emergency withdrawal policy and online denylist exporter
  npm run cloud:withdraw -- list --realm REALM_FILE
  npm run cloud:withdraw -- export-policy --realm REALM_FILE --out POLICY_JSON
  npm run cloud:withdraw -- export-denylist --realm REALM_FILE --out DENYLIST_JSON

Environment:
  CATALOG_DATABASE_URL (catalog_backend login)
`;

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    assert.ok(
      ["--realm", "--out"].includes(key) && !Object.hasOwn(options, key),
      help,
    );
    const value = args[++i];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  assert.ok(process.env.CATALOG_DATABASE_URL, "Set CATALOG_DATABASE_URL");
  const realm = await readReleaseRealmFile(
    options["--realm"] || process.env.CATALOG_RELEASE_REALM_FILE,
  );
  const database = connectDatabase(process.env.CATALOG_DATABASE_URL);
  try {
    const { dbRealm, withdrawals } = await database.system(async (client) => {
      const r = (
        await client.query("select catalog.current_release_realm() as realm")
      ).rows[0]?.realm;
      const w = (
        await client.query("select catalog.active_withdrawals() as withdrawals")
      ).rows[0]?.withdrawals;
      return { dbRealm: r, withdrawals: w || [] };
    });
    assertReleaseRealm(dbRealm, realm);
    if (command === "list") {
      console.log(JSON.stringify({ realm, withdrawals }, null, 2));
      return;
    }
    assert.ok(options["--out"], help);
    const out = resolve(options["--out"]);
    await mkdir(dirname(out), { recursive: true, mode: 0o700 });
    if (command === "export-policy") {
      const policy = parseWithdrawalPolicy(
        {
          format: "gamemap.withdrawal-policy",
          version: 1,
          realm,
          entries: withdrawals.map(
            ({ key, canonicalPath, reason, publicNotice, withdrawnAt }) => ({
              key,
              canonicalPath,
              reason,
              publicNotice,
              withdrawnAt,
            }),
          ),
        },
        realm,
      );
      await writeFile(out, JSON.stringify(policy, null, 2) + "\n", {
        mode: 0o600,
      });
      await chmod(out, 0o600);
      console.log(
        JSON.stringify(
          { exported: out, count: policy.entries.length },
          null,
          2,
        ),
      );
      return;
    }
    if (command === "export-denylist") {
      const denylist = {
        format: "gamemap.withdrawal-denylist",
        version: 1,
        realm,
        paths: withdrawals.map(
          ({ canonicalPath, publicNotice, withdrawnAt }) => ({
            canonicalPath,
            publicNotice,
            withdrawnAt,
          }),
        ),
      };
      await writeFile(out, JSON.stringify(denylist, null, 2) + "\n", {
        mode: 0o600,
      });
      await chmod(out, 0o600);
      console.log(
        JSON.stringify(
          { exported: out, count: denylist.paths.length },
          null,
          2,
        ),
      );
      return;
    }
    throw new Error(help);
  } finally {
    await database.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });

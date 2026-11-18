import assert from "node:assert/strict";
import { resolve } from "node:path";
import postgres from "postgres";
import {
  assertLoopback,
  readLocalStatus,
} from "../lib/catalog/local-runtime.mjs";
import { jsonParameter } from "../lib/catalog/database.mjs";
import {
  prepareRemoteImport,
  verifyRemoteImportBackup,
  assertRemoteImportAssets,
  assertRemoteImportOwner,
  inspectRemoteImport,
  applyRemoteImport,
} from "../lib/catalog/remote-import.mjs";

let stage = "arguments";
let sql;
try {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const flag = args[i];
    assert.ok(
      ["--package", "--actor", "--backup", "--apply", "--inspect"].includes(
        flag,
      ) && !Object.hasOwn(options, flag),
      "Unknown or duplicate option",
    );
    options[flag] = ["--apply", "--inspect"].includes(flag) ? true : args[++i];
    assert.ok(
      options[flag] && !String(options[flag]).startsWith("--"),
      "Missing option value",
    );
  }
  assert.ok(options["--package"], "--package is required");
  assert.ok(
    !(options["--apply"] && options["--inspect"]),
    "Choose apply or inspect",
  );
  if (options["--apply"])
    assert.ok(
      options["--backup"] && options["--actor"],
      "Apply requires backup and actor",
    );
  stage = "offline source/type validation";
  const prepared = await prepareRemoteImport(resolve(options["--package"]));
  if (!options["--apply"] && !options["--inspect"]) {
    console.log(
      JSON.stringify(
        {
          mode: "offline-dry-run",
          ...prepared.report,
          batchDigest: prepared.batchDigest,
          conflicts:
            "Not checked: no database connection. Use --inspect for a read-only local comparison.",
        },
        null,
        2,
      ),
    );
  } else {
    if (options["--apply"]) {
      stage = "referenced Git asset verification";
      await assertRemoteImportAssets(prepared);
    }
    stage = "backup verification";
    const backupInventory = options["--apply"]
      ? await verifyRemoteImportBackup(resolve(options["--backup"]))
      : undefined;
    stage = "local runtime verification";
    const status = await readLocalStatus();
    const url = assertLoopback(status.DB_URL, ["postgres:", "postgresql:"]);
    assert.ok(!url.search && !url.hash, "Connection overrides forbidden");
    assert.equal(url.port, "54322");
    assert.equal(url.pathname, "/postgres");
    // Resolve localhost ourselves: no DNS or connection-string host overrides.
    if (url.hostname === "localhost") url.hostname = "127.0.0.1";
    sql = postgres(url.href, {
      max: 1,
      prepare: false,
      ssl: false,
      connect_timeout: 5,
      onnotice() {},
      types: {
        jsonb: {
          to: 3802,
          from: [3802],
          serialize: jsonParameter,
          parse: JSON.parse,
        },
      },
    });
    const client = (tx) => ({
      query: async (text, values = []) => ({
        rows: [...(await tx.unsafe(text, values))],
      }),
    });
    stage = "owner/actor verification and local transaction";
    const result = await sql.begin(
      options["--apply"] ? "" : "read only",
      async (tx) => {
        await tx.unsafe(
          "set local lock_timeout='10s'; set local statement_timeout='120s'",
        );
        const connection = client(tx);
        await assertRemoteImportOwner(connection, options["--actor"] || "");
        return options["--apply"]
          ? applyRemoteImport(connection, prepared, {
              actor: options["--actor"],
              backupInventory,
            })
          : inspectRemoteImport(connection, prepared);
      },
    );
    console.log(
      JSON.stringify(
        {
          mode: options["--apply"]
            ? "applied-drafts-only"
            : "local-read-only-inspection",
          ...result,
        },
        null,
        2,
      ),
    );
  }
} catch {
  // Database/driver errors may embed connection strings or private input. Never echo them.
  console.error(
    `Remote import stopped during ${stage}. No partial import was committed. See docs/remote-import.md for preconditions and validation tests.`,
  );
  process.exitCode = 1;
} finally {
  if (sql) await sql.end({ timeout: 5 });
}

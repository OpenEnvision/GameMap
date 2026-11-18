import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import postgres from "postgres";
import {
  readLocalStatus,
  assertLoopback,
} from "../lib/catalog/local-runtime.mjs";
import { jsonParameter } from "../lib/catalog/database.mjs";
import { verifyRemoteImportBackup } from "../lib/catalog/remote-import.mjs";
import {
  prepareResearchArchives,
  prepareResearchRemainderArchives,
  applyResearchArchives,
  verifyResearchArchives,
  researchArchiveReceipt,
} from "../lib/catalog/research-archives.mjs";

let stage = "arguments",
  sql;
try {
  const options = {};
  const args = process.argv.slice(2);
  while (args.length) {
    const flag = args.shift();
    assert.ok(
      [
        "--packet",
        "--checkout",
        "--actor",
        "--backup",
        "--apply",
        "--verify",
        "--remaining",
      ].includes(flag) && !Object.hasOwn(options, flag),
    );
    options[flag] = ["--apply", "--verify", "--remaining"].includes(flag)
      ? true
      : args.shift();
    assert.ok(options[flag] && !String(options[flag]).startsWith("--"));
  }
  assert.ok(options["--packet"] && options["--checkout"]);
  assert.ok(!(options["--apply"] && options["--verify"]));
  if (options["--apply"]) assert.ok(options["--actor"] && options["--backup"]);
  stage = "pinned-source compilation";
  const prepare = options["--remaining"]
    ? prepareResearchRemainderArchives
    : prepareResearchArchives;
  const prepared = await prepare({
    packet: resolve(options["--packet"]),
    checkout: resolve(options["--checkout"]),
  });
  const receipt = researchArchiveReceipt(prepared);
  let mode = "offline-dry-run";
  if (options["--apply"] || options["--verify"]) {
    stage = "backup and local runtime verification";
    const backupInventory = options["--apply"]
      ? await verifyRemoteImportBackup(resolve(options["--backup"]))
      : undefined;
    const status = await readLocalStatus();
    const url = assertLoopback(status.DB_URL, ["postgres:", "postgresql:"]);
    assert.equal(url.port, "54322");
    assert.equal(url.pathname, "/postgres");
    assert.ok(!url.search && !url.hash);
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
    stage = "atomic evidence import and full read-back";
    await sql.begin(options["--apply"] ? "" : "read only", async (tx) => {
      await tx.unsafe(
        "set local lock_timeout='10s'; set local statement_timeout='120s'",
      );
      const client = {
        query: async (text, args = []) => ({
          rows: [...(await tx.unsafe(text, args))],
        }),
      };
      if (options["--apply"])
        await applyResearchArchives(client, prepared, {
          actor: options["--actor"],
          backupInventory,
        });
      else await verifyResearchArchives(client, prepared);
    });
    if (options["--apply"]) {
      stage = "verified cleanup receipt";
      await writeFile(
        resolve(
          options["--remaining"]
            ? "config/research-archive-remainder-receipt.json"
            : "config/research-archive-receipt.json",
        ),
        JSON.stringify(receipt, null, 2) + "\n",
      );
    }
    mode = options["--apply"]
      ? "imported-evidence-only"
      : "full-read-back-verified";
  }
  console.log(
    JSON.stringify(
      {
        mode,
        batchDigest: prepared.digest,
        sources: receipt.sources.length,
        scope: options["--remaining"]
          ? "remaining-guide-snapshots"
          : "initial-research",
        documents: prepared.payload.sources.filter((source) =>
          ["archived-markdown", "rendered-page-reconstruction"].includes(
            source.format,
          ),
        ).length,
        candidates: prepared.payload.sources.reduce(
          (n, source) =>
            n +
            source.findings.filter((finding) => finding.kind === "candidate")
              .length,
          0,
        ),
        findings: receipt.sources.reduce((n, source) => n + source.findings, 0),
        exclusions: receipt.exclusions,
        originalBytes: receipt.sources.reduce(
          (n, source) => n + source.bytes,
          0,
        ),
        publicationChanged: false,
        documentsDeleted: false,
      },
      null,
      2,
    ),
  );
} catch {
  console.error(
    `Research archive migration stopped during ${stage}. No partial database import was committed; no document was deleted.`,
  );
  process.exitCode = 1;
} finally {
  if (sql) await sql.end({ timeout: 5 });
}

import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { makeContactSheet } from "../lib/example-media.mjs";
const args = process.argv.slice(2),
  option = (name) => args[args.indexOf(name) + 1];
for (const flag of ["--base", "--extra", "--out"])
  assert.ok(args.includes(flag), `Missing ${flag}`);
const base = JSON.parse(await readFile(resolve(option("--base")), "utf8"));
const extra = JSON.parse(await readFile(resolve(option("--extra")), "utf8"));
const overrides = new Map(extra.jobs.map((row) => [row.id, row]));
const jobs = base.jobs.map((row) => {
  const recovered = overrides.get(row.id);
  if (!recovered) return row;
  assert.equal(
    recovered.gameUrl,
    row.gameUrl,
    "Recovery changed the game identity",
  );
  const chosen =
    recovered.candidates.length > row.candidates.length ? recovered : row;
  return {
    ...chosen,
    observations: [...row.observations, ...recovered.observations],
  };
});
const out = resolve(option("--out"));
await mkdir(out, { recursive: true });
const batches = [],
  batchSize = Math.ceil(jobs.length / 12);
for (
  let start = 0, index = 0;
  start < jobs.length;
  start += batchSize, index++
) {
  const batchJobs = jobs.slice(start, start + batchSize),
    tiles = batchJobs.flatMap((row) =>
      row.candidates.map((candidate) => ({ id: row.id, ...candidate })),
    ),
    sheets = [];
  for (let t = 0; t < tiles.length; t += 16) {
    const subset = tiles.slice(t, t + 16),
      file = join(out, `batch-${index + 1}-sheet-${sheets.length + 1}.jpg`);
    await writeFile(file, await makeContactSheet(subset));
    sheets.push({
      file,
      tiles: subset.map(({ id, index, file }) => ({ id, index, file })),
    });
  }
  const path = join(out, `batch-${index + 1}.json`);
  await writeFile(
    path,
    JSON.stringify(
      {
        index: index + 1,
        jobs: batchJobs,
        sheets,
        cooldowns: { ...base.cooldowns, ...extra.cooldowns },
        policy:
          base.policy ||
          "Real creator images require visual gameplay review. Native games were not executed.",
      },
      null,
      2,
    ) + "\n",
  );
  batches.push(path);
}
const result = {
  version: 1,
  status: "collected",
  checkedAt: new Date().toISOString(),
  jobs,
  batches,
  cooldowns: { ...base.cooldowns, ...extra.cooldowns },
  stats: {
    total: jobs.length,
    withCandidates: jobs.filter((row) => row.candidates.length).length,
    withoutCandidates: jobs.filter((row) => !row.candidates.length).length,
    images: jobs.reduce((sum, row) => sum + row.candidates.length, 0),
  },
};
const path = join(out, "manifest.json");
await writeFile(path, JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify(
    { status: "collected", manifestPath: path, batches, stats: result.stats },
    null,
    2,
  ),
);

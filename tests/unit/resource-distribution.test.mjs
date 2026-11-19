import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const module = await build({
  entryPoints: ["website/app/lib/resource-distribution.ts"],
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const { resourceDistribution } = await import(
  "data:text/javascript;base64," +
    Buffer.from(module.outputFiles[0].text).toString("base64")
);
const catalog = JSON.parse(readFileSync("data/resources.json", "utf8"));

test("the library distribution counts the supplied catalog without changing its order", () => {
  const before = JSON.stringify(catalog);
  const distribution = resourceDistribution(catalog);
  assert.equal(distribution.total, catalog.length);
  for (const [facet, field] of [
    ["categories", "category"],
    ["types", "type"],
    ["stages", "stages"],
    ["tracks", "dimensions"],
  ]) {
    for (const { id, count } of distribution[facet]) {
      const expected = catalog.filter((resource) =>
        Array.isArray(resource[field])
          ? resource[field].includes(id)
          : resource[field] === id,
      ).length;
      assert.equal(count, expected, `${facet}.${id}`);
    }
  }
  assert.equal(
    distribution.categories.reduce((sum, item) => sum + item.count, 0),
    catalog.length,
  );
  assert.equal(
    distribution.types.reduce((sum, item) => sum + item.count, 0),
    catalog.length,
  );
  assert.equal(JSON.stringify(catalog), before);
});

test("stages and tracks count overlapping coverage rather than dividing a resource between groups", () => {
  const distribution = resourceDistribution([
    {
      category: "agents",
      type: "agent",
      stages: ["plan", "code", "test"],
      dimensions: ["2d", "3d", "world"],
    },
    {
      category: "engines",
      type: "tool",
      stages: ["test"],
      dimensions: ["3d"],
    },
  ]);
  assert.equal(distribution.total, 2);
  const stages = Object.fromEntries(
    distribution.stages.map(({ id, count }) => [id, count]),
  );
  assert.deepEqual(stages, {
    plan: 1,
    code: 1,
    assets: 0,
    scene: 0,
    test: 2,
    ship: 0,
    runtime: 0,
    world: 0,
  });
  assert.deepEqual(
    Object.fromEntries(distribution.tracks.map(({ id, count }) => [id, count])),
    { "2d": 1, "3d": 2, world: 1 },
  );
});

test("an empty result keeps every filter group with zero counts", () => {
  const distribution = resourceDistribution([]);
  assert.equal(distribution.total, 0);
  assert.equal(distribution.categories.length, 6);
  assert.equal(distribution.stages.length, 8);
  assert.equal(distribution.tracks.length, 3);
  assert.equal(distribution.types.length, 9);
  for (const facet of ["categories", "stages", "tracks", "types"])
    assert.ok(distribution[facet].every(({ count }) => count === 0));
});

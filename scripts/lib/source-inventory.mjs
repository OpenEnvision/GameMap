import assert from "node:assert/strict";
import { resolve, relative } from "node:path";
import { root, walk, slash } from "./documents.mjs";

export function assertKnownSourceFiles(files, contracts) {
  const unknown = files.filter(
    (file) =>
      !Object.hasOwn(contracts, file) &&
      !/^data\/segments\/[^/]+\.json$/.test(file),
  );
  assert.deepEqual(
    unknown,
    [],
    `Unclassified data source. Declare its owner and exposure in website/content/sources.config.json: ${unknown.join(", ")}`,
  );
}
export async function sourceFiles() {
  return (
    await Promise.all(
      ["website/src/data", "data"].map((directory) =>
        walk(resolve(root, directory)),
      ),
    )
  )
    .flat()
    .map((file) => slash(relative(root, file)))
    .filter((file) => !file.split("/").at(-1).startsWith("."))
    .sort();
}
function assertMetadataFields(value, policy, context) {
  for (const [key, child] of Object.entries(value)) {
    assert.ok(
      Object.hasOwn(policy, key),
      `${context}: undeclared metadata field ${key}`,
    );
    if (typeof policy[key] === "object")
      assertMetadataFields(child, policy[key], `${context}.${key}`);
  }
}
/** Check fragment exports independently: a barrel cannot quietly omit a new row. */
export function assertSourceModuleCoverage(
  contracts,
  modules,
  registry,
  sources,
  kinds,
) {
  let sourceRows = 0;
  for (const [path, contract] of Object.entries(contracts)) {
    const module = modules[path];
    assert.ok(module, `Unloaded data source: ${path}`);
    if (path.endsWith(".ts"))
      assert.deepEqual(
        Object.keys(module).sort(),
        Object.keys(contract.exports).sort(),
        `${path}: every runtime export needs an explicit disposition`,
      );
    for (const [name, rule] of Object.entries(contract.exports)) {
      assert.ok(
        Object.hasOwn(kinds, rule.kind),
        `${path}:${name}: unknown content owner ${rule.kind}`,
      );
      const value = module[name];
      assert.notEqual(
        value,
        undefined,
        `Missing declared source export: ${path}:${name}`,
      );
      const requireEntry = (id) => {
        sourceRows++;
        return registry.require(rule.kind, id);
      };
      switch (rule.shape) {
        case "array":
          assert.ok(
            Array.isArray(value),
            `${path}:${name} must remain an array`,
          );
          for (const row of value) {
            const entry = requireEntry(row.id);
            assert.deepEqual(
              entry.data,
              row,
              `${path}:${name}:${row.id} differs from the exposed record`,
            );
          }
          break;
        case "lookup":
          for (const [id, row] of Object.entries(value)) {
            requireEntry(id);
            if (rule.sourceKey)
              assert.deepEqual(
                sources[rule.sourceKey]?.[id],
                row,
                `${path}:${name}:${id} was overwritten or omitted from its attachment owner`,
              );
          }
          break;
        case "plans":
          for (const [track, steps] of Object.entries(value)) {
            registry.require("path", track);
            for (const row of steps) {
              const entry = requireEntry(`${track}/${row.id}`);
              assert.deepEqual(entry.data, { ...row, track });
            }
          }
          break;
        case "recordings":
          for (const id of Object.keys(value)) requireEntry(`recording-${id}`);
          break;
        case "research":
          assertMetadataFields(value, rule.metadata, path);
          for (const row of value.records) {
            const entry = requireEntry(row.requested_repo);
            assert.deepEqual(entry.data, row);
          }
          break;
        case "metadata":
          assert.ok(
            rule.reason?.trim(),
            `${path}:${name}: metadata needs an explicit owner and reason`,
          );
          break;
        default:
          assert.fail(`Unknown source shape ${rule.shape} in ${path}:${name}`);
      }
    }
  }
  return sourceRows;
}

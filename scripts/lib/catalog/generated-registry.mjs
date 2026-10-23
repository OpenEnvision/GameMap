import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

export const documentGenerators = JSON.parse(
  await readFile(
    new URL("../../../website/content/generators.config.json", import.meta.url),
    "utf8",
  ),
);
export function documentOrigin(source) {
  const generator = Object.entries(documentGenerators).find(
    ([, definition]) => definition.source === source,
  );
  return generator
    ? { sourceMode: "generated", generatorKey: generator[0] }
    : { sourceMode: "git" };
}
export function documentGenerator(document) {
  if (document.sourceMode === "git") {
    assert.equal(
      document.generatorKey,
      undefined,
      "Git documents cannot select a generator",
    );
    assert.equal(
      documentOrigin(document.source).sourceMode,
      "git",
      "Generated catalog views cannot masquerade as Git prose",
    );
    return null;
  }
  assert.equal(
    document.sourceMode,
    "generated",
    "Unknown document source mode",
  );
  assert.ok(
    Object.hasOwn(documentGenerators, document.generatorKey),
    "Unregistered document generator",
  );
  const definition = documentGenerators[document.generatorKey];
  assert.equal(
    definition.source,
    document.source,
    "Document generator does not own this address",
  );
  return definition;
}

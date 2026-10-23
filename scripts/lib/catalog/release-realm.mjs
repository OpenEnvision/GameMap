import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { z } from "zod";

// Identifiers only, never URLs, credentials or a claim of provider-side certification.
export const releaseRealm = z.strictObject({
  format: z.literal("gamemap.release-realm"),
  version: z.literal(1),
  environment: z.enum(["local", "staging", "production"]),
  project: z.string().regex(/^[a-z][a-z0-9:._-]{0,99}$/),
  instance: z.uuid(),
  target: z.string().regex(/^[a-z][a-z0-9-]{0,63}$/),
});
export function parseReleaseRealm(value) {
  const parsed = releaseRealm.safeParse(value);
  assert.ok(
    parsed.success,
    "A valid, explicitly registered release realm is required",
  );
  return parsed.data;
}
export async function readReleaseRealmFile(path) {
  assert.ok(
    typeof path === "string" && path,
    "Configure an independent operator release-realm file",
  );
  let value;
  try {
    value = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw Object.assign(
      new Error(
        "Unable to read a valid operator release-realm file; raw values were not printed",
      ),
      { code: error.code },
    );
  }
  return parseReleaseRealm(value);
}
export function assertReleaseRealm(actual, expected) {
  const realm = parseReleaseRealm(actual),
    target = parseReleaseRealm(expected);
  assert.deepEqual(
    realm,
    target,
    "Release realm mismatch (environment/project/instance/target)",
  );
  return realm;
}
export function frozenReleaseRealm(
  manifest,
  build,
  { allowLegacy = false } = {},
) {
  if (manifest.format_version === 1 && build.version === 1) {
    assert.ok(
      allowLegacy,
      "Unbound legacy releases are read-only; freeze a new realm-bound release",
    );
    assert.equal(
      manifest.realm,
      undefined,
      "Legacy releases cannot be relabeled with a realm",
    );
    assert.equal(
      build.realm,
      undefined,
      "Legacy contexts cannot be relabeled with a realm",
    );
    return null;
  }
  assert.equal(
    manifest.format_version,
    2,
    "Unsupported frozen release version",
  );
  assert.equal(build.version, 2, "Unsupported frozen context version");
  const realm = assertReleaseRealm(build.realm, manifest.realm);
  assert.equal(
    build.environment,
    realm.environment,
    "Frozen environment differs from its registered realm",
  );
  return realm;
}
export function assertFreezeEnvironment(realm, { nodeEnv, dirty }) {
  realm = parseReleaseRealm(realm);
  if (realm.environment !== "local")
    assert.equal(
      nodeEnv,
      "production",
      "Non-local freezes require production security mode",
    );
  if (realm.environment !== "local" || nodeEnv === "production")
    assert.equal(
      dirty,
      false,
      "Commit and verify the source checkout before a non-development freeze",
    );
}

import test from "node:test";
import assert from "node:assert/strict";
import { loopbackDockerArguments } from "../scripts/local-docker.mjs";
import { assertLoopback } from "../scripts/lib/catalog/local-runtime.mjs";
import { jsonParameter } from "../scripts/lib/catalog/database.mjs";
import { isDevelopmentRelease } from "../scripts/lib/catalog/site-input.mjs";

test("local Docker publishing is explicitly loopback-only, independent of network defaults", () => {
  const args = [
    "create",
    "--name",
    "local-test",
    "-p",
    "54321:8000",
    "--publish=54322:5432",
    "-p54324:8025",
    "-p=54325:80/udp",
    "image",
  ];
  assert.deepEqual(loopbackDockerArguments(args), [
    "create",
    "--name",
    "local-test",
    "-p",
    "127.0.0.1:54321:8000",
    "--publish=127.0.0.1:54322:5432",
    "-p127.0.0.1:54324:8025",
    "-p127.0.0.1:54325:80/udp",
    "image",
  ]);
  assert.equal(args[4], "54321:8000", "Caller arguments must not mutate");
  assert.deepEqual(
    loopbackDockerArguments([
      "run",
      "--publish",
      "127.0.0.1:54321:8000",
      "image",
    ]),
    ["run", "--publish", "127.0.0.1:54321:8000", "image"],
  );
  for (const binding of [
    "0.0.0.0:54321:8000",
    "[::]:54321:8000",
    "192.168.1.1:54321:8000",
    "54321",
    "::1:54321:8000",
  ])
    assert.throws(
      () => loopbackDockerArguments(["create", "-p", binding, "image"]),
      /loopback/,
    );
  for (const flag of ["-P", "--publish-all", "--publish-all=true"])
    assert.throws(
      () => loopbackDockerArguments(["run", flag, "image"]),
      /publication/,
    );
  assert.deepEqual(loopbackDockerArguments(["ps", "--format", "{{.Ports}}"]), [
    "ps",
    "--format",
    "{{.Ports}}",
  ]);
});

test("local tooling rejects non-local services and wrong transport before provisioning", () => {
  assert.equal(
    assertLoopback("postgresql://user:password@127.0.0.1:54322/postgres", [
      "postgresql:",
    ]).port,
    "54322",
  );
  for (const url of [
    "https://example.com",
    "http://192.168.1.1:54321",
    "http://127.0.0.1.example.com:54321",
    "ftp://127.0.0.1",
  ])
    assert.throws(() => assertLoopback(url, ["http:"]), /non-loopback/);
});

test("local or unmarked frozen releases cannot become production artifacts on a clean checkout", () => {
  assert.equal(
    isDevelopmentRelease({ environment: "local", source_dirty: false }),
    true,
  );
  assert.equal(isDevelopmentRelease({ source_dirty: false }), true);
  assert.equal(isDevelopmentRelease({ environment: "production" }), true);
  assert.equal(
    isDevelopmentRelease({ environment: "production", source_dirty: true }),
    true,
  );
  assert.equal(
    isDevelopmentRelease({ environment: "production", source_dirty: false }),
    true,
  );
  assert.equal(
    isDevelopmentRelease({
      version: 2,
      environment: "production",
      realm: {
        format: "gamemap.release-realm",
        version: 1,
        environment: "production",
        project: "fixture-project",
        instance: "00000000-0000-4000-8000-000000000099",
        target: "fixture-pages",
      },
      source_dirty: false,
    }),
    false,
  );
});

test("production postgres bindings preserve encoded JSON instead of double-encoding it", () => {
  for (const value of [
    [],
    {},
    [{ locale: "zh", value: "中文", source_hash: "abc" }],
    { value: ["one", "two"] },
    true,
    42,
    null,
    "a JSON string",
  ]) {
    const encoded = JSON.stringify(value);
    assert.equal(jsonParameter(encoded), encoded);
    assert.deepEqual(JSON.parse(jsonParameter(encoded)), value);
    if (typeof value !== "string")
      assert.deepEqual(JSON.parse(jsonParameter(value)), value);
  }
});

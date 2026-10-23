#!/usr/bin/env node
import assert from "node:assert/strict";
import { isAbsolute } from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

/** Supabase's Docker CLI path must not publish local credentials on LAN interfaces. */
export function loopbackDockerArguments(args) {
  if (!args.includes("create") && !args.includes("run")) return [...args];
  const bind = (value) => {
    if (/^\d+:\d+(?:\/(?:tcp|udp))?$/.test(value)) return `127.0.0.1:${value}`;
    assert.match(
      value,
      /^127\.0\.0\.1:\d+:\d+(?:\/(?:tcp|udp))?$/,
      "Local Supabase may publish only explicit loopback ports",
    );
    return value;
  };
  const result = [...args];
  for (let index = 0; index < result.length; index++) {
    if (["-p", "--publish"].includes(result[index]))
      result[++index] = bind(result[index]);
    else if (result[index].startsWith("--publish="))
      result[index] = "--publish=" + bind(result[index].slice(10));
    else if (result[index].startsWith("-p") && result[index].length > 2)
      result[index] = "-p" + bind(result[index].slice(2).replace(/^=/, ""));
    else
      assert.ok(
        !["-P", "--publish-all"].includes(result[index]) &&
          !result[index].startsWith("--publish-all="),
        "Automatic public port publication is not permitted",
      );
  }
  return result;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const binary = process.env.CATALOG_DOCKER_BINARY;
  assert.ok(
    binary && isAbsolute(binary),
    "Local Docker wrapper requires its absolute real binary path",
  );
  const child = spawn(binary, loopbackDockerArguments(process.argv.slice(2)), {
    stdio: "inherit",
  });
  child.once("error", () => {
    console.error("Unable to execute the local Docker client");
    process.exitCode = 1;
  });
  child.once("exit", (code) => {
    process.exitCode = code ?? 1;
  });
  for (const signal of ["SIGINT", "SIGTERM"])
    process.once(signal, () => child.kill(signal));
}

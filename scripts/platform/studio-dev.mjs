import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";

const env = { ...process.env, NODE_ENV: "development" };
const api = spawn(process.execPath, ["--watch", "scripts/platform/studio.mjs"], {
  cwd: root,
  stdio: "inherit",
  env,
});
const ui = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/vite/bin/vite.js"),
    "--config",
    "studio/vite.config.ts",
  ],
  { cwd: root, stdio: "inherit", env },
);
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  api.kill("SIGTERM");
  ui.kill("SIGTERM");
  process.exitCode = code;
}
api.on("error", () => stop(1));
ui.on("error", () => stop(1));
api.on("exit", (code) => {
  if (!stopping) stop(code || 0);
});
ui.on("exit", (code) => {
  if (!stopping) stop(code || 0);
});
process.once("SIGINT", () => stop());
process.once("SIGTERM", () => stop());

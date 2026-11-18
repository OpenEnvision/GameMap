import { resolve } from "node:path";
import { root } from "../lib/documents.mjs";
// The browser artifact is always a production build, including inside the isolated test harness.
process.env.NODE_ENV = "production";
const { build } = await import("vite");
await build({
  configFile: resolve(root, "studio/vite.config.ts"),
  mode: "production",
});

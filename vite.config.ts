import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const base =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/") +
  "/";

export default defineConfig({
  base: base.replace(/\/+/g, "/"),
  publicDir: fileURLToPath(new URL("./website/public", import.meta.url)),
  plugins: [fumadocsMdx(), tailwindcss(), reactRouter()],
});

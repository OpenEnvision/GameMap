import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  root,
  publicDir: false,
  esbuild: { jsx: "automatic" },
  build: { outDir: "../.build/studio", emptyOutDir: true },
  server: {
    host: "127.0.0.1",
    port: Number(process.env.CATALOG_STUDIO_UI_PORT || 5174),
    strictPort: true,
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${process.env.CATALOG_STUDIO_PORT || 4180}`,
        changeOrigin: false,
      },
    },
  },
});

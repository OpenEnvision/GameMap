import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import rehypeRaw from "rehype-raw";

const base =
  "/" +
  (process.env.PAGES_BASE_PATH || "").split("/").filter(Boolean).join("/") +
  "/";

export default defineConfig({
  base: base.replace(/\/+/g, "/"),
  publicDir: fileURLToPath(new URL("./website/public", import.meta.url)),
  plugins: [
    fumadocsMdx({
      globalOptions: {
        mdxOptions: {
          remarkImageOptions: { useImport: false },
          rehypePlugins: (plugins) => [
            [
              rehypeRaw,
              {
                passThrough: [
                  "mdxjsEsm",
                  "mdxJsxFlowElement",
                  "mdxJsxTextElement",
                  "mdxFlowExpression",
                  "mdxTextExpression",
                ],
              },
            ],
            ...plugins,
          ],
        },
      },
    }),
    tailwindcss(),
    reactRouter(),
  ],
});

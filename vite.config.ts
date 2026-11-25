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
  optimizeDeps: {
    // Fumadocs serves its ESM modules as source. Prepare the shared UI runtime
    // together so first-page/document imports cannot replace the React chunks.
    include: [
      "lucide-react",
      "next-themes",
      "@fuma-translate/react",
      "class-variance-authority",
      "scroll-into-view-if-needed",
      "hast-util-to-jsx-runtime",
      "cn",
      "zbsearch",
      "zod",
      "@radix-ui/react-accordion",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dialog",
      "@radix-ui/react-direction",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-presence",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
    ],
  },
  plugins: [
    fumadocsMdx({
      globalOptions: {
        mdxOptions: {
          // Content is Markdown, never executable expressions supplied by catalog editors.
          format: "md",
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

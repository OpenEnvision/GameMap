import assert from "node:assert/strict";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { assertDocumentHTML, preparedMarkdown } from "../documents.mjs";

/** Markdown only. Generated catalog text must never become MDX JavaScript or active HTML. */
export function assertMarkdownSafety(
  markdown,
  source,
  { generated = false } = {},
) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(preparedMarkdown(markdown));
  const visit = (node) => {
    if (node.type === "html") assertDocumentHTML(node.value, source);
    if (["link", "image", "definition"].includes(node.type)) {
      const scheme = /^([a-z][a-z\d+.-]*):/i.exec(node.url)?.[1]?.toLowerCase();
      assert.ok(
        !scheme || ["http", "https", "mailto"].includes(scheme),
        `Unsafe Markdown URL in ${source}`,
      );
      if (scheme === "http" || scheme === "https") {
        const url = new URL(node.url);
        assert.ok(
          !url.username && !url.password,
          `Embedded credentials in Markdown URL: ${source}`,
        );
      }
    }
    assert.ok(
      !generated || node.type !== "image",
      `Catalog text cannot embed images; use typed media attachments: ${source}`,
    );
    for (const child of node.children || []) visit(child);
  };
  visit(tree);
}

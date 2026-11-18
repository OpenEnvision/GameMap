import { readFile } from "node:fs/promises";
import { readDocuments } from "../lib/documents.mjs";
import { assertFormalDocumentTranslations } from "../lib/document-translations.mjs";

const fingerprints = JSON.parse(
  await readFile(
    new URL("../../website/content/i18n/docs.zh.sources.json", import.meta.url),
    "utf8",
  ),
);
const count = await assertFormalDocumentTranslations(
  await readDocuments(),
  fingerprints,
);
console.log(
  `Document translations passed: ${count} complete English/Chinese pairs; sections, lists, tables, code, links and reviewed source hashes match. Remote historical archives retain their originals.`,
);

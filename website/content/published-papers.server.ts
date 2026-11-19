import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { UNSAFE_decodeViaTurboStream } from "react-router";
import type { ContentEntry, ContentModels } from "./models";

/** Read only the public paper payloads retained by the local publisher. */
export async function readPublishedPapers(root = process.cwd()) {
  const path = resolve(
    root,
    ".build/catalog-local/publication/current/papers.data",
  );
  let bytes: Buffer;
  try {
    bytes = await readFile(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  const decoded = await UNSAFE_decodeViaTurboStream(
    new Response(new Uint8Array(bytes)).body!,
    globalThis,
  );
  const snapshot = decoded.value as {
    papers: { data: { entries: ContentEntry<"paper">[] } };
  };
  const entries = snapshot.papers?.data?.entries;
  if (
    !Array.isArray(entries) ||
    entries.some((entry) => entry.kind !== "paper")
  )
    throw new Error("Local publication does not contain a paper collection");
  return entries.map((entry): ContentModels["paper"] => entry.data);
}

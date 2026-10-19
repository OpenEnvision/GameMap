import type { ContentEntry, ContentBlock, Fact } from "./models";
import { contentKinds } from "./models";
export function factText(fact: Fact): string {
  return `${fact.label} ${fact.type === "group" ? fact.items.map(factText).join(" ") : fact.type === "link" ? fact.url : fact.value}`;
}
export function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "title":
    case "lead":
    case "text":
      return `${block.label || ""} ${block.value}`;
    case "list":
      return `${block.label} ${block.items.join(" ")}`;
    case "links":
      return `${block.label} ${block.items.map((item) => `${item.label} ${item.url} ${item.note || ""}`).join(" ")}`;
    case "image":
      return `${block.label} ${block.alt} ${block.credit || ""}`;
    case "video":
      return block.label;
    case "facts":
      return `${block.label} ${block.items.map(factText).join(" ")}`;
    default: {
      const missing: never = block;
      throw new Error(`Unregistered search block ${JSON.stringify(missing)}`);
    }
  }
}
export function searchableBlocks(entry: ContentEntry) {
  return entry.blocks.filter((block) => block.section !== "metadata");
}
export function searchFields(entry: ContentEntry) {
  return [
    ...new Set(
      [
        entry.title,
        entry.description,
        ...searchableBlocks(entry).map(blockText),
      ].filter(Boolean),
    ),
  ].join("\n");
}
export function searchableText(entry: ContentEntry) {
  return `${entry.title} ${contentKinds[entry.kind].plural} ${searchableBlocks(entry).map(blockText).join("\n")}`;
}

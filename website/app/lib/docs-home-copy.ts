import type { DocLocale } from "../../content/doc-language";
import zhMessages from "../../content/i18n/docs-home.zh.json";
import type { PortalTaskId } from "./docs-home";

type Topic = { title: string; description: string };
type HomeCopy = {
  eyebrow: string;
  taglineBefore: string;
  taglineAccent: string;
  taglineAfter: string;
  introduction: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchHint: string;
  clearSearch: string;
  allDocuments: string;
  starterEyebrow: string;
  readGuide: string;
  taskTitle: string;
  taskDescription: string;
  topicTitle: string;
  topicDescription: string;
  allInTopic: string;
  directoryTitle: string;
  directoryDescription: string;
  archiveTitle: string;
  archiveDescription: string;
  originals: string;
  reconstructions: string;
  originalLabel: string;
  reconstructionLabel: string;
  resultsTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  noJavaScript: string;
  documentCount: (count: number) => string;
  guideCount: (count: number) => string;
  resultCount: (count: number) => string;
  tasks: Record<PortalTaskId, Topic>;
  topics: Record<string, Topic>;
};

const en: HomeCopy = {
  eyebrow: "THE GAMEMAP FIELD GUIDE",
  taglineBefore: "A reading room for ",
  taglineAccent: "game makers",
  taglineAfter: ".",
  introduction:
    "Choose your tools, make something playable, and check the results. Find a clear next step for the game you want to build.",
  searchLabel: "Find a guide",
  searchPlaceholder: "Search guides, topics, or tools…",
  searchHint:
    "Search document titles and topics, or browse the directory below.",
  clearSearch: "Clear search",
  allDocuments: "Browse all documents",
  starterEyebrow: "A GOOD FIRST STEP",
  readGuide: "Open the practical guide",
  taskTitle: "What are you working on?",
  taskDescription: "Start with a task. Go straight to a useful guide.",
  topicTitle: "Explore the handbook",
  topicDescription: "Go deeper into a topic, at your own pace.",
  allInTopic: "All guides in this topic",
  directoryTitle: "The complete directory",
  directoryDescription:
    "Every guide and reference page. Open a topic to see its documents.",
  archiveTitle: "Source archive",
  archiveDescription:
    "Historical source material, kept separate from the guides. Original snapshots and reconstructed pages retain their provenance labels.",
  originals: "Archived original Markdown",
  reconstructions: "Rendered-page reconstructions",
  originalLabel: "Original archive",
  reconstructionLabel: "Reconstructed page",
  resultsTitle: "Matching documents",
  emptyTitle: "No matching documents yet.",
  emptyDescription:
    "Try a tool name, a broader topic, or clear the search to explore the handbook.",
  noJavaScript:
    "Search requires JavaScript. All documents remain available in the directory below.",
  documentCount: (count) =>
    `${count} ${count === 1 ? "document" : "documents"}`,
  guideCount: (count) =>
    `${count} ${count === 1 ? "guide or note" : "guides & notes"}`,
  resultCount: (count) => `${count} ${count === 1 ? "match" : "matches"}`,
  tasks: {
    tools: {
      title: "Pick your tools",
      description: "Find an engine and a workflow that fit your project.",
    },
    prototype: {
      title: "Make it playable",
      description: "Turn a small idea into a working game loop.",
    },
    assets: {
      title: "Create assets",
      description: "Generate, choose, and integrate the pieces you need.",
    },
    testing: {
      title: "Test your build",
      description:
        "Check behavior, gather evidence, and understand the limits.",
    },
  },
  topics: {
    "Start building": {
      title: "Start building",
      description: "Find a starting point and turn it into a working project.",
    },
    "Explore the ecosystem": {
      title: "Tools & ecosystems",
      description:
        "Understand engines, coding agents, and development approaches.",
    },
    "Production & engineering": {
      title: "Production & engineering",
      description: "Connect a promising prototype to a repeatable workflow.",
    },
    "Assets & generative tools": {
      title: "Assets & generative tools",
      description:
        "Create, select, validate, and integrate assets with clear boundaries.",
    },
    "Evidence & evaluation": {
      title: "Testing & evidence",
      description: "Understand what was tested and how to check the results.",
    },
    "About this atlas": {
      title: "About & contributing",
      description:
        "Sources, contribution standards, and maintaining this atlas.",
    },
    "Skills & practice": {
      title: "Skills & practice",
      description:
        "Practical skill packages, templates, and their source boundaries.",
    },
    "More notes": {
      title: "More guides & references",
      description: "Additional implementation notes and reference material.",
    },
  },
};
const zh: HomeCopy = {
  ...zhMessages,
  documentCount: (count) =>
    zhMessages.documentCount.replace("{count}", String(count)),
  guideCount: (count) =>
    zhMessages.guideCount.replace("{count}", String(count)),
  resultCount: (count) =>
    zhMessages.resultCount.replace("{count}", String(count)),
};
export const documentationHomeCopy = (locale: DocLocale) =>
  locale === "zh" ? zh : en;

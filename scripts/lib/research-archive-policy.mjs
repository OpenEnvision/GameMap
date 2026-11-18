// Frozen membership of the first immutable research-archive batch.
// A separate follow-up archives old guide snapshots; current tutorials, design
// documents, operation contracts and skill packages stay Git-authored.
const researchNotes = new Set([
  "agent-interface-evidence",
  "agents-notes",
  "cadle-repositories",
  "catalog-review-coverage",
  "coding-agent-game-code",
  "community-case-research",
  "engines-notes",
  "game-ai-notes",
  "generative-tools-research",
  "icon-sources",
  "media-sources",
  "production-coverage-gaps",
  "production-research-notes",
  "source-revision-notes",
  "studio-production-case-studies",
  "visual-evidence-research",
  "world-model-notes",
]);

export function databaseResearchArchive(document) {
  return (
    document.kind === "archived-markdown" ||
    researchNotes.has(document.slug.replace(/^remote\//, ""))
  );
}

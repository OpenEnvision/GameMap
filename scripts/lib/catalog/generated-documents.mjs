import assert from "node:assert/strict";
import { renderAwesome } from "../../catalog.mjs";
import { renderLearningGuide } from "../../learning.mjs";
import { renderAgentCodeGuide } from "../../agent-code.mjs";
import { renderTestingGuide } from "../../testing.mjs";
import { renderRepositoryResearch } from "../../repository-research.mjs";
import {
  documentGenerators,
  documentGenerator,
} from "./generated-registry.mjs";
import { assertMarkdownSafety } from "./markdown-safety.mjs";
import { sha256, canonicalJSON } from "./codec.mjs";

export function renderLogoAttribution(resources, identities) {
  let output = `# GameMap resource logo sources\n\nFind the organization, research affiliation, or maintainer behind each resource, along with the source of its bundled mark.\n\nSchool and institute marks identify a verified author affiliation, not exclusive ownership or endorsement. For collaborative research, the notes below preserve the selection rationale and other affiliations. Official project marks identify their own projects; third-party engine tools do not inherit an engine logo. Independent projects without a publicly verifiable mark show the maintainer name only. No generated logo, generic icon, default identicon, or portrait is used as a substitute.\n\nOriginal artwork is displayed with its aspect ratio and colors intact. Wide wordmarks receive more space. Nonvisual XML declarations and external DTD headers are removed from SVG files; artwork is unchanged. Files are served locally from <code>website/public/logos/</code> and do not require a remote image request. The identity registry records the original image URL, primary affiliation evidence, and a SHA-256 checksum. Legacy files under <code>website/public/icons/</code> are not used for resource identities; their accompanying licenses remain with those files.\n\n| Resource | Verified identity | Role | Evidence | Original mark | Local file |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const resource of resources) {
    const identity = identities[resource.id];
    assert.ok(identity, `Missing identity: ${resource.id}`);
    output += `| ${resource.name} | ${identity.organization} | ${identity.kind} | [Primary source](${identity.sourceUrl}) | ${identity.logoSourceUrl ? `[Original image](${identity.logoSourceUrl})` : "No published project mark"} | ${identity.asset ? "<code>" + identity.asset + "</code>" : "Maintainer name only"} |\n`;
  }
  output += "\n## Attribution notes\n\n";
  for (const resource of resources)
    output += `### ${resource.name}\n\n${identities[resource.id].notes}\n\n`;
  return output.trimEnd() + "\n";
}

export async function resolveDocumentBody(
  document,
  generated,
  { knownSources, readSource, verify = true },
) {
  assert.ok(
    knownSources.has(document.source),
    "Document is not a registered public source",
  );
  const generator = documentGenerator(document);
  const body = generator
    ? generated[document.source]
    : (await readSource(document.source)).toString("utf8");
  assert.equal(typeof body, "string", "No document body was produced");
  assertMarkdownSafety(body, document.source, {
    generated: Boolean(generator),
  });
  if (verify)
    assert.equal(
      sha256(body),
      document.sourceHash,
      generator
        ? "Generated guide changed; synchronize and review its source index first"
        : "Git document changed; synchronize its source index first",
    );
  return body;
}

/** Trusted renderers, never executable recipes supplied by a database row. */
export function renderGeneratedDocuments(input) {
  // JSONB and canonical package serialization reorder maps. Only arrays carry editorial order.
  const sources = JSON.parse(canonicalJSON(input));
  const renderers = {
    "resource-catalog": () => renderAwesome(sources.resources),
    "game-builds": () =>
      renderLearningGuide(
        sources.learningPaths,
        sources.foundationPaths,
        sources.resources,
        sources.communityCollections,
      ),
    "agent-library": () =>
      renderAgentCodeGuide(
        sources.agentGameResources,
        sources.learningPaths,
        sources.gameCaseAgents,
        sources.agentLabels,
        sources.agentResourceKinds,
      ),
    "testing-library": () => renderTestingGuide(sources),
    "repository-index": () =>
      renderRepositoryResearch(sources.repositoryResearch),
    "logo-attribution": () =>
      renderLogoAttribution(sources.resources, sources.identities),
  };
  return Object.fromEntries(
    Object.entries(documentGenerators).map(([key, definition]) => {
      assert.ok(
        Object.hasOwn(renderers, key),
        `Uninstalled document generator: ${key}`,
      );
      return [definition.source, renderers[key]()];
    }),
  );
}

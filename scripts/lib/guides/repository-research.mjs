import assert from "node:assert/strict";
import { canonicalValue } from "../catalog/codec.mjs";
import { readFile } from "node:fs/promises";
import documentRedirects from "../../../website/content/document-redirects.json" with { type: "json" };

export async function loadRepositoryResearch() {
  return validateRepositoryResearch(
    JSON.parse(
      await readFile(
        new URL(
          "../../../data/segments/repository-research.json",
          import.meta.url,
        ),
        "utf8",
      ),
    ),
  );
}

export function validateRepositoryResearch(data) {
  assert.equal(
    data.source.indexed_count,
    253,
    "This pinned source inventory contains 253 candidates",
  );
  assert.equal(new URL(data.source.url).protocol, "https:");
  assert.deepEqual(
    new Set(Object.keys(data.group_titles)),
    new Set(["reference", ...Object.keys(data.source.groups)]),
    "Every source group must render",
  );
  const indexed = data.records.filter((row) => row.group !== "reference");
  assert.equal(
    indexed.length,
    data.source.indexed_count,
    "Preserve every indexed candidate",
  );
  assert.equal(
    new Set(indexed.map((row) => row.requested_repo.toLowerCase())).size,
    indexed.length,
    "Duplicate source candidate",
  );
  assert.equal(
    data.records.filter((row) => row.group === "reference").length,
    1,
    "Keep the reference separate",
  );
  assert.equal(
    data.records.find((row) => row.group === "reference").requested_repo,
    data.source.reference_repo,
  );
  const expected = new Set(
    Object.values(data.source.groups)
      .flat()
      .map((repo) => repo.toLowerCase()),
  );
  assert.deepEqual(
    new Set(indexed.map((row) => row.requested_repo.toLowerCase())),
    expected,
    "Import differs from source inventory",
  );
  for (const row of data.records) {
    assert.match(row.requested_repo, /^[\w.-]+\/[\w.-]+$/);
    if (row.canonical_repo !== null)
      assert.match(row.canonical_repo, /^[\w.-]+\/[\w.-]+$/);
    assert.ok(
      ["source-reviewed", "metadata-only", "unavailable"].includes(
        row.review_status,
      ),
    );
    assert.ok(
      ["existing", "new-research", "qualified", "unavailable"].includes(
        row.disposition,
      ),
    );
    for (const field of ["summary", "license_note", "ai_note"])
      assert.ok(row[field]?.trim(), `${row.requested_repo}: missing ${field}`);
    for (const field of ["limitations", "existing_locations", "source_urls"])
      assert.ok(Array.isArray(row[field]), `Missing array ${field}`);
    assert.ok(row.source_urls.length > 0);
    for (const url of row.source_urls)
      assert.equal(new URL(url).protocol, "https:");
    assert.match(row.checked_at, /^\d{4}-\d{2}-\d{2}$/);
    if (row.group !== "reference")
      assert.ok(data.source.groups[row.group].includes(row.requested_repo));
  }
  return data;
}

const cell = (value) =>
  String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
export function renderRepositoryResearch(data) {
  if (documentRedirects["/docs/cadle-repositories/"])
    return "# Game examples\n\nThis catalog has moved to [Game examples](/examples/).\n";
  data = canonicalValue(data);
  const counts = {};
  for (const row of data.records)
    counts[row.disposition] = (counts[row.disposition] || 0) + 1;
  let out = `# Cadle-like repository research import\n\nFind projects for game generation, agents, scene editing, and evaluation. The table tracks repository names, available source, licensing, and related coverage.\n\nImported from the [Cadle repository corpus](${data.source.url}). For original group membership, historical rankings, and source revisions, use the [machine-readable ledger](../website/public/repository-research.json).\n\n## Reading the status\n\n- **existing**: related coverage already exists in GameMap; the row links it rather than creating a duplicate card\n- **new-research**: newly documented source material; inclusion is not a reproduction or production-readiness endorsement\n- **qualified**: useful source material with material scope, maturity, licensing, identity or access qualifications\n- **unavailable**: the requested location could not be inspected; this does not prove deletion or global inaccessibility\n\nCheck code, asset, and service terms separately before adapting a project. For changing repositories, use the recorded README revision to identify the inspected material.\n\n## Highest-value corrections\n\n${data.findings.map((value) => `- ${value}`).join("\n")}\n\n`;
  for (const [group, title] of Object.entries(data.group_titles)) {
    const rows = data.records.filter((row) => row.group === group);
    if (!rows.length) continue;
    out += `## ${title} (${rows.length})\n\n| Requested repository / current identity | Documented scope | Review and qualifications | Primary evidence / existing coverage |\n| --- | --- | --- | --- |\n`;
    for (const row of rows) {
      const requested = `[${row.requested_repo}](https://github.com/${row.requested_repo})`;
      const canonical =
        row.canonical_repo &&
        row.canonical_repo.toLowerCase() !== row.requested_repo.toLowerCase()
          ? ` → [${row.canonical_repo}](https://github.com/${row.canonical_repo})`
          : "";
      const notes = [
        `${row.disposition}; ${row.review_status}`,
        row.license_note,
        row.ai_note,
        ...row.limitations,
      ]
        .map(cell)
        .join(" ");
      const sources = row.source_urls
        .map((url, i) => `[S${i + 1}](${url})`)
        .join(" ");
      const existing = row.existing_locations
        .map(
          (path) =>
            `[Existing](${path.startsWith("docs/") ? path.slice(5) : `https://github.com/OpenEnvision/GameMap/blob/${data.target_base}/${path}`})`,
        )
        .join(" ");
      out += `| ${requested}${canonical} | ${cell(row.summary)} | ${notes} | ${sources}${existing ? " " + existing : ""} |\n`;
    }
    out += "\n";
  }
  out +=
    "## Practical use and remaining evidence\n\nUse the source and identity ledger to choose projects for a declared task, then separately establish a reproducible build, asset rights, browser/engine requirements, state reset and a task-specific functional/visual acceptance fixture. Author-described deterministic simulation, screenshots, gates or passing tests do not independently establish determinism, visual quality or benchmark validity. Unavailable sources remain candidates for later rechecking; no replacement repository is silently treated as an authenticated redirect.\n";
  return out;
}

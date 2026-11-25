import {
  useLoaderData,
  useLocation,
  type LoaderFunctionArgs,
} from "react-router";
import {
  Activity,
  Box,
  Boxes,
  ClipboardCheck,
  FlaskConical,
  Gamepad2,
  Globe,
  Layers3,
  MonitorCheck,
  Search,
  Workflow,
} from "lucide-react";
import { LayoutGrid, testingKindGlyphs } from "../lib/catalog";
import { useClientQuery } from "../lib/client-query";
import { content, contentFor } from "../../content/registry.server";
import {
  testingBrowserOptions,
  normalizeTestingFilters,
  selectTestingEntries,
  selectTestingStarters,
} from "../../content/testing-browser";
import { testingSearchText } from "../../content/testing-browser.server";
import { resourceSearchText } from "../../content/resource-search.server";
import { matchesSearch } from "../../content/matching";
import {
  compareDirectoryTitles,
  parseDirectorySearchQuery,
} from "../../content/directory-search";
import { CatalogIcon } from "../components/catalog-icon";
import { TestingResourceCard } from "../components/testing-resource-card";
import { TestingStarterCard } from "../components/testing-starter-card";
import { Link, useNavigate, useSiteI18n } from "../lib/i18n";
import { IndexEmpty, IndexHero } from "../components/catalog-browser";
import type { CSSProperties } from "react";
export { shouldRevalidateCollection as shouldRevalidate } from "../lib/collection-query";

const executionGroups = [
  {
    label: "Godot",
    icon: Box,
    tools: [
      { id: "godot-gut", icon: FlaskConical },
      { id: "gdunit4", icon: FlaskConical },
    ],
  },
  {
    label: "Unity",
    icon: Layers3,
    tools: [
      { id: "unity-test-framework", icon: FlaskConical },
      { id: "game-ci", icon: Workflow },
    ],
  },
  {
    label: "Unreal Engine",
    icon: Boxes,
    tools: [
      { id: "unreal-automation-tests", icon: ClipboardCheck },
      { id: "unreal-gauntlet", icon: Gamepad2 },
      { id: "unreal-insights", icon: Activity },
    ],
  },
  {
    label: "Web",
    icon: Globe,
    tools: [{ id: "playwright-test", icon: MonitorCheck }],
  },
];

export function loader({ request }: LoaderFunctionArgs) {
  const localized = contentFor(request);
  const toolSearch = resourceSearchText();
  const executionTools = localized
    .all("resource")
    .filter((entry) => entry.data.category === "testing")
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      url: entry.url,
      searchText: toolSearch[entry.id] || entry.title,
    }));
  return {
    entries: localized.all("testing"),
    packs: localized.all("testing-pack"),
    options: testingBrowserOptions(content.all("testing")),
    searchText: testingSearchText(),
    executionTools,
  };
}

export default function Testing() {
  const { t } = useSiteI18n();
  const { entries, packs, options, searchText, executionTools } =
    useLoaderData<typeof loader>();
  const toolsById = new Map(executionTools.map((tool) => [tool.id, tool]));
  const publishedExecutionGroups = executionGroups.map((group) => ({
    ...group,
    tools: group.tools.flatMap(({ id, icon }) => {
      const tool = toolsById.get(id);
      return tool ? [{ ...tool, icon }] : [];
    }),
  }));
  const [params] = useClientQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const filters = normalizeTestingFilters(params, options);
  const query = params.get("q") || "";
  const { kind, use, terms, dimension } = filters;
  const filtered = selectTestingEntries(entries, filters, searchText);
  const starters = selectTestingStarters(packs, filtered, filters);
  const search = parseDirectorySearchQuery(filters.query);
  const matchingTools = !search.empty
    ? executionTools
        .filter((entry) => matchesSearch(entry.searchText, search))
        .sort((a, b) => compareDirectoryTitles(search, a.title, b.title))
        .slice(0, 6)
    : [];
  const toolSearchUrl =
    "/resources/?" +
    new URLSearchParams({
      collection: "all",
      category: "testing",
      ...(filters.query ? { q: filters.query } : {}),
    }).toString();
  const invalid = (["kind", "use", "terms", "dimension"] as const).filter(
    (key) => params.has(key) && params.get(key) !== filters[key],
  );
  const active = Boolean(
    query ||
    kind !== "all" ||
    use !== "all" ||
    terms !== "all" ||
    dimension !== "all" ||
    invalid.length,
  );
  const applyFilters = (next: URLSearchParams) =>
    navigate(
      { search: next.size ? `?${next}` : "", hash: window.location.hash },
      { replace: true, preventScrollReset: true, flushSync: true },
    );
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    for (const key of invalid) next.delete(key);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    return applyFilters(next);
  };
  const clear = () => {
    const next = new URLSearchParams(window.location.search);
    for (const key of ["q", "kind", "use", "terms", "dimension"])
      next.delete(key);
    return applyFilters(next);
  };
  const kindScope = selectTestingEntries(
    entries,
    { ...filters, kind: "all" },
    searchText,
  );
  const kindTones: Record<string, string> = {
    project: "var(--tax-2d)",
    environment: "var(--tax-3d)",
    asset: "var(--tax-production)",
    motion: "var(--tax-world)",
    fixture: "var(--tax-agents)",
  };
  const tone = (id: string) =>
    ({ "--tone": kindTones[id] || "var(--accent)" }) as CSSProperties;

  return (
    <main id="main-content" className="ix-page ix-testing">
      <title>{t("Testing library — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Projects, environments and assets for repeatable tests, with setup steps and case-specific checks.",
        )}
      />
      <IndexHero
        pillar="tools"
        title="Give your ideas a real test."
        lede="Projects, environments and assets for repeatable tests, with setup steps and case-specific checks."
        count={entries.length}
        countLabel="testing resources"
      >
        <div className="heading-links">
          <Link to="/docs/reference/testing-library/">
            {t("Read the testing guide")}
          </Link>
          <Link to="/docs/evaluation/development-evaluation/">
            {t("What should you measure?")}
          </Link>
        </div>
      </IndexHero>
      <div className="ix-wrap">
        <section className="testing-task-paths" aria-labelledby="testing-tasks">
          <h2 id="testing-tasks">{t("Choose a test task")}</h2>
          <div className="testing-task-grid">
            <article>
              <h3>{t("Test an existing project")}</h3>
              <p>
                {t(
                  "Choose a test runner, CI workflow or profiler for your project. These links open tools and guides in Resources.",
                )}
              </p>
              <dl className="testing-engine-tools">
                {publishedExecutionGroups
                  .filter(({ tools }) => tools.length > 0)
                  .map(({ label, icon, tools }) => (
                    <div key={label}>
                      <dt className="inline-icon-label">
                        <CatalogIcon icon={icon} size="small" />
                        {label}
                      </dt>
                      <dd>
                        {tools.map((tool) => (
                          <Link
                            key={tool.id}
                            to={tool.url}
                            className="inline-icon-label"
                          >
                            <CatalogIcon icon={tool.icon} size="inline" />
                            {tool.title}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  ))}
              </dl>
              <Link to="/resources/?collection=all&category=testing">
                {t("More testing tools and guides")}
              </Link>
            </article>
            <article>
              <h3>{t("Test a change or asset pipeline")}</h3>
              <p>
                {t(
                  "Choose a small project or licensed asset, then record a baseline and compare the change.",
                )}
              </p>
              <ul>
                <li>
                  <Link to="/testing/?use=coding&kind=project#pack-change-a-game">
                    {t("Game change task")}
                  </Link>
                </li>
                <li>
                  <Link to="/testing/?use=pipeline#pack-asset-through-pipeline">
                    {t("Asset and animation task")}
                  </Link>
                </li>
              </ul>
            </article>
            <article>
              <h3>{t("Evaluate an agent playing a game")}</h3>
              <p>
                {t(
                  "Set the task, observation and action interface, seed, and budget. Log each episode’s outcome.",
                )}
              </p>
              <ul>
                <li>
                  <Link to="/testing/?use=playing&kind=environment#pack-give-an-agent-a-goal">
                    {t("Agent gameplay task")}
                  </Link>
                </li>
                <li>
                  <Link to="/docs/evaluation/development-evaluation/">
                    {t("Development evaluation methods")}
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </section>
        <div className="ix-bar testing-filters" id="testing-materials">
          <label className="ix-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              aria-label={t("Search testing resources")}
              placeholder={t("Find a game, environment, or asset library…")}
              value={query}
              onChange={(event) => update("q", event.target.value)}
            />
          </label>
          <div className="ix-bar-selects">
            <label className="ix-select">
              <select
                aria-label={t("Testing use")}
                value={use}
                onChange={(event) => update("use", event.target.value)}
              >
                <option value="all">{t("All testing goals")}</option>
                {options.uses.map(({ id, label, count }) => (
                  <option key={id} value={id}>
                    {t(label)} · {count}
                  </option>
                ))}
              </select>
            </label>
            <label className="ix-select">
              <select
                aria-label={t("License terms")}
                value={terms}
                onChange={(event) => update("terms", event.target.value)}
              >
                <option value="all">{t("All license terms")}</option>
                {options.terms.map(({ id, label, count }) => (
                  <option key={id} value={id}>
                    {t(label)} · {count}
                  </option>
                ))}
              </select>
            </label>
            <label className="ix-select">
              <select
                aria-label={t("Test dimension")}
                value={dimension}
                onChange={(event) => update("dimension", event.target.value)}
              >
                <option value="all">{t("All dimensions")}</option>
                {options.dimensions.map(({ id, label, count }) => (
                  <option key={id} value={id}>
                    {t(label)} · {count}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {!search.empty && (
          <aside className="testing-tool-search">
            <p>
              {t(
                "Test runners and QA services are listed in Resources. The results below are test materials.",
              )}{" "}
              <Link to={toolSearchUrl}>
                {t("Search testing tools and guides")}
              </Link>
            </p>
            {matchingTools.length > 0 && (
              <ul>
                {matchingTools.map((tool) => (
                  <li key={tool.id}>
                    <Link to={tool.url}>{tool.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
        <div className="ix-cats">
          <div
            className="category-filters"
            role="group"
            aria-label={t("Testing resource kind")}
          >
            <button
              type="button"
              aria-pressed={kind === "all"}
              onClick={() => update("kind", "all")}
            >
              <LayoutGrid size={15} aria-hidden="true" />
              {t("All resources")}
              <span>{kindScope.length}</span>
            </button>
            {options.kinds.map(({ id, label }) => {
              const Glyph =
                testingKindGlyphs[id as keyof typeof testingKindGlyphs];
              const count = kindScope.filter(
                (entry) => entry.data.kind === id,
              ).length;
              return (
                <button
                  type="button"
                  key={id}
                  aria-pressed={kind === id}
                  onClick={() => update("kind", id)}
                  style={tone(id)}
                  data-kind={id}
                >
                  <Glyph size={15} aria-hidden="true" />
                  {t(label)}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="ix-meta testing-results-meta">
          <span aria-live="polite" aria-atomic="true">
            <strong>
              {t("Showing {count} of {total} entries", {
                count: filtered.length,
                total: entries.length,
              })}
            </strong>
          </span>
          {active && (
            <button type="button" className="testing-clear" onClick={clear}>
              {t("Clear filters")}
            </button>
          )}
        </div>
        <p className="testing-scope-note">
          {t("Source-reviewed baselines; record your own runtime results.")}
        </p>
        {invalid.length > 0 && (
          <p className="testing-scope-note" role="status">
            {t("Unknown filters were ignored.")}
          </p>
        )}
        {starters.length > 0 && (
          <details
            className="testing-starter-panel"
            open={location.hash.startsWith("#pack-") || undefined}
          >
            <summary>
              {t("Suggested starter tasks ({count})", {
                count: starters.length,
              })}
            </summary>
            <div className="testing-starter-grid">
              {starters.map(({ entry, resources, total }) => (
                <TestingStarterCard
                  key={entry.key}
                  entry={entry}
                  resources={resources}
                  total={total}
                  onUse={() => update("use", entry.data.use)}
                />
              ))}
            </div>
          </details>
        )}
        {filtered.length ? (
          <div className="testing-grid">
            {filtered.map((entry) => (
              <TestingResourceCard
                key={entry.key}
                entry={entry}
                style={tone(entry.data.kind)}
              />
            ))}
          </div>
        ) : (
          <IndexEmpty
            title="No resources match these filters."
            body="Clear filters or try another goal, resource type, dimension or keyword."
          >
            <button type="button" className="testing-clear" onClick={clear}>
              {t("Clear filters")}
            </button>
          </IndexEmpty>
        )}
      </div>
    </main>
  );
}

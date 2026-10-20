import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ArrowUpRight, FlaskConical, Search } from "lucide-react";
import {
  testingKinds,
  testingTerms,
  testingUses,
} from "../../src/data/testingTypes";
import { useClientQuery } from "../lib/client-query";
import { contentFor } from "../../content/registry.server";
import { url } from "../../content/site";
import { matchesSearch } from "../../content/matching";
import { searchableText } from "../../content/search";
import { ContentDocument } from "../components/content";
import { Link, useSiteI18n, SourceLanguage } from "../lib/i18n";
export function loader({ request }: LoaderFunctionArgs) {
  const content = contentFor(request);
  return {
    entries: content.all("testing"),
    packs: content.all("testing-pack"),
  };
}
export default function Testing() {
  const { t } = useSiteI18n(),
    { entries, packs } = useLoaderData<typeof loader>(),
    [params, setParams] = useClientQuery();
  const query = params.get("q") || "",
    kind = params.get("kind") || "all",
    use = params.get("use") || "all",
    terms = params.get("terms") || "all";
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  const filtered = entries.filter(
    (entry) =>
      (kind === "all" || entry.data.kind === kind) &&
      (use === "all" || entry.data.uses.some((item) => item === use)) &&
      (terms === "all" || entry.data.terms === terms) &&
      matchesSearch(searchableText(entry), query),
  );
  return (
    <main id="main-content" className="site-main listing-page">
      <title>{t("Testing library — GameMap")}</title>
      <meta
        name="description"
        content={t(
          "Working projects, environments, and assets for a more grounded development workflow.",
        )}
      />
      <header className="page-heading">
        <span className="eyebrow">{t("A WORKBENCH, NOT A LEADERBOARD")}</span>
        <h1>{t("Give your ideas a real test.")}</h1>
        <p>
          {t(
            "Working projects, environments, and assets for a more grounded development workflow.",
          )}
        </p>
        <div className="heading-links">
          <Link to="/docs/game-testing-library/">
            {t("Read the testing guide")}
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/docs/game-development-evaluation/">
            {t("What should you measure?")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>
      <section
        className="testing-starters content-grid"
        aria-label={t("Testing starter tasks")}
      >
        {packs.map((entry) => (
          <ContentDocument entry={entry} heading="h2" key={entry.key} />
        ))}
      </section>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            aria-label={t("Search testing resources")}
            placeholder={t("Find a game, environment, or asset library…")}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label={t("Testing resource kind")}
      >
        <button
          aria-pressed={kind === "all"}
          onClick={() => update("kind", "all")}
        >
          {t("All resources")}
          <span>{entries.length}</span>
        </button>
        {Object.entries(testingKinds).map(([id, label]) => (
          <button
            key={id}
            aria-pressed={kind === id}
            onClick={() => update("kind", id)}
          >
            {t(label)}
          </button>
        ))}
      </div>
      <div className="secondary-filters">
        <label>
          <span className="sr-only">{t("Testing use")}</span>
          <select
            value={use}
            onChange={(event) => update("use", event.target.value)}
          >
            <option value="all">{t("All testing goals")}</option>
            {Object.entries(testingUses).map(([id, label]) => (
              <option key={id} value={id}>
                {t(label)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">{t("License terms")}</span>
          <select
            value={terms}
            onChange={(event) => update("terms", event.target.value)}
          >
            <option value="all">{t("All license terms")}</option>
            {Object.entries(testingTerms).map(([id, label]) => (
              <option key={id} value={id}>
                {t(label)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="results-meta">
        <span aria-live="polite">
          {t("{count} testing resources", { count: filtered.length })}
        </span>
        <span>{t("Read the license. Fix the task. Keep the baseline.")}</span>
      </div>
      {filtered.length ? (
        <div className="testing-grid">
          {filtered.map((entry) => {
            const item = entry.data;
            return (
              <article
                className="testing-card"
                key={entry.key}
                data-content-ref={entry.key}
              >
                <span className="testing-symbol">
                  <FlaskConical size={21} />
                </span>
                <span className="small-label">
                  {t(testingKinds[item.kind])}
                </span>
                <SourceLanguage english={entry.descriptionLanguage === "en"} />
                <h2>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    {item.title}
                    <ArrowUpRight size={16} />
                  </a>
                </h2>
                <p lang={entry.descriptionLanguage === "en" ? "en" : undefined}>
                  {item.summary}
                </p>
                <div className="tag-list">
                  <span>{item.stack}</span>
                  <span>{t(testingTerms[item.terms])}</span>
                </div>
                <details className="build-notes">
                  <summary>{t("Setup, terms & limitations")}</summary>
                  <p>{item.aiUseNote}</p>
                  <h3>{t("Try these tasks")}</h3>
                  <ul>
                    {item.testTasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                  <h3>{t("Get started")}</h3>
                  <ol>
                    {item.setup.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p>
                    <b>{t("Code:")}</b> {item.codeLicense}
                  </p>
                  <p>
                    <b>{t("Assets:")}</b> {item.assetLicense}
                  </p>
                  <p>{item.limitations}</p>
                  <p>{item.access.note}</p>
                  <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                    {t("Read the terms")}
                    <ArrowUpRight size={13} />
                  </a>
                  {item.evidence.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(link.label)}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </details>
                <div className="example-links">
                  <Link to={url.testing(item.id)}>
                    {t("Complete record")}
                    <ArrowUpRight size={13} />
                  </Link>
                  <a href={item.access.url} target="_blank" rel="noreferrer">
                    {t(item.access.label)}
                    <ArrowUpRight size={13} />
                  </a>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    {t("Source")}
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{t("No matches yet.")}</h2>
          <p>{t("Try another testing goal or a different search.")}</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            {t("Clear filters")}
          </button>
        </div>
      )}
    </main>
  );
}

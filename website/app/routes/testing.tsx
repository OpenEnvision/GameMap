import { Link, useLoaderData } from 'react-router';
import { ArrowUpRight, FlaskConical, Search } from "lucide-react";
import {
  testingKinds,
  testingTerms,
  testingUses,
} from '../../src/data/testingTypes';
import { useClientQuery } from "../lib/client-query";
import { content } from '../../content/registry.server';
import { url } from '../../content/site';
import { matchesSearch } from '../../content/matching';
import { searchableText } from '../../content/search';
import { ContentDocument } from "../components/content";
export function loader() { return { entries: content.all('testing'), packs: content.all('testing-pack') }; }
export default function Testing() {
  const { entries, packs } = useLoaderData<typeof loader>();
  const testingResources = entries.map(entry => entry.data);
  const [params, setParams] = useClientQuery();
  const query = params.get("q") || "";
  const kind = params.get("kind") || "all";
  const use = params.get("use") || "all";
  const terms = params.get("terms") || "all";
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
  const filtered = testingResources.filter(
    (item) =>
      (kind === "all" || item.kind === kind) &&
      (use === "all" || item.uses.some((item) => item === use)) &&
      (terms === "all" || item.terms === terms) &&
      matchesSearch(searchableText(entries.find(entry => entry.id === item.id)!), query),
  );
  return (
    <main id="main-content" className="site-main listing-page">
      <title>Testing library — GameMap</title>
      <meta
        name="description"
        content="Source-reviewed game projects, evaluation environments, assets, and motion data for testing AI development workflows."
      />
      <header className="page-heading">
        <span className="eyebrow">A WORKBENCH, NOT A LEADERBOARD</span>
        <h1>Give your ideas a real test.</h1>
        <p>
          Working projects, environments, and assets for a more grounded
          development workflow.
        </p>
        <div className="heading-links">
          <Link to="/docs/game-testing-library/">
            Read the testing guide
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/docs/game-development-evaluation/">
            What should you measure?
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>
      <section
        className="testing-starters content-grid"
        aria-label="Testing starter tasks"
      >
        {packs.map((entry) => (
          <ContentDocument entry={entry} heading="h2" key={entry.key} />
        ))}
      </section>
      <div className="catalog-toolbar">
        <div className="filter-search">
          <Search size={20} />
          <input
            aria-label="Search testing resources"
            placeholder="Find a game, environment, or asset library…"
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label="Testing resource kind"
      >
        <button
          aria-pressed={kind === "all"}
          onClick={() => update("kind", "all")}
        >
          All resources<span>{testingResources.length}</span>
        </button>
        {Object.entries(testingKinds).map(([id, label]) => (
          <button
            key={id}
            aria-pressed={kind === id}
            onClick={() => update("kind", id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="secondary-filters">
        <label>
          <span className="sr-only">Testing use</span>
          <select
            value={use}
            onChange={(event) => update("use", event.target.value)}
          >
            <option value="all">All testing goals</option>
            {Object.entries(testingUses).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">License terms</span>
          <select
            value={terms}
            onChange={(event) => update("terms", event.target.value)}
          >
            <option value="all">All license terms</option>
            {Object.entries(testingTerms).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="results-meta">
        <span aria-live="polite">{filtered.length} testing resources</span>
        <span>Read the license. Fix the task. Keep the baseline.</span>
      </div>
      {filtered.length ? (
        <div className="testing-grid">
          {filtered.map((item) => (
            <article
              className="testing-card"
              key={item.id}
              data-content-ref={`testing:${item.id}`}
            >
              <span className="testing-symbol">
                <FlaskConical size={21} />
              </span>
              <span className="small-label">{testingKinds[item.kind]}</span>
              <h2>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  {item.title}
                  <ArrowUpRight size={16} />
                </a>
              </h2>
              <p>{item.summary}</p>
              <div className="tag-list">
                <span>{item.stack}</span>
                <span>{testingTerms[item.terms]}</span>
              </div>
              <details className="build-notes">
                <summary>Setup, terms & limitations</summary>
                <p>{item.aiUseNote}</p>
                <h3>Try these tasks</h3>
                <ul>
                  {item.testTasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <h3>Get started</h3>
                <ol>
                  {item.setup.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p>
                  <b>Code:</b> {item.codeLicense}
                </p>
                <p>
                  <b>Assets:</b> {item.assetLicense}
                </p>
                <p>{item.limitations}</p>
                <p>{item.access.note}</p>
                <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                  Read the terms
                  <ArrowUpRight size={13} />
                </a>
                {item.evidence.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
                <span className="source-note">
                  Source reviewed {item.reviewed}
                </span>
              </details>
              <div className="example-links">
                <Link to={url.testing(item.id)}>
                  Complete record
                  <ArrowUpRight size={13} />
                </Link>
                <a href={item.access.url} target="_blank" rel="noreferrer">
                  {item.access.label}
                  <ArrowUpRight size={13} />
                </a>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  Source
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matches yet.</h2>
          <p>Try another testing goal or a different search.</p>
          <button
            className="button button-secondary"
            onClick={() => setParams({})}
          >
            Clear filters
          </button>
        </div>
      )}
      <p className="reading-note">
        Code and assets can have different terms. Inclusion does not mean a
        game, model, or benchmark was executed by GameMap.
      </p>
    </main>
  );
}

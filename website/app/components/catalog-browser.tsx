import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Code2,
  Gamepad2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { ContentEntry } from "../../content/models";
import { searchableText } from "../../content/search";
import { paperConferencePublication } from "../lib/paper-publication";
import {
  paperBrowserOptions,
  normalizePaperFilters,
  selectPaperEntries,
  paperDiscoveryDescription,
  paperResearchTypes,
  paperTypeLabels,
  paperScopeLabels,
  paperReviewLabels,
  type PaperBrowserOptions,
} from "../../content/paper-browser";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { pillars, type Pillar } from "../lib/pillars";
import { seeded, useReducedMotion } from "../lib/motion";
import { useClientQuery } from "../lib/client-query";
import {
  clearCollectionQuery,
  collectionFacets,
  collectionFilters,
  collectionPage,
  paperAreas,
  selectCollection,
  updateCollectionQuery,
  type CollectionEntry,
} from "../lib/collection-query";

const statusLabels: Record<string, string> = {
  "open-source": "Open source",
  "source-available": "Source available",
  "not-found": "No source located",
  "not-released": "Not released",
  restricted: "Restricted",
  unverified: "Unverified",
  game: "Game",
  prototype: "Prototype",
  "work-in-progress": "Work in progress",
  "legacy-release": "Legacy release",
  "legacy-prototype": "Legacy prototype",
  "archived-prototype": "Archived prototype",
};
const referenceLabels = paperTypeLabels;
/* ==========================================================================
   The index template family. Every collection index (tools, research, learn)
   opens with the same header band — pillar tabs, a display title, a lede and a
   live count held inside a small orbital system — and then a sticky glass
   control bar. These primitives are shared by the collection routes.
   ========================================================================== */

/** English headlines set their last word in Instrument Serif italics.
 *  Chinese headlines stay upright (no serif italics for CJK), and so does a
 *  one-word title: the contrast needs an upright word beside the italic one. */
export function AccentTitle({ text }: { text: string }) {
  const { locale } = useSiteI18n();
  if (locale !== "en") return <>{text}</>;
  const match = /^(.*\s)(\S+)$/.exec(text.trim());
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]}
      <em>{match[2]}</em>
    </>
  );
}

const orbitRings = [
  { rx: 286, ry: 98, period: 96, start: 0.12 },
  { rx: 220, ry: 76, period: 64, start: 0.58 },
  { rx: 156, ry: 54, period: 42, start: 0.86 },
] as const;
const ellipsePath = (rx: number, ry: number) =>
  `M ${300 - rx} 300 a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

/** Decorative orbital art. Static markup; planets drift along their orbits
 *  only when the visitor has not asked for reduced motion. */
export function OrbitArt({
  seed = 7,
  className = "ix-orbit-art",
  layer = "back",
}: {
  seed?: number;
  className?: string;
  /** "front" draws only the near half of each ring, so the rings appear to
   *  pass in front of whatever sits between the two layers. */
  layer?: "back" | "front";
}) {
  const reduced = useReducedMotion();
  const random = seeded(seed);
  const stars = Array.from({ length: 54 }, () => ({
    x: Math.round(random() * 600),
    y: Math.round(random() * 600),
    r: Math.round((random() * 1.3 + 0.35) * 10) / 10,
    o: Math.round((random() * 0.6 + 0.2) * 100) / 100,
  }));
  const id = `orbit-${seed}-${layer}`;
  if (layer === "front")
    return (
      <svg
        className={className}
        viewBox="0 0 600 600"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              style={{ stopColor: "var(--ix-ring)", stopOpacity: 0.2 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "var(--ix-tone)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--ix-ring)", stopOpacity: 0.2 }}
            />
          </linearGradient>
          <clipPath id={`${id}-near`}>
            <rect x="0" y="300" width="600" height="300" />
          </clipPath>
        </defs>
        <g transform="rotate(-14 300 300)">
          <g clipPath={`url(#${id}-near)`}>
            {orbitRings.map((ring, index) => (
              <path
                key={index}
                className="ix-orbit-ring ix-orbit-ring-near"
                d={ellipsePath(ring.rx, ring.ry)}
                stroke={`url(#${id}-ring)`}
              />
            ))}
          </g>
        </g>
      </svg>
    );
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--ix-tone)", stopOpacity: 0.5 }}
          />
          <stop
            offset="45%"
            style={{ stopColor: "var(--ix-tone)", stopOpacity: 0.12 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--ix-tone)", stopOpacity: 0 }}
          />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0%"
            style={{ stopColor: "var(--ix-ring)", stopOpacity: 0.15 }}
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--ix-ring)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--ix-tone)", stopOpacity: 0.9 }}
          />
        </linearGradient>
      </defs>
      <g className="ix-orbit-stars">
        {stars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            opacity={star.o}
          />
        ))}
      </g>
      <circle cx="300" cy="300" r="250" fill={`url(#${id}-core)`} />
      <g transform="rotate(-14 300 300)">
        {orbitRings.map((ring, index) => (
          <path
            key={index}
            className="ix-orbit-ring"
            d={ellipsePath(ring.rx, ring.ry)}
            stroke={`url(#${id}-ring)`}
          />
        ))}
        {orbitRings.map((ring, index) => {
          const angle = ring.start * Math.PI * 2;
          const x = Math.round((300 + Math.cos(angle) * ring.rx) * 10) / 10;
          const y = Math.round((300 + Math.sin(angle) * ring.ry) * 10) / 10;
          return (
            <g key={index} className="ix-orbit-planet" data-ring={index}>
              {reduced ? (
                <g transform={`translate(${x} ${y})`}>
                  <circle
                    r={index === 0 ? 7 : 4.5}
                    className="ix-planet-halo"
                  />
                  <circle r={index === 0 ? 3.6 : 2.4} className="ix-planet" />
                </g>
              ) : (
                <g>
                  <circle
                    r={index === 0 ? 7 : 4.5}
                    className="ix-planet-halo"
                  />
                  <circle r={index === 0 ? 3.6 : 2.4} className="ix-planet" />
                  <animateMotion
                    dur={`${ring.period}s`}
                    repeatCount="indefinite"
                    begin={`-${(ring.start * ring.period).toFixed(1)}s`}
                    path={ellipsePath(ring.rx, ring.ry)}
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

const pillarTones: Record<Pillar["id"], string> = {
  games: "var(--accent)",
  tools: "var(--accent)",
  research: "var(--signal)",
  learn: "var(--tax-2d)",
};

/** The header band shared by every collection index. */
export function IndexHero({
  pillar,
  kicker,
  title,
  lede,
  count,
  countLabel,
  seed,
  children,
}: {
  pillar: Pillar["id"];
  kicker?: string;
  title: string;
  lede: string;
  count: number;
  countLabel: string;
  seed?: number;
  children?: ReactNode;
}) {
  const { t } = useSiteI18n();
  const reduced = useReducedMotion();
  const counter = useRef<HTMLElement>(null);
  const orbitSeed = seed ?? pillar.length * 13 + count;
  // The count rolls up once on arrival. Static HTML (and reduced motion)
  // always shows the final number; only the text node's value changes.
  useEffect(() => {
    const text = counter.current?.firstChild;
    if (reduced || count < 2 || !text || text.nodeType !== Node.TEXT_NODE)
      return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1400);
      const eased = progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      text.nodeValue = String(Math.round(count * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      text.nodeValue = String(count);
    };
  }, [count, reduced]);
  return (
    <header
      className="ix-hero"
      data-pillar={pillar}
      style={{ "--ix-tone": pillarTones[pillar] } as CSSProperties}
    >
      <div className="ix-hero-inner">
        <div className="ix-hero-copy">
          {kicker ? <p className="kicker ix-kicker">{t(kicker)}</p> : null}
          <h1 className="ix-title">
            <AccentTitle text={t(title)} />
          </h1>
          <p className="lede ix-lede">{t(lede)}</p>
          {children}
        </div>
        <div className="ix-hero-stage" data-count={count ? undefined : "none"}>
          <OrbitArt seed={orbitSeed} />
          {count > 0 ? (
            <p className="ix-count collection-total">
              <strong ref={counter}>{count}</strong>
              <span>{t(countLabel)}</span>
            </p>
          ) : (
            // Nothing published yet: no oversized zero, just a quiet label.
            <p className="ix-count ix-count-uncharted">
              <span>{t("Uncharted")}</span>
            </p>
          )}
          <OrbitArt
            seed={orbitSeed}
            layer="front"
            className="ix-orbit-art ix-orbit-front"
          />
        </div>
      </div>
    </header>
  );
}

/** A designed empty result: a quiet uncharted system and a way forward.
 *  `art={false}` keeps only the compass, for pages whose header band already
 *  draws the orbit. */
export function IndexEmpty({
  title,
  body,
  className = "",
  seed = 23,
  art = true,
  children,
}: {
  title: string;
  body: string;
  className?: string;
  seed?: number;
  art?: boolean;
  children?: ReactNode;
}) {
  const { t } = useSiteI18n();
  return (
    <div className={`empty-state ix-empty ${className}`.trim()}>
      <div className="ix-empty-art" data-art={art ? undefined : "mark"}>
        {art && <OrbitArt seed={seed} className="ix-orbit-art" />}
        <Compass size={26} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <h2>{t(title)}</h2>
      <p>{t(body)}</p>
      {children && <div className="ix-empty-actions">{children}</div>}
    </div>
  );
}

export function CollectionPagination({
  pagination,
  onPageChange,
  label = "Collection pages",
}: {
  pagination: ReturnType<typeof collectionPage>;
  onPageChange: (page: number) => void;
  label?: "Collection pages" | "More collection pages";
}) {
  const { t } = useSiteI18n();
  if (pagination.pages <= 1) return null;
  return (
    <nav className="catalog-pagination" aria-label={t(label)}>
      <button
        type="button"
        aria-label={t("Previous page")}
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        <span>{t("Previous")}</span>
      </button>
      <span>
        {t("Page {page} of {pages}", {
          page: pagination.page,
          pages: pagination.pages,
        })}
      </span>
      <button
        type="button"
        aria-label={t("Next page")}
        disabled={pagination.page >= pagination.pages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        <span>{t("Next")}</span>
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </nav>
  );
}

function OutsideLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
function PaperRow({ entry }: { entry: ContentEntry<"paper"> }) {
  const { t } = useSiteI18n();
  const paper = entry.data;
  const description = paperDiscoveryDescription(entry.description);
  const conference = paperConferencePublication(paper);
  const repository =
    paper.access.repositories.find(
      (item) => item.kind === "implementation" || item.kind === "partial",
    ) || paper.access.repositories[0];
  const demo =
    paper.access.demos.find((item) => item.kind === "interactive") ||
    paper.access.demos[0];
  return (
    <article className="catalog-paper-row" data-content-ref={entry.key}>
      <div className="catalog-record-meta">
        {conference ? (
          <span className="catalog-publication" title={paper.publication}>
            {conference.label}
          </span>
        ) : (
          <span>{paper.year}</span>
        )}
        {conference && conference.year !== paper.year && (
          <span className="catalog-publication-year">
            {t("Year")}: {paper.year}
          </span>
        )}
        <span>{t(referenceLabels[paper.referenceType])}</span>
        <span className="catalog-artifact-review">
          {t(paperReviewLabels[paper.access.reviewStatus])}
        </span>
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
      </div>
      <h2>
        <Link to={entry.url}>{entry.title}</Link>
      </h2>
      <p className="catalog-authors" title={paper.authors}>
        {paper.authors}
      </p>
      {description && (
        <p
          className="catalog-record-summary"
          lang={entry.descriptionLanguage === "en" ? "en" : undefined}
        >
          {description}
        </p>
      )}
      <div className="catalog-record-tags">
        <span className="catalog-topic">
          {t(
            paperAreas.find(([value]) => value === paper.primaryRole)?.[1] ||
              paper.primaryRole,
          )}
        </span>
        {paper.topics
          .filter((topic) => !/^Role:/i.test(topic))
          .slice(0, 2)
          .map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
      </div>
      <div className="catalog-record-bottom">
        <span
          className={`catalog-source-status ${["open-source", "source-available"].includes(paper.access.codeStatus) ? "has-source" : ""}`}
        >
          <Code2 size={13} aria-hidden="true" />
          {t("Code: {status}", {
            status: t(statusLabels[paper.access.codeStatus]),
          })}
        </span>
        <div className="catalog-record-actions">
          {repository && (
            <OutsideLink href={repository.url}>
              {t(
                repository.kind === "implementation" ||
                  repository.kind === "partial"
                  ? "Code"
                  : "Repository",
              )}
            </OutsideLink>
          )}
          {demo && (
            <OutsideLink href={demo.url}>
              {t("Demo link")}
              {demo.access !== "public" && (
                <small>
                  {" "}
                  ·{" "}
                  {t(
                    demo.access === "signup"
                      ? "Sign-up"
                      : demo.access === "request"
                        ? "Access request"
                        : "Local setup",
                  )}
                </small>
              )}
            </OutsideLink>
          )}
          <OutsideLink href={paper.pdfUrl || paper.url}>
            {paper.pdfUrl
              ? "PDF"
              : t(
                  paperResearchTypes.includes(paper.referenceType)
                    ? "Paper"
                    : "Source",
                )}
          </OutsideLink>
        </div>
      </div>
    </article>
  );
}
function GameCard({ entry }: { entry: ContentEntry<"threejs-game"> }) {
  const { t } = useSiteI18n();
  const game = entry.data;
  return (
    <article className="catalog-game-card" data-content-ref={entry.key}>
      <div className="catalog-game-heading">
        <span className="catalog-game-icon">
          <Gamepad2 size={21} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="catalog-license">
          {game.license.spdx || t("Unspecified license")}
        </span>
      </div>
      <span className="catalog-source-status">
        <span className="tiny-dot" />
        {t(statusLabels[game.maturity.status])}
      </span>
      <h2>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </h2>
      <p
        className="catalog-record-summary"
        lang={entry.descriptionLanguage === "en" ? "en" : undefined}
      >
        {entry.description}
      </p>
      <div className="catalog-record-tags">
        {game.genres.slice(0, 3).map((genre) => (
          <span key={genre}>{genre.replaceAll("-", " ")}</span>
        ))}
      </div>
      <div className="catalog-game-review">
        <ShieldCheck size={13} aria-hidden="true" />
        <span>
          {t("Source reviewed")} ·{" "}
          {t(game.verification.playtested ? "Playtested" : "Not playtested")}
        </span>
      </div>
      <div className="catalog-record-bottom">
        <span className="catalog-reviewed-date">{game.verification.date}</span>
        <div className="catalog-record-actions">
          <OutsideLink href={game.repository_url}>
            {t("Repository")}
          </OutsideLink>
          {game.demo.url && (
            <OutsideLink href={game.demo.url}>{t("Demo page")}</OutsideLink>
          )}
        </div>
      </div>
    </article>
  );
}
export function TypedCollection({
  entries,
  title,
  description,
  kind,
  paperOptions,
  paperSearch,
}: {
  entries: CollectionEntry[];
  title: string;
  description: string;
  kind: "paper" | "threejs-game";
  paperOptions?: PaperBrowserOptions;
  paperSearch?: Record<string, string>;
}) {
  const { t } = useSiteI18n();
  const [params, setParams, hydrated] = useClientQuery();
  const isPaper = kind === "paper";
  const paperEntries = useMemo(
    () =>
      entries.filter(
        (entry): entry is ContentEntry<"paper"> => entry.kind === "paper",
      ),
    [entries],
  );
  const allPaperOptions = useMemo(
    () =>
      isPaper ? paperOptions || paperBrowserOptions(paperEntries) : undefined,
    [isPaper, paperOptions, paperEntries],
  );
  const paperFilters = useMemo(
    () =>
      allPaperOptions
        ? normalizePaperFilters(params, allPaperOptions)
        : undefined,
    [params, allPaperOptions],
  );
  const paperFacets = useMemo(
    () =>
      paperFilters
        ? paperBrowserOptions(
            paperEntries.filter(
              (entry) =>
                paperFilters.scope === "all" ||
                paperResearchTypes.includes(entry.data.referenceType) ===
                  (paperFilters.scope === "research"),
            ),
          )
        : undefined,
    [paperEntries, paperFilters?.scope],
  );
  const facets = useMemo(() => {
    const base = collectionFacets(entries);
    return allPaperOptions
      ? {
          ...base,
          years: allPaperOptions.years.map(({ id }) => id),
          statuses: allPaperOptions.statuses.map(({ id }) => id),
        }
      : base;
  }, [entries, allPaperOptions]);
  const filters = useMemo(
    () => ({ ...collectionFilters(params, entries, kind), ...paperFilters }),
    [params, entries, kind, paperFilters],
  );
  const search = useMemo(
    () => new Map(entries.map((entry) => [entry.key, searchableText(entry)])),
    [entries],
  );
  const filtered = useMemo(
    () =>
      paperFilters
        ? selectPaperEntries(paperEntries, paperFilters, paperSearch)
        : selectCollection(entries, filters, search),
    [entries, filters, search, paperEntries, paperFilters, paperSearch],
  );
  const pagination = collectionPage(params.get("page"), filtered.length);
  // Keep every canonical record discoverable in static HTML and without JS.
  // After hydration, bound the visible collection to a readable 24-record page.
  const visible = hydrated
    ? filtered.slice(pagination.start - 1, pagination.end)
    : isPaper
      ? entries
      : filtered;
  const genres = useMemo(
    () =>
      facets.genres
        .map((genre) => ({
          value: genre,
          count: entries.filter(
            (entry) =>
              entry.kind === "threejs-game" &&
              entry.data.genres.includes(genre),
          ).length,
        }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
        .slice(0, 8),
    [entries, facets],
  );
  const categories = isPaper
    ? paperAreas.map(([value, label]) => ({
        value,
        label,
        count: paperFacets?.areas.find(({ id }) => id === value)?.count || 0,
      }))
    : genres.map((genre) => ({
        ...genre,
        label: genre.value.replaceAll("-", " "),
      }));
  const selected = isPaper ? filters.area : filters.genre;
  const active = [
    ["q", filters.query, filters.query],
    [
      "area",
      filters.area,
      t(
        paperAreas.find(([value]) => value === filters.area)?.[1] ||
          filters.area,
      ),
    ],
    ["genre", filters.genre, filters.genre.replaceAll("-", " ")],
    ["year", filters.year, filters.year],
    [
      "status",
      filters.status,
      t(statusLabels[filters.status] || filters.status),
    ],
    ["license", filters.license, filters.license],
    [
      "demo",
      filters.demo,
      t(
        filters.demo === "interactive"
          ? "Interactive demo"
          : filters.demo === "local"
            ? "Local setup"
            : filters.demo === "download"
              ? "Download"
              : filters.demo === "listed"
                ? "Demo link listed"
                : "No demo link listed",
      ),
    ],
    ["project", filters.project ? "1" : "", t("Project page listed")],
    ...(paperFilters
      ? [
          [
            "scope",
            paperFilters.scope === "research" ? "" : paperFilters.scope,
            t(paperScopeLabels[paperFilters.scope]),
          ],
          [
            "type",
            paperFilters.type,
            t(
              paperTypeLabels[
                paperFilters.type as keyof typeof paperTypeLabels
              ] || paperFilters.type,
            ),
          ],
          [
            "review",
            paperFilters.review,
            t(
              paperReviewLabels[
                paperFilters.review as keyof typeof paperReviewLabels
              ] || paperFilters.review,
            ),
          ],
        ]
      : []),
  ].filter(
    ([key, value]) =>
      value &&
      (value !== "all" || key === "scope") &&
      !(isPaper ? ["genre", "license"] : ["area", "year", "project"]).includes(
        key,
      ),
  );
  const invalidPaperFilters = paperFilters
    ? [
        "scope",
        "type",
        "referenceType",
        "area",
        "year",
        "status",
        "review",
        "demo",
        "sort",
      ].filter(
        (key) =>
          params.has(key) &&
          params.get(key) !==
            paperFilters[
              (key === "referenceType"
                ? "type"
                : key) as keyof typeof paperFilters
            ],
      )
    : [];
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = updateCollectionQuery(previous, { [key]: value });
        if (paperFilters) {
          for (const invalid of invalidPaperFilters) next.delete(invalid);
          if (key === "scope") {
            next.set("scope", value);
            next.delete("type");
            next.delete("referenceType");
          } else {
            if (!next.has("scope")) next.set("scope", paperFilters.scope);
            if (key === "type") next.delete("referenceType");
            if (value && value !== "all") next.set(key, value);
          }
        }
        return next;
      },
      {
        replace: key !== "page",
        preventScrollReset: true,
      },
    );
  const clear = () =>
    setParams(
      (previous) => {
        const next = clearCollectionQuery(previous);
        if (isPaper)
          for (const key of ["scope", "type", "referenceType", "review"])
            next.delete(key);
        return next;
      },
      {
        replace: true,
        preventScrollReset: true,
      },
    );
  const turnPage = (page: number) => {
    update("page", String(page));
    const summary = document.getElementById("collection-results");
    summary?.focus({ preventScroll: true });
    summary?.scrollIntoView({ block: "start" });
  };
  const paging = (position: string) =>
    hydrated && (
      <CollectionPagination
        pagination={pagination}
        onPageChange={turnPage}
        label={
          position === "top" ? "Collection pages" : "More collection pages"
        }
      />
    );
  const hero = (
    <IndexHero
      pillar={isPaper ? "research" : "games"}
      kicker={isPaper ? undefined : "SOURCE-REVIEWED GAMES"}
      title={title}
      lede={description}
      count={entries.length}
      countLabel={isPaper ? "indexed records" : "game records"}
    />
  );
  // An unpublished collection is not a search result: no toolbar, facets or
  // record count, only the band and a way on to a charted neighbour of the
  // same pillar.
  if (entries.length === 0)
    return (
      <main
        id="main-content"
        className={`ix-page collection-page ${isPaper ? "paper-collection" : "game-collection"}`}
        data-collection-state="uncharted"
      >
        <title>{`${t(title)} — GameMap`}</title>
        <meta name="description" content={t(description)} />
        {hero}
        <div className="ix-wrap ix-catalog ix-uncharted">
          <IndexEmpty
            className="catalog-empty"
            title="This part of the map is still uncharted."
            body="No records have been published in this collection yet. Explore a neighbouring collection while it is charted."
            art={false}
          >
            {pillars
              .find((item) => item.id === (isPaper ? "research" : "games"))!
              .links.filter(
                (link) =>
                  link.collection !== (isPaper ? "papers" : "threejsGames"),
              )
              .map((link) => (
                <Link
                  key={link.path}
                  className="button button-secondary"
                  to={link.path}
                >
                  {t(link.title)}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ))}
          </IndexEmpty>
        </div>
      </main>
    );
  return (
    <main
      id="main-content"
      className={`ix-page collection-page ${isPaper ? "paper-collection" : "game-collection"}`}
    >
      <title>{`${t(title)} — GameMap`}</title>
      <meta name="description" content={t(description)} />
      {hero}
      <div className="ix-wrap ix-catalog">
        {paperFilters && allPaperOptions && (
          <div
            className="paper-scope-tabs"
            role="group"
            aria-label={t("Content collection")}
          >
            {allPaperOptions.scopes.map(({ id, label, count }) => (
              <button
                type="button"
                key={id}
                aria-pressed={paperFilters.scope === id}
                onClick={() => update("scope", id)}
              >
                <span>{t(label)}</span>
                <span>{count}</span>
              </button>
            ))}
          </div>
        )}
        <div className="catalog-browser">
          <aside
            className="catalog-sidebar"
            aria-label={t(isPaper ? "Research areas" : "Popular genres")}
          >
            <p className="small-label">
              {t(isPaper ? "Browse by research area" : "Popular genres")}
            </p>
            <nav
              className="catalog-area-list"
              aria-label={t(isPaper ? "Research areas" : "Popular genres")}
            >
              <button
                aria-pressed={selected === "all"}
                onClick={() => update(isPaper ? "area" : "genre", "all")}
              >
                <span>
                  {t(
                    paperFilters
                      ? paperScopeLabels[paperFilters.scope]
                      : "All games",
                  )}
                </span>
                <span>
                  {isPaper
                    ? paperFacets?.scopes.find(({ id }) => id === "all")
                        ?.count || 0
                    : entries.length}
                </span>
              </button>
              {categories
                .filter(
                  (category) =>
                    category.count > 0 || category.value === selected,
                )
                .map((category, index) => (
                  <button
                    key={category.value}
                    aria-pressed={selected === category.value}
                    onClick={() =>
                      update(isPaper ? "area" : "genre", category.value)
                    }
                  >
                    <span>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      {t(category.label)}
                    </span>
                    <span>{category.count}</span>
                  </button>
                ))}
            </nav>
          </aside>
          <div className="catalog-main">
            <div className="catalog-mobile-category">
              <label htmlFor="collection-area">
                {t(isPaper ? "Research area" : "Genre")}
              </label>
              <select
                id="collection-area"
                value={selected}
                onChange={(event) =>
                  update(isPaper ? "area" : "genre", event.target.value)
                }
              >
                <option value="all">
                  {t(isPaper ? "All research areas" : "All games")}
                </option>
                {(isPaper
                  ? categories
                  : facets.genres.map((genre) => ({
                      value: genre,
                      label: genre.replaceAll("-", " "),
                    }))
                ).map((category) => (
                  <option key={category.value} value={category.value}>
                    {t(category.label)}
                  </option>
                ))}
              </select>
            </div>
            <div className="ix-bar collection-toolbar">
              <label className="ix-search">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  aria-label={t(isPaper ? "Search papers" : "Search games")}
                  placeholder={t(
                    isPaper
                      ? "Search title, authors, or topic…"
                      : "Search name, genre, or evidence…",
                  )}
                  value={params.get("q") || ""}
                  onChange={(event) => update("q", event.target.value)}
                />
              </label>
              {isPaper ? (
                <label className="collection-select">
                  <span className="sr-only">{t("Year")}</span>
                  <select
                    value={filters.year}
                    title={t(
                      "Year recorded for this entry; preprint and formal publication dates may differ.",
                    )}
                    onChange={(event) => update("year", event.target.value)}
                  >
                    <option value="all">{t("All years")}</option>
                    {facets.years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <label className="collection-select desktop-genre">
                  <span className="sr-only">{t("Genre")}</span>
                  <select
                    value={filters.genre}
                    onChange={(event) => update("genre", event.target.value)}
                  >
                    <option value="all">{t("All genres")}</option>
                    {facets.genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre.replaceAll("-", " ")}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="collection-select collection-sort">
                <ArrowDownUp size={14} aria-hidden="true" />
                <span className="sr-only">{t("Sort collection")}</span>
                <select
                  value={filters.sort}
                  onChange={(event) => update("sort", event.target.value)}
                >
                  {isPaper && (
                    <>
                      <option value="recent">{t("Newest year first")}</option>
                      <option value="oldest">{t("Oldest year first")}</option>
                      <option value="practical">
                        {t("Demo & source links first")}
                      </option>
                    </>
                  )}{" "}
                  {!isPaper && (
                    <option value="recent">
                      {t("Recently source reviewed")}
                    </option>
                  )}
                  <option value="title">{t("Title A–Z")}</option>
                </select>
              </label>
            </div>
            {paperFilters && paperFacets && (
              <div className="paper-type-filter">
                <label htmlFor="paper-reference-type">
                  {t("Reference type")}
                </label>
                <select
                  id="paper-reference-type"
                  value={paperFilters.type}
                  onChange={(event) => update("type", event.target.value)}
                >
                  <option value="all">{t("All reference types")}</option>
                  {paperFacets.types.map(({ id, label, count }) => (
                    <option key={id} value={id}>
                      {t(label)} · {count}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <details className="catalog-refinements">
              <summary>
                <SlidersHorizontal size={14} aria-hidden="true" />
                {t(
                  isPaper
                    ? "Source & demo filters"
                    : "Maturity, license & demo filters",
                )}
                <span>{t("Refine results")}</span>
              </summary>
              <div className="catalog-refinement-fields">
                <label>
                  <span>{t(isPaper ? "Source status" : "Maturity")}</span>
                  <select
                    value={filters.status}
                    onChange={(event) => update("status", event.target.value)}
                  >
                    <option value="all">{t("All statuses")}</option>
                    {facets.statuses.map((status) => (
                      <option value={status} key={status}>
                        {t(statusLabels[status] || status)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>{t("Demo availability")}</span>
                  <select
                    value={filters.demo}
                    onChange={(event) => update("demo", event.target.value)}
                  >
                    <option value="all">{t("Any demo status")}</option>
                    {isPaper ? (
                      <>
                        <option value="interactive">
                          {t("Interactive demo")}
                        </option>
                        <option value="local">{t("Local setup")}</option>
                        <option value="download">{t("Download")}</option>
                      </>
                    ) : (
                      <>
                        <option value="listed">{t("Demo link listed")}</option>
                        <option value="not-listed">
                          {t("No demo link listed")}
                        </option>
                      </>
                    )}
                  </select>
                </label>
                {isPaper ? (
                  <>
                    <label>
                      <span>{t("Artifact review")}</span>
                      <select
                        value={paperFilters?.review || "all"}
                        onChange={(event) =>
                          update("review", event.target.value)
                        }
                      >
                        <option value="all">{t("All review states")}</option>
                        {allPaperOptions?.reviews.map(
                          ({ id, label, count }) => (
                            <option key={id} value={id}>
                              {t(label)} · {count}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                    <label className="catalog-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.project}
                        onChange={(event) =>
                          update("project", event.target.checked ? "1" : "")
                        }
                      />
                      <span>{t("Project page listed")}</span>
                    </label>
                  </>
                ) : (
                  <label>
                    <span>{t("License")}</span>
                    <select
                      value={filters.license}
                      onChange={(event) =>
                        update("license", event.target.value)
                      }
                    >
                      <option value="all">{t("All licenses")}</option>
                      {facets.licenses.map((license) => (
                        <option key={license} value={license}>
                          {license === "unspecified"
                            ? t("Unspecified license")
                            : license}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            </details>
            <noscript>
              <p className="catalog-sidebar-note">
                {t(
                  "All records are shown. Enable JavaScript to filter, sort, and browse by page.",
                )}
              </p>
            </noscript>
            {invalidPaperFilters.length > 0 && (
              <p className="paper-filter-notice" role="status">
                {t("Unknown filters were ignored.")}
              </p>
            )}
            {(active.length > 0 ||
              invalidPaperFilters.length > 0 ||
              (paperFilters && paperFilters.scope !== "research")) && (
              <div
                className="catalog-active-filters"
                aria-label={t("Active filters")}
              >
                {active.map(([key, , label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      update(key, key === "scope" ? "research" : "all")
                    }
                    aria-label={t("Remove filter: {filter}", { filter: label })}
                  >
                    {label}
                    <X size={12} aria-hidden="true" />
                  </button>
                ))}
                <button className="catalog-clear" onClick={clear}>
                  {t("Clear filters")}
                </button>
              </div>
            )}
            <div className="catalog-results-bar">
              <p id="collection-results" tabIndex={-1} aria-live="polite">
                {hydrated && filtered.length
                  ? t("{start}–{end} of {count} records", {
                      start: pagination.start,
                      end: pagination.end,
                      count: filtered.length,
                    })
                  : t("{count} of {total} records", {
                      count:
                        !hydrated && isPaper ? entries.length : filtered.length,
                      total: entries.length,
                    })}
              </p>
              {paging("top")}
            </div>
            <div
              className={isPaper ? "catalog-paper-list" : "catalog-game-grid"}
            >
              {visible.map((entry) =>
                entry.kind === "paper" ? (
                  <PaperRow key={entry.key} entry={entry} />
                ) : (
                  <GameCard key={entry.key} entry={entry} />
                ),
              )}
            </div>
            {filtered.length === 0 && (
              <IndexEmpty
                className="catalog-empty"
                title="No matching records."
                body="Try another topic, a different year, or fewer filters."
                seed={isPaper ? 31 : 47}
              >
                <button className="button button-secondary" onClick={clear}>
                  {t("Clear filters")}
                </button>
              </IndexEmpty>
            )}
            <div className="catalog-bottom-pagination">{paging("bottom")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

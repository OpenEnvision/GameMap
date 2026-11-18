import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { ContentBlock, ContentEntry } from "../../content/models";
import { ContentBlockView, ContentLink } from "./content";
import { SourceLanguage, useSiteI18n } from "../lib/i18n";

const referenceLabels: Record<
  ContentEntry<"paper">["data"]["referenceType"],
  string
> = {
  "benchmark-page": "Benchmark page",
  blog: "Blog post",
  book: "Book",
  "book-chapter": "Book chapter",
  "conference-paper": "Conference paper",
  documentation: "Documentation",
  "journal-paper": "Journal paper",
  preprint: "Preprint",
  "product-page": "Product page",
  repository: "Repository",
  survey: "Survey",
  "technical-report": "Technical report",
};

/** A reading surface over the same reviewed blocks, not a second paper data model. */
export function PaperDocument({ entry }: { entry: ContentEntry<"paper"> }) {
  const { t } = useSiteI18n();
  const text = (field: string) =>
    entry.blocks.find(
      (block) =>
        block.field === field && ["title", "lead", "text"].includes(block.type),
    ) as Extract<ContentBlock, { type: "title" | "lead" | "text" }> | undefined;
  const title = text("title"),
    description = text("description");
  const authors = text("authors"),
    publication = text("publication");
  const year = text("year");
  const isSourceClassification = (block: ContentBlock) =>
    block.type === "facts" &&
    block.label === t("Recorded source classifications");
  const actions = entry.blocks.filter((block) =>
    ["url", "pdfUrl"].includes(block.field),
  );
  const taxonomy = entry.blocks.filter((block) =>
    ["roles", "topics"].includes(block.field),
  );
  const access = entry.blocks.filter(
    (block) => block.field === "access" && !isSourceClassification(block),
  );
  const resources = entry.blocks.filter(
    (block) => block.field === "resourceIds",
  );
  const shown = new Set([
    "title",
    "description",
    "authors",
    "publication",
    "year",
    "url",
    "pdfUrl",
    "roles",
    "topics",
    "access",
    "resourceIds",
  ]);
  // Keep every remaining field readable through native HTML disclosure, including
  // stable IDs, classification caveats and full citation/attribution links.
  const evidence = entry.blocks.filter(
    (block) =>
      (!shown.has(block.field) || isSourceClassification(block)) &&
      block.section !== "metadata",
  );
  const inline = (block: ReturnType<typeof text>) =>
    block && (
      <span
        data-content-field={block.field}
        lang={block.language === "en" ? "en" : undefined}
      >
        {block.value}
      </span>
    );
  return (
    <article
      className="content-record content-paper paper-document"
      data-content-key={entry.key}
      data-content-kind="paper"
    >
      <header className="paper-hero">
        <div className="paper-kicker">
          <span>{t(referenceLabels[entry.data.referenceType])}</span>
          {year && (
            <>
              <span aria-hidden="true">·</span>
              {inline(year)}
            </>
          )}
        </div>
        <h1
          className="paper-title"
          data-content-field="title"
          lang={title?.language === "en" ? "en" : undefined}
        >
          {title?.value || entry.title}
        </h1>
        <div className="paper-byline">
          {inline(authors)}
          {publication && (
            <>
              <span className="paper-byline-divider" aria-hidden="true">
                ·
              </span>
              {inline(publication)}
            </>
          )}
        </div>
        {description && (
          <p
            className="paper-introduction"
            data-content-field="description"
            lang={description.language === "en" ? "en" : undefined}
          >
            {description.value}
          </p>
        )}
        <SourceLanguage english={entry.descriptionLanguage === "en"} />
        <div
          className="paper-actions"
          aria-label={t("Original publication links")}
        >
          {actions.map(
            (block) =>
              block.type === "links" && (
                <div
                  key={block.field}
                  data-content-field={block.field}
                  className={
                    block.field === "url"
                      ? "paper-action-primary"
                      : "paper-action-secondary"
                  }
                >
                  {block.items.map((item) => (
                    <ContentLink key={item.url} href={item.url}>
                      {t(item.label)}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </ContentLink>
                  ))}
                </div>
              ),
          )}
        </div>
        <div className="paper-taxonomy">
          {taxonomy.map(
            (block) =>
              block.type === "list" && (
                <div
                  key={block.field}
                  data-content-field={block.field}
                  className={`paper-taxonomy-${block.field}`}
                >
                  <span className="paper-taxonomy-label">{t(block.label)}</span>
                  <ul>
                    {block.items.map((item, i) => (
                      <li
                        key={`${i}-${item}`}
                        lang={block.language === "en" ? "en" : undefined}
                      >
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
          )}
        </div>
      </header>
      {access.length > 0 && (
        <section
          className="paper-availability"
          aria-labelledby="paper-access-heading"
        >
          <h2 id="paper-access-heading">{t("Code & project access")}</h2>
          <div className="paper-access-fields">
            {access.map((block, index) =>
              block.type === "list" &&
              block.label === t("Not listed in this record") ? (
                <div className="paper-absence" key={`${block.field}-${index}`}>
                  <ContentBlockView block={block} heading="h2" />
                </div>
              ) : (
                <ContentBlockView
                  key={`${block.field}-${index}`}
                  block={block}
                  heading="h2"
                />
              ),
            )}
          </div>
        </section>
      )}
      {resources.length > 0 && (
        <section className="paper-related">
          {resources.map((block, index) => (
            <ContentBlockView key={`${block.field}-${index}`} block={block} />
          ))}
        </section>
      )}
      {evidence.length > 0 && (
        <details className="paper-evidence">
          <summary>
            <span>{t("Sources & citation details")}</span>
            <ChevronDown size={17} aria-hidden="true" />
          </summary>
          <div className="paper-evidence-body">
            {evidence.map((block, index) => (
              <ContentBlockView
                key={`${block.field}-${index}`}
                block={block}
                heading="h2"
              />
            ))}
          </div>
        </details>
      )}
    </article>
  );
}

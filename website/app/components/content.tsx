import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useSiteI18n, SourceLanguage } from "../lib/i18n";
import type { ContentBlock, ContentEntry, Fact } from "../../content/models";
import { contentKinds } from "../../content/models";
import { groupRecordings } from "../../content/media";
import { publicAsset } from "../../src/publicAsset";
export function ContentLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/") && href.split(/[?#]/)[0].endsWith("/"))
    return <Link to={href}>{children}</Link>;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
export function MediaPreview({
  block,
}: {
  block: Extract<ContentBlock, { type: "video" }>;
}) {
  const { t } = useSiteI18n();
  return (
    <div
      className={`media-preview${block.mobile ? " has-mobile-preview" : ""}`}
    >
      <video
        className="preview-desktop"
        style={{ aspectRatio: block.aspectRatio }}
        controls
        playsInline
        preload="none"
        poster={block.poster ? publicAsset(block.poster) : undefined}
        src={publicAsset(block.src)}
        aria-label={block.label}
      >
        {t("Your browser does not support this preview.")}
      </video>
      {block.mobile && (
        <video
          className="preview-mobile"
          style={{ aspectRatio: block.mobile.aspectRatio }}
          controls
          playsInline
          preload="none"
          poster={publicAsset(block.mobile.poster)}
          src={publicAsset(block.mobile.src)}
          aria-label={`${block.label} — ${t("mobile preview")}`}
        >
          {t("Your browser does not support this preview.")}
        </video>
      )}
    </div>
  );
}
function Facts({ items }: { items: Fact[] }) {
  const { t } = useSiteI18n();
  return (
    <dl className="metadata-facts">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <dt>{t(item.label)}</dt>
          <dd>
            {item.type === "group" ? (
              <Facts items={item.items} />
            ) : item.type === "link" ? (
              <ContentLink href={item.url}>{item.url}</ContentLink>
            ) : (
              t(item.value)
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
export function ContentBlockView({
  block,
  heading = "h1",
}: {
  block: ContentBlock;
  heading?: "h1" | "h2" | "h3";
}) {
  const { t } = useSiteI18n(),
    Heading = heading,
    Subheading = heading === "h1" ? "h2" : heading === "h2" ? "h3" : "h4";
  const language = block.language === "en" ? "en" : undefined;
  switch (block.type) {
    case "title":
      return (
        <Heading
          className="content-title"
          lang={language}
          data-content-field={block.field}
        >
          {block.value}
        </Heading>
      );
    case "lead":
      return (
        <p
          className="content-lead"
          lang={language}
          data-content-field={block.field}
        >
          {block.value}
        </p>
      );
    case "text":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label || "")}</Subheading>
          <p lang={language}>{t(block.value)}</p>
        </section>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <List lang={language}>
            {block.items.map((item, index) => (
              <li key={`${index}-${item}`}>{t(item)}</li>
            ))}
          </List>
        </section>
      );
    }
    case "links":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <ul className="content-links">
            {block.items.map((item, index) => (
              <li key={`${index}-${item.url}`}>
                <ContentLink href={item.url}>
                  {t(item.label)}
                  <ArrowUpRight size={13} />
                </ContentLink>
                {item.note && <p lang="en">{item.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      );
    case "image":
      return (
        <figure className="content-image" data-content-field={block.field}>
          <img
            src={publicAsset(block.src)}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
          />
          <figcaption>
            <span>{t(block.label)}</span>
            {block.source ? (
              <ContentLink href={block.source}>
                {block.credit ? t(block.credit) : t("Image source")}
                <ArrowUpRight size={12} />
              </ContentLink>
            ) : (
              block.credit && <span>{t(block.credit)}</span>
            )}
          </figcaption>
        </figure>
      );
    case "facts":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{t(block.label)}</Subheading>
          <Facts items={block.items} />
        </section>
      );
    case "video":
      return (
        <figure className="content-video" data-content-field={block.field}>
          <MediaPreview block={block} />
        </figure>
      );
    default: {
      const unreachable: never = block;
      throw new Error(
        `Unregistered content block: ${JSON.stringify(unreachable)}`,
      );
    }
  }
}
export function ContentDocument({
  entry,
  heading = "h1",
}: {
  entry: ContentEntry;
  heading?: "h1" | "h2" | "h3";
}) {
  const { t } = useSiteI18n(),
    anchor = entry.url.split("#")[1];
  const sections = (
    ["intro", "media", "guidance", "resources", "provenance"] as const
  )
    .map((section) => ({
      section,
      blocks: entry.blocks.filter(
        (block) =>
          (block.type === "title" || block.type === "lead"
            ? "intro"
            : block.type === "image" || block.type === "video"
              ? "media"
              : block.section ||
                (block.type === "links" ? "resources" : "guidance")) ===
          section,
      ),
    }))
    .filter(({ blocks }) => blocks.length > 0);
  const sectionLabels = {
    intro: "Overview",
    media: "Media",
    guidance: "Details",
    resources: "Links & resources",
    provenance: "Sources & evidence",
  };
  const outline = heading === "h1" && sections.length >= 3;
  return (
    <article
      id={anchor}
      className={`content-record content-${entry.kind}`}
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <span className="eyebrow">{t(contentKinds[entry.kind].label)}</span>
      <SourceLanguage
        partial={entry.descriptionLanguage !== "en"}
        english={
          entry.descriptionLanguage === "en" ||
          entry.blocks.some(
            (block) =>
              block.section !== "metadata" &&
              block.language === "en" &&
              ((block.type === "text" && block.value.length > 60) ||
                (block.type === "list" &&
                  block.items.some((item) => item.length > 60))),
          )
        }
      />
      {outline && (
        <nav className="record-outline" aria-label={t("On this record")}>
          {sections.map(({ section }) => (
            <a key={section} href={`#record-${section}`}>
              {t(sectionLabels[section])}
            </a>
          ))}
        </nav>
      )}
      {sections.map(({ section, blocks }) => (
        <div
          className={`record-section record-${section}`}
          id={outline ? `record-${section}` : undefined}
          key={section}
        >
          {blocks.map((block, index) => (
            <ContentBlockView
              key={`${block.field}-${index}`}
              block={block}
              heading={heading}
            />
          ))}
        </div>
      ))}
    </article>
  );
}
export function ContentCard({
  entry,
}: {
  entry: Pick<
    ContentEntry,
    "key" | "kind" | "title" | "url" | "description" | "descriptionLanguage"
  >;
}) {
  const { t } = useSiteI18n();
  const nativeChinese = entry.key.startsWith("document:zh/");
  const descriptionLanguage =
    entry.descriptionLanguage || (nativeChinese ? "zh" : undefined);
  return (
    <article className="content-card" data-content-ref={entry.key}>
      <span className="small-label">{t(contentKinds[entry.kind].label)}</span>
      <SourceLanguage english={entry.descriptionLanguage === "en"} />
      <h3 lang={nativeChinese ? "zh-CN" : undefined}>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={15} />
        </Link>
      </h3>
      <p lang={descriptionLanguage === "zh" ? "zh-CN" : descriptionLanguage}>
        {entry.description}
      </p>
    </article>
  );
}
export function RelatedDemos({ demos }: { demos: ContentEntry<"demo">[] }) {
  const { t } = useSiteI18n();
  if (!demos.length) return null;
  return (
    <section className="related-content">
      <h2>
        {t("All project recordings")}{" "}
        <span className="count-label">{demos.length}</span>
      </h2>
      <p>{t("Choose a preview or open the original recording.")}</p>
      <div className="content-grid">
        {groupRecordings(demos).map((views) => (
          <div className="recording-links" key={views[0].data.recordingId}>
            {views.map((entry) => (
              <ContentCard key={entry.key} entry={entry} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

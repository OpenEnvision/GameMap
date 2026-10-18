import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ContentBlock, ContentEntry, Fact } from "../../content/models";
import { content, contentKinds } from "../../content/registry";

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
        poster={block.poster}
        src={block.src}
        aria-label={block.label}
      >
        Your browser does not support this preview.
      </video>
      {block.mobile && (
        <video
          className="preview-mobile"
          style={{ aspectRatio: block.mobile.aspectRatio }}
          controls
          playsInline
          preload="none"
          poster={block.mobile.poster}
          src={block.mobile.src}
          aria-label={`${block.label} — mobile preview`}
        >
          Your browser does not support this preview.
        </video>
      )}
    </div>
  );
}
function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className="metadata-facts">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <dt>{item.label}</dt>
          <dd>
            {item.type === "group" ? (
              <Facts items={item.items} />
            ) : item.type === "link" ? (
              <ContentLink href={item.url}>{item.url}</ContentLink>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
function Block({
  block,
  heading = "h1",
}: {
  block: ContentBlock;
  heading?: "h1" | "h2" | "h3";
}) {
  const Heading = heading;
  const Subheading = heading === "h1" ? "h2" : heading === "h2" ? "h3" : "h4";
  switch (block.type) {
    case "title":
      return (
        <Heading className="content-title" data-content-field={block.field}>
          {block.value}
        </Heading>
      );
    case "lead":
      return (
        <p className="content-lead" data-content-field={block.field}>
          {block.value}
        </p>
      );
    case "text":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{block.label}</Subheading>
          <p>{block.value}</p>
        </section>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{block.label}</Subheading>
          <List>
            {block.items.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </List>
        </section>
      );
    }
    case "links":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{block.label}</Subheading>
          <ul className="content-links">
            {block.items.map((item, index) => (
              <li key={`${index}-${item.url}`}>
                <ContentLink href={item.url}>
                  {item.label}
                  <ArrowUpRight size={13} />
                </ContentLink>
                {item.note && <p>{item.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      );
    case "image":
      return (
        <figure className="content-image" data-content-field={block.field}>
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
          />
          <figcaption>
            <span>{block.label}</span>
            {block.source ? (
              <ContentLink href={block.source}>
                {block.credit || "Image source"}
                <ArrowUpRight size={12} />
              </ContentLink>
            ) : (
              block.credit && <span>{block.credit}</span>
            )}
          </figcaption>
        </figure>
      );
    case "facts":
      return (
        <section className="content-field" data-content-field={block.field}>
          <Subheading>{block.label}</Subheading>
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
  const anchor = entry.url.split("#")[1];
  return (
    <article
      id={anchor}
      className={`content-record content-${entry.kind}`}
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <span className="eyebrow">{contentKinds[entry.kind].label}</span>
      {entry.blocks.map((block, index) => (
        <Block
          key={`${block.field}-${index}`}
          block={block}
          heading={heading}
        />
      ))}
    </article>
  );
}
export function ContentCard({ entry }: { entry: ContentEntry }) {
  return (
    <article className="content-card" data-content-ref={entry.key}>
      <span className="small-label">{contentKinds[entry.kind].label}</span>
      <h3>
        <Link to={entry.url}>
          {entry.title}
          <ArrowRight size={15} />
        </Link>
      </h3>
      <p>{entry.description}</p>
      {entry.kind === "demo" && (
        <span className="source-note">
          {entry.data.role === "excerpt"
            ? "Curated preview excerpt"
            : "Original project recording"}
        </span>
      )}
    </article>
  );
}
export function RelatedDemos({ resourceId }: { resourceId: string }) {
  const demos = content.demosFor(resourceId);
  if (!demos.length) return null;
  return (
    <section className="related-content">
      <h2>
        All project recordings{" "}
        <span className="count-label">{demos.length}</span>
      </h2>
      <p>
        Curated excerpts and original project records are listed separately. No
        recording is selected away.
      </p>
      <div className="content-grid">
        {demos.map((entry) => (
          <ContentCard key={entry.key} entry={entry} />
        ))}
      </div>
    </section>
  );
}
export function DemoCard({ entry }: { entry: ContentEntry<"demo"> }) {
  const video = entry.blocks.find((block) => block.type === "video");
  return (
    <article className="demo-card" data-content-ref={entry.key}>
      {video?.type === "video" && <MediaPreview block={video} />}
      <div className="demo-card-body">
        <span className="small-label">
          {entry.data.track.toUpperCase()} ·{" "}
          {entry.data.role === "excerpt"
            ? "CURATED EXCERPT"
            : "SOURCE RECORDING"}
        </span>
        <h2>
          <Link to={entry.url}>
            {entry.title}
            <ArrowRight size={16} />
          </Link>
        </h2>
        <p>{entry.description}</p>
        <small>{entry.data.credit}</small>
        <div className="example-links">
          <Link to={entry.url}>
            Recording details
            <ArrowRight size={13} />
          </Link>
          <a href={entry.data.originalUrl} target="_blank" rel="noreferrer">
            Original video
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}

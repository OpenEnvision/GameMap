import { Link } from "react-router";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import {
  DocsPage,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/docs/page";
import { DocumentationLayout, groups, manifest } from "../lib/docs";

export default function DocsIndex() {
  return (
    <DocumentationLayout>
      <DocsPage full tabIndex={-1} tableOfContent={{ enabled: false }}>
        <title>Guides & field notes — GameMap</title>
        <meta
          name="description"
          content="Practical guides, source-reviewed research, and production notes for building games with AI."
        />
        <span className="eyebrow">THE READING ROOM</span>
        <DocsTitle>A little direction goes a long way.</DocsTitle>
        <DocsDescription>
          Practical guides and source-reviewed notes. Read a workflow,
          understand a tool, or follow the evidence a little further.
        </DocsDescription>
        <Link className="docs-start" to="/docs/practical-guide/">
          <span className="docs-start-icon">
            <Compass size={25} />
          </span>
          <span>
            <strong>New here? Start with the practical guide.</strong>
            <small>From a small idea to a working, testable game loop.</small>
          </span>
          <ArrowRight size={20} />
        </Link>
        <div className="docs-groups">
          {groups.map((group) => (
            <section key={group.title}>
              <h2>
                <BookOpen size={17} />
                {group.title}
              </h2>
              <p>{group.description}</p>
              <div>
                {group.pages
                  .filter(([slug]) =>
                    manifest.some((page) => page.slug === slug),
                  )
                  .map(([slug, title]) => (
                    <Link key={slug} to={"/docs/" + slug + "/"}>
                      {title}
                      <ArrowRight size={15} />
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <p className="reading-note">
          Source review is not runtime certification. Methodology and
          limitations remain with each article.
        </p>
      </DocsPage>
    </DocumentationLayout>
  );
}

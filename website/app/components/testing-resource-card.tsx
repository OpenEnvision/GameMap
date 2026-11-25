import type { CSSProperties } from "react";
import type { ContentEntry } from "../../content/models";
import {
  testingKinds,
  testingTerms,
  testingUses,
} from "../../src/data/testingTypes";
import { testingKindGlyphs } from "../lib/catalog";
import { Link, SourceLanguage, useSiteI18n } from "../lib/i18n";
import { CatalogIcon } from "./catalog-icon";
import { englishSource } from "./content";

export function TestingResourceCard({
  entry,
  style,
}: {
  entry: ContentEntry<"testing">;
  style: CSSProperties;
}) {
  const { t, locale } = useSiteI18n();
  const item = entry.data;
  const language = (field: string) => {
    const block = entry.blocks.find((block) => block.field === field);
    return block && "language" in block && block.language === "en"
      ? "en"
      : undefined;
  };
  const accessNote = t(item.access.note);
  return (
    <article
      className="testing-card"
      data-content-ref={entry.key}
      data-kind={item.kind}
      style={style}
    >
      <CatalogIcon
        icon={testingKindGlyphs[item.kind]}
        size="card"
        className="testing-card-mark"
      />
      <span className="small-label">{t(testingKinds[item.kind])}</span>
      <SourceLanguage
        english={englishSource(entry)}
        partial={entry.descriptionLanguage !== "en"}
      />
      <h2>
        <Link to={entry.url}>{entry.title}</Link>
      </h2>
      <p className="testing-description" lang={language("summary")}>
        {entry.description}
      </p>
      <div className="tag-list testing-resource-tags">
        {item.dimensions.map((dimension) => (
          <span key={dimension}>{dimension.toUpperCase()}</span>
        ))}
        {item.uses.map((use) => (
          <span key={use}>{t(testingUses[use])}</span>
        ))}
        <span>{t(testingTerms[item.terms])}</span>
      </div>
      <p className="testing-stack" lang={language("stack")}>
        {item.stack}
      </p>
      <time className="testing-reviewed" dateTime={item.reviewed}>
        {t("Source reviewed {date}", { date: item.reviewed })}
      </time>
      <details className="build-notes">
        <summary>{t("Setup, terms & limitations")}</summary>
        <p lang={language("aiUseNote")}>{item.aiUseNote}</p>
        <h3>{t("Try these tasks")}</h3>
        <ul lang={language("testTasks")}>
          {item.testTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
        <h3>{t("Get started")}</h3>
        <ol lang={language("setup")}>
          {item.setup.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>{t("Code:")}</h3>
        <p lang={language("codeLicense")}>{item.codeLicense}</p>
        <h3>{t("Assets:")}</h3>
        <p lang={language("assetLicense")}>{item.assetLicense}</p>
        <p lang={language("limitations")}>{item.limitations}</p>
        <p
          lang={
            accessNote === item.access.note
              ? "en"
              : locale === "zh"
                ? "zh-CN"
                : "en"
          }
        >
          {accessNote}
        </p>
        <a href={item.licenseUrl} target="_blank" rel="noreferrer">
          {t("Read the terms")}
        </a>
        {item.evidence.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {t(link.label)}
          </a>
        ))}
      </details>
      <div className="example-links">
        <Link to={entry.url}>{t("Complete record")}</Link>
        <a href={item.access.url} target="_blank" rel="noreferrer">
          {t(item.access.label)}
        </a>
        {item.sourceUrl !== item.access.url && (
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            {t("Source")}
          </a>
        )}
      </div>
    </article>
  );
}

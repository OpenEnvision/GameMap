import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import type { PaperReference } from "../../content/papers";
import { isAcademicPaper, paperCitation, paperTypes } from "../../content/papers";
import { useSiteI18n } from "../lib/i18n";
import { accessForPaper } from "../../content/paper-access";
import { PaperAvailability, PaperArtifactLinks } from "./paper-artifacts";

export function PaperQuickActions({ paper }: { paper: PaperReference }) {
  const { t } = useSiteI18n();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const citation = paperCitation(paper);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopyState("copied");
    } catch { setCopyState("failed"); }
  };
  return <div className="record-project-start">
    <nav className="record-quick-actions" aria-label={t("Read this reference")}>
      <a className="button button-primary" href={paper.url} target="_blank" rel="noreferrer">
        {t(isAcademicPaper(paper) ? "Read paper" : "Read source")}<ArrowUpRight size={15} aria-hidden="true" />
      </a>
      {paper.pdfUrl && <a className="button button-secondary" href={paper.pdfUrl} target="_blank" rel="noreferrer">
        PDF<ArrowUpRight size={15} aria-hidden="true" />
      </a>}
    </nav>
    <p className="record-project-context">{paper.year} · {t(paperTypes[paper.referenceType])}</p>
    <div className="paper-detail-artifacts">
      <PaperAvailability access={accessForPaper(paper)} />
      <PaperArtifactLinks access={accessForPaper(paper)} />
    </div>
    <details className="paper-citation">
      <summary>{t("Citation")}</summary>
      <p lang="en">{citation}</p>
      <button type="button" onClick={copy}>{copyState === "copied" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {t(copyState === "copied" ? "Citation copied" : "Copy citation")}</button>
      <span role="status" className="sr-only">{copyState === "failed" ? t("Copy unavailable. Select the citation text to copy it.") : ""}</span>
    </details>
  </div>;
}

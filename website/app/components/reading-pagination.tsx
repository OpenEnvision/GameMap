import type { To } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useSiteI18n } from "../lib/i18n";

export function ReadingPagination({ page, pages, pageTo, compact = false, ariaLabel = "Results pagination" }: {
  page: number;
  pages: number;
  pageTo: (page: number) => To;
  compact?: boolean;
  ariaLabel?: string;
}) {
  const { t } = useSiteI18n();
  return (
    <nav className={`reading-pagination${compact ? " reading-pagination-compact" : ""}`} aria-label={t(ariaLabel)}>
      {!compact && (page > 1 ? (
        <Link className="reading-page-link" to={pageTo(page - 1)} rel="prev">
          <ArrowLeft size={16} aria-hidden="true" />{t("Previous")}
        </Link>
      ) : (
        <button className="reading-page-link" type="button" disabled>
          <ArrowLeft size={16} aria-hidden="true" />{t("Previous")}
        </button>
      ))}
      <span className="reading-page-count" aria-current="page">
        {t("Page {page} of {pages}", { page, pages })}
      </span>
      {page < pages ? (
        <Link className="reading-page-link" to={pageTo(page + 1)} rel="next">
          {t("Next")}<ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <button className="reading-page-link" type="button" disabled>
          {t("Next")}<ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}

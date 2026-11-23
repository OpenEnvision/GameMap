/** Quality gate for the public repository-research list and search index.
 *  Unavailable, archived, forked, placeholder, or non-source-reviewed rows
 *  remain in the audit ledger and downloadable JSON, but stay hidden from
 *  the default public listing and carry noindex on detail pages. */
export function researchRecordVisible(kind: string, data: unknown): boolean {
  if (kind !== "repository-research" || !data || typeof data !== "object") {
    return true;
  }
  const record = data as {
    disposition?: string;
    review_status?: string;
    availability?: string;
    archived?: boolean | null;
    is_fork?: boolean | null;
    inspection_scope?: string | null;
  };
  return !(
    record.disposition === "unavailable" ||
    record.review_status !== "source-reviewed" ||
    (record.availability !== "available" &&
      record.availability !== "public_available") ||
    record.archived === true ||
    record.is_fork === true ||
    /placeholder|unavailable/i.test(record.inspection_scope ?? "")
  );
}

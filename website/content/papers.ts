import type { PaperAccess } from "./paper-access";
export const paperRoles = {
  play: { label: "Play & act", number: "01" },
  model: { label: "Model players & worlds", number: "02" },
  design: { label: "Design games", number: "03" },
  build: { label: "Build & maintain", number: "04" },
  runtime: { label: "Generate at runtime", number: "05" },
  test: { label: "Test & evaluate", number: "06" },
  foundation: { label: "Foundations & surveys", number: "" },
} as const;
export type PaperRole = keyof typeof paperRoles;
export const paperTypes = {
  "conference-paper": "Conference paper",
  "journal-paper": "Journal paper",
  preprint: "Preprint",
  survey: "Survey",
  "technical-report": "Technical report",
  book: "Book",
  "book-chapter": "Book chapter",
  blog: "Blog post",
  "product-page": "Product announcement",
  "benchmark-page": "Benchmark results page",
  documentation: "Documentation",
  repository: "Repository",
} as const;
export type PaperType = keyof typeof paperTypes;
export interface PaperReference {
  id: string;
  title: string;
  description: string;
  authors: string;
  year: number;
  publication: string;
  referenceType: PaperType;
  primaryRole: PaperRole;
  roles: PaperRole[];
  topics: string[];
  url: string;
  pdfUrl?: string;
  arxivId?: string;
  doi?: string;
  resourceIds: string[];
  origins: {label: string; url: string}[];
  citedSections: {label: string; url: string}[];
  classification: string;
  access?: PaperAccess;
}
export const isAcademicPaper = (paper: Pick<PaperReference,"referenceType">) =>
  ["conference-paper","journal-paper","preprint","survey","technical-report"].includes(paper.referenceType);
export function shortPaperAuthors(authors: string) {
  const names=authors.replace(/\.$/, "").split(/,\s+|\s+and\s+/);
  return names.length > 3 ? names[0] + " et al." : authors.replace(/\.$/, "");
}
export function paperCitation(paper: PaperReference) {
  return `${paper.authors.replace(/\.$/, "")} (${paper.year}). ${paper.title}. ${paper.publication} ${paper.url}`;
}

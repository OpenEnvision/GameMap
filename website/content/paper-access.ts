export const paperCodeStatuses = {
  "open-source": "Open-source code",
  "source-available": "Code public · license unclear",
  restricted: "Code with restricted terms",
  "not-released": "Code not released",
  "not-found": "No official code found",
  unverified: "Code availability unverified",
} as const;
export type PaperCodeStatus = keyof typeof paperCodeStatuses;
export const paperRepositoryKinds = {
  implementation: "Research implementation",
  partial: "Partial implementation",
  benchmark: "Benchmark / evaluation code",
  "data-tools": "Data tools only",
  "research-index": "Research index only",
  materials: "Research materials only",
} as const;
export const paperLicenseStatuses = {
  "open-source": "Open-source license",
  restricted: "Restricted license",
  unspecified: "License not established",
} as const;
export const paperDemoKinds = {
  interactive: "Online interactive demo",
  local: "Documented local run",
  download: "Downloadable demo",
} as const;
export const paperDemoAccess = {
  public: "Public access",
  signup: "Sign-in required",
  setup: "Local setup required",
  request: "Access request required",
} as const;
export interface PaperRepository {
  label: string;
  url: string;
  kind: keyof typeof paperRepositoryKinds;
  license: { status: keyof typeof paperLicenseStatuses; name: string; url?: string };
}
export interface PaperDemo {
  label: string;
  url: string;
  kind: keyof typeof paperDemoKinds;
  access: keyof typeof paperDemoAccess;
  note: string;
}
export interface PaperAccess {
  codeStatus: PaperCodeStatus;
  repositories: PaperRepository[];
  projects: { label: string; url: string }[];
  demos: PaperDemo[];
  reviewStatus: "source-reviewed" | "unverified";
  checkedAt: string;
  evidence: { label: string; url: string }[];
  notes: string[];
}
const unverifiedAccess: PaperAccess = {
  codeStatus: "unverified", repositories: [], projects: [], demos: [],
  reviewStatus: "unverified", checkedAt: "", evidence: [], notes: [],
};
export const accessForPaper = (paper: { access?: PaperAccess }) => paper.access || unverifiedAccess;
export const publishedRepositories = (access: PaperAccess) =>
  ["open-source", "source-available", "restricted"].includes(access.codeStatus)
    ? access.repositories.filter((repository) => repository.kind !== "research-index" && repository.kind !== "materials") : [];
export const onlinePaperDemos = (access: PaperAccess) => access.demos.filter((demo) => demo.kind === "interactive");
export const hasOpenSourceCode = (access: PaperAccess) => access.codeStatus === "open-source" &&
  publishedRepositories(access).some((repository) => repository.license.status === "open-source");
export function practicalPaperScore(paper: { access?: PaperAccess }) {
  const access = accessForPaper(paper);
  const online = onlinePaperDemos(access);
  const runnable = access.demos.some((demo) => demo.kind === "local" || demo.kind === "download");
  // Rank actual interaction, then documented setup, then published artifacts.
  // A bibliography repository or a release placeholder earns no code priority.
  const tier = online.some((demo) => demo.access === "public") ? 5 : online.length ? 4
    : runnable ? 3 : publishedRepositories(access).length ? 2 : access.projects.length ? 1 : 0;
  return tier * 10 + (hasOpenSourceCode(access) ? 2 : 0);
}
export function matchesPaperAccess(paper: { access?: PaperAccess }, code = "all", demo = "all", project = false) {
  const access = accessForPaper(paper);
  const repositories = publishedRepositories(access);
  const codeMatches = code === "all" || (code === "available" ? repositories.length > 0
    : code === "open-source" ? hasOpenSourceCode(access)
    : code === "partial" ? repositories.some((repository) => repository.kind === "partial" || repository.kind === "data-tools")
    : access.codeStatus === code);
  const demoMatches = demo === "all" || (demo === "online" ? onlinePaperDemos(access).length > 0
    : demo === "public" ? onlinePaperDemos(access).some((item) => item.access === "public")
    : demo === "local" ? access.demos.some((item) => item.kind === "local" || item.kind === "download")
    : access.demos.length === 0);
  return codeMatches && demoMatches && (!project || access.projects.length > 0);
}

import { ArrowUpRight, Code2, ExternalLink, Globe2, Play } from "lucide-react";
import { paperCodeStatuses, paperRepositoryKinds, paperDemoAccess, onlinePaperDemos, publishedRepositories, type PaperAccess } from "../../content/paper-access";
import { useSiteI18n } from "../lib/i18n";

export function PaperAvailability({ access }: { access: PaperAccess }) {
  const { t } = useSiteI18n();
  const repositories = publishedRepositories(access);
  const indexOnly = access.repositories.length > 0 && access.repositories.every((repository) => repository.kind === "research-index");
  const materialsOnly = access.repositories.length > 0 && access.repositories.every((repository) => repository.kind === "materials");
  const scopes = [...new Set(repositories.map((repository) => repository.kind))];
  const licenses = [...new Set(repositories.filter((repository) => repository.license.status !== "unspecified").map((repository) => repository.license.name))];
  const online = onlinePaperDemos(access);
  const demo = online.find((demo) => demo.access === "public") || online[0];
  return <div className="paper-availability" data-code-status={access.codeStatus}>
    <span className="paper-code-status"><Code2 size={13} aria-hidden="true" />{t(indexOnly ? "Research index only" : materialsOnly ? "Research materials only" : paperCodeStatuses[access.codeStatus])}</span>
    {licenses.length > 0 && <span className="paper-license">{licenses.join(" / ")}</span>}
    {scopes.filter((scope) => scope === "partial" || scope === "data-tools").map((scope) =>
      <span className="paper-scope" key={scope}>{t(paperRepositoryKinds[scope])}</span>)}
    {demo && <span className="paper-demo-access"><Play size={11} aria-hidden="true" />{t(demo.access === "public" ? "Public interactive demo" : paperDemoAccess[demo.access])}</span>}
  </div>;
}

export function PaperArtifactLinks({ access }: { access: PaperAccess }) {
  const { t } = useSiteI18n();
  const repository = publishedRepositories(access).find((repository) => repository.kind === "implementation" || repository.kind === "benchmark")
    || publishedRepositories(access)[0];
  const index = !repository ? access.repositories[0] : undefined;
  const project = access.projects[0];
  const online = onlinePaperDemos(access);
  const demo = online.find((demo) => demo.access === "public") || online[0]
    || access.demos.find((demo) => demo.kind === "download") || access.demos.find((demo) => demo.kind === "local");
  return <div className="paper-artifact-links">
    {repository && <a href={repository.url} target="_blank" rel="noreferrer" title={t(paperRepositoryKinds[repository.kind])}>
      <Code2 size={14} aria-hidden="true" />{t(repository.kind === "partial" || repository.kind === "data-tools" ? "Code (partial)" : "Code")}<ArrowUpRight size={12} aria-hidden="true" />
    </a>}
    {index && <a href={index.url} target="_blank" rel="noreferrer"><ExternalLink size={13} aria-hidden="true" />
      {t(index.kind === "research-index" ? "Research index" : index.kind === "materials" ? "Research materials" : access.codeStatus === "unverified" ? "Repository (unverified)" : "Release page")}<ArrowUpRight size={12} aria-hidden="true" /></a>}
    {project && <a href={project.url} target="_blank" rel="noreferrer"><Globe2 size={13} aria-hidden="true" />{t("Project")}<ArrowUpRight size={12} aria-hidden="true" /></a>}
    {demo && <a className="paper-try-demo" href={demo.url} target="_blank" rel="noreferrer" title={t(paperDemoAccess[demo.access])}>
      <Play size={12} aria-hidden="true" />{t(demo.kind === "interactive" ? "Try demo" : demo.kind === "download" ? "Get demo" : "Run locally")}<ArrowUpRight size={12} aria-hidden="true" />
    </a>}
  </div>;
}

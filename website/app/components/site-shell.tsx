import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { DisplayModeToggle } from "./display-mode";
import { navigation, url } from "../../content/site";
import { unlocalizedPath } from "../../content/locale";
import { Link, LanguageSwitcher, useSiteI18n } from "../lib/i18n";

function NavigationLink({ to, children }: { to: string; children: ReactNode }) {
  const { pathname } = useLocation();
  const normalize = (path: string) =>
    unlocalizedPath(path).replace(/\/+$/, "") || "/";
  const current = normalize(pathname);
  const target = normalize(to);
  const active =
    current === target ||
    (target !== "/" && current.startsWith(target + "/"));
  return (
    <Link
      to={to}
      className={active ? "active" : undefined}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
export function Brand() {
  return (
    <span className="atlas-brand">
      <img
        className="brand-mark"
        src={`${import.meta.env.BASE_URL}assets/brand/gamemap-mark.svg`}
        width="44"
        height="44"
        alt=""
      />
      <span className="brand-copy">
        <span className="brand-wordmark">
          Game<span className="brand-map">Map</span>
        </span>
        <span className="brand-tagline" aria-hidden="true">
          AI × GAMES × WORLDS
        </span>
      </span>
    </span>
  );
}
export function SiteHeader() {
  const { t } = useSiteI18n(),
    [open, setOpen] = useState(false);
  const { setOpenSearch } = useSearchContext(),
    location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("mobile-navigation-button")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" aria-label={t("GameMap home")}>
          <Brand />
        </Link>
        <nav className="desktop-navigation" aria-label={t("Main navigation")}>
          {navigation
            .filter((page) => page.nav === "primary")
            .map((page) => (
              <NavigationLink key={page.id} to={page.path}>
                {t(page.title)}
              </NavigationLink>
            ))}
          <details className="more-navigation" key={location.pathname}>
            <summary>{t("More")}</summary>
            <div>
              {navigation
                .filter((page) => page.nav === "secondary")
                .map((page) => (
                  <NavigationLink key={page.id} to={page.path}>
                    {t(page.title)}
                  </NavigationLink>
                ))}
            </div>
          </details>
        </nav>
        <div className="header-controls">
          <button
            className="global-search"
            onClick={() => setOpenSearch(true)}
            aria-label={t("Search all content")}
          >
            <Search size={16} />
            <span>{t("Search all")}</span>
            <kbd>⌘ K</kbd>
          </button>
          <DisplayModeToggle />
          <LanguageSwitcher />
          <a
            className="github-link"
            href="https://github.com/OpenEnvision/GameMap"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={14} />
          </a>
          <button
            id="mobile-navigation-button"
            className="quiet-icon mobile-navigation-button"
            aria-label={t(open ? "Close navigation" : "Open navigation")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label={t("Mobile navigation")}
        >
          {navigation.map((page) => (
            <NavigationLink key={page.id} to={page.path}>
              {t(page.title)}
            </NavigationLink>
          ))}
        </nav>
      )}
    </header>
  );
}
export function SiteFooter() {
  const { t } = useSiteI18n();
  return (
    <footer className="site-footer">
      <div>
        <Link to="/">
          <Brand />
        </Link>
        <p>
          © 2026 <a href="https://openenvision.org/" target="_blank" rel="noreferrer">OpenEnvision</a>. {t("All rights reserved.")}
        </p>
      </div>
      <div className="footer-links">
        <Link to={url.page("explore")}>{t("All content")}</Link>
        <Link to="/docs/contributing/">{t("Contribute")}</Link>
        <Link to="/docs/media-sources/">{t("Credits")}</Link>
      </div>
    </footer>
  );
}

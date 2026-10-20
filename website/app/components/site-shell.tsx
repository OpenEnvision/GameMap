import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";
import { navigation, url } from "../../content/site";
import { Link, NavLink, LanguageSwitcher, useSiteI18n } from "../lib/i18n";
export function Brand() {
  return (
    <span className="atlas-brand">
      <img
        src={`${import.meta.env.BASE_URL}assets/brand/gamemap-mark.svg`}
        width="29"
        height="29"
        alt=""
      />
      <span>GameMap</span>
    </span>
  );
}
export function SiteHeader() {
  const { t } = useSiteI18n(),
    [open, setOpen] = useState(false),
    [mounted, setMounted] = useState(false);
  const { setOpenSearch } = useSearchContext(),
    { resolvedTheme, setTheme } = useTheme(),
    location = useLocation();
  useEffect(() => setMounted(true), []);
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
              <NavLink key={page.id} to={page.path}>
                {t(page.title)}
              </NavLink>
            ))}
          <details className="more-navigation" key={location.pathname}>
            <summary>{t("More")}</summary>
            <div>
              {navigation
                .filter((page) => page.nav === "secondary")
                .map((page) => (
                  <NavLink key={page.id} to={page.path}>
                    {t(page.title)}
                  </NavLink>
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
          <button
            className="quiet-icon"
            aria-label={t("Toggle color theme")}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
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
            <NavLink key={page.id} to={page.path}>
              {t(page.title)}
            </NavLink>
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
        <p>{t("A little direction for your next playable world.")}</p>
      </div>
      <div className="footer-links">
        <Link to={url.page("explore")}>{t("All content")}</Link>
        <Link to="/docs/contributing/">{t("Contribute")}</Link>
        <Link to="/docs/media-sources/">{t("Credits")}</Link>
      </div>
    </footer>
  );
}

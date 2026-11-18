import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";
import { navigation } from "../../content/site";
import { CommunityAccountLink } from "./community";
import { Link, NavLink, LanguageSwitcher, useSiteI18n } from "../lib/i18n";
export function Brand() {
  return (
    <span className="atlas-brand">
      <img
        src={`${import.meta.env.BASE_URL}brand/gamemap-mark.svg`}
        width="29"
        height="29"
        alt=""
      />
      <span className="brand-wordmark">
        <span>
          Game<span className="brand-accent">Map</span>
        </span>
        <small>{"AI × GAMES × WORLDS"}</small>
      </span>
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
  const headerRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    if (moreRef.current) moreRef.current.open = false;
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) {
        setOpen(false);
        document.getElementById("mobile-navigation-button")?.focus();
      }
      if (moreRef.current?.open) {
        moreRef.current.open = false;
        moreRef.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!headerRef.current?.contains(event.target)) setOpen(false);
      if (moreRef.current && !moreRef.current.contains(event.target))
        moreRef.current.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link to="/" aria-label={t("GameMap home")}>
          <Brand />
        </Link>
        <nav className="desktop-navigation" aria-label={t("Main navigation")}>
          {navigation
            .filter((page) => page.nav === "primary")
            .map((page) => (
              <NavLink
                key={page.id}
                to={page.path}
                data-collection-id={page.id}
              >
                {t(page.title)}
              </NavLink>
            ))}
          <details className="more-navigation" ref={moreRef}>
            <summary>{t("More")}</summary>
            <div>
              {navigation
                .filter((page) => page.nav === "secondary")
                .map((page) => (
                  <NavLink
                    key={page.id}
                    to={page.path}
                    data-collection-id={page.id}
                    onClick={() => {
                      if (moreRef.current) moreRef.current.open = false;
                    }}
                  >
                    {t(page.title)}
                  </NavLink>
                ))}
            </div>
          </details>
        </nav>
        <div className="header-controls">
          <CommunityAccountLink />
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
          <Link to="/submit/" onClick={() => setOpen(false)}>
            {t("Submit a game")}
          </Link>
          <Link to="/account/" onClick={() => setOpen(false)}>
            {t("My account")}
          </Link>
          {navigation.map((page) => (
            <NavLink
              key={page.id}
              to={page.path}
              onClick={() => setOpen(false)}
            >
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
        <Link to="/docs/contributing/">{t("Contribute")}</Link>
        <Link to="/docs/media-sources/">{t("Credits")}</Link>
      </div>
      <nav className="footer-friends" aria-label={t("Related sites")}>
        <span className="footer-friends-label">{t("Related sites")}</span>
        <a
          href="https://gameartstyle.loopyhop.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="footer-game-art-style-description"
        >
          Game Art Style
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <p id="footer-game-art-style-description">
          {t("Game art styles and visual references.")}
        </p>
      </nav>
    </footer>
  );
}

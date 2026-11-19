import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";
import { CommunityAccountLink } from "./community";
import { communityEnabled } from "../lib/community";
import {
  Link,
  NavLink,
  LanguageSwitcher,
  useSiteI18n,
  withTrailingSlash,
} from "../lib/i18n";
import { unlocalizedPath } from "../../content/locale";
import { pillars, type Pillar } from "../lib/pillars";

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
      </span>
    </span>
  );
}

/** Is the visitor somewhere inside this pillar (collection or record)? */
function usePillarActive() {
  const { pathname } = useLocation();
  const current = withTrailingSlash(unlocalizedPath(pathname));
  return (pillar: Pillar) =>
    pillar.links.some((link) => current.startsWith(link.path));
}

export function SiteHeader() {
  const { t } = useSiteI18n(),
    [open, setOpen] = useState(false),
    [mounted, setMounted] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const { setOpenSearch } = useSearchContext(),
    { resolvedTheme, setTheme } = useTheme(),
    location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const isActive = usePillarActive();
  const panels = () =>
    Array.from(
      navRef.current?.querySelectorAll<HTMLDetailsElement>("details") ?? [],
    );
  const closePanels = (except?: HTMLDetailsElement) =>
    panels().forEach((panel) => {
      if (panel !== except) panel.open = false;
    });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    closePanels();
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", open);
    return () => document.documentElement.removeAttribute("data-menu-open");
  }, [open]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) {
        setOpen(false);
        document.getElementById("mobile-navigation-button")?.focus();
      }
      const expanded = panels().find((panel) => panel.open);
      if (expanded) {
        expanded.open = false;
        expanded.querySelector("summary")?.focus();
      }
    };
    const outside = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!headerRef.current?.contains(event.target)) {
        setOpen(false);
        closePanels();
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  // Precise pointers open a pillar on hover; touch and keyboard use the native disclosure.
  const hoverOpen = (event: PointerEvent<HTMLDetailsElement>) => {
    if (event.pointerType !== "mouse") return;
    const panel = event.currentTarget;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      closePanels(panel);
      if (!panel.open) hoverOpenedAt.current = Date.now();
      panel.open = true;
    }, 90);
  };
  const hoverClose = (event: PointerEvent<HTMLDetailsElement>) => {
    if (event.pointerType !== "mouse") return;
    const panel = event.currentTarget;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      panel.open = false;
    }, 160);
  };

  return (
    <header
      className="site-header"
      ref={headerRef}
      data-scrolled={scrolled || undefined}
    >
      <div className="nav-pill">
        <Link to="/" className="nav-brand" aria-label={t("GameMap home")}>
          <Brand />
        </Link>
        <nav
          className="desktop-navigation"
          aria-label={t("Main navigation")}
          ref={navRef}
        >
          {pillars.map((pillar) => (
            <details
              key={pillar.id}
              className="nav-pillar"
              data-pillar={pillar.id}
              data-active={isActive(pillar) || undefined}
              onPointerEnter={hoverOpen}
              onPointerLeave={hoverClose}
              onToggle={(event) => {
                if (event.currentTarget.open) closePanels(event.currentTarget);
              }}
            >
              <summary
                onClick={(event) => {
                  // A click right after hover-open confirms the panel instead of closing it.
                  if (
                    event.currentTarget.parentElement?.hasAttribute("open") &&
                    Date.now() - hoverOpenedAt.current < 600
                  )
                    event.preventDefault();
                }}
              >
                {t(pillar.label)}
              </summary>
              <div className="nav-panel">
                <div className="nav-panel-intro">
                  <span className="eyebrow">{t(pillar.kicker)}</span>
                  <p>{t(pillar.description)}</p>
                </div>
                <ul className="nav-panel-links">
                  {pillar.links.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        data-collection-id={link.collection}
                        onClick={() => closePanels()}
                      >
                        <strong>{t(link.title)}</strong>
                        <small>{t(link.blurb)}</small>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="global-search"
            onClick={() => setOpenSearch(true)}
            aria-label={t("Search all content")}
          >
            <Search size={16} />
            <span>{t("Search")}</span>
            <kbd>⌘K</kbd>
          </button>
          <LanguageSwitcher />
          <button
            className="quiet-icon"
            aria-label={t("Toggle color theme")}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>
          <CommunityAccountLink />
          <button
            id="mobile-navigation-button"
            className="quiet-icon mobile-navigation-button"
            aria-label={t(open ? "Close navigation" : "Open navigation")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label={t("Mobile navigation")}
        >
          {pillars.map((pillar, index) => (
            <section
              key={pillar.id}
              className="mobile-pillar"
              style={{ "--i": index } as React.CSSProperties}
            >
              <h2>{t(pillar.label)}</h2>
              {pillar.links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                >
                  {t(link.title)}
                </NavLink>
              ))}
            </section>
          ))}
          {communityEnabled && (
            <div className="mobile-utility">
              <Link to="/submit/" onClick={() => setOpen(false)}>
                {t("Submit a game")}
              </Link>
              <Link to="/account/" onClick={() => setOpen(false)}>
                {t("My account")}
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useSiteI18n();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <Link to="/" aria-label={t("GameMap home")}>
            <Brand />
          </Link>
          <p>{t("A little direction for your next playable world.")}</p>
          <div className="footer-links">
            <Link to="/docs/contributing/">{t("Contribute")}</Link>
            <Link to="/docs/reference/media-sources/">{t("Credits")}</Link>
          </div>
        </div>
        <nav className="footer-columns" aria-label={t("Site map")}>
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <h2>{t(pillar.label)}</h2>
              <ul>
                {pillar.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{t(link.title)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
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
        <a
          className="footer-github"
          href="https://github.com/OpenEnvision/GameMap"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        GameMap
      </div>
    </footer>
  );
}

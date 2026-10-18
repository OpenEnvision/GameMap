import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";

export function Brand() {
  return (
    <span className="atlas-brand">
      <img
        src={`${import.meta.env.BASE_URL}brand/gamemap-mark.svg`}
        width="29"
        height="29"
        alt=""
      />
      <span>
        GameMap<span className="brand-period">.</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setOpenSearch } = useSearchContext();
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
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
        <Link to="/" aria-label="GameMap home">
          <Brand />
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          <NavLink to="/resources/">Resources</NavLink>
          <NavLink to="/examples/">Game examples</NavLink>
          <NavLink to="/docs/">Guides & notes</NavLink>
          <NavLink to="/testing/">Testing</NavLink>
        </nav>
        <div className="header-controls">
          <button
            className="global-search"
            onClick={() => setOpenSearch(true)}
            aria-label="Search guides"
          >
            <Search size={16} />
            <span>Search docs</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="quiet-icon"
            aria-label="Toggle color theme"
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
            aria-label={open ? "Close navigation" : "Open navigation"}
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
          aria-label="Mobile navigation"
        >
          <NavLink to="/resources/">Resources</NavLink>
          <NavLink to="/examples/">Game examples</NavLink>
          <NavLink to="/docs/">Guides & notes</NavLink>
          <NavLink to="/testing/">Testing</NavLink>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link to="/">
          <Brand />
        </Link>
        <p>A little direction for your next playable world.</p>
      </div>
      <div className="footer-links">
        <Link to="/docs/contributing/">Contribute</Link>
        <Link to="/docs/media-sources/">Credits</Link>
        <a href={`${import.meta.env.BASE_URL}resources.json`} download>
          Catalog JSON
          <ArrowUpRight size={13} />
        </a>
        <a href="https://fumadocs.dev" target="_blank" rel="noreferrer">
          Built with Fumadocs
          <ArrowUpRight size={13} />
        </a>
      </div>
      <p className="footer-note">
        Manually curated sources. Inclusion is not an endorsement or a claim of
        full reproduction.
      </p>
    </footer>
  );
}

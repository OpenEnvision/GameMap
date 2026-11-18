import { useEffect, type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import { RootProvider } from "fumadocs-ui/provider/react-router";
import AtlasSearch from "./components/search";
import { SearchStateProvider } from "./lib/search-state";
import { FrameworkLink } from "./components/framework-link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./styles/index.css";
import "./styles/community.css";
import "./styles/cosmos.css";
import "./styles/motion.css";
import { CosmosEffects } from "./components/cosmos/effects";
import { CommunityProvider } from "./lib/community";
import { useHydrated } from "./lib/client-query";
// The root loader only supplies the immutable document-language manifest.
// Client-side filters must not refetch it on every query-string update.
export { shouldRevalidateCollection as shouldRevalidate } from "./lib/collection-query";
import { localeFromPath, docMessages } from "../content/doc-language";
import {
  documentLanguages,
  unlocalizedPath,
  languageAlternates,
} from "../content/locale";
import { siteOrigin } from "../content/site";
import { LocaleProvider, useSiteI18n } from "./lib/i18n";
import { content } from "../content/registry.server";
export function loader() {
  return {
    documents: documentLanguages(
      content.all("document").map((entry) => entry.data),
    ),
  };
}

function ThemeColor() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const color = getComputedStyle(root).getPropertyValue("--paper").trim();
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", color);
    };
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    update();
    return () => observer.disconnect();
  }, []);
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation(),
    locale = localeFromPath(pathname);
  const data = useRouteLoaderData<typeof loader>("root");
  const alternates = languageAlternates(pathname, data?.documents);
  const absolute = (path: string) =>
    siteOrigin + import.meta.env.BASE_URL.replace(/\/$/, "") + path;
  const canonical = alternates[locale] || alternates.en || alternates.zh;
  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05070f" />
        <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} />
        <Meta />
        {canonical && <link rel="canonical" href={absolute(canonical)} />}
        {Object.entries(alternates).map(([language, path]) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language === "zh" ? "zh-CN" : "en"}
            href={absolute(path)}
          />
        ))}
        <Links />
      </head>
      <body>
        <LocaleProvider locale={locale} documents={data?.documents}>
          <CommunityProvider>
            <SearchStateProvider>
              <RootProvider
                components={{ Link: FrameworkLink }}
                theme={{ defaultTheme: "dark" }}
                search={{ SearchDialog: AtlasSearch }}
                i18n={{ locale, translations: docMessages(locale).ui }}
              >
                <ThemeColor />
                {children}
              </RootProvider>
            </SearchStateProvider>
          </CommunityProvider>
        </LocaleProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const logical = unlocalizedPath(pathname);
  const docs = logical === "/docs" || logical.startsWith("/docs/");
  const hydrated = useHydrated();
  return (
    <>
      <a className="skip-link" href={docs ? "#nd-page" : "#main-content"}>
        {docMessages(localeFromPath(pathname)).skip}
      </a>
      {/* Static reading and native links work immediately. Form controls must wait
          for hydration so a placeholder query state cannot consume an action. */}
      <fieldset
        className="interactive-surface"
        role="presentation"
        disabled={!hydrated}
        data-client-ready={hydrated}
      >
        <CosmosEffects />
        {!docs && <SiteHeader />}
        <Outlet />
        {!docs && <SiteFooter />}
      </fieldset>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { t, href } = useSiteI18n();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main id="main-content" className="error-page">
      <span className="eyebrow">
        {t(notFound ? "404 / OFF THE MAP" : "SOMETHING WENT WRONG")}
      </span>
      <h1>
        {t(
          notFound
            ? "This path is still uncharted."
            : "We could not load this page.",
        )}
      </h1>
      <p>
        {t(
          notFound
            ? "Try the resource library or pick a guide to find your next step."
            : "Refresh the page and try again. Your saved collection stays in this browser.",
        )}
      </p>
      <Link className="button button-primary" to={href("/")}>
        {t("Back to GameMap")}
      </Link>
    </main>
  );
}

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
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
import { FrameworkLink } from "./components/framework-link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import {
  displayModeBootstrap,
  displayModeStorageKey,
} from "./components/display-mode";
import "@fontsource-variable/inter";
import "./styles.css";
import { useHydrated } from "./lib/client-query";
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
  const { theme } = useTheme();
  return (
    <meta
      name="theme-color"
      content={theme === "general" ? "#fffcfb" : "#0b101b"}
      suppressHydrationWarning
    />
  );
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
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: displayModeBootstrap }} />
        <link rel="icon" href={`${import.meta.env.BASE_URL}assets/brand/favicon.svg`} />
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
          <RootProvider
            components={{ Link: FrameworkLink }}
            theme={{
              attribute: "class",
              storageKey: displayModeStorageKey,
              themes: ["general", "game"],
              value: { general: "light", game: "dark" },
              defaultTheme: "game",
              enableSystem: false,
              enableColorScheme: false,
              hotKey: false,
              disableTransitionOnChange: true,
            }}
            search={{ SearchDialog: AtlasSearch }}
            i18n={{ locale, translations: docMessages(locale).ui }}
          >
            <ThemeColor />
            {children}
          </RootProvider>
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

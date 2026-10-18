import type { ReactNode } from "react";
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
} from "react-router";
import { RootProvider } from "fumadocs-ui/provider/react-router";
import AtlasSearch from "./components/search";
import { FrameworkLink } from "./components/framework-link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import "@fontsource-variable/inter";
import "./styles.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#faf9f6" />
        <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProvider
          components={{ Link: FrameworkLink }}
          theme={{ defaultTheme: "light" }}
          search={{ SearchDialog: AtlasSearch }}
        >
          {children}
        </RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const docs = pathname === "/docs" || pathname.startsWith("/docs/");
  return (
    <>
      <a className="skip-link" href={docs ? "#nd-page" : "#main-content"}>
        Skip to content
      </a>
      {!docs && <SiteHeader />}
      <Outlet />
      {!docs && <SiteFooter />}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main id="main-content" className="error-page">
      <span className="eyebrow">
        {notFound ? "404 / OFF THE MAP" : "SOMETHING WENT WRONG"}
      </span>
      <h1>
        {notFound
          ? "This path is still uncharted."
          : "We could not load this page."}
      </h1>
      <p>
        {notFound
          ? "Try the resource library or pick a guide to find your next step."
          : "Refresh the page and try again. Your saved collection stays in this browser."}
      </p>
      <Link className="button button-primary" to="/">
        Back to GameMap
      </Link>
    </main>
  );
}

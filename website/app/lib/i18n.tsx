import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate as useRouterNavigate,
  type To,
  type NavigateOptions,
  type NavigateFunction,
} from "react-router";
import {
  localizedPath,
  translate,
  chineseMessages,
  emptyDocumentLanguages,
  type Locale,
  type DocumentLanguages,
} from "../../content/locale";
const defaultValue = {
  locale: "en" as Locale,
  documents: emptyDocumentLanguages,
  t: (key: string, values?: Record<string, string | number>) =>
    translate("en", key, values),
  href: (value: string) => value,
};
const Context = createContext(defaultValue);
export function LocaleProvider({
  locale,
  documents = emptyDocumentLanguages,
  children,
}: {
  locale: Locale;
  documents?: DocumentLanguages;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      locale,
      documents,
      t: (key: string, values?: Record<string, string | number>) =>
        translate(locale, key, values),
      href: (path: string) =>
        locale === "en" && /^\/(?:zh(?:\/|$)|docs\/zh(?:\/|$))/.test(path)
          ? path
          : localizedPath(path, locale, documents),
    }),
    [locale, documents],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useSiteI18n = () => useContext(Context);
function localizedTo(to: To, href: (value: string) => string): To {
  return typeof to === "string"
    ? href(to)
    : to.pathname
      ? { ...to, pathname: href(to.pathname) }
      : to;
}
/** Page navigations animate through the View Transitions API where supported;
 *  motion.css keeps the transition still under prefers-reduced-motion. */
export function Link({
  to,
  viewTransition = true,
  ...props
}: ComponentProps<typeof RouterLink>) {
  const { href } = useSiteI18n();
  return (
    <RouterLink
      to={localizedTo(to, href)}
      viewTransition={viewTransition}
      {...props}
    />
  );
}
/** Pages are prerendered at "/examples" but served and hydrated at "/examples/".
 *  Comparing slash-normalized paths keeps static and hydrated markup identical. */
export const withTrailingSlash = (path: string) =>
  path.endsWith("/") || /\.[^/]+$/.test(path) ? path : path + "/";
export function NavLink({
  to,
  className,
  viewTransition = true,
  ...props
}: ComponentProps<typeof RouterLink>) {
  const { href } = useSiteI18n();
  const { pathname } = useLocation();
  const target = localizedTo(to, href);
  const targetPath =
    typeof target === "string"
      ? target.split(/[?#]/)[0]
      : target.pathname || "";
  const current = withTrailingSlash(pathname);
  const wanted = withTrailingSlash(targetPath);
  const active = wanted === "/" ? current === "/" : current.startsWith(wanted);
  return (
    <RouterLink
      to={target}
      viewTransition={viewTransition}
      className={[className, active && "active"].filter(Boolean).join(" ")}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}
export function useNavigate(): NavigateFunction {
  const navigate = useRouterNavigate(),
    { href } = useSiteI18n();
  return useCallback(
    (to: To | number, options?: NavigateOptions) =>
      typeof to === "number"
        ? navigate(to)
        : navigate(localizedTo(to, href), options),
    [navigate, href],
  ) as NavigateFunction;
}
export function LanguageSwitcher({
  className = "site-language",
}: {
  className?: string;
}) {
  const { locale, documents, t } = useSiteI18n(),
    location = useLocation();
  return (
    <nav className={className} aria-label={t("Switch language")}>
      {(["zh", "en"] as const).map((language, index) => (
        <Fragment key={language}>
          {index > 0 && (
            <span className="language-separator" aria-hidden="true">
              /
            </span>
          )}
          <RouterLink
            to={localizedPath(
              withTrailingSlash(location.pathname) +
                location.search +
                location.hash,
              language,
              documents,
            )}
            lang={language === "zh" ? "zh-CN" : "en"}
            hrefLang={language === "zh" ? "zh-CN" : "en"}
            aria-current={language === locale ? "true" : undefined}
          >
            {language === "zh" ? chineseMessages.Chinese : "English"}
          </RouterLink>
        </Fragment>
      ))}
    </nav>
  );
}
export function SourceLanguage({
  english = false,
  partial = false,
}: {
  english?: boolean;
  partial?: boolean;
}) {
  const { locale, t } = useSiteI18n();
  return locale === "zh" && english ? (
    <span
      className="source-language"
      title={t(partial ? "Includes English source material" : "English source")}
    >
      EN
    </span>
  ) : null;
}

import type { ComponentProps } from "react";
import { Link } from "react-router";

// Keep Fumadocs' active-page styling and expose the same state to assistive tech.
export function FrameworkLink({
  href,
  prefetch,
  ...props
}: ComponentProps<"a"> & { prefetch?: boolean }) {
  if (!href) return <a {...props} />;
  const position = href.search(/[?#]/);
  const path = position < 0 ? href : href.slice(0, position);
  const suffix = position < 0 ? "" : href.slice(position);
  const document = path === "/docs" || path.startsWith("/docs/");
  const canonical =
    document && !path.endsWith("/") ? path + "/" + suffix : href;
  const active = (props as Record<string, unknown>)["data-active"] === true;
  return (
    <Link
      to={canonical}
      prefetch={prefetch ? "intent" : "none"}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}

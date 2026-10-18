import type { ComponentProps } from "react";
import { Link } from "react-router";

// Keep Fumadocs' active-page styling and expose the same state to assistive tech.
export function FrameworkLink({
  href,
  prefetch,
  ...props
}: ComponentProps<"a"> & { prefetch?: boolean }) {
  if (!href) return <a {...props} />;
  const active = (props as Record<string, unknown>)["data-active"] === true;
  return (
    <Link
      to={href}
      prefetch={prefetch ? "intent" : "none"}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}

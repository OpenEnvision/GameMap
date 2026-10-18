import type { ComponentProps } from "react";
import { Link } from "react-router";
import defaults from "fumadocs-ui/mdx";

function DocumentLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (
    href === "/" ||
    href.startsWith("/docs/") ||
    href.startsWith("/resources/")
  )
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = { ...defaults, a: DocumentLink };

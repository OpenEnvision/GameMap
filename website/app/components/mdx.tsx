import { Children, type ComponentProps } from "react";
import { Link as SourceLink } from "react-router";
import { Link } from "../lib/i18n";
import { isEnglishSourceLabel } from "../../content/locale";
import defaults from "fumadocs-ui/mdx";
function DocumentLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const internal =
    href === "/" ||
    /^\/(?:docs|resources|examples|agents|testing|research|paths|showcase|explore|zh)(?:\/|$)/.test(
      href,
    );
  if (internal) {
    const label = Children.toArray(children)
      .filter((item) => typeof item === "string")
      .join("");
    const explicitlyEnglish = isEnglishSourceLabel(label);
    return explicitlyEnglish ? (
      <SourceLink to={href} hrefLang="en" {...props}>
        {children}
      </SourceLink>
    ) : (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
export const mdxComponents = { ...defaults, a: DocumentLink };

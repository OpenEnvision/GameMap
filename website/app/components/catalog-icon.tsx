import type { LucideIcon } from "lucide-react";

/** A catalog marker for entries that already have a visible text label. */
export function CatalogIcon({
  icon: Glyph,
  size = "card",
  className,
}: {
  icon: LucideIcon;
  size?: "inline" | "small" | "card";
  className?: string;
}) {
  return (
    <span
      className={`catalog-icon catalog-icon--${size}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <Glyph strokeWidth={1.65} />
    </span>
  );
}

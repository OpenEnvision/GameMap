import { publicAsset } from "../publicAsset";
import type { Resource } from "../types";
import type { ResourceIdentity } from "../data/resourceIdentities";

interface ResourceIconProps {
  resource: Resource;
  identity: ResourceIdentity;
  size?: number;
}

/** Original organization or project artwork, verified per resource. */
export function ResourceIcon({
  resource,
  identity,
  size = 44,
}: ResourceIconProps) {
  const description = `${identity.organization} — ${identity.kind === "institution" ? "verified affiliation" : identity.kind === "creator" ? "project maintainer" : "official organization or project"}`;
  if (!identity.asset) return null;
  return (
    <span
      className={`resource-icon has-verified-logo logo-${identity.background ?? "light"}${identity.wide ? " is-wide" : ""}`}
      style={{
        width: identity.wide ? size * 2.5 : size,
        height: size,
        flexShrink: 0,
      }}
      role="img"
      aria-label={`${identity.organization} logo`}
      title={description}
      data-resource-id={resource.id}
      data-logo-kind={identity.kind}
      data-logo-organization={identity.organization}
    >
      <img
        className="resource-icon-image"
        src={publicAsset(identity.asset)}
        alt=""
        loading="lazy"
        decoding="async"
        width={size}
        height={size}
      />
    </span>
  );
}

export function ResourceAttribution({
  identity,
  linked = false,
}: {
  identity: ResourceIdentity;
  linked?: boolean;
}) {
  const label =
    identity.kind === "institution"
      ? "Affiliation"
      : identity.kind === "creator"
        ? "Maintainer"
        : "Organization";
  const title = `${label}: ${identity.organization}`;
  return linked ? (
    <a
      className="resource-affiliation"
      href={identity.sourceUrl}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      {label}: {identity.organization}
    </a>
  ) : (
    <span className="resource-affiliation" title={title}>
      {identity.organization}
    </span>
  );
}

export default ResourceIcon;

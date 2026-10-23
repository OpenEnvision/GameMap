import identities from "./resourceIdentities.json";
import type { z } from "zod";
import type { identitySchema } from "../../content/contracts";
export type ResourceIdentity = z.infer<typeof identitySchema>;

const registry = identities as Record<string, ResourceIdentity>;
export function getResourceIdentity(resourceId: string): ResourceIdentity {
  const identity = registry[resourceId];
  if (!identity)
    throw new Error(`Missing verified resource logo: ${resourceId}`);
  return identity;
}

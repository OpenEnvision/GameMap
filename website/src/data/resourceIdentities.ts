import identities from './resourceIdentities.json';

export interface ResourceIdentity {
  organization: string;
  kind: 'brand' | 'institution' | 'creator';
  asset: string | null;
  sourceUrl: string;
  logoSourceUrl: string | null;
  notes: string;
  background?: 'light' | 'dark';
  wide?: boolean;
  sha256: string | null;
}

const registry=identities as Record<string,ResourceIdentity>;
export function getResourceIdentity(resourceId:string):ResourceIdentity {
  const identity=registry[resourceId];
  if(!identity)throw new Error(`Missing verified resource logo: ${resourceId}`);
  return identity;
}

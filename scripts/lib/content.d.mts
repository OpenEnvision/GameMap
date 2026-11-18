// Types for the Node-side content loader. content.mjs bundles the website/content
// modules below with esbuild at run time; keep this list in step with its exports.
type Core = typeof import("../../website/content/registry-core");
type Bundled = Core &
  typeof import("../../website/content/site") &
  typeof import("../../website/content/models") &
  typeof import("../../website/content/contracts") &
  typeof import("../../website/content/assembly") &
  typeof import("../../website/content/matching") &
  typeof import("../../website/content/doc-language") &
  typeof import("../../website/content/locale") &
  typeof import("../../website/content/localization.server") &
  Pick<
    typeof import("../../website/content/search"),
    "blockText" | "searchableBlocks" | "searchFields" | "searchableText"
  > & {
    runtimeTaxonomy: typeof import("../../website/content/taxonomy.json");
    sources: typeof import("../../website/content/source-data").sources;
    sourceModules: Record<string, Record<string, unknown>>;
  };

export type LoadedContent = Bundled & {
  registry: ReturnType<Core["createRegistry"]>;
  documents: Parameters<Core["createRegistry"]>[1];
  contracts: Record<string, unknown>;
  sourceRows: number;
  inputMode: "git" | "release";
  siteSource?: { gitCommit?: string } & Record<string, unknown>;
  inputs: string[];
};

export declare const normalizeBase: (value?: string) => string;
export declare function loadContent(base?: string): Promise<LoadedContent>;
export declare const contentDigest: (value: unknown) => string;

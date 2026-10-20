import config from "../assets.config.json";
export const assetPrefix = config.prefix;
/** Public asset paths are site-relative, independent of language and deployment base. */
export function canonicalAssetPath(value: string): string {
  const path = value.replace(/^\.\//, "");
  if (
    !path.startsWith(assetPrefix) ||
    path.includes("\\") ||
    path.split("/").some((part) => !part || part === "." || part === "..") ||
    /[%?#]/.test(path)
  )
    throw new Error(`Asset must use a safe ${assetPrefix} path: ${value}`);
  if (!config.groups.includes(path.slice(assetPrefix.length).split("/")[0]))
    throw new Error(`Unregistered asset group: ${value}`);
  return path;
}
export const assetPath = (relative: string) =>
  canonicalAssetPath(config.prefix + relative);

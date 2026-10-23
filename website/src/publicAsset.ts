/** Resolve logical release assets once; already-based Git assets and original video URLs stay intact. */
export function publicAsset(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return (
    base +
    (path.startsWith(base) ? path.slice(base.length) : path.replace(/^\/+/, ""))
  );
}

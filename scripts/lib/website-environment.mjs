/** Public renderers inherit runtime settings, not database, Auth or Studio credentials. */
export function websiteEnvironment(environment = process.env) {
  const allowed = [
    "PATH",
    "HOME",
    "TMPDIR",
    "TMP",
    "TEMP",
    "SystemRoot",
    "LANG",
    "LC_ALL",
    "TZ",
    "CI",
    "PLAYWRIGHT_BROWSERS_PATH",
  ];
  return Object.fromEntries(
    allowed
      .filter((key) => environment[key] !== undefined)
      .map((key) => [key, environment[key]]),
  );
}

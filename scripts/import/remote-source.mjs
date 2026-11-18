import { parseArgs } from "node:util";
import { loadContent } from "../lib/content.mjs";
import {
  buildRemoteSource,
  validateRemotePackage,
} from "../lib/catalog/remote-source.mjs";

try {
  const { values } = parseArgs({
    options: {
      source: { type: "string" },
      out: { type: "string" },
      check: { type: "string" },
    },
    strict: true,
    allowPositionals: false,
  });
  if (
    values.check ? values.source || values.out : !values.source || !values.out
  )
    throw new Error(
      "Usage: node scripts/import/remote-source.mjs --source PINNED_CHECKOUT --out EMPTY_PACKAGE_DIR | --check PACKAGE_DIR",
    );
  const context = await loadContent("/");
  const report = values.check
    ? await validateRemotePackage(values.check, context)
    : await buildRemoteSource({
        sourceRoot: values.source,
        outputRoot: values.out,
        context,
      });
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

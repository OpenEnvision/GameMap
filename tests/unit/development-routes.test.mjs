import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";

const checkout = process.cwd();
await mkdir(join(checkout, ".build"), { recursive: true });
const directory = await mkdtemp(join(checkout, ".build/development-routes-"));
test.after(() => rm(directory, { recursive: true, force: true }));

test("detail routes and prerender targets follow the same generated catalog in development and production", async () => {
  for (const environment of ["development", "production"]) {
    const output = await build({
      stdin: {
        contents:
          "export {default as routes} from './website/app/routes'; export {default as config} from './react-router.config';",
        resolveDir: checkout,
        loader: "ts",
      },
      bundle: true,
      packages: "external",
      write: false,
      format: "esm",
      platform: "node",
      define: {
        "import.meta.env.BASE_URL": JSON.stringify("/"),
        "process.env.NODE_ENV": JSON.stringify(environment),
      },
    });
    const modulePath = join(directory, `${environment}.mjs`);
    await writeFile(modulePath, output.outputFiles[0].text);
    for (const kinds of [
      [],
      ["paper"],
      ["threejs-game"],
      ["paper", "threejs-game"],
    ]) {
      const root = await mkdtemp(join(tmpdir(), "gamemap-route-input-"));
      try {
        const paths = [
          "/",
          "/papers/",
          "/zh/papers/",
          "/threejs-games/",
          "/zh/threejs-games/",
        ];
        for (const kind of kinds)
          for (const prefix of ["", "/zh"])
            paths.push(
              `${prefix}/${kind === "paper" ? "papers" : "threejs-games"}/database-record/`,
            );
        await mkdir(join(root, "website/.content"), { recursive: true });
        await writeFile(
          join(root, "website/.content/routes.json"),
          JSON.stringify(paths),
        );
        process.chdir(root);
        const { routes, config } = await import(
          `${modulePath}?kinds=${kinds.join(",")}`
        );
        const targets = await config.prerender();
        for (const kind of ["paper", "threejs-game"])
          for (const prefix of ["", "zh-"])
            assert.equal(
              routes.some((route) => route.id === `${prefix}${kind}-detail`),
              kinds.includes(kind),
            );
        for (const path of paths)
          assert.ok(
            targets.includes(path === "/" ? "/" : path.replace(/\/$/, "")),
          );
      } finally {
        process.chdir(checkout);
        await rm(root, { recursive: true, force: true });
      }
    }
  }
});

test("the production registry has no local working or publication reader", async () => {
  const production = await build({
    entryPoints: ["website/content/registry.server.ts"],
    bundle: true,
    packages: "external",
    write: false,
    format: "esm",
    platform: "node",
    metafile: true,
    define: {
      "import.meta.env.BASE_URL": JSON.stringify("/"),
      "import.meta.env.DEV": "false",
    },
  });
  assert.ok(!production.outputFiles[0].text.includes("catalog-local"));
  assert.ok(
    !Object.keys(production.metafile.inputs).some((path) =>
      /development-input|published-papers/.test(path),
    ),
  );
});

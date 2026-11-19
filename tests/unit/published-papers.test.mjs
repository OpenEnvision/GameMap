import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";

const compiled = await build({
  entryPoints: ["website/content/published-papers.server.ts"],
  bundle: true,
  packages: "external",
  write: false,
  format: "esm",
  platform: "node",
});
// Keep shared dependencies resolved against the checkout.
await mkdir(join(process.cwd(), ".build"), { recursive: true });
const directory = await mkdtemp(
  join(process.cwd(), ".build/published-papers-"),
);
const modulePath = join(directory, "reader.mjs");
await writeFile(modulePath, compiled.outputFiles[0].text);
const { readPublishedPapers } = await import(modulePath);

// React Router's single-fetch table for one paper with nested role data.
const snapshot = [
  { _1: 2 },
  "papers",
  { _3: 4 },
  "data",
  { _5: 6 },
  "entries",
  [7],
  { _8: 9, _10: 11 },
  "kind",
  "paper",
  "data",
  { _12: 13, _14: 15, _16: 17, _18: 19 },
  "id",
  "paper-fixture",
  "title",
  "Published paper",
  "year",
  2026,
  "roles",
  [20],
  "build",
];

async function withPublication(entries, run) {
  const root = await mkdtemp(join(tmpdir(), "gamemap-published-papers-"));
  try {
    if (entries !== null) {
      const path = join(root, ".build/catalog-local/publication/current");
      await mkdir(path, { recursive: true });
      const table = structuredClone(snapshot);
      table[6] = entries;
      await writeFile(join(path, "papers.data"), JSON.stringify(table) + "\n");
    }
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test.after(() => rm(directory, { recursive: true, force: true }));

test("published papers: a checkout without local publication keeps its authoring source", async () => {
  await withPublication(null, async (root) => {
    assert.equal(await readPublishedPapers(root), null);
  });
});

test("published papers: public loader payloads retain paper fields and nested data", async () => {
  await withPublication([7], async (root) => {
    assert.deepEqual(await readPublishedPapers(root), [
      {
        id: "paper-fixture",
        title: "Published paper",
        year: 2026,
        roles: ["build"],
      },
    ]);
  });
});

test("published papers: an empty published collection stays empty", async () => {
  await withPublication([], async (root) => {
    assert.deepEqual(await readPublishedPapers(root), []);
  });
});

test("published papers: production registry excludes the local snapshot reader", async () => {
  const production = await build({
    entryPoints: ["website/content/registry.server.ts"],
    bundle: true,
    packages: "external",
    write: false,
    format: "esm",
    platform: "node",
    define: {
      "import.meta.env.BASE_URL": JSON.stringify("/"),
      "import.meta.env.DEV": "false",
    },
  });
  assert.ok(
    !production.outputFiles[0].text.includes(
      ".build/catalog-local/publication/current/papers.data",
    ),
  );
});

test("published papers: development serves paper details while static builds keep their generated routes", async () => {
  const checkout = process.cwd();
  for (const environment of ["development", "production"]) {
    const output = await build({
      stdin: {
        contents: `export {default as routes} from './website/app/routes';
          export {default as config} from './react-router.config';`,
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
    for (const entries of [[7], [], null]) {
      const expected =
        environment === "development" && Boolean(entries?.length);
      await withPublication(entries, async (root) => {
        await mkdir(join(root, "website/.content"), { recursive: true });
        await writeFile(
          join(root, "website/.content/routes.json"),
          JSON.stringify(["/", "/papers/", "/zh/papers/"]),
        );
        process.chdir(root);
        try {
          const { routes, config } = await import(
            `${modulePath}?entries=${JSON.stringify(entries)}`
          );
          const paths = await config.prerender();
          for (const prefix of ["", "zh-"]) {
            assert.equal(
              routes.some((route) => route.id === `${prefix}paper-detail`),
              expected,
            );
            assert.ok(
              !routes.some(
                (route) => route.id === `${prefix}threejs-game-detail`,
              ),
            );
          }
          for (const prefix of ["", "/zh"])
            assert.equal(
              paths.includes(`${prefix}/papers/paper-fixture`),
              expected,
            );
        } finally {
          process.chdir(checkout);
        }
      });
    }
  }
});

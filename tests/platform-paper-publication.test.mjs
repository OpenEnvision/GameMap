import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire, isBuiltin } from "node:module";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import {
  parsePage,
  attributes,
  textContent,
} from "../scripts/lib/rendered-coverage.mjs";

const require = createRequire(import.meta.url);
const bundle = await build({
  stdin: {
    contents: `
      import {createElement} from 'react';
      import {renderToStaticMarkup} from 'react-dom/server';
      import {MemoryRouter} from 'react-router';
      import {LocaleProvider} from './website/app/lib/i18n';
      import {TypedCollection} from './website/app/components/catalog-browser';
      export {paperConferencePublication} from './website/app/lib/paper-publication';
      export const render = (entries, locale='en') => renderToStaticMarkup(
        createElement(MemoryRouter, null, createElement(LocaleProvider, {locale},
          createElement(TypedCollection, {entries, kind:'paper', title:'Papers', description:'Test research references'}))));
    `,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  jsx: "automatic",
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  define: { "import.meta.env.BASE_URL": JSON.stringify("/") },
  plugins: [
    {
      name: "shared-node-dependencies",
      setup(builder) {
        builder.onResolve({ filter: /^[a-z@]/ }, ({ path }) =>
          isBuiltin(path)
            ? undefined
            : {
                path: pathToFileURL(require.resolve(path)).href,
                external: true,
              },
        );
      },
    },
  ],
});
const { paperConferencePublication, render } = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundle.outputFiles[0].text).toString("base64")
);
const paper = (
  publication,
  year = 2026,
  referenceType = "conference-paper",
) => ({
  publication,
  year,
  referenceType,
});
const cases = [
  ["ICLR 2026", 2026, "ICLR 2026"],
  ["ICML 2025 (PMLR 267)", 2025, "ICML 2025"],
  [
    "In International Conference on Learning Representations, 2026. First posted in 2025.",
    2025,
    "ICLR 2026",
  ],
  [
    "In Proceedings of the 42nd International Conference on Machine Learning, volume 267 of Proceedings of Machine Learning Research, pages 2341–2364. PMLR, 2025.",
    2025,
    "ICML 2025",
  ],
  [
    "In Proceedings of the 37th International Conference on Machine Learning, volume 119, pages 2048–2056, 2020.",
    2020,
    "ICML 2020",
  ],
  [
    "In Advances in Neural Information Processing Systems 33, 2020.",
    2020,
    "NeurIPS 2020",
  ],
  [
    "In Advances in Neural Information Processing Systems, Datasets and Benchmarks Track, 2025.",
    2025,
    "NeurIPS 2025 · Datasets & Benchmarks Track",
  ],
  [
    "In Proceedings of the NeurIPS 2021 Competitions and Demonstrations Track, pages 259–272, 2022.",
    2022,
    "NeurIPS 2021 · Competitions & Demonstrations Track",
  ],
  [
    "In Findings of the Association for Computational Linguistics: ACL 2026, pages 2341–2364. Association for Computational Linguistics, 2026a.",
    2026,
    "ACL 2026 · Findings",
  ],
  [
    "In Findings of the Association for Computational Linguistics: NAACL 2024, pages 3154–3183, 2024.",
    2024,
    "NAACL 2024 · Findings",
  ],
  [
    "In Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 43530–43552, 2026a.",
    2026,
    "ACL 2026 · Long Papers",
  ],
  [
    "In Proceedings of EMNLP-IJCNLP, pages 1–9, 2019.",
    2019,
    "EMNLP-IJCNLP 2019",
  ],
  [
    "In Proceedings of the 3rd Wordplay: When Language Meets Games Workshop (Wordplay 2022), pages 25–43. Association for Computational Linguistics, 2022.",
    2022,
    "Wordplay 2022 · Workshop",
  ],
  ["ICLR 2026 Workshop", 2026, "ICLR 2026 · Workshop"],
  [
    "In Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems, pages 149:1–149:5, 2026.",
    2026,
    "CHI 2026 · Extended Abstracts",
  ],
  [
    "In Companion Proceedings of the ACM International Conference on the Foundations of Software Engineering, 2026c.",
    2026,
    "FSE 2026 · Companion",
  ],
  [
    "In Proceedings of the 26th International Conference on World Wide Web Companion - WWW ’17 Companion, pages 465–471, 2017.",
    2017,
    "WWW 2017 · Companion",
  ],
  ["SIGGRAPH 2019 Talks", 2019, "SIGGRAPH 2019 · Talks"],
  [
    "In AAAI Conference on Artificial Intelligence and Interactive Digital Entertainment, 2026b. Accepted; arXiv:2608.12195.",
    2026,
    "AIIDE 2026 · Accepted",
  ],
  [
    "In Proceedings of the AAAI Conference on Artificial Intelligence, 38(16):17591–17599, 2024.",
    2024,
    "AAAI 2024",
  ],
  [
    "In Proceedings of the Annual Symposium on Computer-Human Interaction in Play, pages 25–40, 2025.",
    2025,
    "CHI PLAY 2025",
  ],
  [
    "In Proceedings of the First International Joint Conference of DiGRA and FDG, 2016.",
    2016,
    "DiGRA/FDG 2016",
  ],
  [
    "In 2025 IEEE Conference on Games (CoG), pages 1–8, 2025.",
    2025,
    "CoG 2025",
  ],
  [
    "In 2013 IEEE Conference on Computational Intelligence in Games (CIG), pages 1–8, 2013.",
    2013,
    "CIG 2013",
  ],
  [
    "In Proceedings of the 19th International Conference on the Foundations of Digital Games, 2024.",
    2024,
    "FDG 2024",
  ],
  [
    "In Proceedings of the Genetic and Evolutionary Computation Conference, 2018.",
    2018,
    "GECCO 2018",
  ],
  [
    "In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 1–9, 2025.",
    2025,
    "CVPR 2025",
  ],
  [
    "In Proceedings of the IEEE/CVF International Conference on Computer Vision, 2025.",
    2025,
    "ICCV 2025",
  ],
  [
    "In International Conference on Learning Representations.",
    2026,
    "ICLR 2026",
  ],
];

test("conference aliases preserve editions, qualifiers and the original bibliography", async (t) => {
  for (const [source, year, label] of cases)
    await t.test(label, () => {
      const input = Object.freeze(paper(source, year));
      const before = JSON.stringify(input);
      const result = paperConferencePublication(input);
      assert.equal(result.abbreviated, true, source);
      assert.equal(result.label, label);
      assert.match(result.label, new RegExp(`\\b${result.year}\\b`));
      assert.equal(JSON.stringify(input), before);
    });
});

test("unrecognized workshops, tracks, statuses, joint venues and ambiguous editions remain unabridged", () => {
  for (const source of [
    "In Unknown Research Conference, 2026.",
    "ICLR 2026 Workshop on Responsible Game Agents",
    "NeurIPS 2026 New Research Track",
    "ICLR 2026 · Not accepted",
    "ICLR 2026 · Submitted",
    "ICLR 2026 · Under review",
    "Joint ICLR and ICML Conference, 2026.",
    "Advances in Neural Information Processing Systems, 2025 / 2026.",
    "In Proceedings of the 6th IEEE/ACM International Workshop on Games and Software Engineering, pages 37–43, 2022.",
    "An unknown <img src=x onerror=alert(1)> venue, 2026.",
  ])
    assert.deepEqual(paperConferencePublication(paper(source)), {
      label: source,
      year: null,
      abbreviated: false,
    });
});

test("preprints, journal articles and other reference types never gain conference badges from incidental venue names", () => {
  for (const type of [
    "preprint",
    "journal-paper",
    "blog",
    "survey",
    "technical-report",
    "book-chapter",
  ])
    assert.equal(
      paperConferencePublication(paper("ICLR 2026", 2026, type)),
      null,
    );
  assert.equal(paperConferencePublication(paper("  ")), null);
});

function entry(id, data) {
  return {
    id,
    kind: "paper",
    key: `paper:${id}`,
    url: `/papers/${id}/`,
    title: `Research ${id}`,
    description: "Source-only research reference.",
    descriptionLanguage: "en",
    blocks: [],
    data: {
      authors: "Fixture author",
      primaryRole: "play",
      roles: ["play"],
      topics: [],
      access: {
        repositories: [],
        projects: [],
        demos: [],
        codeStatus: "unverified",
      },
      url: "https://example.invalid/source",
      ...data,
    },
  };
}
const rows = (html) =>
  parsePage(html).nodes.filter(
    (node) => attributes(node).class === "catalog-paper-row",
  );
const descendants = (node, className) => {
  const result = [];
  function walk(current) {
    if ((attributes(current).class || "").split(" ").includes(className))
      result.push(current);
    (current.childNodes || []).forEach(walk);
  }
  walk(node);
  return result;
};

test("English and Chinese static lists expose conference/year text and retain complete citations", () => {
  const entries = [
    entry("main", paper(cases[0][0])),
    entry("track", paper(cases[7][0], 2022)),
    entry("unknown", paper("An Unknown Workshop, 2026.")),
    entry("preprint", paper("ICLR 2026", 2026, "preprint")),
  ];
  for (const locale of ["en", "zh"]) {
    const rendered = rows(render(entries, locale));
    assert.equal(rendered.length, entries.length);
    const row = (id) =>
      rendered.find(
        (node) => attributes(node)["data-content-ref"] === `paper:${id}`,
      );
    const main = descendants(row("main"), "catalog-publication")[0];
    assert.equal(textContent(main), "ICLR 2026");
    assert.equal(attributes(main).title, "ICLR 2026");
    const track = descendants(row("track"), "catalog-publication")[0];
    assert.equal(textContent(track), cases[7][2]);
    assert.equal(attributes(track).title, cases[7][0]);
    assert.match(
      textContent(row("track")),
      locale === "zh" ? /发表年份: 2022/ : /Publication year: 2022/,
    );
    assert.equal(descendants(row("preprint"), "catalog-publication").length, 0);
    assert.equal(
      descendants(row("preprint"), "catalog-publication-year").length,
      0,
    );
    assert.equal(
      descendants(row("unknown"), "catalog-publication")
        .map(textContent)
        .join(""),
      "An Unknown Workshop, 2026.",
    );
    assert.match(
      textContent(row("main")),
      locale === "zh" ? /会议论文/ : /Conference paper/,
    );
  }
});

test("full unrecognized source text is escaped, not interpreted as active HTML", () => {
  const source = 'Unknown <img src=x onerror="alert(1)"> Workshop 2026';
  const html = render([entry("unsafe", paper(source))], "zh");
  const { nodes } = parsePage(html);
  assert.equal(
    nodes.some((node) => node.tagName === "img" || node.tagName === "script"),
    false,
  );
  const label = nodes.find(
    (node) => attributes(node).class === "catalog-publication",
  );
  assert.equal(textContent(label), source);
  assert.equal(attributes(label).title, source);
});

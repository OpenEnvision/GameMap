import assert from "node:assert/strict";
import {
  matchesSearch,
  parseSearchQuery,
  rankDocuments,
  searchTitleScore,
} from "../../website/content/matching.ts";

function document(key, title, text = title, translated = {}) {
  return {
    key,
    kind: "resource",
    title,
    url: `/resources/${key}/`,
    text,
    ...translated,
  };
}

const documents = [
  document(
    "incidental",
    "Artificial game guide",
    "Game content for artificial cities",
  ),
  document("compact", "GameCI"),
  document("translated", "自动构建", "自动构建", { alternateTitle: "Game CI" }),
  document("exact", "Game CI"),
  document("prefix", "Game CI release"),
  document("relevant-body", "Automate your build", "Game project with CI"),
];
assert.deepEqual(
  rankDocuments(documents, "Game CI").map(({ key }) => key),
  ["exact", "translated", "compact", "prefix", "relevant-body"],
);

const godot = [
  document("benchmark", "GameDevBench: 333 Godot tasks"),
  document("tutorial", "Godot · Command Line Tutorial"),
  document("engine", "Godot Engine"),
];
assert.equal(rankDocuments(godot, "Godot")[0]?.key, "engine");

const gauntlet = [
  document("rhythm", "Rhythm Gauntlet"),
  document("unreal-gauntlet", "Unreal Engine · Gauntlet"),
];
assert.equal(rankDocuments(gauntlet, "Gauntlet")[0]?.key, "unreal-gauntlet");
assert.deepEqual(
  rankDocuments(gauntlet, "Unreal，Gauntlet").map(({ key }) => key),
  ["unreal-gauntlet"],
);

assert.deepEqual(parseSearchQuery("Godot测试").tokens, ["godot", "测试"]);
assert.ok(matchesSearch("Godot 的自动化测试", "Godot测试"));
assert.ok(!matchesSearch("Godot 官方示例", "Godot测试"));
assert.ok(matchesSearch("Codex：Godot", "Codex+Godot"));
assert.ok(matchesSearch("Unity Test Framework", "Unity-Test_Framework"));
assert.ok(searchTitleScore("GdUnit4", parseSearchQuery("GdUnit 4")) > 0);

assert.deepEqual(parseSearchQuery("C♯ C++20 .NET 8.0 Three.js").tokens, [
  "c#",
  "c++20",
  ".net",
  "8.0",
  "three.js",
]);
assert.ok(
  matchesSearch("C# C++20 .NET 8.0 Three.js", "C♯ C++20 .NET 8.0 Three.js"),
);
assert.ok(!matchesSearch("C and NET", "C# .NET"));
assert.ok(matchesSearch("Some text", "  "));
assert.ok(!matchesSearch("Some text", "！？…"));
assert.deepEqual(rankDocuments(documents, "！？…"), []);
assert.deepEqual(rankDocuments(documents, "  "), []);

const bilingual = document("bilingual", "玩法案例", "自动试玩", {
  alternateTitle: "Gameplay examples",
  alternateText: "Godot gameplay examples",
});
assert.equal(rankDocuments([bilingual], "Godot 自动试玩")[0]?.key, "bilingual");
console.log(
  "Search ranking checks passed: bilingual titles, compact names, technical terms, punctuation and all-token matching.",
);

import assert from "node:assert/strict";
import { canonicalValue } from "../catalog/codec.mjs";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import chineseTesting from "../../../website/content/i18n/content/testing.zh.json" with { type: "json" };
import chinesePaths from "../../../website/content/i18n/content/paths.zh.json" with { type: "json" };
import chineseMessages from "../../../website/content/i18n/zh.json" with { type: "json" };
import translationSources from "../../../website/content/i18n/content.zh.sources.json" with { type: "json" };

export async function loadTestingContent() {
  const bundle = await build({
    absWorkingDir: fileURLToPath(new URL("../../../", import.meta.url)),
    entryPoints: ["website/src/data/testingResources.ts"],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
  });
  return import(
    "data:text/javascript;base64," +
      Buffer.from(bundle.outputFiles[0].text).toString("base64")
  );
}

export function validateTestingContent({
  testingResources,
  testingReviewDate,
  testingKinds,
  testingUses,
  testingTerms,
  testingStarterPacks,
}) {
  assert.match(testingReviewDate, /^\d{4}-\d{2}-\d{2}$/);
  const ids = new Set();
  const https = (url, label) =>
    assert.equal(
      new URL(url).protocol,
      "https:",
      `Use an HTTPS primary source: ${label}`,
    );
  for (const resource of testingResources) {
    assert.match(
      resource.id,
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use stable testing resource IDs",
    );
    assert.ok(
      !ids.has(resource.id),
      `Duplicate testing resource: ${resource.id}`,
    );
    ids.add(resource.id);
    for (const field of [
      "title",
      "stack",
      "summary",
      "codeLicense",
      "assetLicense",
      "aiUseNote",
      "limitations",
    ])
      assert.ok(
        typeof resource[field] === "string" && resource[field].trim(),
        `Missing ${resource.id}/${field}`,
      );
    assert.ok(
      resource.kind in testingKinds,
      `Unknown testing kind: ${resource.id}`,
    );
    assert.ok(
      resource.terms in testingTerms,
      `Unknown license group: ${resource.id}`,
    );
    assert.ok(
      resource.uses.length &&
        new Set(resource.uses).size === resource.uses.length &&
        resource.uses.every((use) => use in testingUses),
      `Invalid testing goals: ${resource.id}`,
    );
    assert.ok(
      resource.dimensions.length &&
        new Set(resource.dimensions).size === resource.dimensions.length &&
        resource.dimensions.every((dimension) =>
          ["2d", "3d"].includes(dimension),
        ),
      `Invalid dimensions: ${resource.id}`,
    );
    for (const field of ["setup", "testTasks"])
      assert.ok(
        resource[field]?.length &&
          resource[field].every(
            (item) => typeof item === "string" && item.trim(),
          ),
        `Missing ${field}: ${resource.id}`,
      );
    assert.match(
      resource.reviewed,
      /^\d{4}-\d{2}-\d{2}$/,
      `Record the review snapshot: ${resource.id}`,
    );
    assert.ok(
      resource.reviewed <= testingReviewDate,
      `Review date exceeds library snapshot: ${resource.id}`,
    );
    https(resource.sourceUrl, resource.id + "/source");
    https(resource.licenseUrl, resource.id + "/license");
    assert.ok(
      resource.access?.label?.trim() && resource.access?.note?.trim(),
      `Explain access: ${resource.id}`,
    );
    https(resource.access.url, resource.id + "/access");
    assert.ok(
      resource.evidence?.length,
      `Missing primary evidence: ${resource.id}`,
    );
    for (const evidence of resource.evidence) {
      assert.ok(evidence.label?.trim());
      https(evidence.url, resource.id + "/evidence");
    }
  }
  assert.ok(
    Object.keys(testingKinds).every((kind) =>
      testingResources.some((resource) => resource.kind === kind),
    ),
    "Keep every testing resource type populated",
  );
  assert.deepEqual(
    testingStarterPacks.map((pack) => pack.use).sort(),
    Object.keys(testingUses).sort(),
    "Cover every testing goal",
  );
  const byId = new Map(
    testingResources.map((resource) => [resource.id, resource]),
  );
  assert.equal(
    new Set(testingStarterPacks.map((pack) => pack.id)).size,
    testingStarterPacks.length,
    "Use unique testing starter IDs",
  );
  for (const pack of testingStarterPacks) {
    assert.ok(
      typeof pack.check === "string" && pack.check.trim(),
      `Provide an executable checkpoint: ${pack.id}`,
    );
    assert.ok(
      Array.isArray(pack.testingIds) &&
        pack.testingIds.length === 3 &&
        new Set(pack.testingIds).size === pack.testingIds.length,
      `Reference three distinct testing resources: ${pack.id}`,
    );
    const resources = pack.testingIds.map((id) => {
      const resource = byId.get(id);
      assert.ok(resource, `Unknown testing starter resource: ${pack.id}/${id}`);
      assert.ok(
        resource.uses.includes(pack.use),
        `Testing starter goal mismatch: ${pack.id}/${id}`,
      );
      return resource;
    });
    assert.equal(
      pack.resources,
      resources.map((resource) => resource.title).join(" · "),
      `Testing starter names must match their linked resources: ${pack.id}`,
    );
  }
  return testingResources;
}

export function testingManifest(content) {
  return (
    JSON.stringify(
      {
        kind: "testing-resource-library",
        reviewed: content.testingReviewDate,
        verification:
          "Primary-source review; not installation or runtime certification",
        resourceKinds: content.testingKinds,
        testGoals: content.testingUses,
        licenseGroups: content.testingTerms,
        starterPacks: content.testingStarterPacks,
        resources: content.testingResources,
      },
      null,
      2,
    ) + "\n"
  );
}

const safe = (value) => value.replaceAll("|", "\\|");
function reviewedTranslation(kind, record, required, optional = []) {
  const key = `${kind}:${record.id}`;
  const translations = kind === "testing" ? chineseTesting : chinesePaths;
  const copy = translations[key];
  const values = {};
  for (const field of [...required, ...optional]) {
    const translated = copy?.[field];
    if (translated === undefined && optional.includes(field)) continue;
    assert.ok(
      typeof record[field] === "string"
        ? typeof translated === "string" && translated.trim()
        : Array.isArray(translated) &&
            translated.length === record[field]?.length &&
            translated.every(
              (value) => typeof value === "string" && value.trim(),
            ),
      `Missing complete Chinese testing translation: ${key}.${field}`,
    );
    const sourceHash = createHash("sha256")
      .update(JSON.stringify(record[field]))
      .digest("hex");
    assert.equal(
      translationSources[key]?.[field],
      sourceHash,
      `Stale Chinese testing translation: ${key}.${field}`,
    );
    values[field] = translated;
  }
  return { ...record, ...values };
}

const guideCopy = {
  en: {
    title: "Game testing library",
    introduction:
      "Pick a project you can reset at the point that matters. For a retry bug, a small Godot demo that reaches game over quickly gives you a short control run. For an animation import issue, choose a rig and a clip with a visible foot plant so you can compare the source and the imported motion in one scene.",
    observations:
      "For a study of visual navigation, decide how much of the room the agent can see before choosing the task. MiniGrid offers both a full-grid RGB view and a partial RGB view. On DoorKey, a full grid gives the agent more information about where to look for the key. Keep the view, layout seed, and step limit fixed when comparing two agents. [MiniGrid's observation wrappers](https://minigrid.farama.org/api/wrappers/)",
    starters: "Starter packs",
    startWith: "Start with:",
    measure: "Measure:",
    checkpoint: "Checkpoint:",
    index: "Resource index",
    resource: "Resource",
    type: "Type",
    dimension: "Dimension",
    testGoals: "Test goals",
    getOrRun: "Get / run",
    source: "Source",
    primarySource: "Primary source",
    reviewedResources: "Reviewed resources",
    stack: "Stack / format:",
    typeLabel: "Type:",
    goals: "Goals:",
    dimensions: "Dimensions:",
    projectSource: "Project / source record",
    licenseTerms: "License / terms",
    licenseGroup: "License group:",
    code: "Code:",
    assets: "Assets / data:",
    aiUse: "AI use:",
    limits: "Practical limits:",
    tasks: "Suggested test tasks",
    getStarted: "Get started",
    evidence: "Primary evidence",
    protocolTitle: "Record a reproducible test",
    protocol:
      "For each actual run, preserve the project commit or release, engine/runtime and dependency versions, asset versions and licenses, launch commands, observation/action interface, reset mechanism, seeds, task success condition, and results. Separate visual observations from privileged state when comparing agents. For motion pipelines, also record skeleton hierarchy, rest pose, units, coordinate axes, frame rate, and root-motion conventions. These fields are a suggested run protocol; no runtime results are implied by this source catalog.",
  },
  zh: {
    title: "游戏测试库",
    introduction:
      "选一个能迅速回到测试起点的项目。查重开故障，可挑一款很快就能触发游戏结束的 Godot 小示例。查动画导入，可挑一副绑定和一段脚掌落地清楚的动作，把源动作和导入结果放在同个场景对照。",
    observations:
      "做视觉导航研究时，先定智能体可以看见多大范围。MiniGrid 有全地图 RGB 视图和局部 RGB 视图。在 DoorKey 里，看到全图的智能体有更多线索找钥匙。比较两个智能体时，保持观察范围、布局种子和步数上限一致。[MiniGrid 观察包装器](https://minigrid.farama.org/api/wrappers/)",
    starters: "入门组合",
    startWith: "建议从这些资源开始：",
    measure: "衡量指标：",
    checkpoint: "检查点：",
    index: "资源索引",
    resource: "资源",
    type: "类型",
    dimension: "维度",
    testGoals: "测试目标",
    getOrRun: "获取／运行",
    source: "来源",
    primarySource: "主要来源",
    reviewedResources: "已核查资源",
    stack: "技术栈／格式：",
    typeLabel: "类型：",
    goals: "目标：",
    dimensions: "维度：",
    projectSource: "项目／来源记录",
    licenseTerms: "许可／条款",
    licenseGroup: "许可类别：",
    code: "代码：",
    assets: "资产／数据：",
    aiUse: "AI 用途：",
    limits: "实际限制：",
    tasks: "建议测试任务",
    getStarted: "开始使用",
    evidence: "主要依据",
    protocolTitle: "记录可复现的测试",
    protocol:
      "每次实际运行都应保留项目提交或发布版本、引擎／运行时和依赖版本、资产版本与许可、启动命令、观察／动作接口、重置机制、随机种子、任务成功条件以及结果。比较代理时，应将视觉观察与特权状态分开。动作管线还应记录骨架层级、初始姿态、单位、坐标轴、帧率与根运动约定。这些字段是建议的运行记录规范；本来源目录并不表示已经取得运行结果。",
  },
};

export function renderTestingGuide(content, { locale = "en" } = {}) {
  assert.ok(
    Object.hasOwn(guideCopy, locale),
    `Unsupported testing guide locale: ${locale}`,
  );
  content = canonicalValue(content);
  validateTestingContent(content);
  const {
    testingResources,
    testingKinds: kinds,
    testingUses: uses,
    testingTerms: terms,
    testingStarterPacks,
  } = content;
  const resources =
    locale === "zh"
      ? testingResources.map((resource) =>
          reviewedTranslation(
            "testing",
            resource,
            [
              "summary",
              "stack",
              "codeLicense",
              "assetLicense",
              "aiUseNote",
              "testTasks",
              "setup",
              "limitations",
            ],
            ["title"],
          ),
        )
      : testingResources;
  const packs =
    locale === "zh"
      ? testingStarterPacks.map((pack) =>
          reviewedTranslation(
            "testing-pack",
            pack,
            ["title", "task", "measure", "check"],
            ["resources"],
          ),
        )
      : testingStarterPacks;
  const copy = guideCopy[locale];
  const t = (value) => {
    if (locale === "en") return value;
    assert.ok(
      typeof chineseMessages[value] === "string" &&
        chineseMessages[value].trim(),
      `Missing Chinese testing label or access note: ${value}`,
    );
    return chineseMessages[value];
  };
  let text = `# ${copy.title}\n\n${copy.introduction}\n\n${copy.observations}\n\n## ${copy.starters}\n\n`;
  for (const pack of packs) {
    const names = pack.resources.split(" · ");
    assert.equal(
      names.length,
      pack.testingIds.length,
      `Preserve the testing starter resource list in ${locale}: ${pack.id}`,
    );
    const links = pack.testingIds
      .map((id, index) => `[${names[index]}](/testing/${id}/)`)
      .join(" · ");
    text += `### ${t(uses[pack.use])}\n\n**${pack.title}**\n\n**${copy.startWith}** ${links}.\n\n${pack.task}\n\n**${copy.measure}** ${pack.measure}\n\n**${copy.checkpoint}** ${pack.check}\n\n`;
  }
  text += `## ${copy.index}\n\n| ${copy.resource} | ${copy.type} | ${copy.dimension} | ${copy.testGoals} | ${copy.getOrRun} | ${copy.source} |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const resource of resources)
    text += `| ${safe(resource.title)} | ${t(kinds[resource.kind])} | ${resource.dimensions.map((dimension) => dimension.toUpperCase()).join(" / ")} | ${resource.uses.map((use) => t(uses[use])).join("; ")} | [${safe(t(resource.access.label))}](${resource.access.url}) | [${copy.primarySource}](${resource.sourceUrl}) |\n`;
  text += `\n## ${copy.reviewedResources}\n\n`;
  for (const resource of resources) {
    text += `### ${resource.title}\n\n${resource.summary}\n\n**${copy.stack}** ${resource.stack}\n\n**${copy.typeLabel}** ${t(kinds[resource.kind])} · **${copy.goals}** ${resource.uses.map((use) => t(uses[use])).join("; ")} · **${copy.dimensions}** ${resource.dimensions.map((dimension) => dimension.toUpperCase()).join(" / ")}\n\n[${t(resource.access.label)}](${resource.access.url}) — ${t(resource.access.note)}\n\n[${copy.projectSource}](${resource.sourceUrl}) · [${copy.licenseTerms}](${resource.licenseUrl})\n\n- **${copy.licenseGroup}** ${t(terms[resource.terms])}\n- **${copy.code}** ${resource.codeLicense}\n- **${copy.assets}** ${resource.assetLicense}\n- **${copy.aiUse}** ${resource.aiUseNote}\n- **${copy.limits}** ${resource.limitations}\n\n**${copy.tasks}**\n\n`;
    for (const task of resource.testTasks) text += `- ${task}\n`;
    text += `\n**${copy.getStarted}**\n\n`;
    resource.setup.forEach((step, index) => {
      text += `${index + 1}. ${step}\n`;
    });
    text += `\n**${copy.evidence}**\n\n`;
    for (const evidence of resource.evidence)
      text += `- [${t(evidence.label)}](${evidence.url})\n`;
    text += "\n";
  }
  return text + `## ${copy.protocolTitle}\n\n${copy.protocol}\n`;
}

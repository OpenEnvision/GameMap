import assert from 'node:assert/strict';
import {canonicalValue} from '../catalog/codec.mjs';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

export async function loadTestingContent() {
  const bundle = await build({ absWorkingDir: fileURLToPath(new URL('../../../', import.meta.url)), entryPoints: ['website/src/data/testingResources.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
  return import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
}

export function validateTestingContent({ testingResources, testingReviewDate, testingKinds, testingUses, testingTerms, testingStarterPacks }) {
  assert.match(testingReviewDate, /^\d{4}-\d{2}-\d{2}$/);
  const ids = new Set();
  const https = (url, label) => assert.equal(new URL(url).protocol, 'https:', `Use an HTTPS primary source: ${label}`);
  for (const resource of testingResources) {
    assert.match(resource.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use stable testing resource IDs');
    assert.ok(!ids.has(resource.id), `Duplicate testing resource: ${resource.id}`);
    ids.add(resource.id);
    for (const field of ['title', 'stack', 'summary', 'codeLicense', 'assetLicense', 'aiUseNote', 'limitations']) assert.ok(typeof resource[field] === 'string' && resource[field].trim(), `Missing ${resource.id}/${field}`);
    assert.ok(resource.kind in testingKinds, `Unknown testing kind: ${resource.id}`);
    assert.ok(resource.terms in testingTerms, `Unknown license group: ${resource.id}`);
    assert.ok(resource.uses.length && new Set(resource.uses).size === resource.uses.length && resource.uses.every(use => use in testingUses), `Invalid testing goals: ${resource.id}`);
    assert.ok(resource.dimensions.length && new Set(resource.dimensions).size === resource.dimensions.length && resource.dimensions.every(dimension => ['2d', '3d'].includes(dimension)), `Invalid dimensions: ${resource.id}`);
    for (const field of ['setup', 'testTasks']) assert.ok(resource[field]?.length && resource[field].every(item => typeof item === 'string' && item.trim()), `Missing ${field}: ${resource.id}`);
    assert.equal(resource.reviewed, testingReviewDate, `Record the review snapshot: ${resource.id}`);
    https(resource.sourceUrl, resource.id + '/source');
    https(resource.licenseUrl, resource.id + '/license');
    assert.ok(resource.access?.label?.trim() && resource.access?.note?.trim(), `Explain access: ${resource.id}`);
    https(resource.access.url, resource.id + '/access');
    assert.ok(resource.evidence?.length, `Missing primary evidence: ${resource.id}`);
    for (const evidence of resource.evidence) { assert.ok(evidence.label?.trim()); https(evidence.url, resource.id + '/evidence'); }
  }
  assert.ok(Object.keys(testingKinds).every(kind => testingResources.some(resource => resource.kind === kind)), 'Keep all four testing resource types populated');
  assert.deepEqual(testingStarterPacks.map(pack => pack.use).sort(), Object.keys(testingUses).sort(), 'Cover every testing goal');
  return testingResources;
}

export function testingManifest(content) {
  return JSON.stringify({ kind: 'testing-resource-library', reviewed: content.testingReviewDate, verification: 'Primary-source review; not installation or runtime certification', resourceKinds: content.testingKinds, testGoals: content.testingUses, licenseGroups: content.testingTerms, starterPacks: content.testingStarterPacks, resources: content.testingResources }, null, 2) + '\n';
}

const safe = value => value.replaceAll('|', '\\|');
export function renderTestingGuide(content) {
  content=canonicalValue(content);
  const { testingResources: resources, testingReviewDate: date, testingKinds: kinds, testingUses: uses, testingTerms: terms, testingStarterPacks: packs } = content;
  let text = `# Game testing library\n\nChoose a runnable project, AI environment, or asset set for the behavior you want to test. Start with a task below, then follow the setup and license details for each resource.\n\n## Starter packs\n\n`;
  for (const pack of packs) text += `### ${uses[pack.use]}\n\n**Start with:** ${pack.resources}.\n\n${pack.task}\n\n**Measure:** ${pack.measure}\n\n`;
  text += '## Resource index\n\n| Resource | Type | Dimension | Test goals | Get / run | Source |\n| --- | --- | --- | --- | --- | --- |\n';
  for (const resource of resources) text += `| ${safe(resource.title)} | ${kinds[resource.kind]} | ${resource.dimensions.map(dimension => dimension.toUpperCase()).join(' / ')} | ${resource.uses.map(use => uses[use]).join('; ')} | [${safe(resource.access.label)}](${resource.access.url}) | [Primary source](${resource.sourceUrl}) |\n`;
  text += '\n## Reviewed resources\n\n';
  for (const resource of resources) {
    text += `### ${resource.title}\n\n${resource.summary}\n\n**Stack / format:** ${resource.stack}\n\n**Type:** ${kinds[resource.kind]} · **Goals:** ${resource.uses.map(use => uses[use]).join('; ')} · **Dimensions:** ${resource.dimensions.map(dimension => dimension.toUpperCase()).join(' / ')}\n\n[${resource.access.label}](${resource.access.url}) — ${resource.access.note}\n\n[Project / source record](${resource.sourceUrl}) · [License / terms](${resource.licenseUrl})\n\n- **License group:** ${terms[resource.terms]}\n- **Code:** ${resource.codeLicense}\n- **Assets / data:** ${resource.assetLicense}\n- **AI use:** ${resource.aiUseNote}\n- **Practical limits:** ${resource.limitations}\n\n**Suggested test tasks**\n\n`;
    for (const task of resource.testTasks) text += `- ${task}\n`;
    text += '\n**Get started**\n\n';
    resource.setup.forEach((step, index) => { text += `${index + 1}. ${step}\n`; });
    text += '\n**Primary evidence**\n\n';
    for (const evidence of resource.evidence) text += `- [${evidence.label}](${evidence.url})\n`;
    text += '\n';
  }
  return text + '## Record a reproducible test\n\nFor each actual run, preserve the project commit or release, engine/runtime and dependency versions, asset versions and licenses, launch commands, observation/action interface, reset mechanism, seeds, task success condition, and results. Separate visual observations from privileged state when comparing agents. For motion pipelines, also record skeleton hierarchy, rest pose, units, coordinate axes, frame rate, and root-motion conventions. These fields are a suggested run protocol; no runtime results are implied by this source catalog.\n';
}

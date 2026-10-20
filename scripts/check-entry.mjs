import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'parse5';
import { root } from './lib/documents.mjs';
import { readRootStaticManifest } from './lib/root-static.mjs';

const manifest = await readRootStaticManifest(false);
assert.ok(!manifest.pendingFiles, 'Root export is incomplete; rebuild before publishing.');
const paths = new Set(manifest.files.map(file => file.path));
assert.equal(paths.size, manifest.files.length, 'Root static inventory contains duplicate paths');
for (const path of ['index.html', '.nojekyll', '404.html', 'zh/index.html', 'papers/index.html', 'examples/index.html', 'search-index.json', 'site-manifest.json']) assert.ok(paths.has(path), `Missing root publication file: ${path}`);
for (const file of manifest.files) {
  const bytes = await readFile(resolve(root, file.path));
  if (file.mode === 'source-preserved') continue;
  assert.equal(bytes.length, file.bytes, `Root static file is stale: ${file.path}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, `Root static file was changed: ${file.path}`);
}
const site = JSON.parse(await readFile(resolve(root, 'site-manifest.json'), 'utf8'));
assert.equal(site.base, manifest.base, 'Root publication base does not match its inventory');
const html = await readFile(resolve(root, 'index.html'), 'utf8'), nodes = [];
function visit(node) { if (node.tagName) nodes.push(node); for (const child of node.childNodes || []) visit(child); }
visit(parse(html));
assert.equal(nodes.filter(node => node.tagName === 'h1').length, 1, 'Root index.html must contain the rendered homepage title');
assert.ok(html.includes('home-page') && html.includes('main-content') && html.includes('GameMap'), 'Root index.html must be the complete real homepage');
assert.ok(!/Opening the GameMap homepage|window\.location\.replace|127\.0\.0\.1:5177/.test(html), 'The homepage must never launch or redirect to a local server');
assert.ok(!nodes.some(node => node.tagName === 'meta' && node.attrs.some(attr => attr.name === 'http-equiv' && attr.value.toLowerCase() === 'refresh')), 'The homepage cannot be a meta redirect');
for (const node of nodes) {
  const attrs = Object.fromEntries(node.attrs.map(attr => [attr.name, attr.value]));
  if (node.tagName === 'script' && attrs.src || node.tagName === 'link' && attrs.rel === 'stylesheet') {
    const url = attrs.src || attrs.href;
    assert.ok(url.startsWith(site.base), `Homepage resource outside publication base: ${url}`);
    assert.ok(paths.has(url.slice(site.base.length).split(/[?#]/)[0]), `Homepage resource missing from repository root: ${url}`);
  }
}
console.log(`Root website checks passed: complete homepage, ${site.pages.length} routes, ${manifest.files.length} companion files, no launcher or localhost redirect.`);

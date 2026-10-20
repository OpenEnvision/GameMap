import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
export const rootStaticManifestName = '.gamemap-static.json';
const protectedPaths = new Set(['scripts', 'website', 'data', 'design', 'tests', 'node_modules', 'dist', 'release', '.git', '.github', '.agents', '.codex', '.build', '.react-router', 'README.md', 'AWESOME.md', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'react-router.config.ts', 'playwright.config.ts']);
const preservedSources = new Set(['CONTRIBUTING.md']);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

function assertPath(path) {
  assert.ok(typeof path === 'string' && path && !path.includes('\\') && !path.split('/').some(part => !part || part === '.' || part === '..'), `Unsafe static path: ${path}`);
  assert.ok(path === '.nojekyll' || !path.split('/').some(part => part.startsWith('.')), `Hidden source path cannot be exported: ${path}`);
  assert.ok(!protectedPaths.has(path.split('/')[0]), `Static export would overwrite source: ${path}`);
  assert.ok(!(path.startsWith('docs/') && path.endsWith('.md')), `Static export would take ownership of a source document: ${path}`);
}

export async function readRootStaticManifest(optional = true, root = repositoryRoot) {
  let manifest;
  try { manifest = JSON.parse(await readFile(resolve(root, rootStaticManifestName), 'utf8')); }
  catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
  assert.equal(manifest.version, 1, 'Unknown root static manifest version');
  assert.ok(Array.isArray(manifest.files), 'Root static manifest requires a file inventory');
  for (const file of [...manifest.files, ...(manifest.pendingFiles || [])]) {
    assertPath(file.path);
    assert.ok(['static', 'source-preserved'].includes(file.mode), `Unknown static file mode: ${file.path}`);
    assert.match(file.sha256, /^[a-f0-9]{64}$/);
    assert.ok(file.mode !== 'source-preserved' || preservedSources.has(file.path), `Unknown preserved source: ${file.path}`);
  }
  return manifest;
}

/** Generated downloads must not be rediscovered as source documentation. */
export async function generatedRootPaths(root = repositoryRoot) {
  const manifest = await readRootStaticManifest(true, root);
  return new Set([...(manifest?.files || []), ...(manifest?.pendingFiles || [])].filter(file => file.mode === 'static').map(file => file.path));
}

export async function staticFiles(directory, prefix = '') {
  const files = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix + entry.name;
    assert.ok(!entry.isSymbolicLink(), `Static export cannot follow a symlink: ${path}`);
    if (entry.isDirectory()) files.push(...await staticFiles(resolve(directory, entry.name), path + '/'));
    else { assert.ok(entry.isFile(), `Unsupported static file: ${path}`); files.push(path); }
  }
  return files;
}

async function existingFile(root, path) {
  // Never follow a source-directory symlink while copying or cleaning output.
  let current = root;
  for (const part of path.split('/')) {
    current = resolve(current, part);
    try { assert.ok(!(await lstat(current)).isSymbolicLink(), `Static export cannot follow a symlink: ${path}`); }
    catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  }
  return readFile(current);
}

async function writeManifest(root, manifest) {
  const target = resolve(root, rootStaticManifestName), temporary = target + '.tmp';
  await writeFile(temporary, JSON.stringify(manifest, null, 2) + '\n');
  await rename(temporary, target);
}

/** Project the real prerendered site into the source root, preserving source files. */
export async function exportRootStatic({ root = repositoryRoot, dist = resolve(root, 'dist') } = {}) {
  const site = JSON.parse(await readFile(resolve(dist, 'site-manifest.json'), 'utf8'));
  const prior = await readRootStaticManifest(true, root);
  const owned = new Map([...(prior?.files || []), ...(prior?.pendingFiles || [])].filter(file => file.mode === 'static').map(file => [file.path, file]));
  const knownHashes = new Map();
  for (const file of [...(prior?.files || []), ...(prior?.pendingFiles || [])].filter(file => file.mode === 'static')) {
    if (!knownHashes.has(file.path)) knownHashes.set(file.path, new Set());
    knownHashes.get(file.path).add(file.sha256);
  }
  const paths = await staticFiles(dist), files = [];
  for (const path of paths) {
    assertPath(path);
    const bytes = await readFile(resolve(dist, path)), previous = await existingFile(root, path);
    const record = { path, bytes: bytes.length, sha256: hash(bytes), mode: 'static' };
    if (preservedSources.has(path) && previous) {
      files.push({ ...record, bytes: previous.length, sha256: hash(previous), mode: 'source-preserved', distSha256: record.sha256 });
      continue;
    }
    if (previous) {
      const legacyEntry = !prior && path === 'index.html' && previous.toString().includes('Opening the GameMap homepage');
      assert.ok(legacyEntry || knownHashes.get(path)?.has(hash(previous)), `Refusing to overwrite an unmanaged or edited file: ${path}`);
    }
    files.push(record);
  }
  const current = new Set(paths), stale = [...owned.values()].filter(file => !current.has(file.path));
  for (const file of stale) {
    const bytes = await existingFile(root, file.path);
    assert.ok(!bytes || knownHashes.get(file.path)?.has(hash(bytes)), `Refusing to delete an edited generated file: ${file.path}`);
  }
  // Publish ownership before file events so the source watcher ignores exports.
  await writeManifest(root, { version: 1, base: site.base, files: prior?.files || [], pendingFiles: files });
  for (const file of files) {
    if (file.mode === 'source-preserved') continue;
    const target = resolve(root, file.path);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(resolve(dist, file.path), target);
  }
  for (const file of stale) await rm(resolve(root, file.path), { force: true });
  const manifest = { version: 1, base: site.base, files };
  await writeManifest(root, manifest);
  return manifest;
}

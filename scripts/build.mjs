import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

// Builds target the committed GitHub project site; development remains at /.
const env = { ...process.env, PAGES_BASE_PATH: process.env.PAGES_BASE_PATH || '/GameMap/' };
const steps = [
  ['scripts/sync-papers.mjs'],
  ['scripts/generate.mjs'],
  ['scripts/prepare-docs.mjs'],
  ['node_modules/@react-router/dev/bin.js', 'typegen'],
  ['node_modules/typescript/bin/tsc', '-b'],
  ['node_modules/@react-router/dev/bin.js', 'build'],
  ['scripts/finalize-build.mjs'],
  ['scripts/generate-entry.mjs'],
];
for (const [script, ...args] of steps) {
  const code = await new Promise((done, reject) => {
    const child = spawn(process.execPath, [resolve(script), ...args], { env, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', code => done(code ?? 1));
  });
  if (code !== 0) process.exit(code);
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { exportRootStatic, generatedRootPaths } from '../scripts/lib/root-static.mjs';
import { createHash } from 'node:crypto';

async function fixture(t) {
 const root = await mkdtemp(resolve(tmpdir(),'gamemap-export-'));
 t.after(() => rm(root,{recursive:true,force:true}));
 const put = async (path, value) => { await mkdir(dirname(resolve(root,path)),{recursive:true});await writeFile(resolve(root,path),value); };
 await put('dist/site-manifest.json',JSON.stringify({base:'/GameMap/'}));
 await put('dist/index.html','<!doctype html><h1>Build your next world.</h1>');
 await put('dist/assets/site.js','export const game = true;');
 return {root,put};
}

test('root export copies the real site and preserves canonical sources', async t => {
 const {root,put} = await fixture(t);
 await put('README.md','source readme');
 await put('CONTRIBUTING.md','canonical contribution instructions');
 await put('dist/CONTRIBUTING.md','download copy');
 await put('dist/guide.md','published download');
 await put('docs/original.md','source document');
 await put('dist/docs/original/index.html','<h1>Rendered document</h1>');
 await exportRootStatic({root});
 assert.deepEqual(await readFile(resolve(root,'index.html')),await readFile(resolve(root,'dist/index.html')));
 assert.equal(await readFile(resolve(root,'README.md'),'utf8'),'source readme');
 assert.equal(await readFile(resolve(root,'CONTRIBUTING.md'),'utf8'),'canonical contribution instructions');
 assert.equal(await readFile(resolve(root,'docs/original.md'),'utf8'),'source document');
 const generated = await generatedRootPaths(root);
 assert.ok(generated.has('guide.md') && generated.has('assets/site.js'));
 assert.ok(!generated.has('README.md') && !generated.has('CONTRIBUTING.md'));
});

test('rebuild replaces owned output and removes only unchanged obsolete files', async t => {
 const {root,put} = await fixture(t);
 await exportRootStatic({root});
 await rm(resolve(root,'dist/assets/site.js'));
 await put('dist/index.html','<h1>The updated homepage</h1>');
 await exportRootStatic({root});
 await assert.rejects(readFile(resolve(root,'assets/site.js')), {code:'ENOENT'});
 assert.equal(await readFile(resolve(root,'index.html'),'utf8'),'<h1>The updated homepage</h1>');
 await put('index.html','manually edited');
 await assert.rejects(exportRootStatic({root}),/Refusing to overwrite/);
 assert.equal(await readFile(resolve(root,'index.html'),'utf8'),'manually edited');
});

test('unmanaged files, edited stale files and symlinks are protected', async t => {
 const {root,put} = await fixture(t);
 await put('assets/site.js','unmanaged source');
 await assert.rejects(exportRootStatic({root}),/unmanaged or edited/);
 await rm(resolve(root,'assets/site.js'));
 await exportRootStatic({root});
 await put('assets/site.js','local change');
 await rm(resolve(root,'dist/assets/site.js'));
 await assert.rejects(exportRootStatic({root}),/Refusing to delete/);
 await put('assets/site.js','export const game = true;');
 await put('dist/extra.txt','sample');
 await symlink(resolve(root,'README.md'),resolve(root,'extra.txt'));
 await assert.rejects(exportRootStatic({root}),/symlink/);
});

test('an interrupted copy can resume with a mixture of old and pending outputs', async t => {
 const {root,put} = await fixture(t);
 const manifest = await exportRootStatic({root});
 const updated = '<h1>New homepage</h1>';
 await put('dist/index.html',updated);
 const pendingFiles = manifest.files.map(file => file.path === 'index.html' ? {...file,bytes:Buffer.byteLength(updated),sha256:createHash('sha256').update(updated).digest('hex')} : file);
 await put('.gamemap-static.json',JSON.stringify({...manifest,pendingFiles}));
 await exportRootStatic({root});
 assert.equal(await readFile(resolve(root,'index.html'),'utf8'),updated);
});

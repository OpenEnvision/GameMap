import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export async function writeIfChanged(path, content) {
  path = path instanceof URL ? fileURLToPath(path) : path;
  const bytes = typeof content === 'string' ? Buffer.from(content) : Buffer.from(content);
  try { if ((await readFile(path)).equals(bytes)) return false; } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(dirname(path), { recursive: true }); await writeFile(path, bytes); return true;
}

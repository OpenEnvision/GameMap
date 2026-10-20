import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep, relative } from "node:path";
import { readRootStaticManifest } from './lib/root-static.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const root = resolve(option('--root', '.'));
const exported = await readRootStaticManifest(true, root);
const publishedFiles = exported ? new Set(exported.files.map(file => file.path)) : null;
let base, build;
try {
  build = JSON.parse(await readFile(resolve(root,'site-manifest.json'),'utf8'));
  ({base}=build);
} catch {
  throw new Error(
    "No built site found. Run npm run build before npm run preview.",
  );
}
console.log(`Build ${build.commit || 'unknown'} · ${build.builtAt || 'unknown time'}; rebuild after pulling source changes.`);
const host = option("--host", "127.0.0.1");
const port = Number(option("--port", process.env.PORT || "4173"));
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".data": "text/x-script",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".zip": "application/zip",
  ".woff2": "font/woff2",
  ".md": "text/markdown; charset=utf-8",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  let path;
  try {
    path = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }
  if (base !== "/" && path === base.slice(0, -1)) {
    response.writeHead(308, { Location: base });
    response.end();
    return;
  }
  let file = path.startsWith(base)
    ? resolve(root, path.slice(base.length))
    : null;
  if (file && file !== root && !file.startsWith(root + sep)) file = null;
  let status = 200;
  let info;
  try {
    if (!file) throw new Error("Outside site base");
    info = await stat(file);
    if (info.isDirectory()) {
      file = resolve(file, "index.html");
      info = await stat(file);
    }
    if (!info.isFile()) throw new Error("Not a file");
    if (publishedFiles && !publishedFiles.has(relative(root, file).split(sep).join('/'))) throw new Error('Not a publication file');
  } catch {
    status = 404;
    const relative=path.startsWith(base)?path.slice(base.length):'';
    file = /^(?:zh(?:\/|$)|docs\/zh(?:\/|$))/.test(relative)?resolve(root,'zh/404/index.html'):resolve(root,'404.html');
    info = await stat(file);
  }
  const headers = {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Content-Length": info.size,
    "Accept-Ranges": "bytes",
  };
  const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if (range && status === 200) {
    const start = Number(range[1]);
    const end = range[2]
      ? Math.min(Number(range[2]), info.size - 1)
      : info.size - 1;
    if (start > end || start >= info.size) {
      response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
      response.end();
      return;
    }
    response.writeHead(206, {
      ...headers,
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${info.size}`,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file, { start, end }).pipe(response);
    return;
  }
  response.writeHead(status, headers);
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, host, () =>
  console.log(
    `Static preview: http://${host}:${port}${base} (files from ${root}; no application server or SPA fallback)`,
  ),
);

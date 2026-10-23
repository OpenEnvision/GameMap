import { createServer } from "node:http";
import { join, extname } from "node:path";
import { lstat, realpath } from "node:fs/promises";
import { visibleArtifact } from "./publication.mjs";
import { readArtifact, safePath } from "./codec.mjs";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".md": "text/markdown; charset=utf-8",
  ".zip": "application/zip",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".data": "text/x-script",
};
/** Only the current site's files are served, never its receipt, journal, credentials or older HTML. */
export function createPublicationServer(directory) {
  return createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    try {
      // One atomically replaced pointer, written only after SQL commit, governs delivery.
      const digest = await visibleArtifact(directory);
      if (!digest) {
        response.writeHead(503);
        response.end("No local snapshot has been published");
        return;
      }
      const site = join(directory, "artifacts", digest, "site");
      if (
        (await realpath(site)) !==
        join(await realpath(directory), "artifacts", digest, "site")
      )
        throw new Error("Publication site escapes its managed root");
      if (
        (await lstat(join(directory, "artifacts", digest))).isSymbolicLink() ||
        (await lstat(site)).isSymbolicLink()
      )
        throw new Error("Unsafe retained site");
      const manifest = JSON.parse(
        await readArtifact(site, "site-manifest.json"),
      );
      const path = decodeURIComponent(
          new URL(request.url, "http://localhost").pathname,
        ),
        base = manifest.base;
      if (base !== "/" && path === base.slice(0, -1)) {
        response.writeHead(308, { Location: base });
        response.end();
        return;
      }
      let relative = path.startsWith(base) ? path.slice(base.length) : null;
      let bytes,
        status = 200;
      try {
        if (
          relative === null ||
          relative
            .split("/")
            .some((part) => part.startsWith(".") && part !== ".nojekyll")
        )
          throw Error("Not a public path");
        relative = relative.endsWith("/")
          ? relative + "index.html"
          : relative || "index.html";
        safePath(site, relative);
        bytes = await readArtifact(site, relative);
      } catch {
        status = 404;
        relative = /^(?:zh(?:\/|$)|docs\/zh(?:\/|$))/.test(relative || "")
          ? "zh/404/index.html"
          : "404.html";
        bytes = await readArtifact(site, relative);
      }
      response.writeHead(status, {
        "Content-Type": types[extname(relative)] || "application/octet-stream",
        "Content-Length": bytes.length,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-GameMap-Artifact": digest,
      });
      response.end(request.method === "HEAD" ? undefined : bytes);
    } catch {
      response.writeHead(503, { "Cache-Control": "no-store" });
      response.end("Local publication requires recovery or verification");
    }
  });
}

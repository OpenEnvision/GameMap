#!/usr/bin/env python3
"""Preview the static website at http://127.0.0.1:4173/GameMap/."""
import argparse
import mimetypes
import os
from pathlib import Path
import re
import stat
from email.utils import formatdate
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

BASE = "/GameMap/"
MIME = {".data": "text/x-script; charset=utf-8", ".js": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8", ".md": "text/markdown; charset=utf-8",
        ".mp4": "video/mp4", ".webp": "image/webp", ".woff2": "font/woff2"}


class Preview(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def open_file(self, parts):
        """Walk directory descriptors without following symlinks or special files."""
        if any(part in (".", "..") or "\\" in part or "\0" in part for part in parts):
            return None
        fd = os.dup(self.server.root_fd)
        try:
            for part in parts:
                child = os.open(part, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=fd)
                os.close(fd)
                fd = child
            name = parts[-1] if parts else "index.html"
            if stat.S_ISDIR(os.fstat(fd).st_mode):
                child = os.open("index.html", os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=fd)
                os.close(fd)
                fd, name = child, "index.html"
            if not stat.S_ISREG(os.fstat(fd).st_mode):
                return None
            stream, fd = os.fdopen(fd, "rb"), None
            return stream, name
        except (OSError, ValueError):
            return None
        finally:
            if fd is not None:
                os.close(fd)

    def empty(self, status, **headers):
        self.send_response(status)
        for name, value in headers.items():
            self.send_header(name.replace("_", "-"), value)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        try:
            path = unquote(urlsplit(self.path).path, errors="strict")
        except (ValueError, UnicodeError):
            self.empty(400)
            return
        if path in ("/", BASE.rstrip("/")):
            self.empty(302, Location=BASE)
            return
        local = path[len(BASE):] if path.startswith(BASE) else None
        parts = [part for part in (local or "").split("/") if part]
        opened = self.open_file(parts) if local is not None else None
        status = 200 if opened else 404
        if not opened:
            if local == "zh" or (local or "").startswith("zh/"):
                opened = self.open_file(["zh", "404", "index.html"])
            opened = opened or self.open_file(["404.html"])
        if not opened:
            self.empty(404)
            return
        stream, name = opened
        with stream:
            info = os.fstat(stream.fileno())
            start, end = 0, info.st_size - 1
            requested = self.headers.get("Range") if status == 200 else None
            if requested:
                match = re.fullmatch(r"bytes=(\d*)-(\d*)", requested.strip())
                if match and any(match.groups()) and info.st_size:
                    first, last = match.groups()
                    if first:
                        start = int(first)
                        end = min(int(last), end) if last else end
                    elif int(last):
                        start = max(0, info.st_size - int(last))
                    else:
                        start = info.st_size
                else:
                    start = info.st_size
                if start > end or start >= info.st_size:
                    self.empty(416, Content_Range=f"bytes */{info.st_size}", Accept_Ranges="bytes")
                    return
                status = 206
            length = max(0, end - start + 1)
            content_type = MIME.get(Path(name).suffix.lower()) or mimetypes.guess_type(name)[0] or "application/octet-stream"
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(length))
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Last-Modified", formatdate(info.st_mtime, usegmt=True))
            self.send_header("Cache-Control", "no-cache")
            if status == 206:
                self.send_header("Content-Range", f"bytes {start}-{end}/{info.st_size}")
            self.end_headers()
            if self.command == "HEAD":
                return
            stream.seek(start)
            try:
                while length:
                    block = stream.read(min(length, 64 * 1024))
                    if not block:
                        break
                    self.wfile.write(block)
                    length -= len(block)
            except ConnectionError:
                pass  # Browsers cancel an earlier video range when seeking.


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--root", type=Path, default=Path(__file__).absolute().parent)
    args = parser.parse_args()
    root = args.root.absolute()
    for directory in reversed((root,) + tuple(root.parents)):
        if not stat.S_ISDIR(directory.lstat().st_mode):
            parser.error(f"Preview root must use ordinary directories without symlinks: {directory}")
    if not 0 <= args.port <= 65535:
        parser.error("--port must be between 0 and 65535")
    root_fd = os.open(root, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
    try:
        with ThreadingHTTPServer(("127.0.0.1", args.port), Preview) as server:
            server.root_fd = root_fd
            print(f"Preview: http://127.0.0.1:{server.server_port}{BASE}  (Ctrl+C to stop)", flush=True)
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass
    finally:
        os.close(root_fd)


if __name__ == "__main__":
    main()

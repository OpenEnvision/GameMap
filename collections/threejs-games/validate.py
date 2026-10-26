#!/usr/bin/env python3
"""Validate the JSON Schema subset used by this collection, without dependencies.

This is a local metadata check. It does not fetch URLs or run upstream games.
Schema v2 separates human license labels from nullable, recognized SPDX identifiers.
"""
import datetime as dt
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
FORBIDDEN = ("@react-three/fiber", "react-three-fiber", "aframe", "a-frame",
             "babylonjs", "@babylonjs/", "playcanvas", "phaser", "enable3d")
SCHEMA_KEYS = {"$schema", "title", "type", "properties", "required",
               "additionalProperties", "items", "minItems", "minLength",
               "pattern", "format", "enum", "const", "anyOf"}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate(value, schema, path="$"):
    require(not set(schema) - SCHEMA_KEYS,
            f"{path}: validator does not implement schema keywords {set(schema) - SCHEMA_KEYS}")
    if "anyOf" in schema:
        errors = []
        for choice in schema["anyOf"]:
            try:
                validate(value, choice, path)
                return
            except ValueError as exc:
                errors.append(str(exc))
        raise ValueError(f"{path}: no anyOf choice matched: {errors}")
    if "const" in schema:
        require(type(value) is type(schema["const"]) and value == schema["const"],
                f"{path}: incorrect constant")
    if "enum" in schema:
        require(value in schema["enum"], f"{path}: not in enum")
    types = {"object": dict, "array": list, "string": str,
             "boolean": bool, "integer": int, "null": type(None)}
    if "type" in schema:
        require(type(value) is types[schema["type"]],
                f"{path}: expected {schema['type']}, got {type(value).__name__}")
    if isinstance(value, dict):
        props = schema.get("properties", {})
        for key in schema.get("required", []):
            require(key in value, f"{path}: missing {key}")
        extra = schema.get("additionalProperties", True)
        for key, child in value.items():
            if key in props:
                validate(child, props[key], f"{path}.{key}")
            elif extra is False:
                raise ValueError(f"{path}: unexpected key {key}")
            elif isinstance(extra, dict):
                validate(child, extra, f"{path}.{key}")
    elif isinstance(value, list):
        require(len(value) >= schema.get("minItems", 0), f"{path}: too few items")
        for i, child in enumerate(value):
            if "items" in schema:
                validate(child, schema["items"], f"{path}[{i}]")
    elif isinstance(value, str):
        require(len(value) >= schema.get("minLength", 0), f"{path}: empty string")
        if "pattern" in schema:
            require(re.search(schema["pattern"], value) is not None,
                    f"{path}: pattern mismatch")
        if schema.get("format") == "date":
            try:
                parsed = dt.date.fromisoformat(value)
            except ValueError as exc:
                raise ValueError(f"{path}: invalid ISO date") from exc
            require(parsed.isoformat() == value, f"{path}: noncanonical ISO date")


def read_json(name):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def canonical_repo(url):
    parsed = urlparse(url)
    require(parsed.scheme == "https" and parsed.netloc == "github.com",
            f"Not a canonical GitHub repository: {url}")
    parts = parsed.path.strip("/").split("/")
    require(len(parts) == 2 and not parsed.query and not parsed.fragment,
            f"Not a repository URL: {url}")
    return "/".join(parts).removesuffix(".git").lower()


def check_collection(catalog, queue):
    ids, repos = set(), set()
    for item in catalog["games"] + queue["candidates"]:
        require(item["id"] not in ids, f"Duplicate id: {item['id']}")
        ids.add(item["id"])
        repo = canonical_repo(item["repository_url"])
        require(repo not in repos, f"Duplicate or queue/index overlap: {repo}")
        repos.add(repo)
    for game in catalog["games"]:
        ident, verify = game["id"], game["verification"]
        prefix = game["repository_url"] + "/blob/" + verify["source_commit"] + "/"
        reviewed = {item["url"] for item in verify["reviewed_files"]}
        if len(verify["reviewed_files"]) == 2:
            entry = game["stack"]["render_evidence"]["url"].split("#")[0]
            gameplay = game["gameplay_evidence"]["url"].split("#")[0]
            license_file = game["license"]["source_url"].split("#")[0]
            require(entry == gameplay and entry != license_file
                    and reviewed == {entry, license_file},
                    f"{ident}: two reviewed files require one shared render/gameplay entry and a separate license")
        evidence_urls = [game["stack"]["render_evidence"]["url"],
                         game["gameplay_evidence"]["url"],
                         game["license"]["source_url"],
                         game["maturity"]["basis_url"]]
        evidence_urls += game["license"]["additional_notices"]
        evidence_urls += [m["url"] for m in game["stack"]["manifests"]]
        for url in evidence_urls:
            require(url.startswith(prefix), f"{ident}: unpinned or cross-repo evidence: {url}")
            require(url.split("#")[0] in reviewed, f"{ident}: evidence absent from reviewed files: {url}")
        demo_source = game["demo"]["source_url"]
        metadata_source = "https://api.github.com/repos/" + game["repository_url"].split("github.com/", 1)[1]
        if demo_source.startswith(prefix):
            require(demo_source.split("#")[0] in reviewed,
                    f"{ident}: demo discovery file was not reviewed")
        elif demo_source == metadata_source:
            require("metadata" in game["demo"]["notes"].lower(),
                    f"{ident}: metadata-derived demo needs an explicit dated attribution note")
        else:
            require(game["demo"]["url"] is not None
                    and urlparse(demo_source).hostname == urlparse(game["demo"]["url"]).hostname
                    and "author" in game["demo"]["notes"].lower(),
                    f"{ident}: demo source must be a reviewed file, repository metadata or an attributed author page")
        for item in verify["reviewed_files"]:
            require(item["url"] == prefix + item["path"],
                    f"{ident}: reviewed path/URL mismatch")
        local, anchor = verify["evidence_path"].split("#", 1)
        destination = (ROOT / local).resolve()
        require(destination.is_relative_to(ROOT), f"{ident}: evidence escapes collection")
        require(destination.is_file(), f"{ident}: missing local evidence file")
        require(f'<a id="{anchor}"></a>' in destination.read_text(encoding="utf-8"),
                f"{ident}: missing evidence anchor")
        require(anchor == ident, f"{ident}: evidence anchor mismatch")
        for manifest in game["stack"]["manifests"]:
            dependencies = manifest["dependencies"] | manifest["dev_dependencies"]
            for dependency in dependencies:
                require(not any(dependency.lower() == f or dependency.lower().startswith(f)
                                for f in FORBIDDEN),
                        f"{ident}: excluded renderer/engine dependency: {dependency}")
        require(not verify["playtested"] and not verify["upstream_tests_run"],
                f"{ident}: this source-only series must document runtime evidence before changing flags")
        require(verify["date"] <= dt.datetime.now(dt.timezone.utc).date().isoformat(),
                f"{ident}: future verification date")
    for candidate in queue["candidates"]:
        prefix = candidate["repository_url"] + "/blob/" + candidate["source_commit"] + "/"
        require(all(url.startswith(prefix) for url in candidate["evidence_urls"]),
                f"{candidate['id']}: unpinned candidate evidence")


def main():
    catalog, queue = read_json("games.json"), read_json("candidates.json")
    validate(catalog, read_json("schema.json"))
    validate(queue, read_json("candidates.schema.json"))
    check_collection(catalog, queue)
    pending = sum(c["status"] == "pending" for c in queue["candidates"])
    excluded = sum(c["status"] == "excluded" for c in queue["candidates"])
    print(f"PASS: {len(catalog['games'])} source-verified games, {pending} pending, "
          f"{excluded} excluded; schema/SPDX labels, duplicates, pinned sources and local links checked.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, json.JSONDecodeError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        sys.exit(1)

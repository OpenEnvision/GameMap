#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdir, writeFile, chmod } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import postgres from "postgres";
import {
  connectDatabase,
  assertLeastPrivilegeLogin,
} from "../lib/catalog/database.mjs";
import { connectPublicationDatabase } from "../lib/catalog/publication-database.mjs";

const loginName = /^[a-z][a-z0-9_]{0,62}$/;
const projectKey = /^[a-z][a-z0-9:._-]{0,99}$/;
const targetKey = /^[a-z][a-z0-9-]{0,63}$/;

const help = `Cloud operator provisioning and least-privilege role verification
  npm run cloud:provision-sql -- [--studio-login NAME] [--publisher-login NAME] [--community-login NAME]
  npm run cloud:init-realm -- --environment staging|production --project PROJECT_KEY --target TARGET_KEY --out REALM_FILE
  npm run cloud:verify-roles

Environment:
  ADMIN_DATABASE_URL (only for init-realm; operator/owner connection over TLS)
  CATALOG_DATABASE_URL / CATALOG_PUBLISHER_DATABASE_URL / COMMUNITY_DATABASE_URL (for verify-roles)
`;

export function renderProvisioningSQL({
  studioLogin = "catalog_studio_prod",
  publisherLogin = "catalog_publisher_prod",
  communityLogin = "community_server_prod",
} = {}) {
  for (const name of [studioLogin, publisherLogin, communityLogin])
    assert.match(name, loginName, `Invalid PostgreSQL login name: ${name}`);
  assert.equal(
    new Set([studioLogin, publisherLogin, communityLogin]).size,
    3,
    "Studio, publisher and community logins must be three distinct roles",
  );
  return [
    "-- GameMap cloud least-privilege database logins (run once as DB owner on a fresh migrated Supabase project).",
    "-- Replace each REPLACE_WITH_STRONG_RANDOM_PASSWORD outside Git and never commit passwords.",
    "begin;",
    "",
    `create role ${studioLogin} login noinherit nosuperuser nocreatedb nocreaterole nobypassrls password 'REPLACE_WITH_STRONG_RANDOM_PASSWORD';`,
    `revoke all on schema public, catalog, community from ${studioLogin};`,
    `grant catalog_backend to ${studioLogin};`,
    "",
    `create role ${publisherLogin} login noinherit nosuperuser nocreatedb nocreaterole nobypassrls password 'REPLACE_WITH_STRONG_RANDOM_PASSWORD';`,
    `revoke all on schema public, catalog, community from ${publisherLogin};`,
    `grant catalog_deployer to ${publisherLogin};`,
    "",
    `create role ${communityLogin} login noinherit nosuperuser nocreatedb nocreaterole nobypassrls password 'REPLACE_WITH_STRONG_RANDOM_PASSWORD';`,
    `revoke all on schema public, catalog, community from ${communityLogin};`,
    `grant community_backend, community_user, community_anon to ${communityLogin};`,
    "",
    "commit;",
    "",
  ].join("\n");
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || args.includes("--help")) return console.log(help);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    assert.ok(
      [
        "--studio-login",
        "--publisher-login",
        "--community-login",
        "--environment",
        "--project",
        "--target",
        "--out",
      ].includes(key) && !Object.hasOwn(options, key),
      help,
    );
    const value = args[++i];
    assert.ok(value && !value.startsWith("--"), help);
    options[key] = value;
  }
  if (command === "provision-sql") {
    console.log(
      renderProvisioningSQL({
        studioLogin: options["--studio-login"],
        publisherLogin: options["--publisher-login"],
        communityLogin: options["--community-login"],
      }),
    );
    return;
  }
  if (command === "init-realm") {
    const env = options["--environment"];
    const project = options["--project"];
    const target = options["--target"];
    const out = options["--out"];
    assert.ok(
      ["staging", "production"].includes(env) &&
        projectKey.test(project || "") &&
        targetKey.test(target || "") &&
        out,
      help,
    );
    const adminUrl = process.env.ADMIN_DATABASE_URL;
    assert.ok(adminUrl, "Set ADMIN_DATABASE_URL to initialize a cloud realm");
    const parsed = new URL(adminUrl);
    const isLoopback = ["127.0.0.1", "localhost", "[::1]"].includes(
      parsed.hostname,
    );
    const sql = postgres(adminUrl, {
      max: 1,
      prepare: false,
      ssl: isLoopback ? false : { rejectUnauthorized: true },
      onnotice() {},
    });
    try {
      const [row] =
        await sql`select catalog.initialize_release_realm(${env}, ${project}, ${target}) as realm`;
      const dest = resolve(out);
      await mkdir(dirname(dest), { recursive: true, mode: 0o700 });
      await writeFile(dest, JSON.stringify(row.realm, null, 2) + "\n", {
        flag: "wx",
        mode: 0o600,
      });
      await chmod(dest, 0o600);
      console.log(
        JSON.stringify(
          { initialized: true, file: dest, realm: row.realm },
          null,
          2,
        ),
      );
    } finally {
      await sql.end({ timeout: 5 });
    }
    return;
  }
  if (command === "verify-roles") {
    const report = {};
    if (process.env.CATALOG_DATABASE_URL) {
      const db = connectDatabase(process.env.CATALOG_DATABASE_URL);
      try {
        report.studio = await assertLeastPrivilegeLogin(db, "catalog_backend", {
          forbiddenRoles: [
            "catalog_deployer",
            "community_backend",
            "service_role",
            "supabase_admin",
            "postgres",
          ],
        });
      } finally {
        await db.close();
      }
    }
    if (process.env.CATALOG_PUBLISHER_DATABASE_URL) {
      const db = connectPublicationDatabase(
        process.env.CATALOG_PUBLISHER_DATABASE_URL,
      );
      try {
        report.publisher = await assertLeastPrivilegeLogin(
          db,
          "catalog_deployer",
          {
            forbiddenRoles: [
              "catalog_backend",
              "community_backend",
              "service_role",
              "supabase_admin",
              "postgres",
            ],
          },
        );
      } finally {
        await db.close();
      }
    }
    if (process.env.COMMUNITY_DATABASE_URL) {
      const db = connectDatabase(process.env.COMMUNITY_DATABASE_URL, {
        backendRole: "community_backend",
        userRole: "community_user",
        anonymousRole: "community_anon",
      });
      try {
        report.community = await assertLeastPrivilegeLogin(
          db,
          "community_backend",
          {
            forbiddenRoles: [
              "catalog_backend",
              "catalog_deployer",
              "service_role",
              "supabase_admin",
              "postgres",
            ],
          },
        );
      } finally {
        await db.close();
      }
    }
    assert.ok(
      Object.keys(report).length > 0,
      "Set at least one of CATALOG_DATABASE_URL, CATALOG_PUBLISHER_DATABASE_URL, COMMUNITY_DATABASE_URL",
    );
    console.log(JSON.stringify({ verified: true, roles: report }, null, 2));
    return;
  }
  throw new Error(help);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });

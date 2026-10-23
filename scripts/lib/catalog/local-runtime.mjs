import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdir,
  open,
  readFile,
  writeFile,
  chmod,
  access,
  realpath,
} from "node:fs/promises";
import { resolve, join } from "node:path";
import { randomBytes } from "node:crypto";
import { parseEnv } from "node:util";
import postgres from "postgres";
import { root } from "../documents.mjs";
import { loadContent } from "../content.mjs";
import { createImportBundle } from "../platform.mjs";
import { loadMigrations } from "../migrations.mjs";
import { canonicalJSON } from "./codec.mjs";

export const localDirectory = resolve(root, ".build/catalog-local");
const cli = resolve(root, "node_modules/.bin/supabase");
const project = "gamemap";
const privateWrite = async (path, value, flag = "w") => {
  await writeFile(path, value, { flag, mode: 0o600 });
  await chmod(path, 0o600);
};
const json = async (path) => JSON.parse(await readFile(path, "utf8"));
export const assertLoopback = (value, protocols) => {
  const url = new URL(value);
  assert.ok(
    protocols.includes(url.protocol) &&
      ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname),
    "Local operations refuse non-loopback services",
  );
  return url;
};
async function privateDirectory() {
  await mkdir(localDirectory, { recursive: true, mode: 0o700 });
  await chmod(localDirectory, 0o700);
}
export function assertLocalDocker() {
  const override = process.env.DOCKER_HOST;
  assert.ok(
    !override || override.startsWith("unix://"),
    "Refuse a non-local Docker host override",
  );
  const endpoint = execFileSync(
    "docker",
    ["context", "inspect", "--format", "{{.Endpoints.docker.Host}}"],
    { encoding: "utf8" },
  ).trim();
  assert.ok(
    endpoint.startsWith("unix://"),
    "Local Supabase operations require a local Docker socket",
  );
}
async function runCLI(args, name, environment = process.env) {
  await privateDirectory();
  const log = await open(join(localDirectory, name), "w", 0o600);
  try {
    const result = spawnSync(cli, [...args, "--workdir", root], {
      cwd: root,
      env: environment,
      stdio: ["ignore", log.fd, log.fd],
    });
    if (result.error || result.status !== 0)
      throw new Error(
        `Local Supabase command failed; inspect private ${join(localDirectory, name)}`,
      );
  } finally {
    await log.close();
  }
}
export function localContainers() {
  const ids = execFileSync(
    "docker",
    ["ps", "-aq", "--filter", `label=com.supabase.cli.project=${project}`],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean);
  return ids.length
    ? JSON.parse(
        execFileSync("docker", ["inspect", ...ids], { encoding: "utf8" }),
      )
    : [];
}
export function assertPrivatePorts() {
  const containers = localContainers();
  assert.ok(containers.length, "No local Supabase containers found");
  for (const container of containers)
    for (const bindings of Object.values(container.NetworkSettings.Ports || {}))
      for (const binding of bindings || [])
        assert.ok(
          ["127.0.0.1", "::1"].includes(binding.HostIp),
          "Local Supabase published a non-loopback port",
        );
  return containers.map((row) => row.Name.replace(/^\//, ""));
}
const instanceFile = join(localDirectory, "instance.json");
function dataVolume() {
  const [volume] = JSON.parse(
    execFileSync("docker", ["volume", "inspect", "supabase_db_gamemap"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }),
  );
  return { name: volume.Name, createdAt: volume.CreatedAt };
}
async function assertOwnedInstance() {
  const instance = await json(instanceFile);
  assert.equal(instance.format, "gamemap.local-instance");
  assert.equal(
    instance.root,
    await realpath(root),
    "This local stack belongs to a different checkout",
  );
  assert.deepEqual(
    instance.volume,
    dataVolume(),
    "Local database volume changed; refuse implicit adoption or reset",
  );
}
export async function startLocal() {
  assertLocalDocker();
  await privateDirectory();
  let fresh = false;
  try {
    await assertOwnedInstance();
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const occupied =
      localContainers().length ||
      spawnSync("docker", ["volume", "inspect", "supabase_db_gamemap"], {
        stdio: "ignore",
      }).status === 0;
    assert.ok(
      !occupied,
      "An unclaimed gamemap local project already exists; refusing to adopt or stop it",
    );
    fresh = true;
  }
  const realDocker = execFileSync("which", ["docker"], {
    encoding: "utf8",
  }).trim();
  const network = "gamemap-catalog-local";
  if (
    spawnSync(realDocker, ["network", "inspect", network], { stdio: "ignore" })
      .status !== 0
  )
    execFileSync(
      realDocker,
      [
        "network",
        "create",
        "--label",
        "gamemap.purpose=local-catalog",
        "--opt",
        "com.docker.network.bridge.host_binding_ipv4=127.0.0.1",
        network,
      ],
      { stdio: "ignore" },
    );
  const directory = join(localDirectory, "bin");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
  const shell = `#!/bin/sh\nexec ${quote(process.execPath)} ${quote(resolve(root, "scripts/local-docker.mjs"))} "$@"\n`;
  await writeFile(join(directory, "docker"), shell, { mode: 0o700 });
  await chmod(join(directory, "docker"), 0o700);
  await runCLI(
    [
      "start",
      "--network-id",
      network,
      "--exclude",
      "studio,postgres-meta,realtime,logflare,vector,edge-runtime,supavisor",
    ],
    "start.log",
    {
      ...process.env,
      PATH: directory + ":" + process.env.PATH,
      CATALOG_DOCKER_BINARY: realDocker,
    },
  );
  if (fresh)
    await privateWrite(
      instanceFile,
      JSON.stringify(
        {
          format: "gamemap.local-instance",
          version: 1,
          root: await realpath(root),
          volume: dataVolume(),
        },
        null,
        2,
      ) + "\n",
      "wx",
    );
  try {
    assertPrivatePorts();
  } catch (error) {
    await stopLocal();
    throw error;
  }
  return readLocalStatus();
}
export async function stopLocal() {
  assertLocalDocker();
  await assertOwnedInstance();
  await runCLI(["stop"], "stop.log");
}
export async function readLocalStatus() {
  assertLocalDocker();
  await assertOwnedInstance();
  assertPrivatePorts();
  await privateDirectory();
  const log = await open(join(localDirectory, "status.log"), "w", 0o600);
  let result;
  try {
    result = spawnSync(cli, ["status", "--workdir", root, "--output", "json"], {
      cwd: root,
      stdio: ["ignore", "pipe", log.fd],
      encoding: "utf8",
    });
  } finally {
    await log.close();
  }
  assert.equal(result.status, 0, "Local Supabase is not healthy");
  const status = JSON.parse(result.stdout);
  assert.equal(
    assertLoopback(status.API_URL, ["http:"]).port,
    "54321",
    "Unexpected local API port",
  );
  assert.equal(
    assertLoopback(status.DB_URL, ["postgres:", "postgresql:"]).port,
    "54322",
    "Unexpected local DB port",
  );
  await privateWrite(
    join(localDirectory, "status.json"),
    JSON.stringify(status, null, 2) + "\n",
  );
  return status;
}
export async function localAccess() {
  return json(join(localDirectory, "access.json"));
}

export async function migrateLocal() {
  await readLocalStatus();
  await runCLI(["migration", "up", "--local"], "migrate.log");
}
export async function setupLocalPublisher() {
  const status = await readLocalStatus();
  const file = join(localDirectory, "deployer.json");
  let state;
  try {
    state = await json(file);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!state) {
    state = {
      format: "gamemap.local-deployer",
      version: 1,
      login: "gamemap_publisher_local",
      password: randomBytes(32).toString("hex"),
    };
    await privateWrite(file, JSON.stringify(state, null, 2) + "\n", "wx");
  }
  assert.equal(state.format, "gamemap.local-deployer");
  assert.equal(state.login, "gamemap_publisher_local");
  assert.ok(
    /^[a-f0-9]{64}$/.test(state.password),
    "Invalid local deployer credential state",
  );
  const owner = postgres(status.DB_URL, {
    max: 1,
    prepare: false,
    onnotice() {},
  });
  try {
    assert.ok(
      (
        await owner`select to_regclass('catalog.publication_state') as table_name`
      )[0].table_name,
      "Apply pending local migrations first",
    );
    if (
      !(await owner`select rolname from pg_roles where rolname=${state.login}`)
        .length
    )
      await owner.unsafe(
        `create role gamemap_publisher_local login noinherit nosuperuser nobypassrls password '${state.password}'`,
      );
    await owner.unsafe("grant catalog_deployer to gamemap_publisher_local");
    const url = new URL(status.DB_URL);
    url.username = state.login;
    url.password = state.password;
    state.databaseURL = url.href;
    await privateWrite(file, JSON.stringify(state, null, 2) + "\n");
    return file;
  } finally {
    await owner.end({ timeout: 5 });
  }
}

export async function setupLocal() {
  const status = await readLocalStatus();
  const file = join(localDirectory, "access.json");
  let state;
  try {
    state = await json(file);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!state) {
    state = {
      format: "gamemap.local-access",
      version: 1,
      project,
      api: status.API_URL,
      login: "gamemap_studio_local",
      databasePassword: randomBytes(32).toString("hex"),
      sessionSecret: randomBytes(32).toString("hex"),
      accounts: Object.fromEntries(
        ["admin", "editor", "reviewer", "outsider"].map((role) => [
          role,
          {
            email: `local-${role}@gamemap.test`,
            password: randomBytes(24).toString("base64url"),
          },
        ]),
      ),
    };
    await privateWrite(file, JSON.stringify(state, null, 2) + "\n", "wx");
  }
  assert.equal(state.format, "gamemap.local-access");
  assert.equal(state.project, project);
  assert.equal(state.api, status.API_URL);
  assert.ok(
    /^[a-f0-9]{64}$/.test(state.databasePassword),
    "Local credential state is invalid",
  );
  const owner = postgres(status.DB_URL, {
    max: 1,
    prepare: false,
    onnotice() {},
  });
  try {
    const versions =
      await owner`select version from supabase_migrations.schema_migrations order by version`;
    assert.deepEqual(
      versions.map((row) => row.version),
      (await loadMigrations()).map(
        (row) => row.path.split("/").at(-1).split("_")[0],
      ),
      "Apply the expected catalog migrations before provisioning",
    );
    const role = (
      await owner`select rolname from pg_roles where rolname=${state.login}`
    )[0];
    if (!role)
      await owner.unsafe(
        `create role gamemap_studio_local login noinherit nosuperuser nobypassrls password '${state.databasePassword}'`,
      );
    await owner.unsafe("grant catalog_backend to gamemap_studio_local");
    for (const [role, account] of Object.entries(state.accounts)) {
      if (!account.id) {
        const response = await fetch(status.API_URL + "/auth/v1/admin/users", {
          method: "POST",
          headers: {
            apikey: status.SECRET_KEY || status.SERVICE_ROLE_KEY,
            Authorization: `Bearer ${status.SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: account.email,
            password: account.password,
            email_confirm: true,
            user_metadata: { local_fixture: true },
          }),
        });
        assert.ok(
          response.ok,
          `Unable to provision the local ${role} Auth account (HTTP ${response.status}); existing unrelated users are never overwritten`,
        );
        const user = await response.json();
        account.id = user.id;
        assert.ok(account.id, "Auth did not return a user identity");
        await privateWrite(file, JSON.stringify(state, null, 2) + "\n");
      }
      if (role !== "outsider")
        await owner`insert into catalog.memberships(user_id,role) values(${account.id},${role}) on conflict(user_id) do nothing`;
    }
    const entries = Number(
      (await owner`select count(*) as n from catalog.entries`)[0].n,
    );
    if (!entries) {
      const context = await loadContent();
      const bundle = await createImportBundle(context);
      await owner`select catalog.import_snapshot(${canonicalJSON(bundle.snapshot)},${bundle.digest})`;
      state.importDigest = bundle.digest;
      state.importRecords = bundle.snapshot.entries.length;
      await privateWrite(file, JSON.stringify(state, null, 2) + "\n");
    }
    const databaseURL = new URL(status.DB_URL);
    databaseURL.username = state.login;
    databaseURL.password = state.databasePassword;
    const env = {
      CATALOG_DATABASE_URL: databaseURL.href,
      SUPABASE_URL: status.API_URL,
      SUPABASE_PUBLISHABLE_KEY: status.PUBLISHABLE_KEY || status.ANON_KEY,
      CATALOG_SESSION_SECRET: state.sessionSecret,
      CATALOG_STUDIO_ORIGIN: "http://127.0.0.1:5174",
      CATALOG_STUDIO_PORT: "4180",
      CATALOG_STUDIO_UI_PORT: "5174",
      CATALOG_MEDIA_ROOT: join(localDirectory, "media"),
    };
    const target = resolve(root, ".env");
    try {
      await access(target);
      const current = parseEnv(await readFile(target, "utf8"));
      for (const [key, value] of Object.entries(env))
        assert.ok(
          current[key] === value,
          `Existing .env differs for ${key}; it was not overwritten`,
        );
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await privateWrite(
        target,
        Object.entries(env)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n") + "\n",
        "wx",
      );
    }
    const counts =
      await owner`select state,count(*)::integer as records from catalog.revisions group by state`;
    return {
      project,
      api: status.API_URL,
      studio: "http://127.0.0.1:5174",
      accounts: Object.fromEntries(
        Object.entries(state.accounts).map(([role, account]) => [
          role,
          account.email,
        ]),
      ),
      states: counts,
      credentials: file,
    };
  } finally {
    await owner.end({ timeout: 5 });
  }
}

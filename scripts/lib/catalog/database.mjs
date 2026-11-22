import assert from "node:assert/strict";
import postgres from "postgres";

// query(text, values) accepts already-encoded JSON text, like node-postgres/PGlite.
// postgres otherwise JSON.stringify()s inferred jsonb strings a second time.
export const jsonParameter = (value) =>
  typeof value === "string" ? value : JSON.stringify(value);
const uuid =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export const first = async (client, text, values = []) =>
  (await client.query(text, values)).rows[0];

/** Extract client address safely behind one trusted reverse proxy without allowing arbitrary spoofing. */
export function clientAddress(request, { trustProxy = false } = {}) {
  if (trustProxy) {
    const forwarded = request.headers["x-forwarded-for"];
    if (typeof forwarded === "string" && forwarded.trim()) {
      const hops = forwarded
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
      if (hops.length) return hops.at(-1);
    }
  }
  return request.socket?.remoteAddress || "unknown";
}

/** Verify at startup that a production database login is strictly NOINHERIT, non-owner and least-privilege. */
export async function assertLeastPrivilegeLogin(
  database,
  expectedRole,
  {
    forbiddenRoles = [
      "postgres",
      "supabase_admin",
      "supabase_auth_admin",
      "service_role",
    ],
  } = {},
) {
  const inspect = async (client) =>
    (await first(client, "select public.inspect_login_privileges() as info"))
      ?.info;
  const info = database.system
    ? await database.system(inspect)
    : await database.withLock((db) => db.inspectLoginPrivileges());
  assert.ok(info && info.login, "Unable to audit database login privileges");
  assert.equal(
    info.rolsuper,
    false,
    `Refusing superuser login (${info.login}) for ${expectedRole}`,
  );
  assert.equal(
    info.rolcreaterole,
    false,
    `Refusing CREATEROLE login (${info.login}) for ${expectedRole}`,
  );
  assert.equal(
    info.rolcreatedb,
    false,
    `Refusing CREATEDB login (${info.login}) for ${expectedRole}`,
  );
  assert.equal(
    info.rolbypassrls,
    false,
    `Refusing BYPASSRLS login (${info.login}) for ${expectedRole}`,
  );
  assert.equal(
    info.rolinherit,
    false,
    `Database login (${info.login}) must be configured with NOINHERIT`,
  );
  assert.equal(
    info.ownsCatalogObjects,
    false,
    `Database login (${info.login}) must not own catalog schema objects`,
  );
  assert.equal(
    info.ownsCommunityObjects,
    false,
    `Database login (${info.login}) must not own community schema objects`,
  );
  const direct = Array.isArray(info.directRoles) ? info.directRoles : [];
  assert.ok(
    direct.includes(expectedRole),
    `Database login (${info.login}) is not granted required role ${expectedRole}`,
  );
  const forbidden = direct.filter((role) => forbiddenRoles.includes(role));
  assert.deepEqual(
    forbidden,
    [],
    `Database login (${info.login}) holds forbidden roles: ${forbidden.join(", ")}`,
  );
  return info;
}

/** All request identities come from verified Auth sessions, never body parameters. */
export function databaseAdapter(
  transaction,
  close = async () => {},
  {
    backendRole = "catalog_backend",
    userRole = "authenticated",
    anonymousRole = "anon",
  } = {},
) {
  if (
    !["catalog_backend", "community_backend"].includes(backendRole) ||
    !["authenticated", "community_user"].includes(userRole) ||
    !["anon", "community_anon"].includes(anonymousRole)
  )
    throw new Error("Unknown backend role");
  return {
    system: (run) =>
      transaction(async (client) => {
        await client.query(`set local role ${backendRole}`);
        return run(client);
      }),
    anonymous: (run) =>
      transaction(async (client) => {
        await client.query(`set local role ${anonymousRole}`);
        return run(client);
      }),
    async user(userId, run) {
      if (!uuid.test(userId)) throw new Error("Invalid authenticated identity");
      return transaction(async (client) => {
        await client.query(`set local role ${userRole}`);
        await client.query(
          "select set_config('request.jwt.claim.sub', $1, true), set_config('request.jwt.claims', $2, true)",
          [userId, JSON.stringify({ sub: userId, role: userRole })],
        );
        return run(client);
      });
    },
    close,
  };
}
export function connectDatabase(url, options = {}) {
  let host;
  try {
    const parsed = new URL(url);
    if (!["postgres:", "postgresql:"].includes(parsed.protocol))
      throw new Error();
    host = parsed.hostname;
  } catch {
    throw new Error(
      "CATALOG_DATABASE_URL must be a valid PostgreSQL connection URL",
    );
  }
  const sql = postgres(url, {
    max: 5,
    prepare: false,
    types: {
      json: {
        to: 114,
        from: [114],
        serialize: jsonParameter,
        parse: JSON.parse,
      },
      jsonb: {
        to: 3802,
        from: [3802],
        serialize: jsonParameter,
        parse: JSON.parse,
      },
    },
    idle_timeout: 20,
    ssl: ["localhost", "127.0.0.1", "[::1]"].includes(host)
      ? false
      : { rejectUnauthorized: true },
    onnotice() {},
    connection: {
      application_name: options.applicationName || "gamemap-studio",
    },
  });
  return databaseAdapter(
    (run) =>
      sql.begin((tx) =>
        run({
          query: async (text, values = []) => ({
            rows: [...(await tx.unsafe(text, values))],
          }),
        }),
      ),
    () => sql.end({ timeout: 5 }),
    options,
  );
}

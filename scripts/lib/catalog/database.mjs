import postgres from "postgres";

// query(text, values) accepts already-encoded JSON text, like node-postgres/PGlite.
// postgres otherwise JSON.stringify()s inferred jsonb strings a second time.
export const jsonParameter = (value) =>
  typeof value === "string" ? value : JSON.stringify(value);
const uuid =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export const first = async (client, text, values = []) =>
  (await client.query(text, values)).rows[0];

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
    connection: { application_name: "gamemap-studio" },
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

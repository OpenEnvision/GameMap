import assert from "node:assert/strict";
import postgres from "postgres";

export function publicationQueries(query) {
  const value = async (text, values = []) =>
    (await query(text, values)).rows[0]?.value;
  return {
    status: () => value("select catalog.publication_status() as value"),
    claim: (target, root) =>
      query("select catalog.claim_publication_target($1,$2)", [target, root]),
    register: (text) =>
      query("select catalog.register_publication_artifact($1)", [text]),
    artifact: (digest) =>
      value("select catalog.publication_artifact($1) as value", [digest]),
    activate: (digest, expected, release, run) =>
      value("select catalog.activate_publication($1,$2,$3,$4) as value", [
        digest,
        expected,
        release,
        run,
      ]),
    cloudStatus: () =>
      value("select catalog.cloud_publication_status() as value"),
    claimCloudTarget: ({
      provider,
      repository,
      origin,
      base,
      approvalEnvironment,
      targetDigest,
    }) =>
      value(
        "select catalog.claim_cloud_publication_target($1,$2,$3,$4,$5,$6) as value",
        [provider, repository, origin, base, approvalEnvironment, targetDigest],
      ),
    registerCloudArtifact: (text) =>
      query("select catalog.register_cloud_publication_artifact($1)", [text]),
    activateCloudPublication: (digest, expected, release, run, deployment) =>
      value(
        "select catalog.activate_cloud_publication($1,$2,$3,$4,$5::jsonb) as value",
        [digest, expected, release, run, JSON.stringify(deployment)],
      ),
    activeWithdrawals: () =>
      value("select catalog.active_withdrawals() as value"),
    inspectLoginPrivileges: () =>
      value("select public.inspect_login_privileges() as value"),
  };
}
/** Separate login and session-level lock: it survives COMMIT until journal cleanup finishes. */
export function connectPublicationDatabase(
  url,
  { applicationName = "gamemap-local-publisher" } = {},
) {
  const parsed = new URL(url);
  assert.ok(["postgres:", "postgresql:"].includes(parsed.protocol));
  const sql = postgres(url, {
    max: 1,
    prepare: false,
    onnotice() {},
    ssl: ["127.0.0.1", "localhost", "[::1]"].includes(parsed.hostname)
      ? false
      : { rejectUnauthorized: true },
    connection: { application_name: applicationName },
  });
  return {
    async withLock(run) {
      const connection = await sql.reserve();
      let locked = false;
      try {
        await connection.unsafe("set role catalog_deployer");
        locked = (
          await connection`select pg_try_advisory_lock(hashtextextended('gamemap.publication',0)) as locked`
        )[0].locked;
        assert.ok(
          locked,
          "Another publication operation is running; retry after it finishes",
        );
        const query = async (text, values = []) => ({
          rows: [...(await connection.unsafe(text, values))],
        });
        const operations = publicationQueries(query);
        return await run({
          ...operations,
          async transaction(action) {
            await connection.unsafe("begin");
            try {
              const value = await action(operations);
              await connection.unsafe("commit");
              return value;
            } catch (error) {
              await connection.unsafe("rollback").catch(() => {});
              throw error;
            }
          },
        });
      } finally {
        if (locked)
          await connection`select pg_advisory_unlock(hashtextextended('gamemap.publication',0))`.catch(
            () => {},
          );
        await connection.unsafe("reset role").catch(() => {});
        connection.release();
      }
    },
    close: () => sql.end({ timeout: 5 }),
  };
}

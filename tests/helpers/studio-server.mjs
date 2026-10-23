import { resolve } from "node:path";
import { studioFixture } from "./studio-fixture.mjs";
if (process.env.NODE_ENV !== "test")
  throw new Error("Test Auth is only available in the isolated test harness");
const port = Number(process.env.STUDIO_TEST_PORT || 4196);
const fixture = await studioFixture({
  origin: `http://127.0.0.1:${port}`,
  port,
  staticDirectory: resolve(".build/studio"),
});
console.log(`Isolated Studio fixture: ${fixture.address}`);
const close = () => fixture.close().then(() => process.exit(0));
process.once("SIGTERM", close);
process.once("SIGINT", close);

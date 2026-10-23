// Explicit local integration fault injector, never imported by Studio or normal publication CLI.
import { localPublisher } from "../../scripts/local-publication.mjs";
import { createLocalPublisher } from "../../scripts/lib/catalog/publication.mjs";
const [input, expectedArtifact, expectedRelease, phase] = process.argv.slice(2);
const { database, directory } = await localPublisher();
try {
  const publisher = createLocalPublisher({
    database,
    directory,
    checkpoint: async (point) => {
      if (point === phase) process.exit(73);
    },
  });
  await publisher.publish({
    input,
    expectedArtifact: expectedArtifact === "none" ? null : expectedArtifact,
    expectedRelease: expectedRelease === "none" ? null : expectedRelease,
    run: "local-crash-probe:" + phase,
  });
  throw Error("Fault checkpoint was not reached");
} finally {
  await database.close();
}

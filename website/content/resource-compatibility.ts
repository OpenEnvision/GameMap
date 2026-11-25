import {
  payloadSchemas,
  versionedContracts,
  type PayloadModels,
} from "./contracts";

const technicalReferences = new Set([
  "deepseek-agent-integrations",
  "godot-command-line",
  "unreal-remote-control",
  "unity-addressables-scripting",
  "windows-ui-automation",
  "msdf-atlas-gen",
  "directx-shader-compiler",
]);

/** Add display metadata to installed v1 records without changing their authored fields. */
export function resourceForReading(value: unknown): PayloadModels["resource"] {
  const current = payloadSchemas.resource.safeParse(value);
  if (current.success) return current.data;
  const legacy = versionedContracts.resource[1].payload.parse(value) as Omit<
    PayloadModels["resource"],
    "collection"
  >;
  return {
    ...legacy,
    collection: technicalReferences.has(legacy.id)
      ? "reference"
      : ["paper", "benchmark"].includes(legacy.type)
        ? "research"
        : ["docs", "tutorial", "community"].includes(legacy.type)
          ? "learning"
          : "tools",
  };
}

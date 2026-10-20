export const gameEngineFamilies = [
  { id: "threejs", label: "Three.js / React Three Fiber" },
  { id: "godot", label: "Godot" },
  { id: "unity", label: "Unity" },
  { id: "unreal", label: "Unreal Engine" },
  { id: "babylonjs", label: "Babylon.js" },
  { id: "phaser", label: "Phaser" },
  { id: "pixijs", label: "PixiJS" },
  { id: "kaplay", label: "KAPLAY" },
  { id: "bevy", label: "Bevy" },
  { id: "love", label: "LÖVE" },
  { id: "ebitengine", label: "Ebitengine" },
  { id: "pygame", label: "Pygame" },
  { id: "canvas2d", label: "Canvas 2D" },
  { id: "html", label: "HTML / DOM / SVG" },
  { id: "gbdk", label: "GBDK / Game Boy" },
  { id: "javame", label: "Java ME raycaster" },
  { id: "webgl", label: "Custom WebGL" },
  { id: "other", label: "Other engines" },
] as const;

export type GameEngineFamilyId = (typeof gameEngineFamilies)[number]["id"];

const engineRules: [GameEngineFamilyId, RegExp][] = [
  ["threejs", /\bthree(?:\.?js)?\b|react\s+three\s+fiber|@react-three\/fiber|\br3f\b/i],
  ["godot", /\bgodot\b/i],
  ["unity", /\bunity\b/i],
  ["unreal", /\bunreal(?:\s+engine)?\b|\bue\s*[45]\b/i],
  ["babylonjs", /\bbabylon(?:\.?js)?\b/i],
  ["phaser", /\bphaser\b/i],
  ["pixijs", /\bpixi(?:\.?js)?\b/i],
  ["kaplay", /\bkaplay\b/i],
  ["bevy", /\bbevy\b/i],
  ["love", /\bl[öo]ve(?:\s*2d)?\b/i],
  ["ebitengine", /\bebitengine\b|\bebiten\b/i],
  ["pygame", /\bpygame\b/i],
  ["canvas2d", /\bcanvas\s*(?:2d)?\b/i],
  ["gbdk", /\bgbdk(?:-2020)?\b/i],
  ["javame", /\bjava\s*me\b|\bj2me\b|\bmidp\b/i],
];

/** A hybrid game can use more than one renderer. Asset tools are not an input. */
export function gameEngineFamilyIds(engine: string): GameEngineFamilyId[] {
  // A renderer explicitly attributed to a separate construction workbench
  // does not describe the playable game's renderer (for example, Mini KSP).
  const runtime = engine.replace(/\bthree(?:\.?js)?\s+workbench\b/gi, "");
  const families = engineRules
    .filter(([, pattern]) => pattern.test(runtime))
    .map(([id]) => id);

  // "HTML Canvas" is Canvas 2D; explicit DOM/SVG rendering remains a family
  // of its own, including custom games that also use Canvas or WebGL layers.
  if (/\bdom\b|\bsvg\b|\bcss\b/i.test(runtime) ||
      (!families.length && /\bhtml5?\b/i.test(runtime)))
    families.push("html");

  const hasRenderingEngine = families.some(
    (id) => id !== "canvas2d" && id !== "html",
  );
  if (!hasRenderingEngine && /\bwebgl(?:2)?\b/i.test(runtime))
    families.push("webgl");

  return families.length ? families : ["other"];
}

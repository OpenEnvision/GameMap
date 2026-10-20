export interface ExampleSourceFact {
  label: string;
  note: string;
}

export interface ExampleSourceStatus {
  license?: ExampleSourceFact & {
    state: "declared" | "not-declared" | "mixed";
  };
  verification?: ExampleSourceFact;
  version?: ExampleSourceFact;
}

/**
 * Explicit summaries of the existing case source.note / demo.note records.
 * Missing entries are unknown here, not unlicensed, untested or in sync.
 * Code licenses never apply automatically to music, artwork or other assets.
 */
const statuses: Partial<Record<string, ExampleSourceStatus>> = {
  "katana-kitsune-godot": {
    license: {
      state: "not-declared",
      label: "Code license not found",
      note: "The recorded source review found no top-level game license; finished runtime sprites are included.",
    },
    verification: {
      label: "Setup screen checked",
      note: "The browser review reached player and device selection. Combat and a complete dungeon run were not exercised.",
    },
    version: {
      label: "Source newer than demo",
      note: "The recorded source includes party and asset changes newer than the reviewed hosted prototype.",
    },
  },
  "overexposed-ai": {
    license: {
      state: "not-declared",
      label: "Code license not declared",
      note: "The case records no explicit software license. Its fonts and credited music have separate terms.",
    },
    verification: {
      label: "Opening checked",
      note: "The opening and manager choice reached the live card desk in Chrome. The complete year, endings and touch play were not tested.",
    },
    version: {
      label: "Build match not verified",
      note: "The hosted playtest build is not claimed to match the latest repository revision.",
    },
  },
  "polar-icecapade-claude": {
    license: {
      state: "not-declared",
      label: "Code license not found",
      note: "The recorded source review found no top-level game license. External audio and fonts retain their credited terms.",
    },
    verification: {
      label: "First level checked",
      note: "Movement, projectile fire and pause were checked in the first level. Later levels and a complete run were not tested.",
    },
  },
  "minimal-rogue-claude": {
    license: {
      state: "mixed",
      label: "Code MIT; music separate",
      note: "The code has an MIT license. The credited SUNO music has no separate music license in the case record.",
    },
    verification: {
      label: "First floor checked",
      note: "A short first-floor run checked movement, block-cracking feedback and the command menu. Later floors and saves were not tested.",
    },
    version: {
      label: "Source and demo versions differ",
      note: "The reviewed public source references script version 549; the itch build references version 581.",
    },
  },
  "word-rain-chatgpt": {
    license: {
      state: "mixed",
      label: "Code MIT; credited music separate",
      note: "Code and original assets are MIT; the two credited Kevin MacLeod recordings use CC BY 4.0.",
    },
    verification: {
      label: "Browser controls checked",
      note: "Browser start, moving letters and basket controls were checked. APK installation and a complete scoring run were not tested.",
    },
  },
  "core-business-claude": {
    license: {
      state: "mixed",
      label: "Code MIT; audio restricted",
      note: "The case records MIT code and a separate project-only restriction on ElevenLabs audio extraction or redistribution.",
    },
    verification: {
      label: "Opening loop checked",
      note: "Chrome reached normal play and a short movement and drilling check produced score and fuel feedback. Full mining progression was not tested.",
    },
  },
  "butch-graves-j2me": {
    license: {
      state: "not-declared",
      label: "Code license not declared",
      note: "The case records no declared repository code license. Fonts retain SIL OFL terms.",
    },
    verification: {
      label: "Binary inspected; not run",
      note: "Ready-built JAR files were downloaded and inspected, not executed. They require a compatible MIDP device or emulator, not ordinary java -jar.",
    },
  },
  "vibe-racer-opencode": {
    license: {
      state: "declared",
      label: "Code MIT",
      note: "The case records an MIT-licensed Pygame source project with maps and replays.",
    },
    verification: {
      label: "Source checked; not run",
      note: "Launch instructions were source-checked, not executed. A graphical desktop and Python 3.12 or later are required.",
    },
  },
  "spirit-of-kiro": {
    license: {
      state: "declared",
      label: "Code MIT-0",
      note: "The game repository is MIT-0. Local play also requires AWS credentials and Bedrock model access; runtime usage can incur charges.",
    },
    verification: {
      label: "Setup documented; not run",
      note: "The local setup steps were source-checked, not executed. No anonymous hosted game is linked by the official project.",
    },
  },
  "cloud-crush-gemini-cli": {
    license: {
      state: "declared",
      label: "Code Apache-2.0",
      note: "The official repository records Apache-2.0 code. The browser WASM binary must be built locally.",
    },
    verification: {
      label: "Source checked; not compiled",
      note: "The recorded review checked source and launch steps. It did not compile Cloud Crush or verify a hosted public game endpoint.",
    },
  },
};

export function getExampleSourceStatus(id: string): ExampleSourceStatus | undefined {
  return statuses[id];
}

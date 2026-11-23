import type { TestingResource } from "./testingTypes";

export const testingFixtures: TestingResource[] = [
  {
    "id": "sdl-gamecontrollerdb",
    "title": "SDL GameControllerDB",
    "kind": "fixture",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "2d",
      "3d"
    ],
    "stack": "SDL2 / SDL3 · gamecontrollerdb.txt · community-maintained GUID mappings",
    "summary": "The community-maintained SDL controller mapping database, a plain-text fixture for repeatable gamepad input and button-layout regression tests.",
    "sourceUrl": "https://github.com/mdqinc/SDL_GameControllerDB",
    "access": {
      "label": "Download gamecontrollerdb.txt",
      "url": "https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt",
      "note": "A single text file; SDL2 loads it with SDL_GameControllerAddMappingsFromFile and SDL3 with SDL_AddGamepadMappingsFromFile. Compatible with SDL 2.0.10 and newer."
    },
    "codeLicense": "Zlib license for the database file.",
    "assetLicense": "Not a media asset collection; mappings are contributed data under the Zlib grant.",
    "terms": "open",
    "licenseUrl": "https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE",
    "evidence": [
      {
        "label": "README with SDL2 and SDL3 loading calls",
        "url": "https://github.com/mdqinc/SDL_GameControllerDB#readme"
      },
      {
        "label": "Database file with GUID mappings",
        "url": "https://github.com/mdqinc/SDL_GameControllerDB/blob/master/gamecontrollerdb.txt"
      },
      {
        "label": "Zlib license text",
        "url": "https://github.com/mdqinc/SDL_GameControllerDB/blob/master/LICENSE"
      }
    ],
    "aiUseNote": "Use a pinned copy of gamecontrollerdb.txt as a deterministic input fixture. A mapping entry is community-contributed data, not a guarantee that one device behaves identically across platforms or SDL versions.",
    "testTasks": [
      "Load one pinned gamecontrollerdb.txt in two SDL versions and compare button and axis indices for the same GUID.",
      "Replay a fixed input sequence with and without the database and record which devices fall back to a generic mapping."
    ],
    "setup": [
      "Pin a commit or release and store the exact gamecontrollerdb.txt beside the test project.",
      "Load the file through SDL_GameControllerAddMappingsFromFile (SDL2) or SDL_AddGamepadMappingsFromFile (SDL3) and log the detected controller GUID and platform."
    ],
    "limitations": "Community-sourced mappings can be corrected or removed between commits, and the README asks contributors not to submit AI-generated content. The database covers SDL 2.0.10 and newer; no controller or SDL build was run locally in this review.",
    "reviewed": "2026-11-22"
  }
];

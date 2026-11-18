// Aggregation resources are not game cases or verified launchers.
import type { PayloadModels } from '../../content/contracts';
export const browserPortCollections: PayloadModels['collection'][] = [
  {
    "id": "wasm-arcade-repository-catalogue",
    "title": "WASM Arcade repository catalogue",
    "url": "https://github.com/AndrewC776/wasm-arcade",
    "description": "Public repository aggregation reference, not a game or a verified launcher. The correspondence to the supplied WASM Arcade website is unconfirmed; its advertised deployment was not fetched. Entries may mix source ports, emulation and other runtimes. Inclusion grants no game-code, ROM or asset redistribution rights."
  }
];

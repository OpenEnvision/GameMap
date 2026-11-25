import {
  getResourceIdentity,
  type ResourceIdentity,
} from "../src/data/resourceIdentities";

const quaternius: ResourceIdentity = {
  organization: "Quaternius",
  kind: "brand",
  sourceUrl: "https://quaternius.com/",
  logoSourceUrl: "https://quaternius.com/assets/images/site/logo.png",
  asset: "logos/testing-quaternius-891ada5506b6.png",
  sha256: "891ada5506b64ae48c39cec0bc07717e2bdef713c482d18b0f904e92fad2dbe7",
  notes: "The original creator mark from the Quaternius website header.",
};

const unity = getResourceIdentity("unity-engine");
const khronos = getResourceIdentity("gltf-blender-io");

export type TestingBrandIdentity = ResourceIdentity & { credit?: string };

/** Project marks or the verified mark of the publisher of a first-party record. */
export const testingBrandIdentities: Readonly<
  Record<string, TestingBrandIdentity | undefined>
> = {
  "godot-demos": getResourceIdentity("godot-demo-projects"),
  "unity-boatattack": unity,
  "unity-ml-agents": unity,
  "unity-asset-store": unity,
  "unreal-lyra": getResourceIdentity("unreal-lyra"),
  "khronos-gltf-sample-assets": khronos,
  "khronos-gltf-asset-generator": khronos,
  mixamo: getResourceIdentity("mixamo"),
  "procgen-benchmark": getResourceIdentity("openai-image-api"),
  openttd: {
    organization: "OpenTTD",
    kind: "brand",
    sourceUrl: "https://github.com/OpenTTD/OpenTTD/tree/master/media",
    logoSourceUrl:
      "https://raw.githubusercontent.com/OpenTTD/OpenTTD/master/media/openttd.128.png",
    asset: "logos/testing-openttd-00372df66a5d.png",
    sha256: "00372df66a5d38f4078ea9d76b218d5ba616c39eff0a556419d2131724a2cd03",
    notes: "The desktop game icon distributed by the OpenTTD project.",
  },
  ddnet: {
    organization: "DDraceNetwork",
    kind: "brand",
    sourceUrl: "https://ddnet.org/",
    logoSourceUrl: "https://ddnet.org/favicon-196x196.png",
    asset: "logos/testing-ddnet-a1745b33d162.png",
    sha256: "a1745b33d162971a8e0c5a6f8b2262f40ba0ee11ccae5cf831cf9a99f3686d6c",
    notes:
      "The compact DDraceNetwork mark linked from the project's website metadata.",
  },
  wesnoth: {
    organization: "The Battle for Wesnoth",
    kind: "brand",
    sourceUrl: "https://www.wesnoth.org/",
    logoSourceUrl: "https://www.wesnoth.org/wesmere/img/apple-touch-icon.png",
    asset: "logos/testing-wesnoth-7c071f2acfbb.png",
    sha256: "7c071f2acfbba5f25e76551fb246ec1b26bf80778f2fdbb2dd036f6e490c9278",
    background: "dark",
    notes: "The shield mark linked from the official site's launcher metadata.",
  },
  mindustry: {
    organization: "Mindustry",
    kind: "brand",
    sourceUrl: "https://mindustrygame.github.io/",
    logoSourceUrl: "https://mindustrygame.github.io/icon.b09ad385.png",
    asset: "logos/testing-mindustry-75c3aaf7226f.png",
    sha256: "75c3aaf7226f304983038b7b0014b90f3f8692299810aa39ec381e0539bba3dd",
    notes: "The original game mark linked from the official Mindustry website.",
  },
  supertuxkart: {
    organization: "SuperTuxKart",
    kind: "brand",
    sourceUrl:
      "https://github.com/supertuxkart/stk-code/blob/master/data/gui/icons/licenses.txt",
    logoSourceUrl:
      "https://raw.githubusercontent.com/supertuxkart/stk-code/master/data/gui/icons/logo.png",
    asset: "logos/testing-supertuxkart-665000b981cf.png",
    sha256: "665000b981cf43306ec7e26ac20d2fc3ee3141649ff1c1f9b82e8a4c9f7206c6",
    notes: "The unmodified SuperTuxKart logo from the game source repository.",
    credit: "rastapax · CC BY-SA 3.0+",
  },
  quaternius,
  "quaternius-ual": quaternius,
  ambientcg: {
    organization: "ambientCG",
    kind: "brand",
    sourceUrl: "https://docs.ambientcg.com/brand/",
    logoSourceUrl:
      "https://acg-media.struffelproductions.com/file/ambientCG-Web/media/icon/apple-touch-icon.png",
    asset: "logos/testing-ambientcg-3178d41e2a0e.png",
    sha256: "3178d41e2a0e2e660bb7f9246be93626f8f5b486fb5c53b6476237fe4742299f",
    notes:
      "The original compact mark linked from ambientCG's website metadata.",
  },
  "bevy-official-examples": {
    organization: "Bevy",
    kind: "brand",
    sourceUrl: "https://bevy.org/foundation/logo-policy/",
    logoSourceUrl:
      "https://raw.githubusercontent.com/bevyengine/bevy/main/assets/branding/icon.svg",
    asset: "logos/testing-bevy-b5bbd0ddf88b.svg",
    sha256: "b5bbd0ddf88b6d234690be8f2608767ab02877f577791374bb00be4214700fe4",
    notes: "The unmodified icon from the official Bevy repository.",
  },
};

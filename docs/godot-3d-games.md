# Godot 3D games

Study native Godot game projects through their scenes, gameplay scripts, and available releases. Start with tactics, first-person exploration, train driving, or circuit racing rather than an engine template.

This repository research supplement is not yet included in GameMap’s exported website cards or search. The projects below use Godot scenes and GDScript for their game logic; the cited setup evidence does not require a custom engine fork. That is not a claim that each source checkout runs unchanged in today's Godot.

| Game | What to study | Engine evidence | Access |
| --- | --- | --- | --- |
| [Tanks of Freedom II](#tanks-of-freedom-ii) | Turn-based tactics, campaigns, hot-seat play, map editing | Godot 4; inspected project declares 4.4 | Publisher lists Windows and Linux builds; public project |
| [Meteorite](#meteorite) | First-person exploration, weapon upgrades, movement progression | Godot 3.0.4 | Publisher lists desktop builds; source requires a separately obtained font |
| [Libre TrainSim](#libre-trainsim) | Train controls, rails, signals, route scenes | Inspected export workflow uses Godot 3.5.2 | Published releases and a separate development project |
| [3D-Racing-Game](#3d-racing-game) | Vehicle control, lap counting, race completion | README specifies Godot 3.5.3-stable | Public project; no prepared download was established |

## Tanks of Freedom II

[P1X’s Tanks of Freedom II](https://github.com/P1X-in/tanks-of-freedom-ii) is an isometric strategy game with up to four armies, an AI campaign, hot-seat battles, and an editor for making and sharing maps. Its voxel presentation is implemented with real 3D scenes rather than a 2D board labeled as 3D.

- **Play or obtain a build:** the [creator’s game page](https://czlowiekimadlo.itch.io/tanks-of-freedom-ii) lists Windows and Linux downloads. Those listings were read, not downloaded or played.
- **Open the project:** the [pinned project file](https://github.com/P1X-in/tanks-of-freedom-ii/blob/dbe629ea05691599dde4fd65ab9a13b78a4ccfe1/project.godot) declares Godot 4.4 and starts at the main menu. The [README](https://github.com/P1X-in/tanks-of-freedom-ii/blob/dbe629ea05691599dde4fd65ab9a13b78a4ccfe1/README.md) still says 4.2 or newer; use the inspected project’s version as the starting point rather than treating that older minimum as tested compatibility.
- **Inspect 3D implementation:** the [unit scene](https://github.com/P1X-in/tanks-of-freedom-ii/blob/dbe629ea05691599dde4fd65ab9a13b78a4ccfe1/scenes/tiles/units/unit.tscn) contains `Node3D`, meshes, lighting, and 3D particles.
- **Reuse limits:** [license terms](https://github.com/P1X-in/tanks-of-freedom-ii/blob/dbe629ea05691599dde4fd65ab9a13b78a4ccfe1/LICENSE.md) apply MIT to code and graphical assets except stated exclusions. QmYaan’s audio is CC BY-SA 4.0 and reduz’s audio is CC BY 4.0; control icons are CC0 and fonts have separate licenses. Media under `docs/` is proprietary, not a reusable screenshot pack.

## Meteorite

[Bauxitedev’s Meteorite](https://github.com/Bauxitedev/meteorite) is a released first-person metroidvania made for LOWREZJAM 2018. Explore a facility, acquire weapon and movement upgrades, pass earlier obstacles, and confront enemies and a boss.

- **Play or obtain a build:** the [creator’s game page](https://bauxite.itch.io/meteorite) lists Windows, Linux, and macOS downloads. A GitHub release tag is not being presented as a prepared binary download.
- **Open the project:** follow the [pinned README’s compatibility and font instructions](https://github.com/Bauxitedev/meteorite/blob/1cf2ffd8cc86242d9641cba1792a4c5c39e1139a/README.md). It specifies Godot 3.0.4 and warns that newer versions can break the game. The non-redistributable `uni0553-webfont.ttf` is omitted from the repository and must be obtained separately; without it, text is missing. The historical font-download endpoint was not validated.
- **Inspect 3D implementation:** the [project](https://github.com/Bauxitedev/meteorite/blob/1cf2ffd8cc86242d9641cba1792a4c5c39e1139a/project.godot), [player scene](https://github.com/Bauxitedev/meteorite/blob/1cf2ffd8cc86242d9641cba1792a4c5c39e1139a/scenes/player.tscn), and [player script](https://github.com/Bauxitedev/meteorite/blob/1cf2ffd8cc86242d9641cba1792a4c5c39e1139a/scripts/player.gd) connect a 3D body and camera to movement, jumping, shooting, damage, saves, and an ending sequence.
- **Reuse limits:** the README licenses `scripts/` and `materials/shaders/` under MIT and the remaining included assets under CC BY-SA 4.0. The omitted font is separate; those licenses do not supply it.

## Libre TrainSim

[Libre TrainSim](https://github.com/Libre-TrainSim/Libre-TrainSim), started by Jean28518 and maintained by the Libre TrainSim contributors, is a train-driving simulator. Its project includes cab controls, acceleration and braking, rail geometry, signals, and route scenes, making it useful for studying a larger simulation rather than a single vehicle controller.

- **Choose a release or development source:** [v0.8.1](https://github.com/Libre-TrainSim/Libre-TrainSim/releases/tag/v0.8.1) is a published maintenance release. The inspected source identifies itself as `v0.9.beta1`; it is not asserted to match that release. The [v0.9.beta1 release notes](https://github.com/Libre-TrainSim/Libre-TrainSim/releases/tag/v0.9.beta1) limit that beta to tutorial routes while other tracks await updates.
- **Open the project:** import [`src/project.godot`](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/project.godot), not an assumed root project. The [pinned export workflow](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/.github/workflows/export.yml) selects Godot 3.5.2; this is stronger version evidence than the README’s unqualified “latest version” instruction.
- **Inspect 3D implementation:** the [tutorial route scene](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/Worlds/Tutorials/Tutorials.tscn) contains a `Spatial` world, rails, signals, environmental lighting, and player placement. [Project notes](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/README.gd) distinguish implemented systems from future ideas.
- **Reuse limits:** the [root license](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/LICENSE) is GPLv3. Project notes identify game content as CC0, with separate [material](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/Resources/Materials/LICENSE) and [JFR1 train](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/Trains/JFR1/LICENSE) notices. Not all bundled media is CC0: [“Follow That Dream” by Luca Fraula](https://github.com/Libre-TrainSim/Libre-TrainSim/blob/1e22e0eefe3d7e7dea8f21b695cc55e659ef4ccb/src/Data/Misc/LICENSE_for_FollowThatDream) is CC BY 4.0. Bundled add-ons retain their own terms.

Use the repository and release links above rather than the old `.de` website links still present in the pinned README; the v0.8.1 notice reports a change to the project's website address.

## 3D-Racing-Game

[Firet’s 3D-Racing-Game](https://github.com/Firet/3d-racing-game) is a small circuit-racing project with vehicle controls, lap timing, a speed display, and a finish panel. It is a game implementation to inspect, not a claim of a production-scale racing simulator.

- **Obtain the project:** use the source repository. No official prepared build or release was established during this review.
- **Open the project:** the [README](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/README.md) specifies Godot 3.5.3-stable. The [project file](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/project.godot) starts `Scenes/First-Level.tscn`.
- **Inspect 3D implementation:** the [level scene](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/Scenes/First-Level.tscn) includes the circuit, collision, and lap/finish interface. The [vehicle script](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/Scripts/race_future.gd) extends `VehicleBody`; the [finish-line script](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/Scripts/finish_lap_area.gd) updates laps and reveals the finish panel.
- **Reuse limits:** a [GPLv3 license file](https://github.com/Firet/3d-racing-game/blob/a2abbc38959ca77fe7017841ff2389d00ad45b36/LICENSE) is present. The README mentions Blender-made assets, but a complete separate third-party asset provenance audit was not established; do not assume every model or texture has been independently cleared for reuse.

## Review scope

Sources checked on 2026-10-21. The file links above pin the inspected revisions. Publisher download listings and releases are separate artifacts and are not assumed to match those development pins.

Project files, selected scenes and scripts, version instructions, and licensing statements were read. No game was imported, exported, or played; no executable game build was downloaded, and no runtime compatibility or performance test was performed. These entries establish native Godot 3D source evidence, not AI authorship, engine-fork compatibility, or an executed reproduction.

The supplement leaves the existing exported catalogs and their counts unchanged. Full website registration, rendered pages, and search inclusion require the website source and a consistent rebuild.


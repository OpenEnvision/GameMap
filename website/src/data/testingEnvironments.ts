import type { TestingResource } from './testingTypes';

export const testingEnvironments: TestingResource[] = [
  {
    id: 'minigrid',
    title: 'MiniGrid / BabyAI',
    kind: 'environment',
    uses: ['coding', 'playing'],
    dimensions: ['2d'],
    stack: 'Python · Gymnasium · discrete grid worlds',
    summary: 'Small navigation and language-grounding tasks with keys, doors, objects and partial observations. A practical first baseline for repeatable planning tests.',
    sourceUrl: 'https://github.com/Farama-Foundation/Minigrid',
    access: {
      label: 'Free Python package',
      url: 'https://minigrid.farama.org/',
      note: 'Install minigrid locally; no commercial game or model API is required.',
    },
    codeLicense: 'Apache-2.0 in the current repository.',
    assetLicense: 'Use bundled procedural grid rendering; added images and datasets need their own provenance.',
    terms: 'open',
    licenseUrl: 'https://github.com/Farama-Foundation/Minigrid/blob/main/LICENSE',
    evidence: [
      { label: 'Installation and BabyAI tasks', url: 'https://github.com/Farama-Foundation/Minigrid#readme' },
      { label: 'Observation wrappers', url: 'https://minigrid.farama.org/api/wrappers/' },
      { label: 'Pinned RGB visibility and wrapper implementation', url: 'https://github.com/Farama-Foundation/Minigrid/blob/7f5853792ea7f04f75614661006d87fcf949f26d/minigrid/wrappers.py' },
    ],
    aiUseNote: 'Built for agent research. Preserve license notices; explicitly separate rendered pixels, symbolic observations and mission text in each evaluation.',
    testTasks: [
      'Compare seeded door-and-key success rates with a fixed action budget.',
      'Modify an environment rule, then check reset, observations and goal completion.',
      'Test BabyAI instructions while withholding hidden map state.',
    ],
    setup: [
      'Create a Python 3.11+ environment on Linux or macOS and run pip install minigrid.',
      'Import minigrid and gymnasium; create MiniGrid-Empty-8x8-v0 and call reset(seed=0).',
      'Use RGBImgPartialObsWrapper for agent-view RGB; RGBImgObsWrapper reveals the full grid. Record the wrapper, mission-text access, actions, terminated and truncated separately.',
    ],
    limitations: 'Source reviewed, not installed here. Windows is not officially supported; default compact observations are not ordinary RGB screenshots.',
    reviewed: '2026-10-18',
  },
  {
    id: 'crafter',
    title: 'Crafter',
    kind: 'environment',
    uses: ['coding', 'playing'],
    dimensions: ['2d'],
    stack: 'Python · Gym interface · pixel survival',
    summary: 'A compact survival world combining exploration, health, gathering, construction and crafting. Achievement progress exposes different strengths of a playing agent.',
    sourceUrl: 'https://github.com/danijar/crafter',
    access: {
      label: 'Free package and playable GUI',
      url: 'https://github.com/danijar/crafter#play-yourself',
      note: 'pip install crafter pygame; the GUI and evaluation environment run locally.',
    },
    codeLicense: 'MIT.',
    assetLicense: 'Repository material under its MIT notice; track any replacement art separately.',
    terms: 'open',
    licenseUrl: 'https://github.com/danijar/crafter/blob/main/LICENSE',
    evidence: [
      { label: 'Observation, actions and recorder', url: 'https://github.com/danijar/crafter#interface' },
      { label: 'Achievement-based evaluation', url: 'https://github.com/danijar/crafter#evaluation' },
      { label: 'Pinned reset, seed and privileged info contract', url: 'https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/env.py' },
      { label: 'Pinned completed-episode recorder contract', url: 'https://github.com/danijar/crafter/blob/e04542a2159f1aad3d4c5ad52e8185717380ee3a/crafter/recorder.py' },
    ],
    aiUseNote: 'Designed for agent evaluation. For pixel-only tests, withhold info.semantic, inventory and player_pos from the policy; those expose structured state beyond the RGB observation. Keep published benchmark budgets separate from custom VLM protocols.',
    testTasks: [
      'Measure survival and achievement success over held-out world seeds.',
      'Plan a resource-to-tool sequence with a fixed interaction budget.',
      'Change a recipe and verify that collection, crafting and achievement recording remain consistent.',
    ],
    setup: [
      'Install crafter and pygame in an isolated Python environment.',
      'Run python -m crafter.run_gui for manual controls, then use CrafterReward-v1 for automation.',
      'Set the seed when constructing the environment and record the episode index; use crafter.Recorder with a nonempty output directory, save_stats=True and save_episode=True to retain completed-episode statistics and action trajectories.',
    ],
    limitations: 'Source reviewed, not run here. Classic Gym reset returns only an observation and step returns four values. reset has no seed argument; matching constructor seeds alone is insufficient unless episode/reset order also matches.',
    reviewed: '2026-10-18',
  },
  {
    id: 'craftax',
    title: 'Craftax',
    kind: 'environment',
    uses: ['coding', 'playing'],
    dimensions: ['2d'],
    stack: 'Python · JAX · gymnax-style API',
    summary: 'A survival and crafting environment with vectorized simulation. Useful for longer action dependencies and comparing pixel-based versus symbolic policies.',
    sourceUrl: 'https://github.com/MichaelTMatthews/Craftax',
    access: {
      label: 'Free Python package',
      url: 'https://github.com/MichaelTMatthews/Craftax#readme',
      note: 'CPU JAX is installed by default; accelerator support needs the correct JAX build.',
    },
    codeLicense: 'MIT.',
    assetLicense: 'Repository material under its MIT notice; added assets need separate records.',
    terms: 'open',
    licenseUrl: 'https://github.com/MichaelTMatthews/Craftax/blob/main/LICENSE',
    evidence: [
      { label: 'Installation, API and reset caveats', url: 'https://github.com/MichaelTMatthews/Craftax#readme' },
      { label: 'Game tutorial', url: 'https://github.com/MichaelTMatthews/Craftax/blob/main/tutorial.md' },
      { label: 'Pinned auto-reset transition implementation', url: 'https://github.com/MichaelTMatthews/Craftax/blob/c3c2e0d038c4e641f9481320c158f457f30c28f3/craftax/environment_base/environment_bases.py' },
    ],
    aiUseNote: 'Fix observation mode, PRNG keys, episode handling and package version. Version changes affect comparability: 1.5.0 fixes first-planted-plant growth, and 1.6.0 fixes Craftax-Classic death rewards.',
    testTasks: [
      'Compare survival and crafting progress using identical seeded worlds.',
      'Separate image-only policies from symbolic-state policies.',
      'Modify a block or recipe, invalidate texture caches when necessary, and check reset behavior.',
    ],
    setup: [
      'Run pip install craftax in an isolated Python environment.',
      'Run play_craftax or play_craftax_classic for manual play.',
      'Select Craftax-Pixels-v1 or Craftax-Symbolic-v1 explicitly; keep full Craftax and Craftax-Classic separate. Supply distinct JAX keys to reset and step, and record the auto_reset setting.',
    ],
    limitations: 'Source reviewed, not run here. JIT startup is slow. With auto_reset=True, a done step returns the next episode observation/state alongside the previous episode reward/done/info. With auto_reset=False, handle termination before stepping again.',
    reviewed: '2026-10-18',
  },
  {
    id: 'vizdoom',
    title: 'ViZDoom',
    kind: 'environment',
    uses: ['coding', 'playing'],
    dimensions: ['3d'],
    stack: 'Python / C++ · Doom / ZDoom · Gymnasium',
    summary: 'First-person environments for aiming, navigation, combat and memory, with programmable actions and scenario controls. The perspective is 3D; the renderer uses Doom-style technology.',
    sourceUrl: 'https://github.com/Farama-Foundation/ViZDoom',
    access: {
      label: 'Free package with Freedoom assets',
      url: 'https://vizdoom.farama.org/',
      note: 'pip install vizdoom; begin with a bundled scenario rather than a commercial Doom WAD.',
    },
    codeLicense: 'Original ViZDoom contributions are MIT; underlying ZDoom components have separate licenses.',
    assetLicense: 'Freedoom is the default asset set. Original Doom / Doom II WADs are not supplied and require their own rights.',
    terms: 'mixed',
    licenseUrl: 'https://github.com/Farama-Foundation/ViZDoom#license',
    evidence: [
      { label: 'Package installation and examples', url: 'https://github.com/Farama-Foundation/ViZDoom#python-quick-start' },
      { label: 'Freedoom, WADs and custom scenarios', url: 'https://vizdoom.farama.org/faq/' },
      { label: 'Pinned Gymnasium timing, seed and timeout contract', url: 'https://github.com/Farama-Foundation/ViZDoom/blob/909e834264e42f136f59f80e72e95d8146f40e21/gymnasium_wrapper/base_gymnasium_env.py' },
    ],
    aiUseNote: 'Built for AI experiments; this does not grant rights to arbitrary WADs. Record which scenario, base assets and licenses an evaluation uses.',
    testTasks: [
      'Evaluate aiming accuracy, navigation completion and survival at a fixed action frequency.',
      'Compare pixel-only control with privileged buffers explicitly marked as separate tracks.',
      'Edit a scenario and check spawn, objectives, rewards and termination.',
    ],
    setup: [
      'Install vizdoom in a supported Python environment; check wheel support for your OS and architecture.',
      'Start from the repository Python examples and a bundled basic scenario.',
      'For the Gymnasium wrapper, fix config, buffers, button space and frame_skip; use reset(seed=...) and log terminated and truncated separately, including treat_episode_timeout_as_truncation.',
    ],
    limitations: 'Source reviewed, not run here. ViZDoom 1.3+ macOS wheels require Apple Silicon and macOS 14+; the documented Intel wheel route is 1.2.4. Wrapper timeout handling changed in 1.3.0, so pin the version and timeout option. WAD rights remain scenario-specific.',
    reviewed: '2026-10-18',
  },
  {
    id: 'nethack-learning-environment',
    title: 'NetHack Learning Environment',
    kind: 'environment',
    uses: ['coding', 'playing'],
    dimensions: ['2d'],
    stack: 'Python · C / C++ · Gymnasium · NetHack',
    summary: 'A demanding roguelike interface for exploration, inventory, tactical choices and long-term planning. Use the maintained NetHack-LE organization rather than the archived Facebook repository.',
    sourceUrl: 'https://github.com/NetHack-LE/nle',
    access: {
      label: 'Free package and source',
      url: 'https://github.com/NetHack-LE/nle#installation',
      note: 'Native compilation prerequisites may be needed; the repository includes interactive and random-agent scripts.',
    },
    codeLicense: 'NetHack General Public License; preserve notices and follow source/distribution obligations.',
    assetLicense: 'Bundled NetHack data follows repository notices; external tilesets are separate.',
    terms: 'open',
    licenseUrl: 'https://github.com/NetHack-LE/nle/blob/main/LICENSE',
    evidence: [
      { label: 'Maintained source, installation and play scripts', url: 'https://github.com/NetHack-LE/nle#readme' },
      { label: 'Archived upstream repository', url: 'https://github.com/facebookresearch/nle' },
      { label: 'Pinned observation, seed and reset implementation', url: 'https://github.com/NetHack-LE/nle/blob/2319f2989f0035685017e9ea13c83b2546fe477c/nle/env/base.py' },
    ],
    aiUseNote: 'An AI research interface; distinguish terminal rendering, symbols, text messages and internal state so planning results remain comparable.',
    testTasks: [
      'Measure staircase or score-task progress with a fixed turn budget.',
      'Test inventory decisions and recovery after invalid actions.',
      'Modify a task reward or termination rule and replay baseline rollouts.',
    ],
    setup: [
      'Prepare Python 3.10+, CMake 3.28+ and the platform build prerequisites documented upstream.',
      'Install nle, then run python -m nle.scripts.play --mode random.',
      'Create NetHackScore-v0 with fixed observation_keys, actions and fix_moon_phase=True; before reset, call env.unwrapped.seed with recorded core, disp, reseed=False and optional lgen values.',
    ],
    limitations: 'Source reviewed, not run here. Native tools may be required. In the inspected code, reset(seed=...) seeds Gymnasium but does not set NetHack RNGs; use the explicit seed interface. NetHackChallenge deliberately disallows seed changes. Terminal/glyph observations are not RGB game frames.',
    reviewed: '2026-10-18',
  },
  {
    id: 'godot-rl-agents',
    title: 'Godot RL Agents',
    kind: 'environment',
    uses: ['coding', 'playing', 'pipeline'],
    dimensions: ['2d', '3d'],
    stack: 'Godot 4 · Python · game sensors and action bridge',
    summary: 'Connects editable Godot games to Python agents. Useful for changing gameplay, exposing observations and evaluating NPC control in a scene you own.',
    sourceUrl: 'https://github.com/edbeeching/godot_rl_agents',
    access: {
      label: 'Free toolkit and example projects',
      url: 'https://github.com/edbeeching/godot_rl_agents#quickstart-guide',
      note: 'Install godot-rl and import an example; editor operation avoids needing a prebuilt game binary.',
    },
    codeLicense: 'MIT for Godot RL Agents; Godot is also MIT.',
    assetLicense: 'Example assets can have separate notices: the Cartoon Plane model is CC BY 4.0.',
    terms: 'mixed',
    licenseUrl: 'https://github.com/edbeeching/godot_rl_agents/blob/main/LICENSE',
    evidence: [
      { label: 'Editor and exported-game workflow', url: 'https://github.com/edbeeching/godot_rl_agents#quickstart-guide' },
      { label: 'Example asset attribution', url: 'https://github.com/edbeeching/godot_rl_agents#license' },
      { label: 'Pinned binary-launch and reset seed behavior', url: 'https://github.com/edbeeching/godot_rl_agents/blob/207b6f476f5846f33d08b92c7a350147e7b78bf5/godot_rl/core/godot_env.py' },
    ],
    aiUseNote: 'Designed for learning and automated gameplay testing. Keep imported-model rights and example attributions alongside the MIT toolkit license.',
    testTasks: [
      'Change movement or reward logic, establish reset/replay repeatability for that scene, then compare fixed input rollouts.',
      'Test sensors, action scaling and Python-to-game synchronization.',
      'Replace a character or collider and verify that observations and control still work.',
    ],
    setup: [
      'Install godot-rl in a Python environment and download a documented example such as JumperHard.',
      'Use the matching Godot 4 .NET editor for the documented editor example; import the project.',
      'Run the repository Stable Baselines 3 example, or adapt its environment interface to a fixed policy.',
    ],
    limitations: 'Source reviewed, not run here. The inspected bridge sends env_seed when launching a binary, but reset(seed=...) sends only a reset message. Editor runs need scene/plugin seed control; validate reset repeatability rather than assuming the Python argument reseeds Godot.',
    reviewed: '2026-10-18',
  },
  {
    id: 'unity-ml-agents',
    title: 'Unity ML-Agents',
    kind: 'environment',
    uses: ['coding', 'playing', 'pipeline'],
    dimensions: ['2d', '3d'],
    stack: 'Unity · C# · Python · sensors and agent actions',
    summary: 'An official toolkit and example scenes for physics, visual control, cooperation and competition. It can expose custom Unity scenes to Python policies and automated tests.',
    sourceUrl: 'https://github.com/Unity-Technologies/ml-agents',
    access: {
      label: 'Free toolkit; Unity editor required',
      url: 'https://github.com/Unity-Technologies/ml-agents/releases',
      note: 'Choose one release and match its Unity package, Python packages and supported editor version.',
    },
    codeLicense: 'Apache-2.0 for the toolkit, with third-party notices.',
    assetLicense: 'Check bundled notices and any added scene assets. The Unity editor and external store assets have separate terms.',
    terms: 'engine',
    licenseUrl: 'https://github.com/Unity-Technologies/ml-agents/blob/develop/LICENSE.md',
    evidence: [
      { label: 'Official toolkit and release compatibility', url: 'https://github.com/Unity-Technologies/ml-agents#readme' },
      { label: 'Release 23 low-level decision and terminal contract', url: 'https://github.com/Unity-Technologies/ml-agents/blob/a2777719560e4676be99e2ea128c5eb1fbeb3dbb/com.unity.ml-agents/Documentation~/Python-LLAPI.md' },
      { label: 'Third-party notices', url: 'https://github.com/Unity-Technologies/ml-agents/blob/develop/Third%20Party%20Notices.md' },
      { label: 'Unity editor terms', url: 'https://unity.com/legal/editor-terms-of-service/software' },
    ],
    aiUseNote: 'The toolkit supports agent research and automated testing; its Apache license does not replace editor or third-party asset terms.',
    testTasks: [
      'Compare physics-task success with fixed observations, decisions and reset rules.',
      'Change a C# agent or scene and verify sensors, rewards and episode termination.',
      'Import a replacement rig or collider and check control stability and visual observations.',
    ],
    setup: [
      'Select a release tag, install its supported Unity editor and open the included Project.',
      'Install the matching com.unity.ml-agents package and Python environment package versions.',
      'Open an example scene and connect a policy; route actions by behavior and agent_id, and read both DecisionSteps and TerminalSteps. Python step advances to the next decision, not necessarily one physics frame.',
    ],
    limitations: 'Source reviewed, not run here. Editor eligibility, platform builds and version compatibility need local checks. The develop branch is not a stable evaluation baseline.',
    reviewed: '2026-10-18',
  },
  {
    "id": "arcade-learning-environment",
    "title": "Arcade Learning Environment (ALE)",
    "kind": "environment",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "2d"
    ],
    "stack": "C++ / Python · Stella Atari 2600 emulator · Gymnasium API",
    "summary": "The standard Atari 2600 evaluation interface for more than 100 games, with native Gymnasium support, score and terminal signals, and seeded evaluation protocols.",
    "sourceUrl": "https://github.com/Farama-Foundation/Arcade-Learning-Environment",
    "access": {
      "label": "Official documentation and install guide",
      "url": "https://ale.farama.org/",
      "note": "Install ale-py from PyPI; the pip package bundles Atari ROMs and the project also offers a WebAssembly build."
    },
    "codeLicense": "GPL-2.0 for the ALE framework.",
    "assetLicense": "Atari ROMs are bundled in the pip package; their rights are separate from the framework license and need independent review before redistribution.",
    "terms": "mixed",
    "licenseUrl": "https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md",
    "evidence": [
      {
        "label": "Features, Gymnasium support and bundled ROMs",
        "url": "https://github.com/Farama-Foundation/Arcade-Learning-Environment#readme"
      },
      {
        "label": "Environment list and evaluation protocols",
        "url": "https://ale.farama.org/environments/"
      },
      {
        "label": "GPL-2.0 license text",
        "url": "https://github.com/Farama-Foundation/Arcade-Learning-Environment/blob/main/LICENSE.md"
      }
    ],
    "aiUseNote": "Fix the game, mode, difficulty, frame skip, repeat-action probability and seed before comparing agents; report the observation source (pixels or RAM) separately. Bundled ROM availability is not a license grant for redistributing a dataset.",
    "testTasks": [
      "Compare seeded scores for one game with sticky actions enabled and disabled under the same action budget.",
      "Record whether an agent uses RGB pixels or RAM state and check reset, truncation and life-loss signals.",
      "Replay a fixed action sequence and assert identical scores across runs and dependency versions."
    ],
    "setup": [
      "Create a Python environment, install ale-py and Gymnasium, and list the available ROM ids.",
      "Create an Atari environment with a fixed mode, difficulty, frame skip, repeat_action_probability and seed.",
      "Log score, terminated and truncated per episode; retain the ale-py version and ROM inventory."
    ],
    "limitations": "GPL-2.0 applies to the framework, while Atari ROMs are third-party game assets bundled in the pip package and require separate rights review for redistribution. Source reviewed, not installed here; no Atari evaluation was run locally.",
    "reviewed": "2026-11-22"
  },
  {
    "id": "procgen-benchmark",
    "title": "Procgen Benchmark",
    "kind": "environment",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "2d"
    ],
    "stack": "Python · Gym API · 16 procedurally generated game-like environments",
    "summary": "Sixteen fast procedurally generated environments designed to measure how quickly an agent learns skills that generalize to unseen levels.",
    "sourceUrl": "https://github.com/openai/procgen",
    "access": {
      "label": "Install the Python package",
      "url": "https://github.com/openai/procgen#readme",
      "note": "Install procgen from the repository; the environments run at thousands of steps per second on a single CPU core."
    },
    "codeLicense": "MIT.",
    "assetLicense": "Procedurally generated rendering; no bundled third-party game art is required for the standard environments.",
    "terms": "open",
    "licenseUrl": "https://github.com/openai/procgen/blob/master/LICENSE",
    "evidence": [
      {
        "label": "README with environment list and speed claims",
        "url": "https://github.com/openai/procgen#readme"
      },
      {
        "label": "Native action space, seed options and state interface",
        "url": "https://github.com/openai/procgen/blob/master/procgen/env.py"
      },
      {
        "label": "Benchmark paper",
        "url": "https://arxiv.org/abs/1912.01588"
      },
      {
        "label": "MIT license text",
        "url": "https://github.com/openai/procgen/blob/master/LICENSE"
      }
    ],
    "aiUseNote": "Separate train and test level distributions and fix the package version, wrapper, level selection, seed settings and distribution mode before comparing agents. Record the action sequence and episode boundaries; fast step rates do not remove the need to report wall-clock and sample budgets.",
    "testTasks": [
      "Compare an agent trained on a small level set against one trained on the full distribution, evaluated on held-out seeds.",
      "Within one pinned version and wrapper, replay recorded actions from the same initial state and seed settings; compare observations, rewards and episode boundaries.",
      "Measure steps per second for one environment and record the hardware and thread count."
    ],
    "setup": [
      "Create a Python environment and pin procgen, its native Gym or Gym3 interface, and any additional wrapper dependencies.",
      "Fix num_envs, num_levels, start_level, rand_seed, distribution_mode and thread count; retain the initial state or reset/episode order and a recorded action sequence.",
      "Log observations, rewards and episode boundaries using the chosen interface; document any wrapper that converts these into terminated and truncated signals."
    ],
    "limitations": "The native interface exposes a discrete action space without an action_masks field. Any added mask or Gymnasium adaptation belongs to a separately documented wrapper. Identical seeds do not guarantee identical trajectories across dependency upgrades. The repository is in maintenance mode; CoinRun differs from its original standalone release, and the standard wrapper needs a compatible Gym version. Source reviewed, not installed or run locally.",
    "reviewed": "2026-11-24"
  },
  {
    "id": "google-research-football",
    "title": "Google Research Football",
    "kind": "environment",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "3d"
    ],
    "stack": "C++ game engine · Python Gym API · multi-agent football scenarios",
    "summary": "A research football environment with configurable scenarios, multi-agent play, multiple observation formats and a built-in game engine.",
    "sourceUrl": "https://github.com/google-research/football",
    "access": {
      "label": "Installation and scenario guide",
      "url": "https://github.com/google-research/football#readme",
      "note": "Installable from PyPI or built from source; the repository also links a Colab notebook using prebuilt binaries."
    },
    "codeLicense": "Apache-2.0.",
    "assetLicense": "Based on the open-source Gameplay Football project; check bundled assets and any separately downloaded engine components.",
    "terms": "open",
    "licenseUrl": "https://github.com/google-research/football/blob/master/LICENSE",
    "evidence": [
      {
        "label": "README with installation, scenarios and representations",
        "url": "https://github.com/google-research/football#readme"
      },
      {
        "label": "Benchmark paper",
        "url": "https://arxiv.org/abs/1907.11180"
      },
      {
        "label": "Apache-2.0 license text",
        "url": "https://github.com/google-research/football/blob/master/LICENSE"
      }
    ],
    "aiUseNote": "Fix the scenario, number of controlled players, observation representation, action set, seed and episode length before comparing policies. A prebuilt binary is a convenience, not a reproducibility guarantee.",
    "testTasks": [
      "Compare the same policy using pixels, the compact vector representation and the full state representation.",
      "Run a fixed scenario with a fixed seed on two package versions and check score and episode length.",
      "Check multi-agent scenarios for role assignment and desynchronization after a reset."
    ],
    "setup": [
      "Install a release from PyPI or build from source, then verify the engine binary and Python version.",
      "Create one scenario with a fixed seed, record the observation shape and action set, and run a short baseline episode."
    ],
    "limitations": "The GitHub repository is archived, with its last push in June 2025, so no further maintenance should be assumed. Installation depends on platform-specific binaries or a source build, and the underlying Gameplay Football assets have their own provenance. Source reviewed, not installed or run locally.",
    "reviewed": "2026-11-22"
  },
  {
    "id": "overcooked-ai",
    "title": "Overcooked-AI",
    "kind": "environment",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "2d"
    ],
    "stack": "Python · Gym-style API · cooperative two-agent layouts",
    "summary": "A cooperative two-agent cooking benchmark with handcrafted and procedurally generated layouts, used for coordination and human-AI collaboration studies.",
    "sourceUrl": "https://github.com/HumanCompatibleAI/overcooked_ai",
    "access": {
      "label": "Installation and layout guide",
      "url": "https://github.com/HumanCompatibleAI/overcooked_ai#readme",
      "note": "Install the overcooked-ai Python package; layouts and planning baselines ship with the package."
    },
    "codeLicense": "MIT.",
    "assetLicense": "Repository code and layout definitions under MIT; human study data linked from the README is separate.",
    "terms": "open",
    "licenseUrl": "https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE",
    "evidence": [
      {
        "label": "README with layouts and installation",
        "url": "https://github.com/HumanCompatibleAI/overcooked_ai#readme"
      },
      {
        "label": "Benchmark paper",
        "url": "https://arxiv.org/abs/1910.05789"
      },
      {
        "label": "MIT license text",
        "url": "https://github.com/HumanCompatibleAI/overcooked_ai/blob/master/LICENSE"
      }
    ],
    "aiUseNote": "Fix a layout, horizon, partner policy and seed. Score alone hides coordination failures, so record joint actions, collisions and idle steps separately.",
    "testTasks": [
      "Compare a self-play pair with a fixed heuristic partner on one layout and report score plus collision counts.",
      "Replay a fixed joint-action sequence and assert identical state transitions after a reset.",
      "Check that a generated layout is reproducible from its recorded seed."
    ],
    "setup": [
      "Install overcooked-ai in a Python environment and list the available layouts.",
      "Create a two-agent environment with a named layout, fixed horizon and seed, then log joint observations and rewards."
    ],
    "limitations": "The last repository push was in March 2025 and the README points to separate human-study datasets with their own terms. Layout names and the legacy Gym API need pinning. Source reviewed, not installed or run locally.",
    "reviewed": "2026-11-22"
  },
  {
    "id": "mujoco-physics",
    "title": "MuJoCo",
    "kind": "environment",
    "uses": [
      "coding",
      "pipeline"
    ],
    "dimensions": [
      "3d"
    ],
    "stack": "C/C++ physics engine · MJCF / URDF models · Python bindings",
    "summary": "A deterministic contact dynamics engine with a Python interface, useful as a physics and determinism baseline for simulated characters and objects.",
    "sourceUrl": "https://github.com/google-deepmind/mujoco",
    "access": {
      "label": "Official documentation",
      "url": "https://mujoco.readthedocs.io/en/stable/overview.html",
      "note": "Installable as the mujoco Python package; no separate licence key is required since the project was open sourced."
    },
    "codeLicense": "Apache-2.0.",
    "assetLicense": "MJCF models and meshes included with the project need their own provenance check; user-supplied models remain separate.",
    "terms": "open",
    "licenseUrl": "https://github.com/google-deepmind/mujoco/blob/main/LICENSE",
    "evidence": [
      {
        "label": "README with installation and bindings",
        "url": "https://github.com/google-deepmind/mujoco#readme"
      },
      {
        "label": "Official documentation overview",
        "url": "https://mujoco.readthedocs.io/en/stable/overview.html"
      },
      {
        "label": "Apache-2.0 license text",
        "url": "https://github.com/google-deepmind/mujoco/blob/main/LICENSE"
      }
    ],
    "aiUseNote": "Use a controlled MJCF model, fixed timestep and solver settings for a physics regression; record the engine version because contact behaviour can change between releases. MuJoCo is a physics simulator, not a game or a playing benchmark.",
    "testTasks": [
      "Replay a fixed control sequence on one model and compare final body positions across engine versions.",
      "Import the same rig as MJCF and URDF and compare joint limits, mass properties and contact behaviour."
    ],
    "setup": [
      "Pin the mujoco release, load one MJCF model and record timestep, integrator and solver settings.",
      "Step the simulation with a fixed control sequence and log positions, velocities and contacts."
    ],
    "limitations": "MuJoCo targets robotics and biomechanics rather than gameplay; game-specific relevance must be established per test. Bundled models and meshes have separate provenance. Source reviewed, not built or run locally.",
    "reviewed": "2026-11-22"
  },
  {
    "id": "gymnasium-classic-control",
    "title": "Gymnasium classic control",
    "kind": "environment",
    "uses": [
      "coding",
      "playing"
    ],
    "dimensions": [
      "2d"
    ],
    "stack": "Python · Gymnasium API · CartPole, Pendulum, MountainCar and Acrobot",
    "summary": "Small deterministic control environments with fully documented state equations, a lightweight baseline for reset, seeding and episode-termination regressions.",
    "sourceUrl": "https://github.com/Farama-Foundation/Gymnasium",
    "access": {
      "label": "Classic control environment docs",
      "url": "https://gymnasium.farama.org/environments/classic_control/",
      "note": "These environments need no external game binary, ROM or model download."
    },
    "codeLicense": "MIT.",
    "assetLicense": "Procedural rendering only; no bundled third-party game assets are needed for these environments.",
    "terms": "open",
    "licenseUrl": "https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE",
    "evidence": [
      {
        "label": "Classic control environment reference",
        "url": "https://gymnasium.farama.org/environments/classic_control/"
      },
      {
        "label": "Gymnasium README and API scope",
        "url": "https://github.com/Farama-Foundation/Gymnasium#readme"
      },
      {
        "label": "MIT license text",
        "url": "https://github.com/Farama-Foundation/Gymnasium/blob/main/LICENSE"
      }
    ],
    "aiUseNote": "Fix the environment id, seed, render mode and Gymnasium version. These toy tasks can validate an agent pipeline but must not be reported as game-playing evidence.",
    "testTasks": [
      "Reset two environments with the same seed and assert identical initial observations and termination limits.",
      "Change a wrapper or action-mapping layer and verify the step, terminated and truncated contract still holds."
    ],
    "setup": [
      "Install a pinned gymnasium release and create one classic control environment with a fixed seed.",
      "Record observation bounds, action space, termination condition and the exact version string."
    ],
    "limitations": "Classic control tasks are toy control problems, not games. They are included only as a deterministic pipeline check; no environment was installed or run locally in this review.",
    "reviewed": "2026-11-22"
  },
];

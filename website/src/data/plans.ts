import type { Dimension, Stage } from "../types";
export interface PlanNode {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  stage: Stage;
  description: string;
  deliverable: string;
  check: string;
}
export const plans: Record<Dimension, PlanNode[]> = {
  "2d": [
    {
      id: "scope",
      title: "Plan & scope",
      subtitle: "Find the fun",
      tags: ["Game brief", "Core loop"],
      stage: "plan",
      description:
        "Define player actions, win and loss conditions, and the target platform. Keep the first version focused on one repeatable core loop.",
      deliverable:
        "A one-page game brief, acceptance criteria, and project constraints.",
      check: "Every requirement maps to an observable player action.",
    },
    {
      id: "engine",
      title: "Choose an engine",
      subtitle: "Pick your foundation",
      tags: ["Godot", "Phaser · Unity"],
      stage: "scene",
      description:
        "Choose an engine for your platform, programming language, and editing needs. Give the agent a fixed version, official APIs, and a working starting point.",
      deliverable:
        "A minimal project with a fixed engine version and one launch command.",
      check: "A clean environment can import, run, and build the project.",
    },
    {
      id: "gameplay",
      title: "Build the loop",
      subtitle: "Make it playable",
      tags: ["Coding agents", "Game logic"],
      stage: "code",
      description:
        "Implement movement, interaction, scoring, and restart in small steps. Run the game and inspect screenshots after each change to build a playable loop.",
      deliverable: "A playable vertical slice and repeatable test inputs.",
      check:
        "Players can start, win or lose, and restart with correct state transitions.",
    },
    {
      id: "assets",
      title: "Create the assets",
      subtitle: "Give the game a style",
      tags: ["Sprites", "Tiles · Audio"],
      stage: "assets",
      description:
        "Set the art direction, sprite dimensions, frame counts, and anchors before generating or finding assets. Check transparency, collision shapes, and animation states on import.",
      deliverable:
        "An asset inventory, animation state table, and license records.",
      check:
        "Frames keep a consistent scale, collisions match the art, and sources are documented.",
    },
    {
      id: "testing",
      title: "Playtest & iterate",
      subtitle: "Tune the experience",
      tags: ["Benchmarks", "Visual QA"],
      stage: "test",
      description:
        "Combine scripted inputs, state assertions, and key screenshots. Track build, gameplay, and visual issues separately, then playtest with people and adjust the pacing.",
      deliverable:
        "Input replays, key frames, and gameplay acceptance results.",
      check:
        "Failure, pause, restart, and extended play all have recorded test evidence.",
    },
    {
      id: "release",
      title: "Ship your world",
      subtitle: "Put it in players’ hands",
      tags: ["Build", "Player feedback"],
      stage: "ship",
      description:
        "Build for the target platform and check asset paths, controls, and loading. Record dependency versions, generation prompts, and known limits for the next iteration.",
      deliverable: "A distributable build, README, and release notes.",
      check:
        "Players on the target device can launch, load, play, and report issues.",
    },
  ],
  "3d": [
    {
      id: "scope",
      title: "Plan & scope",
      subtitle: "Start with one space",
      tags: ["Vertical slice", "Target device"],
      stage: "plan",
      description:
        "Define the camera, character controls, core interactions, and target hardware. Start with one room or level to keep the scope of the 3D project manageable.",
      deliverable:
        "A level sketch, interaction checklist, and performance targets.",
      check:
        "Target devices, quality settings, and the core experience are defined.",
    },
    {
      id: "engine",
      title: "Choose an engine",
      subtitle: "Set up the pipeline",
      tags: ["Unreal · Unity", "Three.js · Godot"],
      stage: "scene",
      description:
        "Choose the engine, renderer, and physics approach, then connect MCP or editor automation. Plan for both code changes and scene or asset operations in the editor.",
      deliverable: "A minimal scene, editor integration, and build command.",
      check:
        "Creating objects, running the scene, and reading errors follow repeatable steps.",
    },
    {
      id: "gameplay",
      title: "Build the loop",
      subtitle: "Bring space to life",
      tags: ["Agent frameworks", "Gameplay"],
      stage: "code",
      description:
        "Build movement, camera controls, collisions, and key interactions in a graybox level. Give the agent runtime state and errors as feedback while developing the gameplay.",
      deliverable:
        "A graybox level, character controller, and interaction state machine.",
      check:
        "Camera, collision, save, and restart behavior work correctly in the running game.",
    },
    {
      id: "assets",
      title: "Create the assets",
      subtitle: "Make models game-ready",
      tags: ["Mesh · Texture", "Rig · Animation"],
      stage: "assets",
      description:
        "After generating or finding models, check scale, topology, materials, rigs, and animation. Prepare assets that the engine can load and use reliably.",
      deliverable:
        "GLB or engine assets, collision shapes, LODs, and a license inventory.",
      check:
        "Models are grounded and consistently scaled, with rendering and physics costs within budget.",
    },
    {
      id: "testing",
      title: "Playtest & iterate",
      subtitle: "Test behavior and space",
      tags: ["Runtime tests", "Performance"],
      stage: "test",
      description:
        "Test scene connectivity, character behavior, physics stability, and frame times in the engine. Evaluate generated results with task checks and visual evidence.",
      deliverable:
        "Runtime test results, scene screenshots, and performance samples.",
      check:
        "Interactions are reachable, collisions are stable, key paths connect, and performance meets targets.",
    },
    {
      id: "release",
      title: "Ship your world",
      subtitle: "Package the experience",
      tags: ["Packaging", "Optimization"],
      stage: "ship",
      description:
        "Package for the target platform, trim unused assets, and verify loading. Record engine and plugin versions, hardware requirements, and reproduction steps.",
      deliverable:
        "An installer or web build, performance notes, and reproduction instructions.",
      check:
        "A clean install on the target device completes one full gameplay loop.",
    },
  ],
  world: [
    {
      id: "state",
      title: "Define the state",
      subtitle: "Choose what holds truth",
      tags: ["Code state", "Scene graph"],
      stage: "plan",
      description:
        "Decide whether code, an explicit scene, or video latents represent the world. Evaluate editability, interpretability, and visual quality separately.",
      deliverable:
        "A state schema, representation choice, and controllable variables.",
      check:
        "The system responsible for positions, collisions, object identity, and events is clear.",
    },
    {
      id: "actions",
      title: "Connect actions",
      subtitle: "Turn input into change",
      tags: ["Action interface", "Environment"],
      stage: "scene",
      description:
        "Define the action space and environment interface. Distinguish language commands, keyboard inputs, and camera paths so model controls match the intended interaction.",
      deliverable: "An action protocol and environment step interface.",
      check:
        "Actions have clear semantics, and the path from input to image can be tested.",
    },
    {
      id: "dynamics",
      title: "Code the dynamics",
      subtitle: "Keep rules and memory",
      tags: ["WorldCoder", "Code world model"],
      stage: "code",
      description:
        "Explore programs that express state transitions and rewards, or agents that update the environment. Check long-term state, object persistence, and editing capabilities.",
      deliverable: "Transition rules, scene update code, and state logs.",
      check:
        "State changes are reproducible, and rules can be checked independently of rendered images.",
    },
    {
      id: "rendering",
      title: "Render the world",
      subtitle: "From structure to image",
      tags: ["SolarRenderer", "StreamRender-H3"],
      stage: "world",
      description:
        "Pass structural conditions from the engine to a neural renderer. Check geometry, action alignment, temporal consistency, and inference latency separately.",
      deliverable:
        "Structural inputs, neural render outputs, and synchronization logs.",
      check:
        "Rendering follows the underlying state across time, beyond looking good in a single frame.",
    },
    {
      id: "consistency",
      title: "Test consistency",
      subtitle: "Measure what persists",
      tags: ["Long horizon", "Controllability"],
      stage: "test",
      description:
        "Measure long-term drift, action response, object identity, and collisions. Distinguish project demonstrations, paper evaluations, and reproducible open implementations.",
      deliverable:
        "Fixed action sequences, comparison recordings, and an evaluation report.",
      check:
        "Report duration, resolution, hardware, and failures so comparisons use equivalent conditions.",
    },
    {
      id: "experience",
      title: "Build an experience",
      subtitle: "Make research interactive",
      tags: ["Runtime budget", "Research demo"],
      stage: "ship",
      description:
        "Choose a research demo or product prototype based on model licenses, compute costs, and real-time requirements. Keep reproducible configurations and documented limits.",
      deliverable:
        "An interactive demo, environment notes, and known limitations.",
      check:
        "The target hardware can sustain the latency, memory use, and ongoing compute cost.",
    },
  ],
};

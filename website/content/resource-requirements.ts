type ResourceRequirements = {
  engine?: string;
  environment?: string;
  terms?: string;
};

/** Short selection facts taken from each record's reviewed sources. */
export const resourceRequirements: Readonly<
  Record<string, ResourceRequirements | undefined>
> = {
  "godot-engine": {
    engine: "Godot 4.x documentation",
    environment: "Windows, macOS and Linux editor",
    terms: "MIT",
  },
  "godot-mcp": {
    engine: "Godot",
    environment: "Local Node.js server and Godot executable",
  },
  "unity-mcp": {
    engine: "Unity 2021.3 LTS or newer (publisher minimum)",
    environment: "Local Unity Editor · Python 3.10+ · uv",
  },
  "gdevelop-ai-mcp": {
    engine: "GDevelop desktop editor",
    environment: "Windows, macOS and Linux · same computer as the agent",
    terms: "Sign-in for online features",
  },
  "godot-gut": {
    engine: "Godot · match the GUT release to the editor version",
    environment: "Editor or command line · GDScript",
    terms: "MIT",
  },
  gdunit4: {
    engine: "Godot 4.5 or newer for GdUnit4 6.x",
    environment: "Editor or CI · GDScript and C#",
    terms: "MIT",
  },
  "unity-test-framework": {
    engine: "Unity · use the package version supported by your editor",
    environment: "Edit Mode, Play Mode and command line",
  },
  "game-ci": {
    engine: "Unity · pin the Editor version in CI",
    environment: "Automated Unity tests on GitHub Actions",
    terms: "Unity license activation required",
  },
  "unreal-automation-tests": {
    engine: "Unreal Engine",
    environment: "Editor or command line · functional and content tests",
  },
  "unreal-gauntlet": {
    engine: "Unreal Engine · prepared cooked build required",
    environment: "AutomationTool · local machine or target device",
  },
  "unreal-insights": {
    engine: "Unreal Engine 5.9 documentation reviewed",
    environment: "Trace capture and Unreal Insights analysis",
    terms: "Unreal Engine EULA",
  },
  "playwright-test": {
    environment: "Chromium, Firefox and WebKit · local or CI",
    terms: "Apache-2.0",
  },
  "playwright-mcp": {
    environment: "Node.js · browser automation via MCP",
    terms: "Apache-2.0",
  },
  pixellab: {
    environment: "Hosted API and MCP",
    terms: "Commercial asset service",
  },
  scenario: {
    environment: "Hosted app, REST API and MCP beta",
    terms: "Account required",
  },
  meshy: {
    environment: "Hosted workspace and API · GLB / FBX",
    terms: "Account required · API usage consumes credits",
  },
  mixamo: {
    environment: "Hosted rigging and animation library",
    terms: "Adobe account required · regional restrictions",
  },
  "stable-audio-open": {
    environment: "Local inference · Python",
    terms: "Model access gated · separate license for model weights",
  },
};

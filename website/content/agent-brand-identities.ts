import type { ResourceIdentity } from "../src/data/resourceIdentities";

export const agentBrandIdentities = {
  "claude-code": {
    organization: "Claude Code",
    kind: "brand",
    asset: "logos/agent-claude-code-7241633e5a39.png",
    sourceUrl:
      "https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code",
    logoSourceUrl:
      "https://anthropic.gallerycdn.vsassets.io/extensions/anthropic/claude-code/2.1.332/1795570450188/Microsoft.VisualStudio.Services.Icons.Default",
    sha256: "7241633e5a39b44a947c7b9a821637f30d6e86716e7a8c847136d91f9c3f6ba1",
    notes:
      "The original icon uploaded by Anthropic for Claude Code in the Visual Studio Marketplace.",
  },
  qoder: {
    organization: "Qoder",
    kind: "brand",
    asset: "logos/agent-qoder-73864c4c2013.png",
    sourceUrl: "https://qoder.com/en",
    logoSourceUrl:
      "https://img.alicdn.com/imgextra/i3/O1CN01r1a1zKvnpOG0cGga_%21%216000000005369-2-tps-304-304.png",
    background: "dark",
    sha256: "73864c4c2013728c2189b41be5d0acfda7300786091a2517acab47bb09476dec",
    notes:
      "The unmodified global Qoder product mark from its official product homepage.",
  },
} satisfies Record<string, ResourceIdentity>;

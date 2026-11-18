import { papers, threejsGames } from "./extended-data";
import resourceData from "../src/data/resources.json";
import repositoryResearch from "../../data/segments/repository-research.json";
import type { Resource, Dimension } from "../src/types";
import type {
  RepositoryResearchRecord,
  PathContent,
  ContentModels,
} from "./models";
import {
  learningPaths,
  foundationPaths,
  communityCollections,
} from "../src/data/learningPaths";
import {
  agentGameResources,
  gameCaseAgents,
  agentLabels,
  agentResourceKinds,
} from "../src/data/agentGameResources";
import {
  testingResources,
  testingStarterPacks,
  testingKinds,
  testingUses,
  testingTerms,
} from "../src/data/testingResources";
import { plans } from "../src/data/plans";
import { showcaseByTrack } from "../src/data/showcase";
import { recordings } from "../src/data/recordings";
import { projectMedia } from "../src/data/projectMedia";
import { learningMedia } from "../src/data/learningMedia";
import { researchGameMedia } from "../src/data/researchGameMedia";
import { gameplayScreenshots } from "../src/data/gameplayScreenshots";
import { pageCovers } from "../src/data/pageCovers";
import { editorial } from "../src/data/editorial";
import identityData from "../src/data/resourceIdentities.json";
import type { ResourceIdentity } from "../src/data/resourceIdentities";

/** Git authoring provider. Release builds replace the facade, never merge these rows. */
export const sources = {
  papers,
  threejsGames,
  resources: resourceData as Resource[],
  repositoryResearch: repositoryResearch as Omit<
    typeof repositoryResearch,
    "records"
  > & { records: RepositoryResearchRecord[] },
  learningPaths,
  foundationPaths,
  communityCollections: [
    ...communityCollections,
  ] as ContentModels["collection"][],
  agentGameResources,
  gameCaseAgents,
  agentLabels,
  agentResourceKinds,
  testingResources,
  testingStarterPacks,
  testingKinds,
  testingUses,
  testingTerms,
  plans,
  recordings,
  showcaseByTrack,
  projectMedia,
  learningMedia,
  researchGameMedia,
  pageCovers,
  gameplayScreenshots,
  editorial,
  identities: identityData as Record<string, ResourceIdentity>,
};
export type ContentSources = typeof sources & {
  pathDefinitions?: Record<Dimension, PathContent>;
};

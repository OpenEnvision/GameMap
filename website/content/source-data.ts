import resourceData from "../src/data/resources.json";
import repositoryResearch from "../../data/research/cadle-repositories.json";
import type { Resource } from "../src/types";
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
} from "../src/data/testingResources";
import { plans } from "../src/data/plans";
import { showcaseCases, showcaseByTrack } from "../src/data/showcase";
import { projectVideos } from "../src/data/projectVideos";
import { projectMedia } from "../src/data/projectMedia";
import { learningMedia } from "../src/data/learningMedia";
import { editorial } from "../src/data/editorial";
import identities from "../src/data/resourceIdentities.json";

/** Raw collections only: no presentation filtering or last-write-wins media selection. */
export const sources = {
  resources: resourceData as Resource[],
  repositoryResearch,
  learningPaths,
  foundationPaths,
  communityCollections,
  agentGameResources,
  gameCaseAgents,
  agentLabels,
  agentResourceKinds,
  testingResources,
  testingStarterPacks,
  plans,
  showcaseCases,
  showcaseByTrack,
  projectVideos,
  projectMedia,
  learningMedia,
  editorial,
  identities,
};
export type ContentSources = typeof sources;

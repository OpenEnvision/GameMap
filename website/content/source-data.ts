import resourceData from "../src/data/resources.json";
import paperData from "../../data/papers.json";
import type { PaperReference } from "./papers";
import repositoryResearch from "../../data/segments/repository-research.json";
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
import { showcaseByTrack } from '../src/data/showcase';
import { recordings } from '../src/data/recordings';
import { projectMedia } from "../src/data/projectMedia";
import { learningMedia } from "../src/data/learningMedia";
import { editorial } from "../src/data/editorial";
import identities from "../src/data/resourceIdentities.json";

/** Raw collections only: no presentation filtering or last-write-wins media selection. */
export const sources = {
  papers: paperData as PaperReference[],
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
  recordings,
  showcaseByTrack,
  projectMedia,
  learningMedia,
  editorial,
  identities,
};
export type ContentSources = typeof sources;

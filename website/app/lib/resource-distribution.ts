import {
  categories,
  stageLabels,
  typeLabels,
  type Dimension,
  type Resource,
  type ResourceType,
  type Stage,
} from "../../src/types";

export function resourceDistribution(resources: readonly Resource[]) {
  return {
    total: resources.length,
    categories: categories.map((category) => ({
      ...category,
      count: resources.filter((resource) => resource.category === category.id)
        .length,
    })),
    stages: (Object.keys(stageLabels) as Stage[]).map((id) => ({
      id,
      label: stageLabels[id],
      count: resources.filter((resource) => resource.stages.includes(id))
        .length,
    })),
    tracks: (["2d", "3d", "world"] as Dimension[]).map((id) => ({
      id,
      label: id === "world" ? "World models" : id.toUpperCase(),
      count: resources.filter((resource) => resource.dimensions.includes(id))
        .length,
    })),
    types: (Object.keys(typeLabels) as ResourceType[]).map((id) => ({
      id,
      label: typeLabels[id],
      count: resources.filter((resource) => resource.type === id).length,
    })),
  };
}

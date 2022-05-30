import { createMemory, removeMemory, updateMemory, getAll } from "./memories";

import { getMemoryItem, getRecommendItem } from "./memory";

export const memoriesActions = {
  get: getAll,
  create: createMemory,
  remove: removeMemory,
  update: updateMemory,
  getItem: getMemoryItem,
  getRecommend: getRecommendItem,
};

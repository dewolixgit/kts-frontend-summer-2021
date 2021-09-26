import {
  normalizeGitHubRepoOwner,
  RepoOwnerApi,
  RepoOwnerModel,
} from "./gitHubRepoOwner";

export type RepoItemApi = {
  name: string;
  stargazers_count: number;
  updated_at: string; //или лучше передавать как тип Date??
  owner: RepoOwnerApi;
  id: number;
};

export type RepoItemModel = {
  name: string;
  stargazersCount: number;
  updatedAt: string; //или лучше передавать как тип Date??
  owner: RepoOwnerModel;
  id: number;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  owner: normalizeGitHubRepoOwner(from.owner),
  stargazersCount: from.stargazers_count,
  updatedAt: from.updated_at,
});

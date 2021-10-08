export type RepoOwnerApi = {
  login: string;
  public_repos: number;
};

export type RepoOwnerModel = {
  login: string;
  publicRepos: number;
};

export const normalizeGitHubRepoOwner = (
  from: RepoOwnerApi
): RepoOwnerModel => ({
  login: from.login,
  publicRepos: from.public_repos,
});

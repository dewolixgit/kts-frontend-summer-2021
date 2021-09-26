export type RepoOwnerApi = {
  login: string;
};

export type RepoOwnerModel = {
  login: string;
};

export const normalizeGitHubRepoOwner = (
  from: RepoOwnerApi
): RepoOwnerModel => ({
  login: from.login,
});

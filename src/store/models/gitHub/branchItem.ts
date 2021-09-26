export type BranchItemApi = {
  name: string;
  owner: string;
  repo: string;
};

export type BranchItemModel = {
  name: string;
  owner: string;
  repo: string;
};

export const normalizeBranchItem = (from: BranchItemApi): BranchItemModel => ({
  name: from.name,
  owner: from.owner,
  repo: from.repo,
});

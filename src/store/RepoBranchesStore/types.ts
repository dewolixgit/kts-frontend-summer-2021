import { RepoItemModel } from "store/models/gitHub";

export interface IRepoBranchesStore {
  getRepoBranches(repo: RepoItemModel): Promise<void>;
  loadRepoAndGetRepoBranches(id: string): Promise<void>;
}

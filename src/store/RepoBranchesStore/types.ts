import { RepoItemModel } from "store/models/gitHub";
import RepoItemStore from "store/RepoItemStore";

export interface IRepoBranchesStore {
  getRepoBranches(repo: RepoItemModel): Promise<void>;
  loadRepoAndGetRepoBranches(
    id: string,
    repoItemStore: RepoItemStore
  ): Promise<void>;
}

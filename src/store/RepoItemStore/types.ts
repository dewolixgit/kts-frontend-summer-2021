import { RepoItemModel } from "@store/models/gitHub";

export interface IRepoItemStore {
  requestRepoItem(id: string): Promise<void>;
}

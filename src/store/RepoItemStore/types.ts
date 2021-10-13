export interface IRepoItemStore {
  requestRepoItem(id: string): Promise<void>;
}

export interface IRepoOwnerStore {
  getRepoOwnerInfo(login: string): Promise<void>;
}

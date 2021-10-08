import { RepoItemModel } from "store/models/gitHub";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_repoItem";

export default class RepoItemStorageStore {
  private _repoItem: RepoItemModel | null = null;

  constructor() {
    makeObservable<RepoItemStorageStore, PrivateFields>(this, {
      _repoItem: observable,
      setRepoItem: action,
      repoItem: computed,
    });
  }

  get repoItem(): RepoItemModel | null {
    return this._repoItem;
  }

  setRepoItem(newRepoItem: RepoItemModel | null): void {
    this._repoItem = newRepoItem;
  }
}

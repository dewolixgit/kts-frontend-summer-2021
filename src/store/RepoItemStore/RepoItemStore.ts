import ApiStore from "shared/store/ApiStore";
import { HTTPMethod, RequestParams } from "shared/store/ApiStore/types";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "store/models/gitHub";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IRepoItemStore } from "./types";

type PrivateFields = "_repoItem" | "_meta";

const BASE_URL = "https://api.github.com";

export default class RepoItemStore implements IRepoItemStore, ILocalStore {
  private _apiStore = new ApiStore(BASE_URL);
  private _repoItem: RepoItemModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _meta: observable,
      _repoItem: observable,
      requestRepoItem: action,
      setRepoItem: action,
      meta: computed,
      repoItem: computed,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get repoItem(): RepoItemModel | null {
    return this._repoItem;
  }

  setRepoItem(repoItem: RepoItemModel) {
    this._repoItem = repoItem;
  }

  async requestRepoItem(id: string) {
    this._repoItem = null;
    this._meta = Meta.loading;

    const paramsToRequest: RequestParams<{}> = {
      method: HTTPMethod.GET,
      headers: {},
      endpoint: `/repositories/${id}`,
      data: {},
    };

    const response = await this._apiStore.request<RepoItemApi>(paramsToRequest);

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;

          this._repoItem = normalizeRepoItem(response.data);
        } catch (err) {
          this._meta = Meta.error;
          this._repoItem = null;
        }
      }

      if (!response.success) {
        this._meta = Meta.error;
      }
    });
  }

  destroy() {
    //nothing
  }
}

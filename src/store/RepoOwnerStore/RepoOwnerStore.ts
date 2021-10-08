import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod, RequestParams } from "@shared/store/ApiStore/types";
import {
  normalizeGitHubRepoOwner,
  RepoOwnerApi,
  RepoOwnerModel,
} from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IRepoOwnerStore } from "./types";

type PrivateFields = "_meta" | "_owner";

const BASE_URL = "https://api.github.com";

export default class RepoOwnerStore implements IRepoOwnerStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _owner: RepoOwnerModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoOwnerStore, PrivateFields>(this, {
      _meta: observable,
      _owner: observable,
      getRepoOwnerInfo: action,
      owner: computed,
      meta: computed,
    });
  }

  get owner(): RepoOwnerModel | null {
    return this._owner;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoOwnerInfo(login: string) {
    this._owner = null;
    this._meta = Meta.loading;

    const paramsToRequest: RequestParams<{}> = {
      method: HTTPMethod.GET,
      headers: {},
      endpoint: `/users/${login}`,
      data: {},
    };

    const response = await this._apiStore.request<RepoOwnerApi>(
      paramsToRequest
    );

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;

          this._owner = normalizeGitHubRepoOwner(response.data);
        } catch (err) {
          this._meta = Meta.error;
          this._owner = null;
        }
      }

      if (!response.success) {
        this._meta = Meta.error;
      }
    });
  }

  destroy() {
    // nothing to do
  }
}

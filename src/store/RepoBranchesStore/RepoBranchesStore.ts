import ApiStore from "shared/store/ApiStore";
import {
  ApiResponse,
  HTTPMethod,
  RequestParams,
} from "shared/store/ApiStore/types";
import {
  BranchItemApi,
  BranchItemModel,
  normalizeBranchItem,
  RepoItemModel,
} from "store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normilizeElementsAndCollection,
} from "store/models/shared/collection";
import {} from "store/ReposListStore/types";
import { log } from "utils/log";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IRepoBranchesStore } from "./types";

type PrivateFields = "_branches" | "_meta";

const BASE_URL = "https://api.github.com";

export default class RepoBranchesStore
  implements IRepoBranchesStore, ILocalStore
{
  private _apiStore = new ApiStore(BASE_URL);

  private _branches: CollectionModel<string, BranchItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branches: observable,
      _meta: observable,
      getRepoBranches: action,
      branches: computed,
      meta: computed,
    });
  }

  get branches(): BranchItemModel[] {
    return linearizeCollection(this._branches);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoBranches(repo: RepoItemModel): Promise<void> {
    this._meta = Meta.loading;
    this._branches = getInitialCollectionModel();

    const paramsToRequest: RequestParams<{}> = {
      method: HTTPMethod.GET,
      headers: {},
      endpoint: `/repos/${repo.owner.login}/${repo.name}/branches`,
      data: {},
    };

    const responce = await this._apiStore.request<BranchItemApi[]>(
      paramsToRequest
    );

    runInAction(() => {
      if (responce.success) {
        try {
          this._meta = Meta.success;

          this._branches = normilizeElementsAndCollection(
            responce.data,
            (branchItemModel: BranchItemModel) => branchItemModel.name,
            normalizeBranchItem
          );
        } catch (err) {
          log(err);
          this._meta = Meta.error;
          this._branches = getInitialCollectionModel();
        }
      }

      if (!responce.success) {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {
    //nothing to do
  }
}

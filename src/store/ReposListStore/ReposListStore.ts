import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import {
  concatCollections,
  CollectionModel,
  getInitialCollectionModel,
  normilizeElementsAndCollection,
  linearizeCollection,
} from "@store/models/shared/collection";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod, RequestParams } from "../../shared/store/ApiStore/types";
import {
  IReposListStore,
  GetOrganizationReposListParams,
  GetOrganizationReposListParamsForQueryStr,
} from "./types";

type PrivateFields = "_repos" | "_meta";

const BASE_URL = "https://api.github.com";

export default class ReposListStore implements IReposListStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);

  private _repos: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _repos: observable,
      _meta: observable,
      repos: computed,
      meta: computed,
      getOrganizationReposList: action,
    });
  }

  get repos(): RepoItemModel[] {
    return linearizeCollection(this._repos);
  }

  getRepoCollection(): CollectionModel<number, RepoItemModel> {
    return this._repos;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._repos =
      params.page && params.page > 1
        ? this._repos
        : getInitialCollectionModel();

    const headersObj: Record<string, string> = params.accept
      ? { accept: params.accept }
      : {};

    const paramsToRequest: RequestParams<GetOrganizationReposListParamsForQueryStr> =
      {
        method: HTTPMethod.GET,
        headers: headersObj,
        endpoint: `/orgs/${params.org}/repos`,
        data: {
          type: params.type,
          sort: params.sort,
          per_page: params.per_page,
          page: params.page,
          direction: params.direction,
        },
      };

    const response = await this._apiStore.request<RepoItemApi[]>(
      paramsToRequest
    );

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;

          const newRepos = normilizeElementsAndCollection(
            response.data,
            (repoItemModel: RepoItemModel) => repoItemModel.id,
            normalizeRepoItem
          );

          this._repos = concatCollections(this._repos, newRepos);
        } catch (err) {
          log(err);
          this._meta = Meta.error;
          this._repos = getInitialCollectionModel();
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

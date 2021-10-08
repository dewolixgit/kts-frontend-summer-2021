import { RepoItemApi, RepoItemModel } from "store/models/gitHub";
import { BranchItemApi } from "store/models/gitHub/branchItem";

export type GetOrganizationReposListParams = {
  accept?: string;
  org: string;
  type?: "all" | "public" | "forks" | "sources" | "member" | "internal";
  sort?: "created" | "ipdated" | "pushed" | "full_name";
  direction?: "asc" | "desc";
  per_page?: number;
  page?: number;
};

export type GetOrganizationReposListParamsForQueryStr = Omit<
  GetOrganizationReposListParams,
  "accept" | "org"
>;

/** Интерфейс класса для работы с GitHub API, для получения списка репозиториев */
export interface IReposListStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}

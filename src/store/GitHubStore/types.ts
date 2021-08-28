import { ApiResponse } from "../../shared/store/ApiStore/types";

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

/** Интерфейс класса для работы с GitHub API */
export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], string>>;
}

export type RepoItem = {};

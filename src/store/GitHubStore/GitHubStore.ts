import ApiStore from "../../shared/store/ApiStore";
import {
  ApiResponse,
  HTTPMethod,
  RequestParams,
} from "../../shared/store/ApiStore/types";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  RepoItem,
  GetOrganizationReposListParamsForQueryStr,
  GetRepoBranchesProps,
  ApiBranchesResponse,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly baseUrl = "https://api.github.com";
  private readonly apiStore = new ApiStore(this.baseUrl);

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], string>> {
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

    return await this.apiStore.request(paramsToRequest);
  }

  async getRepoBranches(
    params: GetRepoBranchesProps
  ): Promise<ApiBranchesResponse> {
    try {
      return await fetch(
        `${this.baseUrl}/repos/${params.owner}/${params.repo.name}/branches`
      )
        .then(async (result) => {
          const obj: ApiBranchesResponse = {
            data: await result.json(),
            success: true,
          };
          return obj;
        })
        .catch((error) => {
          const obj: ApiBranchesResponse = {
            data: error,
            success: false,
          };
          return obj;
        });
    } catch (error) {
      return {
        data: error,
        success: false,
      };
    }
  }
}

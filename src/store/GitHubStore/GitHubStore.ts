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
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

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
}

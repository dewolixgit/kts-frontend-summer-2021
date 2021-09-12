import qs from "qs";

import {
  ApiResponse,
  IApiStore,
  RequestParams,
  HTTPMethod,
  StatusHTTP,
} from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getRequestData<ReqT = {}>(
    params: RequestParams<ReqT>
  ): [string, RequestInit] {
    const options: RequestInit = {};
    options.method = params.method;
    options.headers = params.headers;

    let newEndpoint = `${this.baseUrl}${params.endpoint}`;

    if (params.method === HTTPMethod.GET) {
      newEndpoint = `${newEndpoint}?${qs.stringify(params.data)}`;
    } else if (params.method === HTTPMethod.POST) {
      const dataJSON = JSON.stringify(params.data);

      options.headers["Content-Type"] = "application/json;charset=utf-8";
      options.body = dataJSON;
    }

    return [newEndpoint, options];
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      return await fetch(...this.getRequestData(params))
        .then(async (result) => {
          const obj: ApiResponse<SuccessT, never> = {
            success: true,
            data: await result.json(),
            status: StatusHTTP.OK,
          };
          return obj;
        })
        .catch((error) => {
          const obj: ApiResponse<never, ErrorT> = {
            success: false,
            data: error.message,
          };
          return obj;
        });
    } catch (error) {
      return {
        data: error,
        status: StatusHTTP.UNEXPECTED_ERROR,
        success: false,
      };
    }
  }
}

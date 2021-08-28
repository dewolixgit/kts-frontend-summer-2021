import {ApiResponse, IApiStore, RequestParams, HTTPMethod, StatusHTTP} from "./types";
import qs from 'qs';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        
        let options: Object = {};
        let newEndpoint: string = this.baseUrl + params.endpoint;
        if (params.method === HTTPMethod.GET) {
            const queryString: string = qs.stringify(params.data)
            newEndpoint = newEndpoint + '?' + queryString;

            options = {
                method: params.method,
                headers: params.headers
            }
        }
        else if (params.method === HTTPMethod.POST) {
            const dataJSON = JSON.stringify(params.data);
            const extendedHeaders: Record<string, string> = params.headers;
            extendedHeaders['Content-Type'] = "application/json;charset=utf-8";

            options = {
                method: params.method,
                headers: extendedHeaders,
                body: dataJSON
            }
        }

        return await fetch(newEndpoint, options)
        .then(async (result) => {
            const obj: ApiResponse<SuccessT, never> = {
                success: true,
                data: await result.json(),
                status: StatusHTTP.OK
            };
            return obj;
        })
        .catch((error) => {
            const obj: ApiResponse<never, ErrorT> = {
                success: false,
                data: error.message,
                status: StatusHTTP.NOT_FOUND,
            };
            return obj;
        })

    }

}
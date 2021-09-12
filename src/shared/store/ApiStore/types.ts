// Перечисление методов HTTP-запроса
export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

// Параметры запроса
export type RequestParams<ReqT> = {
  method: HTTPMethod; // Метод запроса, GET или POST
  endpoint: string; // API-endpoint, на который делается запрос
  headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками

  /**
   * Объект с данными запроса.
   * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
   * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
   */
  data: ReqT;
};

// Перечисление статусов ответа
export enum StatusHTTP {
  OK = 200,
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: StatusHTTP.OK;
    }
  | {
      success: false;
      data: ErrorT;
      status?: number;
    }
  | {
      success: false;
      data: any;
      status: StatusHTTP.UNEXPECTED_ERROR;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
  readonly baseUrl: string;

  request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}

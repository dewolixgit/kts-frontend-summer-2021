import { History, Location } from "history";

export interface IQueryParamsStore {
  setParam(key: string, value: string): void;
  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[];
  setHistory(history: History, location: Location): void;
}

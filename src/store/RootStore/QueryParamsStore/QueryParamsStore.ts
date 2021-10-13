import { action, computed, makeObservable, observable } from "mobx";
import qs from "qs";
import { IQueryParamsStore } from "./types";
import { History, Location } from "history";

type PrivateFields = "_params" | "_searchParam";

export default class QueryParamsStore implements IQueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _location: Location | null = null;
  private _history: History | null = null;
  private _searchParam = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _searchParam: observable,
      searchParam: computed,
      setParam: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  get searchParam(): string {
    return this._searchParam;
  }

  setParam(key: string, value: string): void {
    if (!this._history) return;

    this._params = { ...this._params, [key]: value };
    if (key == "search") this._searchParam = value;

    const nextSearch = qs.stringify(this._params);

    this._history.replace({
      ...this._location,
      search: nextSearch,
    });
  }

  setHistory(history: History, location: Location): void {
    if (this._history && this._location) return;

    this._history = history;
    this._location = location;
    this._params = qs.parse(
      location.search.startsWith("?")
        ? location.search.slice(1)
        : location.search
    );

    if (this._params.search) this._searchParam = this._params.search.toString();
  }
}

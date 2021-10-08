import { ILocalStore } from "utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_current";

export default class CurrentPageNumber implements ILocalStore {
  private _current = 1;

  constructor() {
    makeObservable<CurrentPageNumber, PrivateFields>(this, {
      _current: observable,
      increment: action,
      reset: action,
      current: computed,
    });
  }

  get current(): number {
    return this._current;
  }

  increment(): void {
    this._current++;
  }

  reset(): void {
    this._current = 1;
  }

  destroy(): void {
    // nothing to do
  }
}

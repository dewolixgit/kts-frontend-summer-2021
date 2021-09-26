import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_current";

export default class CurrentPageNumber implements ILocalStore {
  private _current: number = 1;

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

  increment() {
    this._current++;
  }

  reset() {
    this._current = 1;
  }

  destroy() {
    // nothing to do
  }
}

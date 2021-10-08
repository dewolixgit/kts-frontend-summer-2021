import { ILocalStore } from "utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";
import { useHistory } from "react-router";

type PrivateFields = "_currentValue";

export default class InputStore implements ILocalStore {
  private _currentValue = "";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _currentValue: observable,
      setInputValue: action,
      currentValue: computed,
    });
  }

  get currentValue(): string {
    return this._currentValue;
  }

  setInputValue(value: string): void {
    this._currentValue = value;
  }

  destroy(): void {
    // nothing to do
  }
}

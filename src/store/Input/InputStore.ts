import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import rootStore from "store/RootStore";

type PrivateFields = "_currentValue";

export default class InputStore implements ILocalStore {
  private _currentValue = "";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _currentValue: observable,
      setInputValue: action.bound,
      currentValue: computed,
    });
  }

  get currentValue(): string {
    return this._currentValue;
  }

  setInputValue(event: React.FormEvent<HTMLInputElement>): void {
    rootStore.query.setParam("search", event.currentTarget.value);
  }

  destroy(): void {
    this.onChange();
  }

  private readonly onChange: IReactionDisposer = reaction(
    () => rootStore.query.searchParam,
    () => {
      this._currentValue = rootStore.query.searchParam;
    },
    {
      fireImmediately: true,
    }
  );
}

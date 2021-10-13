import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { useHistory } from "react-router";
import rootStore from "store/RootStore";
import { log } from "utils/log";

type PrivateFields = "_currentValue";

export default class InputStore implements ILocalStore {
  private _currentValue = "";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _currentValue: observable,
      setInputValue: action.bound,
      currentValue: computed,
    });

    log(rootStore.query.searchParam);
  }

  get currentValue(): string {
    return this._currentValue;
  }

  setInputValue(event: React.FormEvent<HTMLInputElement>): void {
    // this._currentValue = event.currentTarget.value;
    rootStore.query.setParam("search", event.currentTarget.value);
  }

  destroy(): void {
    this.onChange();
  }

  // private readonly onChange: IReactionDisposer = reaction(
  //   () => this.currentValue,
  //   (currentInputValue) => {
  //     rootStore.query.setParam("search", currentInputValue);
  //   }
  // );

  private readonly onChange: IReactionDisposer = reaction(
    () => rootStore.query.searchParam,
    (currentInputValue) => {
      log("reaction", rootStore.query.searchParam);
      // rootStore.query.setParam("search", currentInputValue);
      this._currentValue = rootStore.query.searchParam;
    },
    {
      fireImmediately: true,
    }
  );
}

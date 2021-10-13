import { ILocalStore } from "utils/useLocalStore";
import { History, Location } from "history";
import { log } from "utils/log";
import { toJS } from "mobx";

export default class RepoBranchesDrawerStore implements ILocalStore {
  onClose(history: History): void {
    if (!history.location.state) {
      history.push("/repos");
    } else {
      history.goBack();
    }
  }

  destroy() {
    // nothing to do
  }
}

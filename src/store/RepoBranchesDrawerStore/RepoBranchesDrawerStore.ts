import { ILocalStore } from "utils/useLocalStore";
import { History } from "history";

export default class RepoBranchesDrawerStore implements ILocalStore {
  onClose(history: History): void {
    if (!history.location.state) {
      history.push("/repos");
    } else {
      history.goBack();
    }
  }

  destroy(): void {
    // nothing to do
  }
}

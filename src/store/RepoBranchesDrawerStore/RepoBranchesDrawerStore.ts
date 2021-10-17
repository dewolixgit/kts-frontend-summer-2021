import { ILocalStore } from "utils/useLocalStore";
import { History } from "history";
import { LocationStateProps } from "shared/types/LocationStateProps";
import ReposListStore from "store/ReposListStore";

export default class RepoBranchesDrawerStore implements ILocalStore {
  onClose(
    history: History<LocationStateProps>,
    reposListStore: ReposListStore | null
  ): void {
    if (
      !history.location.state?.prevSearch &&
      reposListStore?.repos.length == 0
    ) {
      history.push("/repos");
    } else {
      history.goBack();
    }
  }

  destroy(): void {
    // nothing to do
  }
}

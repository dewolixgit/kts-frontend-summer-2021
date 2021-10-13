import CurrentPageNumberStore from "store/CurrentPageNumberStore";
import InputStore from "store/Input";
import RepoOwnerStore from "store/RepoOwnerStore";
import ReposListStore from "store/ReposListStore";
import rootStore from "store/RootStore";
import { ILocalStore } from "utils/useLocalStore";

export default class ButtonStore implements ILocalStore {
  load(
    currentPageNumberStore: CurrentPageNumberStore,
    reposListStore: ReposListStore,
    repoOwnerStore: RepoOwnerStore,
    inputStore: InputStore
  ): void {
    currentPageNumberStore.reset();
    reposListStore.getOrganizationReposList({
      org: rootStore.query.searchParam,
      per_page: 10,
    });
    repoOwnerStore.getRepoOwnerInfo(inputStore.currentValue);
  }

  destroy(): void {
    //nothing to do
  }
}

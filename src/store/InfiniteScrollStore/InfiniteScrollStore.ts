import CurrentPageNumberStore from "store/CurrentPageNumberStore";
import InputStore from "store/Input";
import RepoOwnerStore from "store/RepoOwnerStore";
import ReposListStore from "store/ReposListStore";
import { ILocalStore } from "utils/useLocalStore";

export default class InfiniteScrollStore implements ILocalStore {
  doesHasMore(
    reposListStore: ReposListStore | null,
    repoOwnerStore: RepoOwnerStore | null
  ): boolean {
    return reposListStore?.repos.length !== repoOwnerStore?.owner?.publicRepos;
  }

  loadNext(
    currentPageNumberStore: CurrentPageNumberStore | null,
    reposListStore: ReposListStore | null,
    inputStore: InputStore | null
  ): void {
    currentPageNumberStore?.increment();
    reposListStore?.getOrganizationReposList({
      per_page: 10,
      page: currentPageNumberStore?.current,
      org: inputStore?.currentValue ? inputStore.currentValue : "",
    });
  }

  destroy(): void {
    // nothing to do
  }
}

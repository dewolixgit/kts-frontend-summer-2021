import React, { useCallback } from "react";

import RepoBranchesDrawer from "components/RepoBranchesDrawer";
import RepoTile from "components/RepoTile";
import { Provider } from "../ReposSearchPage";
import { Meta } from "utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { UseReposSearchPageContext } from "pages/ReposSearchPage";
import InfiniteScrollStore from "store/InfiniteScrollStore";
import RepoBranchesDrawerStore from "store/RepoBranchesDrawerStore";
import Loader from "components/Loader";

const ReposListPage = () => {
  const context = UseReposSearchPageContext();
  const infiniteScrollStore = useLocalStore(() => new InfiniteScrollStore());
  const repoBranchesDrawerStore = useLocalStore(
    () => new RepoBranchesDrawerStore()
  );

  const nextPageLoad = useCallback(() => {
    infiniteScrollStore.loadNext(
      context.currentPageNumberStore,
      context.reposListStore,
      context.inputStore
    );
  }, [
    context.currentPageNumberStore,
    context.reposListStore,
    context.inputStore,
    infiniteScrollStore,
  ]);

  const history = useHistory();

  const closeHandle = useCallback(() => {
    repoBranchesDrawerStore.onClose(history);
  }, [repoBranchesDrawerStore, history]);

  return (
    <div>
      {context.reposListStore?.meta === Meta.error && (
        <div>Не удалось найти запрашиваемые репозитории</div>
      )}
      <Provider
        value={{
          reposListStore: context.reposListStore,
          inputStore: context.inputStore,
          repoOwnerStore: context.repoOwnerStore,
          currentPageNumberStore: context.currentPageNumberStore,
        }}
      >
        {context.reposListStore?.meta === Meta.loading && <Loader />}
        {(context.reposListStore?.meta == Meta.success ||
          context.reposListStore?.meta == Meta.extraLoading) &&
          context.reposListStore?.repos && (
            <InfiniteScroll
              next={nextPageLoad}
              hasMore={infiniteScrollStore.doesHasMore(
                context.reposListStore,
                context.repoOwnerStore
              )}
              loader={<Loader />}
              dataLength={context.reposListStore?.repos.length}
            >
              <div className="repo-list">
                {context.reposListStore.repos.map((repoItem) => (
                  <Link
                    to={{
                      pathname: `/repos/${repoItem.id}`,
                      state: { prevSearch: history.location.search },
                    }}
                    key={repoItem.id}
                  >
                    <RepoTile repoItem={repoItem} />
                  </Link>
                ))}
              </div>
              {/* <ReposList repos={context.reposListStore.repos} /> */}
            </InfiniteScroll>
          )}
        <RepoBranchesDrawer onClose={closeHandle} />
      </Provider>
    </div>
  );
};

export default observer(ReposListPage);

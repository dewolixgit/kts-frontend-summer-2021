import React from "react";

import RepoBranchesDrawer from "components/RepoBranchesDrawer";
import RepoTile from "components/RepoTile";
import { Provider } from "../ReposSearchPage";
import { Meta } from "utils/meta";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { UseReposSearchPageContext } from "pages/ReposSearchPage";

const ReposListPage = () => {
  const context = UseReposSearchPageContext();

  const history = useHistory();

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
        {context.reposListStore?.meta === Meta.loading && <div>Загрузка</div>}
        {context.reposListStore?.meta !== Meta.loading &&
          context.reposListStore?.repos && (
            <InfiniteScroll
              next={() => {
                context.currentPageNumberStore?.increment();
                context.reposListStore?.getOrganizationReposList({
                  per_page: 10,
                  page: context.currentPageNumberStore?.current,
                  org: context.inputStore?.currentValue
                    ? context.inputStore?.currentValue
                    : "",
                });
              }}
              hasMore={
                context.reposListStore.repos.length !==
                context.repoOwnerStore?.owner?.publicRepos
              }
              loader={<div></div>}
              dataLength={context.reposListStore?.repos.length}
            >
              <div className="repo-list">
                {context.reposListStore.repos.map((repoItem) => (
                  <Link to={`/repos/${repoItem.id}`} key={repoItem.id}>
                    <RepoTile
                      name={repoItem.name}
                      owner={repoItem.owner}
                      stargazersCount={repoItem.stargazersCount}
                      updatedAt={repoItem.updatedAt}
                      id={repoItem.id}
                    />
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          )}
        <RepoBranchesDrawer
          onClose={() => {
            history.push("/repos");
          }}
        />
      </Provider>
    </div>
  );
};

export default observer(ReposListPage);

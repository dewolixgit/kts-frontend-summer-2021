import { createContext, useContext, useEffect, useRef, useState } from "react";
import React from "react";

import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import { Provider } from "@pages/ReposSearchPage/ReposSearchPage";
import { RepoItemModel } from "@store/models/gitHub";
import RepoItemStorageStore from "@store/RepoItemStorageStore";
import RepoItemStore from "@store/RepoItemStore";
import ReposListStore from "@store/ReposListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { toJS } from "mobx";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { UseReposSearchPageContext } from "../ReposSearchPage";

// type ReposListContext = {
//   // repoItemStorageStore: RepoItemStorageStore | null;
//   reposList: ReposListStore | null;
// };

// export const ReposListPageContext = createContext<ReposListContext>({
//   // repoItemStorageStore: null,
//   reposList: [],
// });

// const Provider = ReposListPageContext.Provider;

// export const UseReposListPageContext = () => useContext(ReposListPageContext);

type ReposListProps = {
  repos: RepoItemModel[];
  isLoading: boolean;
};

const ReposListPage = () => {
  log("render repos list page");
  // const context = UseReposSearchPageContext();
  // const [selectedRepo, setSelectedRepo] = useState<RepoItemModel | null>(null);
  const selectedRepo = useLocalStore(() => new RepoItemStorageStore());
  // const [drawerVisible, setDrawerVisible] = useState(false);
  const context = UseReposSearchPageContext();

  const currentPageNumber = useRef(1);

  const repoId = useParams<{ id: string }>().id;
  // useEffect(() => {
  //   if (repoId) {
  //     setDrawerVisible(true);
  //   }
  // }, [repoId]);

  // useEffect(() => {
  //   setSelectedRepo(context.list[0]);
  //   log(toJS(selectedRepo), "now is selected is useef");
  // }, []);

  // useEffect(() => {
  //   log(drawerVisible, "draw vis");
  // }, [drawerVisible]);

  // useEffect(() => {
  //   if (!context.reposListStore?.repos.length && !repoId)
  //     context.reposListStore?.getOrganizationReposList({
  //       org: "ktsstudio",
  //       page: currentPageNumber.current++,
  //     });
  // }, []);

  useEffect(
    () => log("selected repo now is", selectedRepo.repoItem),
    [selectedRepo.repoItem]
  );

  // const ReposList: (
  //   reposListProps: ReposListProps
  // ) => React.ReactElement | null = ({ repos, isLoading }) => {
  //   if (isLoading) {
  //     return <div>Загрузка</div>;
  //   } else {
  //     return (
  //       <div className="repo-list">
  //         {repos.map((repoItem) => (
  //           <Link to={`/repos/${repoItem.id}`} key={repoItem.id}>
  //             <RepoTile
  //               name={repoItem.name}
  //               owner={repoItem.owner}
  //               stargazersCount={repoItem.stargazersCount}
  //               updatedAt={repoItem.updatedAt}
  //               id={repoItem.id}
  //               onClick={() => {
  //                 setSelectedRepo(repoItem);
  //               }}
  //             />
  //           </Link>
  //         ))}
  //       </div>
  //     );
  //   }
  // };

  const history = useHistory();

  return (
    <div>
      <Provider
        value={{
          reposListStore: context.reposListStore,
          inputStore: context.inputStore,
        }}
      >
        *ReposListPage is active*
        {context.reposListStore?.meta === Meta.loading && <div>loading</div>}
        {context.reposListStore?.meta !== Meta.loading &&
          context.reposListStore?.repos && (
            <InfiniteScroll
              next={() => {
                context.reposListStore?.getOrganizationReposList({
                  page: currentPageNumber.current++,
                  org: context.inputStore?.currentValue
                    ? context.inputStore?.currentValue
                    : "",
                });
              }}
              hasMore={true}
              loader={<div></div>}
              dataLength={context.reposListStore?.repos.length}
            >
              {/* <ReposList repos={context.list} isLoading={context.isLoading} /> */}
              <div className="repo-list">
                {context.reposListStore.repos.map((repoItem) => (
                  <Link to={`/repos/${repoItem.id}`} key={repoItem.id}>
                    <RepoTile
                      name={repoItem.name}
                      owner={repoItem.owner}
                      stargazersCount={repoItem.stargazersCount}
                      updatedAt={repoItem.updatedAt}
                      id={repoItem.id}
                      onClick={() => {
                        // setSelectedRepo(context.list[0]);
                        // log("in onclick", selectedRepo.repoItem);
                        // selectedRepo.setRepoItem(repoItem);
                      }}
                    />
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          )}
        <RepoBranchesDrawer
          onClose={() => {
            log("closing of drawer");
            // setDrawerVisible(false);
            // setSelectedRepo(null);
            // selectedRepo.setRepoItem(null);
            history.push("/repos");
          }}
          // visible={repoId ? true : false}
        />
      </Provider>
    </div>
  );
};

export default observer(ReposListPage);

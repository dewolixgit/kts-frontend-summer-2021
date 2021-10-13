import { useEffect, useMemo } from "react";
import React from "react";
import "antd/dist/antd.css";

import { UseReposSearchPageContext } from "pages/ReposSearchPage";
import { RepoItemModel } from "store/models/gitHub";
import RepoBranchesStore from "store/RepoBranchesStore/RepoBranchesStore";
import RepoItemStore from "store/RepoItemStore";
import { Meta } from "utils/meta";
import { Drawer } from "antd";
import { observer, useLocalStore } from "mobx-react-lite";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { log } from "utils/log";
import { toJS } from "mobx";
import ReposListStore from "store/ReposListStore";
// import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

type RepoBranchesDrawerProps = {
  onClose: () => void;
  // visible: boolean;
};

type DrawerProperies = {
  title: string;
  onClose: () => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
  log("go to repo branches drawer");
  const context = UseReposSearchPageContext();

  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const repoId = useParams<{ id?: string }>().id;

  let branchCounterId = 0;

  // useEffect(() => {
  //   log(
  //     "go to repo branches drawer use effect",
  //     "repoId",
  //     repoId,
  //     context.reposListStore?.repos.length
  //   );
  //   if (
  //     context.reposListStore?.repos.length !== 0 &&
  //     repoId &&
  //     context.reposListStore
  //   ) {
  //     const targetRepo: RepoItemModel =
  //       context.reposListStore.getRepoCollection().entities[parseInt(repoId)];
  //     repoBranchesStore.getRepoBranches(targetRepo);
  //     repoItemStore.setRepoItem(targetRepo);
  //   } else if (context.reposListStore?.repos.length == 0 && repoId) {
  //     log("no repos, there is id");
  //     repoItemStore.requestRepoItem(repoId);
  //     log("in drawer after request repo item", repoItemStore.repoItem);
  //     if (
  //       repoItemStore.repoItem !== null &&
  //       repoItemStore.meta === Meta.success
  //     ) {
  //       log(toJS(repoItemStore.repoItem));
  //       repoBranchesStore.getRepoBranches(repoItemStore.repoItem);
  //       repoItemStore.setRepoItem(repoItemStore.repoItem);
  //     }
  //   }
  // }, []);

  const history = useHistory();
  useEffect(() => {
    log("history", history);
    if (
      context.reposListStore?.repos.length !== 0 &&
      repoId &&
      context.reposListStore
    ) {
      const targetRepo: RepoItemModel =
        context.reposListStore.getRepoCollection().entities[parseInt(repoId)];
      repoBranchesStore.getRepoBranches(targetRepo);
      repoItemStore.setRepoItem(targetRepo);
    } else if (context.reposListStore?.repos.length == 0 && repoId) {
      repoBranchesStore.loadRepoAndGetRepoBranches(repoId);
    }
  }, []);

  const drawerOptions = useMemo<DrawerProperies>(
    () => ({
      title: "Ветки",
      visible: repoId ? true : false,
      onClose: () => onClose(),
    }),
    [onClose, repoId]
  );

  return (
    <Drawer {...drawerOptions}>
      {repoBranchesStore.meta === Meta.loading && <div>Загрузка</div>}
      {repoBranchesStore.meta === Meta.error && (
        <div>Не удалось загрузить ветки</div>
      )}
      {repoBranchesStore.meta === Meta.success && (
        <>
          <ul>
            {repoBranchesStore.branches.map((branchItem) => {
              return <li key={branchCounterId++}>{branchItem.name}</li>;
            })}
          </ul>
          Id репозитория: {repoItemStore.repoItem?.id}
        </>
      )}
    </Drawer>
  );
};

export default observer(RepoBranchesDrawer);

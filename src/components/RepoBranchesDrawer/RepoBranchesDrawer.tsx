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
import { useHistory, useParams } from "react-router-dom";
import Loader from "components/Loader";

type RepoBranchesDrawerProps = {
  onClose: () => void;
};

type DrawerProperies = {
  title: string;
  onClose: () => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
  const context = UseReposSearchPageContext();

  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const repoId = useParams<{ id?: string }>().id;

  let branchCounterId = 0;

  const history = useHistory();
  useEffect(() => {
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
      repoBranchesStore.loadRepoAndGetRepoBranches(repoId, repoItemStore);
    }
  }, [
    repoId,
    context.reposListStore,
    history,
    repoBranchesStore,
    repoItemStore,
  ]);

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
      {repoBranchesStore.meta === Meta.loading && <Loader />}
      {repoBranchesStore.meta === Meta.error && (
        <div>Не удалось загрузить ветки</div>
      )}
      {repoBranchesStore.meta === Meta.success &&
        repoBranchesStore.branches.length === 0 && (
          <div>В этом репозитории нет веток</div>
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

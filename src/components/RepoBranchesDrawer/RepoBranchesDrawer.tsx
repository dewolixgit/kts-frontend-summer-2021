import { useEffect } from "react";
import React from "react";
import "antd/dist/antd.css";

import { UseReposSearchPageContext } from "@pages/ReposSearchPage";
import { RepoItemModel } from "@store/models/gitHub";
import RepoBranchesStore from "@store/RepoBranchesStore/RepoBranchesStore";
import RepoItemStore from "@store/RepoItemStore";
import { Meta } from "@utils/meta";
import { Drawer } from "antd";
import { observer, useLocalStore } from "mobx-react-lite";
import { useParams } from "react-router-dom";

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
  const context = UseReposSearchPageContext();

  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const repoId = useParams<{ id?: string }>().id;

  let branchCounterId = 0;

  useEffect(() => {
    if (context.reposListStore?.repos.length && repoId) {
      const targetRepo: RepoItemModel =
        context.reposListStore.getRepoCollection().entities[parseInt(repoId)];
      repoBranchesStore.getRepoBranches(targetRepo);
      repoItemStore.setRepoItem(targetRepo);
    } else if (!context.reposListStore?.repos.length && repoId) {
      repoItemStore.requestRepoItem(repoId);
      if (
        repoItemStore.repoItem !== null &&
        repoItemStore.meta === Meta.success
      ) {
        repoBranchesStore.getRepoBranches(repoItemStore.repoItem);
        repoItemStore.setRepoItem(repoItemStore.repoItem);
      }
    }
  }, []);

  const drawerOptions: DrawerProperies = {
    title: "Ветки",
    visible: repoId ? true : false,
    onClose: () => onClose(),
  };

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

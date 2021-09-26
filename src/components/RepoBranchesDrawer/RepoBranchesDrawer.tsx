import { useContext, useEffect, useState } from "react";
import React from "react";
import "antd/dist/antd.css";

// import { UseReposListPageContext } from "@pages/ReposListPage/ReposListPage";
// import { ReposListPageContext } from "@pages/ReposListPage/ReposListPage";
import { UseReposSearchPageContext } from "@pages/ReposSearchPage";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import {
  BranchItemModel,
  normalizeBranchItem,
} from "@store/models/gitHub/branchItem";
import RepoBranchesStore from "@store/RepoBranchesStore/RepoBranchesStore";
import RepoItemStore from "@store/RepoItemStore";
import GitHubStore from "@store/ReposListStore";
import { log } from "@utils/log";
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

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  onClose,
  // visible,
}) => {
  // const [branches, setBranches] = useState<BranchItemModel[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [targetRepo, setTargetRepo] = useState<RepoItemModel | null>( //пофиксить на модель
  //   selectedRepo
  // );
  // const context = useContext(ReposListPageContext);
  // const context = UseReposListPageContext();
  const context = UseReposSearchPageContext();

  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const repoId = useParams<{ id?: string }>().id;

  let branchCounterId = 0;

  useEffect(() => {
    // if (context.repoItemStorageStore?.repoItem) {
    //   repoBranchesStore.getRepoBranches(context.repoItemStorageStore?.repoItem);
    // } else if (!context.repoItemStorageStore?.repoItem && repoId) {
    //   repoItemStore.getRepoItem(repoId);
    //   if (
    //     repoItemStore.repoItem !== null &&
    //     repoItemStore.meta === Meta.success
    //   ) {
    //     repoBranchesStore.getRepoBranches(repoItemStore.repoItem);
    //   }
    // }
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

  if (
    repoBranchesStore.branches.length &&
    !(repoBranchesStore.meta === Meta.loading)
  ) {
    return (
      <Drawer {...drawerOptions}>
        <ul>
          {repoBranchesStore.branches.map((branchItem) => {
            return <li key={branchCounterId++}>{branchItem.name}</li>;
          })}
        </ul>
        Id репозитория: {repoItemStore.repoItem?.id}
      </Drawer>
    );
  }

  return <Drawer {...drawerOptions}></Drawer>;
};

export default observer(RepoBranchesDrawer);

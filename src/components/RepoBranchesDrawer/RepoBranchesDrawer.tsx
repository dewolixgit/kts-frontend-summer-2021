import { useEffect } from "react";
import React from "react";
import "antd/dist/antd.css";

import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { log } from "@utils/log";
import { Drawer } from "antd";

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: () => void;
  visible: boolean;
};

type DrawerState = {
  branches: RepoItem[];
  isLoading: boolean;
};

type DrawerProperies = {
  title: string;
  onClose: () => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  onClose,
  selectedRepo,
  visible,
}) => {
  const [drawerState, setDrawerState] = React.useState<DrawerState>({
    branches: [],
    isLoading: false,
  });

  // const onCloseOwnHandler = () => {
  //   onClose();
  //   setDrawerState({
  //     ...drawerState,
  //     branches: [],
  //   });
  // };

  log("go into drawer");

  useEffect(() => {
    log("go to useEffect");
    if (!selectedRepo) return;

    setDrawerState({
      isLoading: visible ? true : false,
      branches: [],
    });

    const gitHubStore = new GitHubStore();

    gitHubStore
      .getRepoBranches({
        repo: selectedRepo,
        owner: selectedRepo.owner.login,
      })
      .then((branches) => {
        log("go to then");
        if (branches)
          setDrawerState({ branches: branches.data, isLoading: false });
      });
  }, [visible]);

  const drawerOptions: DrawerProperies = {
    title: "Ветки",
    visible: visible,
    onClose: onClose,
  };

  if (drawerState.branches.length && !drawerState.isLoading) {
    return (
      <Drawer {...drawerOptions}>
        <ul>
          {drawerState.branches.map((branchItem) => {
            return <li>{branchItem.name}</li>;
          })}
        </ul>
      </Drawer>
    );
  } else {
    return <Drawer {...drawerOptions}></Drawer>;
  }
};

export default RepoBranchesDrawer;

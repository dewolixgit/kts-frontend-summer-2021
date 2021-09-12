import { useEffect, useState } from "react";
import React from "react";
import "antd/dist/antd.css";

import GitHubStore from "@store/GitHubStore";
import { BranchItem, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { useHistory, useParams } from "react-router-dom";

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: () => void;
  visible: boolean;
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
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetRepo, setTargetRepo] = useState<RepoItem | null>(selectedRepo);

  const repoId = useParams<{ id?: string }>().id;

  let branchCounterId = 0;

  useEffect(() => {
    const gitHubStore = new GitHubStore();

    if (selectedRepo) {
      setIsLoading(visible);

      gitHubStore
        .getRepoBranches({
          repo: selectedRepo,
          owner: selectedRepo.owner.login,
        })
        .then((branches) => {
          if (branches) {
            setBranches(branches.data);
            setIsLoading(false);
          }
        });
    } else if (!selectedRepo && repoId) {
      setIsLoading(true);

      gitHubStore
        .getRepoById(repoId)
        .then((response) => {
          if (response.success) {
            return response.data;
          }
        })
        .then((repo) => {
          if (repo) {
            setTargetRepo(repo);
            return gitHubStore.getRepoBranches({
              owner: repo.owner.login,
              repo: repo,
            });
          }
        })
        .then((branchesReponse) => {
          if (branchesReponse && branchesReponse.success) {
            setBranches(branchesReponse.data);
            setIsLoading(false);
          }
        });
    }
  }, [visible, selectedRepo]);

  const history = useHistory();
  const drawerOptions: DrawerProperies = {
    title: "Ветки",
    visible: visible,
    onClose: () => {
      history.push("/repos");
      onClose();
    },
  };

  if (branches.length && !isLoading) {
    return (
      <Drawer {...drawerOptions}>
        <ul>
          {branches.map((branchItem) => {
            return <li key={branchCounterId++}>{branchItem.name}</li>;
          })}
        </ul>
        Id репозитория: {targetRepo?.id}
      </Drawer>
    );
  }

  return <Drawer {...drawerOptions}></Drawer>;
};

export default RepoBranchesDrawer;

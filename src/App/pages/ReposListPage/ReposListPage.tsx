import { useEffect, useState } from "react";
import React from "react";

import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import { RepoItem } from "@store/GitHubStore/types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { UseReposSearchPageContext } from "../ReposSearchPage";

type ReposListProps = {
  repos: RepoItem[];
  isLoading: boolean;
};

const ReposListPage = () => {
  const context = UseReposSearchPageContext();
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const repoId = useParams<{ id: string }>().id;
  useEffect(() => {
    if (repoId) {
      setDrawerVisible(true);
    }
  }, [repoId]);

  useEffect(() => {
    if (!context.list.length && !repoId) context.load();
  }, []);

  const ReposList: (
    reposListProps: ReposListProps
  ) => React.ReactElement | null = ({ repos, isLoading }) => {
    if (isLoading) {
      return <div>Загрузка</div>;
    } else {
      return (
        <div className="repo-list">
          {repos.map((repoItem) => (
            <Link to={`/repos/${repoItem.id}`} key={repoItem.id}>
              <RepoTile
                name={repoItem.name}
                owner={repoItem.owner}
                stargazers_count={repoItem.stargazers_count}
                updated_at={repoItem.updated_at}
                id={repoItem.id}
                onClick={() => setSelectedRepo(repoItem)}
              />
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      *ReposListPage is active*
      <ReposList repos={context.list} isLoading={context.isLoading} />
      <RepoBranchesDrawer
        onClose={() => {
          setDrawerVisible(false);
          setSelectedRepo(null);
        }}
        visible={drawerVisible}
        selectedRepo={selectedRepo}
      />
    </div>
  );
};

export default ReposListPage;

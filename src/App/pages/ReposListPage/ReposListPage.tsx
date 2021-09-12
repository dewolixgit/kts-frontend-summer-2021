import { useEffect, useRef, useState } from "react";
import React from "react";

import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import { RepoItem } from "@store/GitHubStore/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router";
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

  const currentPageNumber = useRef(1);

  const repoId = useParams<{ id: string }>().id;
  useEffect(() => {
    if (repoId) {
      setDrawerVisible(true);
    }
  }, [repoId]);

  useEffect(() => {
    if (!context.list.length && !repoId)
      context.load(currentPageNumber.current++);
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

  const history = useHistory();

  return (
    <div>
      *ReposListPage is active*
      <InfiniteScroll
        next={() => {
          context.load(currentPageNumber.current++);
        }}
        hasMore={true}
        loader={<div></div>}
        dataLength={context.list.length}
      >
        <ReposList repos={context.list} isLoading={context.isLoading} />
      </InfiniteScroll>
      <RepoBranchesDrawer
        onClose={() => {
          setDrawerVisible(false);
          setSelectedRepo(null);
          history.push("/repos");
        }}
        visible={drawerVisible}
        selectedRepo={selectedRepo}
      />
    </div>
  );
};

export default ReposListPage;

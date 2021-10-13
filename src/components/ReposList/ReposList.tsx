import RepoTile from "components/RepoTile";
import React from "react";
import { Link } from "react-router-dom";
import { RepoItemModel } from "store/models/gitHub";

type ReposListProps = {
  repos: RepoItemModel[];
};

const ReposList: React.FC<ReposListProps> = ({ repos }) => {
  return (
    <div className="repo-list">
      {repos.map((repoItem) => (
        <Link to={`/repos/${repoItem.id}`} key={repoItem.id}>
          <RepoTile repoItem={repoItem} />
        </Link>
      ))}
    </div>
  );
};

export default React.memo(ReposList);

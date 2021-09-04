import React from "react";

import StarIcon from "@assets/StarIcon";
import Avatar from "@components/Avatar";
import { RepoItem } from "src/store/GitHubStore/types";

import "./RepoTile.css";

type ClickHandler = {
  onClick?: (event: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoItem & ClickHandler> = ({
  name,
  stargazers_count,
  updated_at,
  owner,
  onClick,
}) => {
  const repoNameFirstLetter = name[0].toUpperCase();
  const repoUrl = `https://github.com/${owner.login}/${name}`;
  const ownerUrl = `https://github.com/${owner.login}`;

  return (
    <div className="repo-tile" onClick={onClick}>
      <Avatar alt={`repository name is ${name}`} letter={repoNameFirstLetter} />
      <div className="repo-tile__content">
        <div className="repo-tile__name">
          <a href={repoUrl}>{name}</a>
        </div>
        <div className="repo-tile__owner">
          <a href={ownerUrl}>{owner.login}</a>
        </div>
        <div className="repo-tile__data">
          <div className="repo-tile__rating">
            <StarIcon className="repo-tile__rating-star" /> {stargazers_count}
          </div>
          <div className="repo-tile__update-date">
            Updated at {updated_at.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;

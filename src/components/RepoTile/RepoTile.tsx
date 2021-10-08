import React from "react";

import StarIcon from "assets/StarIcon";
import Avatar from "components/Avatar";
import { RepoItemModel } from "store/models/gitHub";
import { observer } from "mobx-react-lite";

import styles from "./RepoTile.module.scss";

type ClickHandler = {
  onClick?: (event: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoItemModel & ClickHandler> = ({
  name,
  stargazersCount,
  updatedAt,
  owner,
  id,
  onClick,
}) => {
  const repoNameFirstLetter = name[0].toUpperCase();
  const repoUrl = `https://github.com/${owner.login}/${name}`;
  const ownerUrl = `https://github.com/${owner.login}`;

  return (
    <div className={styles["repo-tile"]} onClick={onClick}>
      <Avatar alt={`repository name is ${name}`} letter={repoNameFirstLetter} />
      <div className={styles["repo-tile__content"]}>
        <div className={styles["repo-tile__name"]}>
          <a href={repoUrl}>{name}</a>
        </div>
        <div className={styles["repo-tile__owner"]}>
          <a href={ownerUrl}>{owner.login}</a>
        </div>
        <div className={styles["repo-tile__data"]}>
          <div className={styles["repo-tile__rating"]}>
            <StarIcon className={styles["repo-tile__rating-star"]} />{" "}
            {stargazersCount}
          </div>
          <div className={styles["repo-tile__update-date"]}>
            Updated at {updatedAt.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(RepoTile);

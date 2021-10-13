import React from "react";

import StarIcon from "assets/StarIcon";
import Avatar from "components/Avatar";
import { RepoItemModel } from "store/models/gitHub";
import { observer } from "mobx-react-lite";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  repoItem: RepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ repoItem }) => {
  const repoNameFirstLetter = repoItem.name[0].toUpperCase();
  const repoUrl = `https://github.com/${repoItem.owner.login}/${repoItem.name}`;
  const ownerUrl = `https://github.com/${repoItem.owner.login}`;

  return (
    <div className={styles["repo-tile"]}>
      <Avatar
        alt={`repository name is ${repoItem.name}`}
        letter={repoNameFirstLetter}
      />
      <div className={styles["repo-tile__content"]}>
        <div className={styles["repo-tile__name"]}>
          <a href={repoUrl}>{repoItem.name}</a>
        </div>
        <div className={styles["repo-tile__owner"]}>
          <a href={ownerUrl}>{repoItem.owner.login}</a>
        </div>
        <div className={styles["repo-tile__data"]}>
          <div className={styles["repo-tile__rating"]}>
            <StarIcon className={styles["repo-tile__rating-star"]} />{" "}
            {repoItem.stargazersCount}
          </div>
          <div className={styles["repo-tile__update-date"]}>
            Updated at {repoItem.updatedAt.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(RepoTile);

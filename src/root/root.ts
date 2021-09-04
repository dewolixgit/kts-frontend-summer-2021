import { RepoItem } from "@store/GitHubStore/types";
import { log } from "@utils/log";

import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

let selectedRepo: RepoItem;

gitHubStore
  .getOrganizationReposList({
    org: EXAMPLE_ORGANIZATION,
  })
  .then((result) => {
    if (result.success) selectedRepo = result.data[0];
    log(result);
  })
  .then(() => {
    gitHubStore
      .getRepoBranches({
        owner: "ktsstudio",
        repo: selectedRepo,
      })
      .then((branch) => {
        log(branch.data);
      });
  });

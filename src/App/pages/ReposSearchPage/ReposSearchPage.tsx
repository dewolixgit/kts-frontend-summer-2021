import React from "react";
import { useState } from "react";

import SearchIcon from "@assets/SearchIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
// eslint-disable-next-line import/order
import { log } from "@utils/log";

import "./ReposSearchPage.css";

type ResponseStateProps = {
  isLoading: boolean;
  repos: RepoItem[] | null;
  currentInputValue: string;
  selectedRepo: RepoItem | null;
};

const ReposSearchPage = () => {
  const [responseState, setResponseState] = useState<ResponseStateProps>({
    isLoading: false,
    repos: null,
    currentInputValue: "",
    selectedRepo: null,
  });

  const [drawerVisible, setDrawerVisible] = React.useState<boolean>(false);

  const handleBtnClick = () => {};

  React.useEffect(() => {
    setResponseState({
      isLoading: true,
      repos: null,
      currentInputValue: responseState.currentInputValue,
      selectedRepo: null,
    });

    const gitHubStore = new GitHubStore();
    gitHubStore
      .getOrganizationReposList({ org: "ktsstudio" })
      .then((result) => result.data)
      .then((result) => {
        if (Array.isArray(result)) {
          setResponseState({
            isLoading: false,
            repos: result,
            currentInputValue: responseState.currentInputValue,
            selectedRepo: null,
          });
        } else {
          setResponseState({
            isLoading: false,
            repos: [],
            currentInputValue: responseState.currentInputValue,
            selectedRepo: null,
          });
        }
      });
  }, [setResponseState]);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setResponseState({
      ...responseState,
      currentInputValue: event.currentTarget.value,
    });
  };

  const wrapperRepoTitleClick = (repo: RepoItem) => {
    const selectedRepo = repo;

    return (clickEvent: React.MouseEvent) => {
      log(`now ${selectedRepo.name} is selected`);
      setResponseState({
        ...responseState,
        selectedRepo: selectedRepo,
      });

      setDrawerVisible(true);
    };
  };

  const onCloseHandler = () => {
    log("onCloseHandler");
    setDrawerVisible(false);
  };

  const ReposList: (
    responseState: ResponseStateProps
  ) => React.ReactElement | null = (responseState) => {
    if (responseState.isLoading) {
      return <div>Загрузка{log("загрузка")}</div>;
    } else if (!responseState.repos) {
      return <>{log("не найдено")}</>;
    } else {
      const repos = responseState.repos;

      return (
        <div className="repo-list">
          {repos.map((repoItem, index) => (
            <RepoTile
              name={repos[index].name}
              owner={repos[index].owner}
              stargazers_count={repos[index].stargazers_count}
              updated_at={repos[index].updated_at}
              key={repos[index].id}
              onClick={wrapperRepoTitleClick(repoItem)}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="repos-search-page">
      <form className="search-form">
        <Input
          placeholder={"Введите название организации"}
          value={responseState.currentInputValue}
          onChange={handleOnChange}
          isDisabled={responseState.isLoading}
        />
        <Button onClick={handleBtnClick} isDisabled={responseState.isLoading}>
          <SearchIcon />
        </Button>
      </form>

      <ReposList {...responseState} />

      <RepoBranchesDrawer
        selectedRepo={responseState.selectedRepo}
        onClose={onCloseHandler}
        visible={drawerVisible}
      />
    </div>
  );
};

export default ReposSearchPage;

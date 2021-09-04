import React from "react";
import { useState } from "react";

import SearchIcon from "@assets/SearchIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { log } from "@utils/log";

import "./ReposSearchPage.css";

type ResponseStateProps = {
  isLoading: boolean;
  repos: RepoItem[] | null;
  currentInputValue: string;
};

const ReposList: React.FC<ResponseStateProps> = (
  responseState: ResponseStateProps
) => {
  const repos = responseState.repos;

  if (responseState.isLoading) {
    return <div>Загрузка{log("загрузка")}</div>;
  } else if (!repos) {
    return <>{log("не найдено")}</>;
  } else {
    return (
      <div className="repo-list">
        {repos.map((item, index) => (
          <RepoTile
            name={repos[index].name}
            owner={repos[index].owner}
            stargazers_count={repos[index].stargazers_count}
            updated_at={repos[index].updated_at}
            key={repos[index].id}
          />
        ))}
      </div>
    );
  }
};

const ReposSearchPage = () => {
  const [responseState, setResponseState] = useState<ResponseStateProps>({
    isLoading: false,
    repos: null,
    currentInputValue: "",
  });

  const handleBtnClick = () => {};

  React.useEffect(() => {
    setResponseState({
      isLoading: true,
      repos: null,
      currentInputValue: responseState.currentInputValue,
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
          });
        } else {
          setResponseState({
            isLoading: false,
            repos: [],
            currentInputValue: responseState.currentInputValue,
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
    </div>
  );
};

export default ReposSearchPage;

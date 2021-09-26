import React, { createContext, useContext } from "react";
import { useState } from "react";

import SearchIcon from "@assets/SearchIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import ReposListPage from "../ReposListPage";
import styles from "./ReposSearchPage.module.scss";

type ReposContext = {
  list: RepoItem[];
  isLoading: boolean;
  load: (page: number) => void;
};

const ReposSearchPageContext = createContext<ReposContext>({
  isLoading: false,
  list: [],
  load: () => {},
});

const Provider = ReposSearchPageContext.Provider;

export const UseReposSearchPageContext = () =>
  useContext(ReposSearchPageContext);

const ReposSearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [currentInputValue, setCurrentInputValue] = useState("");

  const loadingFunc = async (page: number) => {
    const gitHubStore = new GitHubStore();
    if (page === 1) {
      setIsLoading(true);
      setRepos([]);

      await gitHubStore
        .getOrganizationReposList({ org: "ktsstudio", per_page: 10 })
        .then((result) => result.data)
        .then((result) => {
          if (Array.isArray(result)) {
            setRepos(result);
          } else {
            setRepos([]);
          }
          setIsLoading(false);
        });
    } else {
      await gitHubStore
        .getOrganizationReposList({
          org: "ktsstudio",
          page: page,
          per_page: 10,
        })
        .then((result) => result.data)
        .then((result) => {
          if (Array.isArray(result)) {
            setRepos(repos.concat(result));
          } else {
            setRepos(repos);
          }
        });
    }
  };

  return (
    <div className={styles["repos-search-page"]}>
      <BrowserRouter>
        <form className={styles["search-form"]}>
          <Input
            placeholder={"Введите название организации"}
            value={currentInputValue}
            onChange={(event) =>
              setCurrentInputValue(event.currentTarget.value)
            }
            isDisabled={isLoading}
          />

          <Button onClick={() => setIsLoading(true)} disabled={isLoading}>
            <SearchIcon />
          </Button>
        </form>
        <Link to="/repos">go to ReposListPage</Link>
        <Link to="">go to ReposSearchPage</Link>

        <Switch>
          <Provider
            value={{ isLoading: isLoading, load: loadingFunc, list: repos }}
          >
            <Route exact path="/repos/:id" component={ReposListPage} />
            <Route exact path="/repos" component={ReposListPage} />
            <Redirect to="/repos" />
          </Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default ReposSearchPage;

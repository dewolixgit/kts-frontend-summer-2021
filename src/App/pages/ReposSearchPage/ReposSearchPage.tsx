import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import SearchIcon from "assets/SearchIcon/SearchIcon";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import CurrentPageNumberStore from "store/CurrentPageNumberStore";
import InputStore from "store/Input/InputStore";
import RepoOwnerStore from "store/RepoOwnerStore";
import GitHubStore from "store/ReposListStore";
import ReposListStore from "store/ReposListStore";
import { useQueryParamsStoreInit } from "./hooks/useQueryParamsStoreInit";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import ReposListPage from "../ReposListPage";
import styles from "./ReposSearchPage.module.scss";
import rootStore from "store/RootStore";
import qs from "qs";
import { log } from "utils/log";
import ButtonStore from "store/Button";

type ReposContext = {
  reposListStore: ReposListStore | null;
  inputStore: InputStore | null;
  repoOwnerStore: RepoOwnerStore | null;
  currentPageNumberStore: CurrentPageNumberStore | null;
};

const ReposSearchPageContext = createContext<ReposContext>({
  reposListStore: null,
  inputStore: null,
  repoOwnerStore: null,
  currentPageNumberStore: null,
});

export const Provider = ReposSearchPageContext.Provider;

export const UseReposSearchPageContext = (): ReposContext =>
  useContext(ReposSearchPageContext);

const ReposSearchPage = () => {
  useQueryParamsStoreInit();
  const reposListStore = useLocalStore(() => new GitHubStore());
  const inputStore = useLocalStore(() => new InputStore());
  const repoOwnerStore = useLocalStore(() => new RepoOwnerStore());
  const currentPageNumberStore = useLocalStore(
    () => new CurrentPageNumberStore()
  );
  const buttonStore = useLocalStore(() => new ButtonStore());

  const loadRepos = useCallback(
    () =>
      buttonStore.load(
        currentPageNumberStore,
        reposListStore,
        repoOwnerStore,
        inputStore
      ),
    [
      buttonStore,
      currentPageNumberStore,
      reposListStore,
      repoOwnerStore,
      inputStore,
    ]
  );

  useEffect(() => {
    if (rootStore.query.searchParam) loadRepos();
  }, [loadRepos]);

  return (
    <div className={styles["repos-search-page"]}>
      <form className={styles["search-form"]}>
        <Input
          placeholder={"Введите название организации"}
          value={inputStore.currentValue}
          onChange={inputStore.setInputValue}
          isDisabled={reposListStore.meta === Meta.loading}
        />

        <Button
          onClick={loadRepos}
          disabled={reposListStore.meta === Meta.loading}
        >
          <SearchIcon />
        </Button>
      </form>

      <Switch>
        <Provider
          value={{
            reposListStore: reposListStore,
            inputStore: inputStore,
            repoOwnerStore: repoOwnerStore,
            currentPageNumberStore: currentPageNumberStore,
          }}
        >
          <Route path="/repos/:id" component={ReposListPage} />
          <Route exact path="/repos" component={ReposListPage} />
          <Redirect to="/repos" />
        </Provider>
      </Switch>
    </div>
  );
};

export default observer(ReposSearchPage);

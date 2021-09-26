import React, { createContext, useContext } from "react";

import SearchIcon from "@assets/SearchIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import CurrentPageNumberStore from "@store/CurrentPageNumberStore";
import InputStore from "@store/Input/InputStore";
import RepoOwnerStore from "@store/RepoOwnerStore";
import GitHubStore from "@store/ReposListStore";
import ReposListStore from "@store/ReposListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch, useHistory } from "react-router";

import ReposListPage from "../ReposListPage";
import styles from "./ReposSearchPage.module.scss";

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

export const UseReposSearchPageContext = () =>
  useContext(ReposSearchPageContext);

const ReposSearchPage = () => {
  const reposListStore = useLocalStore(() => new GitHubStore());
  const inputStore = useLocalStore(() => new InputStore());
  const repoOwnerStore = useLocalStore(() => new RepoOwnerStore());
  const currentPageNumberStore = useLocalStore(
    () => new CurrentPageNumberStore()
  );

  useQueryParamsStoreInit();

  const history = useHistory();

  return (
    <div className={styles["repos-search-page"]}>
      <form className={styles["search-form"]}>
        <Input
          placeholder={"Введите название организации"}
          value={inputStore.currentValue}
          onChange={(event) => {
            inputStore.setInputValue(event.currentTarget.value);
            history.push(`?search=${inputStore.currentValue}`);
          }}
          isDisabled={reposListStore.meta === Meta.loading}
        />

        <Button
          onClick={() => {
            currentPageNumberStore.reset();
            reposListStore.getOrganizationReposList({
              org: inputStore.currentValue,
              per_page: 10,
            });
            repoOwnerStore.getRepoOwnerInfo(inputStore.currentValue);
          }}
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
          <Route exact path="/repos/:id" component={ReposListPage} />
          <Route exact path="/repos" component={ReposListPage} />
          <Redirect to="/repos" />
        </Provider>
      </Switch>
    </div>
  );
};

export default observer(ReposSearchPage);

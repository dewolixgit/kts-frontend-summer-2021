import React, { createContext, useContext } from "react";
import { useState } from "react";

import SearchIcon from "@assets/SearchIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import InputStore from "@store/Input/InputStore";
import { RepoItemModel } from "@store/models/gitHub";
import { CollectionModel } from "@store/models/shared/collection";
import GitHubStore from "@store/ReposListStore";
import ReposListStore from "@store/ReposListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@store/RootStore/instance";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import ReposListPage from "../ReposListPage";
import styles from "./ReposSearchPage.module.scss";

type ReposContext = {
  reposListStore: ReposListStore | null;
  inputStore: InputStore | null;
};

const ReposSearchPageContext = createContext<ReposContext>({
  reposListStore: null,
  inputStore: null,
});

export const Provider = ReposSearchPageContext.Provider;

export const UseReposSearchPageContext = () =>
  useContext(ReposSearchPageContext);

const ReposSearchPage = () => {
  const reposListStore = useLocalStore(() => new GitHubStore());
  // const [currentInputValue, setCurrentInputValue] = useState("");
  const inputStore = useLocalStore(() => new InputStore());

  useQueryParamsStoreInit();

  // log("reposSearchPage", toJS(gitHubStore.repos), toJS(gitHubStore.meta));

  const loadingFunc = async (orgName: string | undefined, page: number) => {
    await reposListStore.getOrganizationReposList({
      org: orgName ? orgName : "",
      page: page,
      per_page: 10,
    });
  };

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
          onClick={() => loadingFunc(inputStore.currentValue, 1)}
          disabled={reposListStore.meta === Meta.loading}
        >
          <SearchIcon />
        </Button>
      </form>
      <Link to="/repos">go to ReposListPage</Link>
      <Link to="">go to ReposSearchPage</Link>

      <Switch>
        <Provider
          value={{
            reposListStore: reposListStore,
            inputStore: inputStore,
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

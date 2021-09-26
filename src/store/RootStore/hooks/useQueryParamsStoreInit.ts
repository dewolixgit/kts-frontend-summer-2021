import { log } from "@utils/log";
import { useLocation } from "react-router";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  // log(useLocation());

  rootStore.query.setSearch(search);
};

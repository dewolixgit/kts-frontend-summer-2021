import { useHistory, useLocation } from "react-router";
import { log } from "utils/log";

import rootStore from "../instance";

export const useQueryParamsStoreGlobalInit = (): void => {
  log("init");
  const history = useHistory();
  const location = useLocation();
  rootStore.query.setHistory(history, location);
};

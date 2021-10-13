import { useHistory, useLocation } from "react-router";
import { log } from "utils/log";

import rootStore from "store/RootStore/instance";

export const useQueryParamsStoreInit = (): void => {
  const history = useHistory();
  const location = useLocation();
  if (location.pathname !== "/repos") return;
  rootStore.query.setHistory(history, location);
};

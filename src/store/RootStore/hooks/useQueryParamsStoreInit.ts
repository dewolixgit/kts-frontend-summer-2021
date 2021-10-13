import { useHistory, useLocation } from "react-router";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const history = useHistory();
  const location = useLocation();
  if (location.pathname !== "/repos") return;
  rootStore.query.setHistory(history, location);
};

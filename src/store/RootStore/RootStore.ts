import ApiStore from "src/shared/store/ApiStore";

import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  query = new QueryParamsStore();
}

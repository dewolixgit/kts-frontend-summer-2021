import React from "react";

import { HashRouter } from "react-router-dom";

import "./App.scss";
import ReposSearchPage from "pages/ReposSearchPage";

const App = (): React.ReactElement => {
  return (
    <>
      <HashRouter>
        <ReposSearchPage />
      </HashRouter>
    </>
  );
};

export default App;

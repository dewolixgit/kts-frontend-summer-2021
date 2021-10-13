import React from "react";

import { BrowserRouter, Redirect } from "react-router-dom";

import "./App.scss";
import ReposSearchPage from "pages/ReposSearchPage";

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <ReposSearchPage />
        {/* <Redirect exact to="/repos" /> */}
      </BrowserRouter>
    </>
  );
};

export default App;

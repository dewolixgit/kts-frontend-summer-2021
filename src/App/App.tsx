import React from "react";

import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import ReposSearchPage from "pages/ReposSearchPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ReposSearchPage />
      </BrowserRouter>
    </>
  );
};

export default App;

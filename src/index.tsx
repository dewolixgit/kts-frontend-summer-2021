import React from "react";
import ReactDOM from "react-dom";

import 'regenerator-runtime';

import App from "./App/App";
import "./root/root";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
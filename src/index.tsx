import React from "react";
import 'regenerator-runtime';

import ReactDOM from "react-dom/client";

import App from "./pages/App/App";

const root = ReactDOM.createRoot(
  // @ts-ignore
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";

import SomeComponent from "components/SomeComponent";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <SomeComponent />
    </div>
  );
}

export default App;

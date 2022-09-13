import * as React from "react";

import styles from "./SomeComponent.module.scss";

const SomeComponent: React.FC = () => {
  return <div className={styles.component}><span style={{ color: "white" }}>hello</span></div>;
};

export default SomeComponent;

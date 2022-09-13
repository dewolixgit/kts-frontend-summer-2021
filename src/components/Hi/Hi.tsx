import * as React from "react";

import s from './Hi.module.scss';

const Hi: React.FC = () => {
  return (
    <div className={s.text}>
      Hi Hello
    </div>
  );
};

export default Hi;
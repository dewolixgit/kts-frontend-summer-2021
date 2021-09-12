import React from "react";

import styles from "./Avatar.module.scss";

export type AvatarProps = React.PropsWithChildren<{
  alt: string;
  letter: string;
  src?: string;
}>;

const Avatar: React.FC<AvatarProps> = ({ alt, letter, src }) => {
  return (
    <div className={styles.avatar}>
      {src ? <img src={src} alt={alt} /> : letter}
    </div>
  );
};

export default React.memo(Avatar);

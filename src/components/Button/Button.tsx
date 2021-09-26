import React from "react";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}>;

const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
}) => {
  return (
    <button
      className={
        className ? `${styles.button} ${className}` : `${styles.button}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

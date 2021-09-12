import React from "react";
import "./Button.css";

export type ButtonProps = React.PropsWithChildren<{
  onClick: (event: React.MouseEvent) => void;
  isDisabled?: boolean;
  className?: string;
}>;

const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  isDisabled,
  children,
  className,
}) => {
  return (
    <button
      className={className ? `button ${className}` : "button"}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

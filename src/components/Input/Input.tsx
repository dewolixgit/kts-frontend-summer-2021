import React from "react";

import styles from "./Input.module.scss";

type InputProps = {
  className?: string;
  value: string;
  placeholder: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  className,
  isDisabled,
}) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className ? `${styles.input} ${className}` : `${styles.input}`}
      disabled={isDisabled}
    />
  );
};

export default Input;

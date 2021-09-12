import React from "react";

import "./Input.css";

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
      className={className ? `input ${className}` : "input"}
      disabled={isDisabled}
    />
  );
};

export default Input;

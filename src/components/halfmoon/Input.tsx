import React from "react";
import classNames from "classnames";

export type InputProps = {
  className?: string;
  size?: "sm" | "lg";
  invalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, size, invalid, ...otherProps }, forwardedRef) => {
    // filters children from being passed to the input
    const classes = classNames(
      "form-control",
      {
        "form-control-sm": size === "sm",
        "form-control-lg": size === "lg",
        "is-invalid": invalid,
      },
      className
    );
    return <input className={classes} ref={forwardedRef} {...otherProps} />;
  }
);

export default Input;

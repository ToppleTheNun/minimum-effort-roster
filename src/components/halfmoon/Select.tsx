import React from "react";
import classNames from "classnames";

export type SelectProps = {
  displaySize?: "sm" | "lg";
  invalid?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
  className,
  displaySize,
  invalid,
  ...otherProps
}: SelectProps) => {
  const classes = classNames(
    "form-control",
    {
      "form-control-sm": displaySize === "sm",
      "form-control-lg": displaySize === "lg",
      "is-invalid": invalid,
    },
    className
  );

  return <select className={classes} {...otherProps} />;
};

export default Select;

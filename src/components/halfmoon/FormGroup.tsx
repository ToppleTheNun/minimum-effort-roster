import React from "react";
import classNames from "classnames";

export type FormGroupProps = {
  invalid?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const FormGroup = ({ className, invalid, ...otherProps }: FormGroupProps) => {
  const classes = classNames(
    "form-group",
    { "is-invalid": invalid },
    className
  );
  return <div className={classes} {...otherProps} />;
};

export default FormGroup;

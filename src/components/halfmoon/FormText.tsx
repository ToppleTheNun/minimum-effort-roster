import React from "react";
import classNames from "classnames";

export type FormTextProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const FormText = ({ className, children, ...otherProps }: FormTextProps) => {
  const classes = classNames("form-text", className);
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export default FormText;

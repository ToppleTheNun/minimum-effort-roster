import React from "react";
import classNames from "classnames";

export type FormRowProps = {
  equalSpacing?: true | "xs" | "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLDivElement>;

const FormRow = ({ className, equalSpacing, ...otherProps }: FormRowProps) => {
  const classes = classNames(
    "form-row",
    {
      "row-eq-spacing": equalSpacing === true,
      "row-eq-spacing-xs": equalSpacing === "xs",
      "row-eq-spacing-sm": equalSpacing === "sm",
      "row-eq-spacing-md": equalSpacing === "md",
      "row-eq-spacing-lg": equalSpacing === "lg",
      "row-eq-spacing-xl": equalSpacing === "xl",
    },
    className
  );
  return <div className={classes} {...otherProps} />;
};

export default FormRow;

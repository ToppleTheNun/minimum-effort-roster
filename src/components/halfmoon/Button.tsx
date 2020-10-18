import React from "react";
import classNames from "classnames";

export type ButtonColor = "primary" | "secondary" | "success" | "danger";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: "sm" | "lg";
  block?: boolean;
  active?: boolean;
}

const Button = ({
  color,
  size,
  block,
  disabled,
  active,
  className,
  children,
  ...otherProps
}: ButtonProps) => {
  const classes = classNames(
    "btn",
    {
      "btn-primary": color === "primary",
      "btn-secondary": color === "secondary",
      "btn-success": color === "success",
      "btn-danger": color === "danger",
      "btn-sm": size === "sm",
      "btn-lg": size === "lg",
    },
    className
  );

  return (
    <button className={classes} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

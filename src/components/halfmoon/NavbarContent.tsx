import React from "react";
import classNames from "classnames";

export type NavbarContentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const NavbarContent = ({ className, ...otherProps }: NavbarContentProps) => {
  const classes = classNames("navbar-content", className);

  return <div className={classes} {...otherProps} />;
};

export default NavbarContent;

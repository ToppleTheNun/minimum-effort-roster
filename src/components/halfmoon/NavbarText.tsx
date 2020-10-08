import React from "react";
import classNames from "classnames";

export type NavbarTextProps = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const NavbarText = ({ className, ...otherProps }: NavbarTextProps) => {
  const classes = classNames("navbar-text", className);

  return <span className={classes} {...otherProps} />;
};

export default NavbarText;

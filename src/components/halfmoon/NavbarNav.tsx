import React from "react";
import classNames from "classnames";

export type NavbarNavProps = {
  className?: string;
} & React.HTMLAttributes<HTMLUListElement>;

const NavbarNav = ({ className, ...otherProps }: NavbarNavProps) => {
  const classes = classNames("navbar-nav", className);

  return <ul className={classes} {...otherProps} />;
};

export default NavbarNav;

import React from "react";
import classNames from "classnames";

export type NavbarBrandProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const NavbarBrand = ({
  children,
  className,
  ...otherProps
}: NavbarBrandProps) => {
  const classes = classNames("navbar-brand", className);
  return (
    <a className={classes} {...otherProps}>
      {children}
    </a>
  );
};

export default NavbarBrand;

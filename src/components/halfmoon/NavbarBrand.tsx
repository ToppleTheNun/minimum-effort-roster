import React from "react";
import classNames from "classnames";

export type NavbarBrandProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const NavbarBrand = React.forwardRef<HTMLAnchorElement, NavbarBrandProps>(
  ({ children, className, ...otherProps }: NavbarBrandProps, forwardedRef) => {
    const classes = classNames("navbar-brand", className);
    return (
      <a className={classes} ref={forwardedRef}>
        {children}
      </a>
    );
  }
);

export default NavbarBrand;

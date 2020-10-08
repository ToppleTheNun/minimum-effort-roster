import React from "react";
import classNames from "classnames";

export type SidebarBrandProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const SidebarBrand = ({
  children,
  className,
  ...otherProps
}: SidebarBrandProps) => {
  const classes = classNames("sidebar-brand", className);
  return (
    <a className={classes} {...otherProps}>
      {children}
    </a>
  );
};

export default SidebarBrand;

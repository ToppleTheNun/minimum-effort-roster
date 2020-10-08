import React from "react";
import classNames from "classnames";

export type SidebarMenuProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SidebarMenu = ({ className, ...otherProps }: SidebarMenuProps) => {
  const classes = classNames("sidebar-menu", className);

  return <div className={classes} {...otherProps} />;
};

export default SidebarMenu;

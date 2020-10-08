import React from "react";
import classNames from "classnames";

export type SidebarProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Sidebar = ({ className, ...otherProps }: SidebarProps) => {
  const classes = classNames("sidebar", className);

  return <div className={classes} {...otherProps} />;
};

export default Sidebar;

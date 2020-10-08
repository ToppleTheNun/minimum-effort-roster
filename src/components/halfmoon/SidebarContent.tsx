import React from "react";
import classNames from "classnames";

export type SidebarContentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SidebarContent = ({ className, ...otherProps }: SidebarContentProps) => {
  const classes = classNames("sidebar-content", className);

  return <div className={classes} {...otherProps} />;
};

export default SidebarContent;

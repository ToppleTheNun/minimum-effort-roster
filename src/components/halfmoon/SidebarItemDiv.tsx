import React from "react";
import classNames from "classnames";

export type SidebarItemDivProps = {
  active?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const SidebarItemDiv = ({
  active,
  className,
  ...otherProps
}: SidebarItemDivProps) => {
  const classes = classNames("sidebar-link", { active }, className);
  return <div className={classes} {...otherProps} />;
};

export default SidebarItemDiv;

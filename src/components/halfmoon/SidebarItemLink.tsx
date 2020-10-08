import React from "react";
import classNames from "classnames";

export type SidebarItemLinkProps = {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const SidebarItemLink = ({
  active,
  children,
  className,
  ...otherProps
}: SidebarItemLinkProps) => {
  const classes = classNames("sidebar-link", { active }, className);
  return (
    <a className={classes} {...otherProps}>
      {children}
    </a>
  );
};

export default SidebarItemLink;

import React from "react";
import classNames from "classnames";

export type SidebarTitleProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const SidebarTitle = ({
  children,
  className,
  ...otherProps
}: SidebarTitleProps) => {
  const classes = classNames("sidebar-title", className);

  return (
    <h5 className={classes} {...otherProps}>
      {children}
    </h5>
  );
};

export default SidebarTitle;

import React from "react";
import classNames from "classnames";

export type SidebarDividerProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

// exclude children from props passed to the div
const SidebarDivider = ({
  className,
  children,
  ...otherProps
}: SidebarDividerProps) => {
  const classes = classNames("sidebar-divider", className);

  return <div className={classes} {...otherProps} />;
};

export default SidebarDivider;

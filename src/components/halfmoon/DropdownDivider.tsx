import React from "react";
import classNames from "classnames";

interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownDivider = ({ className, ...otherProps }: DropdownDividerProps) => {
  const classes = classNames("dropdown-divider", className);

  return <div className={classes} {...otherProps} />;
};

export default DropdownDivider;

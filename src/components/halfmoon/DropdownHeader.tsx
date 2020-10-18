import React from "react";
import classNames from "classnames";

interface DropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownHeader = ({
  children,
  className,
  ...otherProps
}: DropdownHeaderProps) => {
  const classes = classNames("dropdown-header", className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export default DropdownHeader;

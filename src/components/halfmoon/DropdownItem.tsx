import React from "react";
import classNames from "classnames";

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownItem = ({
  children,
  className,
  ...otherProps
}: DropdownItemProps) => {
  const classes = classNames("dropdown-item", className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export default DropdownItem;

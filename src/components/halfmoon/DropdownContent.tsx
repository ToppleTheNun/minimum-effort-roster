import React from "react";
import classNames from "classnames";

interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownContent = ({
  children,
  className,
  ...otherProps
}: DropdownContentProps) => {
  const classes = classNames("dropdown-content", className);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export default DropdownContent;

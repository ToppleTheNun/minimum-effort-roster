import React from "react";
import classNames from "classnames";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "right";
}

const DropdownMenu = ({
  align,
  children,
  className,
  ...otherProps
}: DropdownMenuProps) => {
  const classes = classNames(
    "dropdown-menu",
    {
      "dropdown-menu-center": align === "center",
      "dropdown-menu-right": align === "right",
    },
    className
  );

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export default DropdownMenu;

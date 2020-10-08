import React from "react";
import classNames from "classnames";

import useNavbar from "../../hooks/useNavbar";

export type NavbarProps = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Navbar = ({ className, ...otherProps }: NavbarProps) => {
  const { withNavbar } = useNavbar();
  const classes = classNames(
    "navbar",
    { "navbar-fixed-bottom": withNavbar === "bottom" },
    className
  );

  return <nav className={classes} {...otherProps} />;
};

export default Navbar;

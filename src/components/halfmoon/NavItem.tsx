import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export type NavItemProps = {
  active?: boolean;
  className?: string;
  href?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLLIElement>;

const NavItem = ({
  active,
  children,
  className,
  href,
  ...otherProps
}: NavItemProps) => {
  const classes = classNames("nav-item", { active }, className);

  return (
    <li className={classes} {...otherProps}>
      {href && (
        <Link className="nav-link" to={href}>
          {children}
        </Link>
      )}
      {!href && <span className="nav-link">{children}</span>}
    </li>
  );
};

export default NavItem;

import React from "react";
import classNames from "classnames";

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
        <a className="nav-link" href={href}>
          {children}
        </a>
      )}
      {!href && <span className="nav-link">{children}</span>}
    </li>
  );
};

export default NavItem;

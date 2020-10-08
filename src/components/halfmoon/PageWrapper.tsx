import React from "react";
import classNames from "classnames";

import NavbarContext, { WithNavbar } from "../../context/navbar";
import { isDefined } from "../../typeGuards";

export type PageWrapperProps = {
  withNavbar?: WithNavbar; // allows not specifying, true, or "bottom"
  withSidebar?: boolean;
  isSidebarOpen?: boolean;
  toggle?: () => void;
  sidebarType?:
    | "full-height"
    | "overlayed-all"
    | "overlayed-sm-and-down"
    | "full-height overlayed-sm-and-down";
  withTransitions?: boolean;
  withStickyAlert?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const PageWrapper = ({
  withNavbar,
  withSidebar,
  isSidebarOpen,
  toggle,
  sidebarType,
  withTransitions,
  withStickyAlert,
  className,
  children,
}: PageWrapperProps) => {
  const classes = classNames(
    "page-wrapper",
    {
      "with-navbar-fixed-bottom": withNavbar === "bottom",
      "with-navbar": withNavbar === true,
      "with-sidebar": withSidebar,
      "with-transitions": withTransitions,
    },
    className
  );

  const dataSidebarHidden =
    isDefined(isSidebarOpen) && isSidebarOpen ? undefined : "hidden";

  return (
    <NavbarContext.Provider value={{ withNavbar }}>
      <div
        className={classes}
        data-sidebar-hidden={dataSidebarHidden}
        data-sidebar-type={sidebarType}
      >
        {sidebarType && sidebarType !== "full-height" && (
          <div className="sidebar-overlay" onClick={toggle} />
        )}
        {children}
        {withStickyAlert && (
          <div id="halfmoon-stickyalerts-container" className="sticky-alerts" />
        )}
      </div>
    </NavbarContext.Provider>
  );
};

export default PageWrapper;

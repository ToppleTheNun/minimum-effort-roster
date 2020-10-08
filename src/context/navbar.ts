import React from "react";

export type WithNavbar = true | "bottom";

export type NavbarContextType = {
  withNavbar?: WithNavbar;
};

const NavbarContext = React.createContext<NavbarContextType>({});

export default NavbarContext;

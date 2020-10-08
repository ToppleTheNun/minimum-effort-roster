import React from "react";
import NavbarContent from "./halfmoon/NavbarContent";
import NavbarBrand from "./halfmoon/NavbarBrand";
import NavbarNav from "./halfmoon/NavbarNav";
import NavItem from "./halfmoon/NavItem";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import Navbar from "./halfmoon/Navbar";

const AppNavbar = () => (
  <Navbar>
    <NavbarBrand>Minimum Effort - Roster</NavbarBrand>
    <NavbarNav>
      <NavItem>Builder</NavItem>
      <NavItem>Composition</NavItem>
    </NavbarNav>
    <NavbarContent className="ml-auto">
      <ToggleDarkModeButton />
    </NavbarContent>
  </Navbar>
);

export default AppNavbar;

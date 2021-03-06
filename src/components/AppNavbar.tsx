import React from "react";
import NavbarContent from "./halfmoon/NavbarContent";
import NavbarNav from "./halfmoon/NavbarNav";
import NavItem from "./halfmoon/NavItem";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import { Link } from "react-router-dom";

const AppNavbar = () => (
  <nav className="navbar">
    <Link className="navbar-brand" to="/">
      Minimum Effort - Roster
    </Link>
    <NavbarNav>
      <NavItem href="/builder" id="navbar-builder-link">
        Builder
      </NavItem>
      <NavItem href="/composition" id="navbar-composition-link">
        Composition
      </NavItem>
    </NavbarNav>
    <NavbarContent className="ml-auto">
      <ToggleDarkModeButton />
    </NavbarContent>
  </nav>
);

export default AppNavbar;

import React from "react";
import NavbarContent from "./halfmoon/NavbarContent";
import NavbarNav from "./halfmoon/NavbarNav";
import NavItem from "./halfmoon/NavItem";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import Navbar from "./halfmoon/Navbar";
import { Link } from "react-router-dom";

const AppNavbar = () => (
  <Navbar>
    <Link className="navbar-brand" to="/">
      Minimum Effort - Roster
    </Link>
    <NavbarNav>
      <NavItem href="/builder">Builder</NavItem>
      <NavItem href="/composition">Composition</NavItem>
    </NavbarNav>
    <NavbarContent className="ml-auto">
      <ToggleDarkModeButton />
    </NavbarContent>
  </Navbar>
);

export default AppNavbar;
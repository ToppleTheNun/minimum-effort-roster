import React from "react";

import Navbar from "./halfmoon/Navbar";
import NavbarText from "./halfmoon/NavbarText";
import { buildDate } from "../constants/buildDate";

const BottomAppNavbar = () => (
  <Navbar>
    <NavbarText className="ml-auto">Built on: {buildDate}</NavbarText>
    <NavbarText className="ml-auto">© Copyright 2020 Richard Harrah</NavbarText>
  </Navbar>
);

export default BottomAppNavbar;

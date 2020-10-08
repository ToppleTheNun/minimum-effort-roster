import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import Button from "./halfmoon/Button";

const toggleDarkMode = () => {
  const body = document.body;
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
  } else {
    body.classList.add("dark-mode");
  }
};

const ToggleDarkModeButton = () => (
  <Button onClick={toggleDarkMode} type="button">
    <FontAwesomeIcon icon={faMoon} />
  </Button>
);

export default ToggleDarkModeButton;

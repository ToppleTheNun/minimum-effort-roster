import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Button from "./halfmoon/Button";

export type ToggleSidebarButtonProps = {
  toggle: () => void;
}

const ToggleSidebarButton = ({toggle}: ToggleSidebarButtonProps) => (
  <Button onClick={toggle} type="button">
    <FontAwesomeIcon icon={faBars} />
  </Button>
);

export default ToggleSidebarButton;

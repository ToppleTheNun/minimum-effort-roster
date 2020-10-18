import React from "react";

export interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
}

const DropdownContext = React.createContext<DropdownContextType>({
  isOpen: false,
  toggle: () => {},
});

export default DropdownContext;

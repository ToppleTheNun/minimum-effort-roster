import React from "react";

export interface ModalContextType {
  toggle: () => void;
  withCloseButton: boolean;
}

const ModalContext = React.createContext<ModalContextType>({
  toggle: () => {},
  withCloseButton: false,
});

export default ModalContext;

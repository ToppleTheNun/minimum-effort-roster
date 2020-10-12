import React, { useCallback, useEffect } from "react";
import classNames from "classnames";

import ModalContext from "../../context/modal";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
  isOpen: boolean;
  toggle: () => void;
  withCloseButton: boolean;
}

const Modal = ({
  children,
  className,
  full,
  isOpen,
  toggle,
  withCloseButton,
}: ModalProps) => {
  const classes = classNames(
    "modal",
    { "modal-full": full, show: isOpen },
    className
  );
  const handleEscapeKey: (event: KeyboardEvent) => void = useCallback(
    (event) => {
      console.log(event.key);
    },
    []
  );
  const handleDocumentClick: (event: MouseEvent) => void = useCallback(
    (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        event.target.classList.contains("modal-dialog")
      ) {
        toggle();
      }
    },
    [toggle]
  );
  const addEvents = useCallback(() => {
    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("keyup", handleEscapeKey, true);
  }, [handleDocumentClick, handleEscapeKey]);
  const removeEvents = useCallback(() => {
    document.removeEventListener("click", handleDocumentClick, true);
    document.removeEventListener("keyup", handleEscapeKey, true);
  }, [handleDocumentClick, handleEscapeKey]);

  useEffect(() => {
    if (isOpen) {
      addEvents();
    } else {
      removeEvents();
    }
    return () => removeEvents();
  }, [addEvents, isOpen, removeEvents]);

  return (
    <ModalContext.Provider value={{ toggle, withCloseButton }}>
      <div className={classes}>{children}</div>
    </ModalContext.Provider>
  );
};

export default Modal;

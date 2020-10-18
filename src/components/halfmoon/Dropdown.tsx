import React, { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";

import DropdownContext from "../../context/dropdown";
import useMergedRef from "../../hooks/useMergedRef";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  arrow?: boolean;
  dropDirection?: "left" | "right" | "up";
  isOpen: boolean;
  toggle: () => void;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      arrow,
      children,
      className,
      dropDirection,
      isOpen,
      toggle,
      ...otherProps
    },
    ref
  ) => {
    const classes = classNames(
      "dropdown",
      {
        dropleft: dropDirection === "left",
        dropright: dropDirection === "right",
        dropup: dropDirection === "up",
        show: isOpen,
        "with-arrow": arrow,
      },
      className
    );

    const nodeRef = useRef<HTMLDivElement>(null);
    const multiRef = useMergedRef(ref, nodeRef);

    const handleEscapeKey: (event: KeyboardEvent) => void = useCallback(
      (event) => {
        if (event.type === "keyup" && event.keyCode === 27) {
          toggle();
          return;
        }
      },
      [toggle]
    );
    const handleDocumentClick: (event: MouseEvent) => void = useCallback(
      (event) => {
        const container = nodeRef.current;
        const target = event.target;
        if (
          container &&
          target &&
          target instanceof HTMLElement &&
          container?.contains(target) &&
          container !== target
        ) {
          return;
        }
        toggle();
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
      <DropdownContext.Provider value={{ isOpen, toggle }}>
        <div className={classes} ref={multiRef} {...otherProps}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

export default Dropdown;

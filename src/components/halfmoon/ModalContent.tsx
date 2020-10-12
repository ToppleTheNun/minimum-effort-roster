import React from "react";
import classNames from "classnames";

import useModal from "../../hooks/useModal";

interface ModalContentProps {
  children?: React.ReactNode;
  className?: string;
  media?: boolean;
}

const ModalContent = ({ children, className, media }: ModalContentProps) => {
  const { toggle, withCloseButton } = useModal();

  const classes = classNames(
    "modal-content",
    { "modal-content-media": media },
    className
  );

  return (
    <div className={classes}>
      {withCloseButton && (
        <div onClick={toggle} className="close">
          <span>&times;</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default ModalContent;

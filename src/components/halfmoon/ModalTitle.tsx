import React from "react";
import classNames from "classnames";

interface ModalTitleProps {
  children?: React.ReactNode;
  className?: string;
}

const ModalTitle = ({ children, className }: ModalTitleProps) => {
  const classes = classNames("modal-title", className);
  return <h5 className={classes}>{children}</h5>;
};

export default ModalTitle;

import React from "react";
import classNames from "classnames";

interface ModalDialogProps {
  children?: React.ReactNode;
  className?: string;
}

const ModalDialog = ({ children, className }: ModalDialogProps) => {
  const classes = classNames("modal-dialog", className);
  return <div className={classes}>{children}</div>;
};

export default ModalDialog;

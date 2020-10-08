import React from "react";
import classNames from "classnames";

export type ContentWrapperProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ContentWrapper = ({ className, ...otherProps }: ContentWrapperProps) => {
  const classes = classNames("content-wrapper", className);

  return <div className={classes} {...otherProps} />;
};

export default ContentWrapper;

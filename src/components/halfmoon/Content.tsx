import React from "react";
import classNames from "classnames";

export type ContentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Content = ({ className, ...otherProps }: ContentProps) => {
  const classes = classNames("content", className);

  return <div className={classes} {...otherProps} />;
};

export default Content;

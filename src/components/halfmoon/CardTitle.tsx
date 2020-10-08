import React from "react";
import classNames from "classnames";

export type CardTitleProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CardTitle = ({ className, ...otherProps }: CardTitleProps) => {
  const classes = classNames("card-title", className);
  return <div className={classes} {...otherProps} />;
};

export default CardTitle;

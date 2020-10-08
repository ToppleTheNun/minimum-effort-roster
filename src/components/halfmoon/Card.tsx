import React from "react";
import classNames from "classnames";

export type CardProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...otherProps }: CardProps) => {
  const classes = classNames("card", className);
  return <div className={classes} {...otherProps} />;
};

export default Card;

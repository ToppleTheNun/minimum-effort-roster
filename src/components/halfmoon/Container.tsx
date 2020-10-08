import React from "react";
import classNames from "classnames";

export type ContainerProps = {
  breakpoint?: "sm" | "md" | "lg" | "xl" | "fluid";
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({
  breakpoint,
  className,
  ...otherProps
}: ContainerProps) => {
  const classes = classNames(
    {
      container: !breakpoint,
      "container-sm": breakpoint === "sm",
      "container-md": breakpoint === "md",
      "container-lg": breakpoint === "lg",
      "container-xl": breakpoint === "xl",
      "container-fluid": breakpoint === "fluid",
    },
    className
  );

  return <div className={classes} {...otherProps} />;
};

export default Container;

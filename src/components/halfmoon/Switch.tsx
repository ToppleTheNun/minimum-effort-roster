import React from "react";
import classNames from "classnames";
import BaseToggleable, { BaseToggleableProps } from "./BaseToggleable";

export type SwitchProps = BaseToggleableProps;

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      blank,
      children,
      className,
      disabled,
      horizontal,
      id,
      ...otherProps
    },
    forwardedRef
  ) => {
    // filters out any added onClick events
    const classes = classNames(
      "custom-switch",
      { "d-inline-block": horizontal },
      className
    );

    return (
      <BaseToggleable
        blank={blank}
        className={classes}
        disabled={disabled}
        horizontal={horizontal}
        id={id}
        ref={forwardedRef}
        {...otherProps}
      >
        {children}
      </BaseToggleable>
    );
  }
);

export default Switch;

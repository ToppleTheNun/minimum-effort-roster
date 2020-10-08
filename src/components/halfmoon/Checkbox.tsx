import React from "react";
import classNames from "classnames";
import BaseToggleable, { BaseToggleableProps } from "./BaseToggleable";

export type CheckboxProps = BaseToggleableProps;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      blank,
      children,
      className,
      disabled,
      horizontal,
      id,
      onClick,
      ...otherProps
    },
    forwardedRef
  ) => {
    const classes = classNames(
      "custom-checkbox",
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

export default Checkbox;

import React from "react";
import classNames from "classnames";

export type BaseToggleableProps = {
  blank?: boolean;
  className?: string;
  disabled?: boolean;
  horizontal?: boolean;
  name?: string;
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseToggleable = React.forwardRef<HTMLInputElement, BaseToggleableProps>(
  (
    {
      blank,
      children,
      className,
      disabled,
      horizontal,
      id,
      name,
      onClick,
      ...otherProps
    },
    forwardedRef
  ) => {
    // filters out any added onClick events
    const classes = classNames(className);
    const labelClasses = classNames({ blank });

    return (
      <div className={classes} {...otherProps}>
        <input
          disabled={disabled}
          id={id}
          name={name}
          ref={forwardedRef}
          type="checkbox"
        />
        <label htmlFor={id} className={labelClasses}>
          {children}
        </label>
      </div>
    );
  }
);

export default BaseToggleable;

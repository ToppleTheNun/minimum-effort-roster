import React, { useCallback, useState } from "react";
import Button, {
  ButtonColor,
  ButtonProps,
} from "../components/halfmoon/Button";

type ButtonWithSuccessProps = { duration?: number } & ButtonProps;

const ButtonWithSuccess = ({
  color,
  duration = 1000,
  onClick,
  ...otherProps
}: ButtonWithSuccessProps) => {
  const [currentColor, setCurrentColor] = useState<ButtonColor | undefined>(
    color
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (onClick) {
        await onClick(event);
      }
      setCurrentColor("success");
      setTimeout(() => {
        setCurrentColor(color);
      }, duration);
    },
    [color, duration, onClick]
  );

  return <Button color={currentColor} onClick={handleClick} {...otherProps} />;
};

export default ButtonWithSuccess;

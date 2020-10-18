import React from "react";
import { TooltipRenderProps } from "react-joyride";
import Dropdown from "./halfmoon/Dropdown";
import DropdownHeader from "./halfmoon/DropdownHeader";
import DropdownContent from "./halfmoon/DropdownContent";
import DropdownDivider from "./halfmoon/DropdownDivider";
import DropdownMenu from "./halfmoon/DropdownMenu";
import Button from "./halfmoon/Button";

interface TourTooltipProps extends TooltipRenderProps {}

const TourTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: TourTooltipProps) => (
  <Dropdown isOpen toggle={() => {}} {...tooltipProps}>
    <DropdownMenu className="w-250">
      {step.title && <DropdownHeader>{step.title}</DropdownHeader>}
      {step.title && <DropdownDivider />}
      <DropdownContent>{step.content}</DropdownContent>
      <DropdownDivider />
      <DropdownContent>
        <div className="btn-group w-full">
          {index > 0 && <Button {...backProps}>{backProps.title}</Button>}
          {continuous && (
            <Button {...primaryProps}>{primaryProps.title}</Button>
          )}
          {!continuous && <Button {...closeProps}>{closeProps.title}</Button>}
        </div>
      </DropdownContent>
    </DropdownMenu>
  </Dropdown>
);

export default TourTooltip;

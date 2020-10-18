import React, { useState } from "react";
import ReactJoyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
} from "react-joyride";

import steps from "../tour/steps";
import TourTooltip from "./TourTooltip";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../utils/localStorage";

const Joyride = () => {
  const [stepIndex, setStepIndex] = useState(
    readFromLocalStorage<number>("tour-index") ?? 0
  );
  const [isTourRunning, setTourRunning] = useState(stepIndex < steps.length);

  const joyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const newStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      setStepIndex(newStepIndex);
      writeToLocalStorage("tour-index", newStepIndex);
    } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setTourRunning(false);
    }
  };

  return (
    <ReactJoyride
      callback={joyrideCallback}
      continuous
      run={isTourRunning}
      stepIndex={stepIndex}
      steps={steps}
      tooltipComponent={TourTooltip}
    />
  );
};

export default Joyride;

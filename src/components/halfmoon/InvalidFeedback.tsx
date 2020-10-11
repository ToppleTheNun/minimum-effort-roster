import React from "react";
import { isDefined } from "../../typeGuards";

interface InvalidFeedbackProps {
  errors?: (string | undefined)[];
}

const InvalidFeedback = ({ errors }: InvalidFeedbackProps) => (
  <div className="invalid-feedback">
    {errors && (
      <ul>
        {errors.filter(isDefined).map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    )}
  </div>
);

export default InvalidFeedback;

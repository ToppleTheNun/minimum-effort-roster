import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import clipboardCopy from "clipboard-copy";

import ButtonWithSuccess from "../../components/ButtonWithSuccess";

interface CopyExportButtonProps {
  exportCode: string;
}

const CopyExportButton = ({ exportCode }: CopyExportButtonProps) => {
  const handleCopy = useCallback(() => {
    return clipboardCopy(exportCode);
  }, [exportCode]);

  return (
    <div className="input-group-append">
      <ButtonWithSuccess aria-label="Copy" color="primary" onClick={handleCopy} type="button">
        <FontAwesomeIcon icon={faCopy} />
      </ButtonWithSuccess>
    </div>
  );
};

export default CopyExportButton;

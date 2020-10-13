import React, { useCallback, useState } from "react";
import Button, { ButtonColor } from "../../components/halfmoon/Button";

interface ExportToHasteBinButtonProps {
  exportToHasteBin: () => Promise<void>;
}

const ExportToHasteBinButton = ({
  exportToHasteBin,
}: ExportToHasteBinButtonProps) => {
  const [color, setColor] = useState<ButtonColor | undefined>();
  const [isLoading, setLoading] = useState(false);

  const handleSuccess = () => {
    setColor("success");
    setTimeout(() => {
      setColor(undefined);
    }, 1000);
  };

  const handleFailure = () => {
    setColor("danger");
    setTimeout(() => {
      setColor(undefined);
    }, 1000);
  };

  const handleExportToHasteBin = useCallback(async () => {
    setColor(undefined);
    setLoading(true);
    try {
      await exportToHasteBin();
      setLoading(false);
      handleSuccess();
    } catch (err) {
      setLoading(false);
      handleFailure();
    }
  }, [exportToHasteBin]);

  return (
    <Button
      className="w-full"
      color={color}
      disabled={isLoading}
      onClick={handleExportToHasteBin}
      type="button"
    >
      {isLoading ? "Exporting..." : "Export to HasteBin"}
    </Button>
  );
};

export default ExportToHasteBinButton;

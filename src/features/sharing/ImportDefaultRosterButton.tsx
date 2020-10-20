import React, { useState } from "react";
import Button, { ButtonColor } from "../../components/halfmoon/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { importComposition } from "../composition/compositionSlice";
import * as defaultRoster from "../../rosters/roster-oct-13-2020.json";
import { importRoster } from "../roster/rosterSlice";

interface ImportDefaultRosterButtonProps {
  isImporting: boolean;
}

const ImportDefaultRosterButton = ({
  isImporting,
}: ImportDefaultRosterButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [color, setColor] = useState<ButtonColor | undefined>();
  const [isLoading, setLoading] = useState(false);

  const handleImportDefaultRoster = () => {
    setLoading(true);
    dispatch(importComposition(defaultRoster.composition));
    dispatch(importRoster(defaultRoster.roster));
    setColor("success");
    setLoading(false);
    setTimeout(() => {
      setColor(undefined);
    }, 1000);
  };

  return (
    <Button
      className="w-half"
      color={color}
      disabled={isImporting || isLoading}
      id="import-default-roster-button"
      onClick={handleImportDefaultRoster}
      type="button"
    >
      {isLoading ? "Importing..." : "Import Default Roster"}
    </Button>
  );
};

export default ImportDefaultRosterButton;

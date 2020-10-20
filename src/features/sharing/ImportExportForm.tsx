import React, { FormEventHandler, useCallback, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import Form from "../../components/halfmoon/Form";
import Input from "../../components/halfmoon/Input";
import Button, { ButtonColor } from "../../components/halfmoon/Button";
import FormGroup from "../../components/halfmoon/FormGroup";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { fromBase64, toBase64 } from "../../utils/base64";
import CopyExportButton from "./CopyExportButton";
import { importComposition } from "../composition/compositionSlice";
import { useDispatch } from "react-redux";
import { importRoster } from "../roster/rosterSlice";
import ExportToHasteBinButton from "./ExportToHasteBinButton";
import { isHasteBinLink } from "../../api/rawHastebinApi";
import ImportDefaultRosterButton from "./ImportDefaultRosterButton";
import {
  getRosterAndCompositionFromHasteBin,
  postRosterAndCompositionToHasteBin,
  RosterAndComposition,
} from "../hasteBin/hasteBinSlice";
import { setRosterAndCompositionCode } from "./sharingSlice";

const ImportExportForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const composition = useTypedSelector(
    (state) => state.composition.composition
  );
  const roster = useTypedSelector((state) => state.roster.players);
  const rosterAndCompositionCode = useTypedSelector(
    (state) => state.sharing.rosterAndCompositionCode
  );
  const [importButtonColor, setImportButtonColor] = useState<
    ButtonColor | undefined
  >();
  const [isImporting, setImporting] = useState(false);

  const handleSuccess = () => {
    setImportButtonColor("success");
    setTimeout(() => {
      setImportButtonColor(undefined);
    }, 1000);
  };

  const handleFailure = () => {
    setImportButtonColor("danger");
    setTimeout(() => {
      setImportButtonColor(undefined);
    }, 1000);
  };

  const handleImportFormBase64 = useCallback(
    async (code: string) => {
      try {
        const importData: RosterAndComposition = fromBase64(code);
        if (importData.composition) {
          dispatch(importComposition(importData.composition));
        }
        if (importData.roster) {
          dispatch(importRoster(importData.roster));
        }
        setImporting(false);
        handleSuccess();
      } catch (err) {
        console.log(err);
        setImporting(false);
        handleFailure();
      }
    },
    [dispatch]
  );

  const handleImportFormHasteBin = useCallback(
    async (code: string) => {
      try {
        const rosterAndComposition = unwrapResult(
          await dispatch(getRosterAndCompositionFromHasteBin(code))
        );
        if (rosterAndComposition.roster) {
          dispatch(importRoster(rosterAndComposition.roster));
        }
        if (rosterAndComposition.composition) {
          dispatch(importComposition(rosterAndComposition.composition));
        }
        setImporting(false);
        handleSuccess();
      } catch (err) {
        console.log(err);
        setImporting(false);
        handleFailure();
      }
    },
    [dispatch]
  );

  const handleImportFromInput: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      setImporting(true);
      setImportButtonColor(undefined);

      if (isHasteBinLink(rosterAndCompositionCode)) {
        await handleImportFormHasteBin(rosterAndCompositionCode);
        return;
      }

      await handleImportFormBase64(rosterAndCompositionCode);
    },
    [handleImportFormBase64, handleImportFormHasteBin, rosterAndCompositionCode]
  );

  const handleExport = () => {
    const exportObj = { composition, roster };
    const exportValue = toBase64(exportObj);
    dispatch(setRosterAndCompositionCode(exportValue));
  };

  const handleExportToHasteBin = async () => {
    try {
      const rawHasteBinLink = unwrapResult(
        await dispatch(
          postRosterAndCompositionToHasteBin({ composition, roster })
        )
      );
      dispatch(setRosterAndCompositionCode(rawHasteBinLink));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form id="import-export-form" onSubmit={handleImportFromInput}>
      <FormGroup>
        <label htmlFor="code">Import Roster and Composition</label>
        <div className="input-group">
          <Input
            id="code"
            name="code"
            onChange={(event) => {
              dispatch(setRosterAndCompositionCode(event.target.value));
            }}
            placeholder="Roster and composition code"
            type="text"
            value={rosterAndCompositionCode}
          />
          {rosterAndCompositionCode && (
            <CopyExportButton exportCode={rosterAndCompositionCode} />
          )}
        </div>
        <div className="form-text">
          <strong>Import</strong> a roster and composition that has already been{" "}
          <strong>Export</strong>ed.
        </div>
      </FormGroup>
      <FormGroup className="mb-0">
        <div className="btn-group w-full" role="group">
          <Button
            className="w-half"
            color={importButtonColor}
            disabled={isImporting}
            id="import-roster-from-code-button"
            type="submit"
          >
            {isImporting ? "Importing..." : "Import"}
          </Button>
          <Button
            className="w-half"
            disabled={isImporting}
            id="export-current-roster-button"
            onClick={handleExport}
            type="button"
          >
            Export
          </Button>
        </div>
        <div className="btn-group w-full" role="group">
          <ImportDefaultRosterButton isImporting={isImporting} />
          <ExportToHasteBinButton
            exportToHasteBin={handleExportToHasteBin}
            isImporting={isImporting}
          />
        </div>
      </FormGroup>
    </Form>
  );
};

export default ImportExportForm;
